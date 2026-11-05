import { readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { checkHeaderLength, createPolicy, inlineHashes } from "./csp-policy.mjs";

async function filesWithExtension(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) return filesWithExtension(file, extension);
      return entry.name.endsWith(extension) ? [file] : [];
    }),
  );
  return files.flat().sort();
}

const applicationFiles = await filesWithExtension(".next/server/app", ".html");
if (!applicationFiles.length) throw new Error("Build Next.js before generating CSP.");

const appRoutes = JSON.parse(await readFile(".next/app-path-routes-manifest.json", "utf8"));
const prerender = JSON.parse(await readFile(".next/prerender-manifest.json", "utf8"));
for (const [entry, route] of Object.entries(appRoutes)) {
  if (!entry.endsWith("/page")) continue;
  const page = prerender.routes[route];
  if (page?.compute !== "static" || page.initialRevalidateSeconds !== false) {
    throw new Error(`Hash-based CSP requires a fully static page: ${route}`);
  }
}

const scripts = new Set();
const styles = new Set();
const pages = {};
for (const file of applicationFiles) {
  const html = await readFile(file, "utf8");
  inlineHashes(html, "script").forEach((hash) => scripts.add(hash));
  inlineHashes(html, "style").forEach((hash) => styles.add(hash));
  const relativePath = path.relative(".next/server/app", file).split(path.sep).join("/");
  const route = relativePath === "index.html" ? "/" : "/" + relativePath.slice(0, -5);
  if (!route.startsWith("/_")) {
    pages[route] = { html, etag: `"${createHash("sha256").update(html).digest("hex")}"` };
  }
}

const policy = createPolicy({ scripts: [...scripts].sort(), styles: [...styles].sort() });
checkHeaderLength(policy);

const assetPolicies = [];
for (const file of await filesWithExtension("public", ".html")) {
  const html = await readFile(file, "utf8");
  const assetPath = "/" + path.relative("public", file).split(path.sep).join("/");
  const assetPolicy = createPolicy({
    scripts: inlineHashes(html, "script"),
    styles: inlineHashes(html, "style"),
    // The standalone character preview embeds its own SVG document.
    objects: assetPath === "/concepts/midnight-coder.html",
  });
  checkHeaderLength(assetPolicy);
  assetPolicies.push({ paths: [assetPath, assetPath.slice(0, -5)], policy: assetPolicy });
}

for (const file of await filesWithExtension("public", ".svg")) {
  const svg = await readFile(file, "utf8");
  const assetPath = "/" + path.relative("public", file).split(path.sep).join("/");
  const svgStyles = inlineHashes(svg, "style");
  const embedding = assetPath === "/concepts/midnight-coder.svg";
  if (!svgStyles.length && !embedding) continue;
  const svgPolicy = createPolicy({ styles: svgStyles, embedding });
  checkHeaderLength(svgPolicy);
  assetPolicies.push({
    paths: [assetPath],
    policy: svgPolicy,
    ...(embedding ? { frameOptions: "SAMEORIGIN" } : {}),
  });
}

// Unknown URLs can produce request-specific Next.js inline scripts. Serve the
// trusted build-time 404 document instead so its hashes remain deterministic.
const notFoundHtml = await readFile(".next/server/app/_not-found.html", "utf8");
await writeFile(".next/csp.json", JSON.stringify({ policy, assetPolicies, pages, notFoundHtml }) + "\n");
console.log(`Generated CSP for ${applicationFiles.length} application documents and ${assetPolicies.length} asset policies.`);
