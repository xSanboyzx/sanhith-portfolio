import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const origin = process.argv[2] || "http://127.0.0.1:8787";
const paths = [
  "/",
  "/about",
  "/projects",
  "/contact",
  "/missing-csp-test",
  "/another-missing-csp-test?input=%3Cscript%3Ealert(1)%3C/script%3E",
  "/concepts/midnight-coder",
  "/concepts/midnight-coder.svg",
  "/branding/social-preview.svg",
];

for (const pathname of paths) {
  const response = await fetch(new URL(pathname, origin));
  const missingPage = pathname.startsWith("/missing-") || pathname.startsWith("/another-missing-");
  assert.equal(response.status, missingPage ? 404 : 200);
  const policy = response.headers.get("content-security-policy");
  assert(policy, `Missing enforced CSP: ${pathname}`);
  const directives = new Map(
    policy.split(";").map((entry) => {
      const [name, ...values] = entry.trim().split(/\s+/);
      return [name, values];
    }),
  );
  const scriptSources = directives.get("script-src");
  assert(scriptSources, `Missing script-src: ${pathname}`);
  assert(scriptSources.every((source) =>
    source === "'self'" || /^'sha256-[A-Za-z0-9+/]{43}='$/.test(source),
  ));
  assert.deepEqual(directives.get("script-src-attr"), ["'none'"]);
  assert.deepEqual(directives.get("base-uri"), ["'none'"]);
  assert.deepEqual(directives.get("form-action"), ["'none'"]);
  assert.deepEqual(directives.get("connect-src"), ["'self'"]);
  const isConcept = pathname === "/concepts/midnight-coder";
  assert.deepEqual(directives.get("frame-src"), [isConcept ? "'self'" : "'none'"]);
  const isSvg = pathname === "/concepts/midnight-coder.svg";
  assert.deepEqual(directives.get("object-src"), [isConcept ? "'self'" : "'none'"]);
  assert.deepEqual(directives.get("frame-ancestors"), [isSvg ? "'self'" : "'none'"]);
  assert.equal(response.headers.get("x-frame-options"), isSvg ? "SAMEORIGIN" : "DENY");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.equal(
    response.headers.get("permissions-policy"),
    "camera=(), microphone=(), geolocation=()",
  );

  const body = await response.text();
  for (const tag of ["script", "style"]) {
    const allowed = directives.get(tag === "script" ? "script-src" : "style-src-elem");
    const pattern = new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}\\s*>`, "gi");
    for (const [, attributes, content] of body.matchAll(pattern)) {
      if (tag === "script" && /\bsrc\s*=/i.test(attributes)) continue;
      const digest = createHash("sha256")
        .update(content.replace(/\r\n?/g, "\n"))
        .digest("base64");
      assert(allowed?.includes(`'sha256-${digest}'`), `Blocked trusted inline ${tag}: ${pathname}`);
    }
  }

  const untrustedDigest = createHash("sha256")
    .update("window.__untrustedCspProbe = true")
    .digest("base64");
  assert(
    !scriptSources.includes(`'sha256-${untrustedDigest}'`),
    "Unexpected authorization of injected script",
  );
  if (pathname === "/") {
    assert.match(response.headers.get("vary"), /RSC/);
    // Cloudflare may weaken ETags when compressing HTML at the edge.
    const etag = response.headers.get("etag");
    assert(etag, "Missing page ETag");
    const strongEtag = etag.replace(/^W\//, "");
    for (const validator of [strongEtag, `W/${strongEtag}`]) {
      const cached = await fetch(new URL(pathname, origin), {
        headers: { "If-None-Match": validator },
      });
      assert.equal(cached.status, 304);
      assert.equal(cached.headers.get("content-security-policy"), policy);
      assert.equal(await cached.text(), "");
    }
    const assetLinks = body.matchAll(/(?:src|href)="(\/_next\/static\/[^"?]+)(?:\?[^"]*)?"/g);
    const assets = [...new Set([...assetLinks].map((match) => match[1]))];
    for (const asset of assets) {
      const resource = await fetch(new URL(asset, origin));
      assert.equal(resource.status, 200, asset);
      assert.match(resource.headers.get("cache-control"), /max-age=31536000, immutable/);
      await resource.arrayBuffer();
    }
  }
  console.log(`CSP verified: ${pathname}`);
}

for (const pathname of ["/", "/about", "/projects", "/contact"]) {
  const navigation = await fetch(new URL(pathname, origin), { headers: { RSC: "1" } });
  assert.equal(navigation.status, 200, `RSC navigation: ${pathname}`);
  assert.match(navigation.headers.get("content-type"), /text\/x-component/);
  await navigation.text();
  const head = await fetch(new URL(pathname, origin), { method: "HEAD" });
  assert.equal(head.status, 200);
  assert(head.headers.get("content-security-policy"));
  assert.equal(await head.text(), "");
  console.log(`RSC and HEAD verified: ${pathname}`);
}
