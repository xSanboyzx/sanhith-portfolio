import worker from "./.open-next/worker.js";
import csp from "./.next/csp.json" with { type: "json" };
import {
  hstsHeader,
  productionHostname,
  securityHeaders,
} from "./src/lib/security-headers.ts";

export {
  BucketCachePurge,
  DOQueueHandler,
  DOShardedTagCache,
} from "./.open-next/worker.js";

const securedWorker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const page = csp.pages[url.pathname];
    const isDocumentRequest =
      (request.method === "GET" || request.method === "HEAD") &&
      !request.headers.has("rsc") &&
      !request.headers.has("next-router-state-tree");
    let original;

    if (page && isDocumentRequest) {
      // Serve exactly the trusted document whose scripts were hashed at build time.
      // RSC navigation continues through OpenNext below.
      const headers = {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
        Vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch",
        ETag: page.etag,
      };
      const validators = request.headers.get("if-none-match")?.split(",");
      const unchanged = validators?.some((value) => {
        const validator = value.trim().replace(/^W\//, "");
        return validator === "*" || validator === page.etag;
      });
      original = new Response(unchanged || request.method === "HEAD" ? null : page.html, {
        status: unchanged ? 304 : 200,
        headers,
      });
    } else {
      original = await worker.fetch(request, env, ctx);
    }
    const isHtmlNotFound =
      original.status === 404 && original.headers.get("content-type")?.includes("text/html");
    // Clone the response headers while preserving its streaming body and status.
    const response = new Response(isHtmlNotFound ? csp.notFoundHtml : original.body, original);

    if (isHtmlNotFound) {
      await original.body?.cancel();
      response.headers.delete("content-length");
      response.headers.delete("etag");
    }

    for (const { key, value } of securityHeaders) {
      response.headers.set(key, value);
    }

    response.headers.set("Content-Security-Policy", csp.policy);

    if (url.hostname === productionHostname) {
      response.headers.set(hstsHeader.key, hstsHeader.value);
    }

    return response;
  },
};

export default securedWorker;
