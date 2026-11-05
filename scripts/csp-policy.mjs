import { createHash } from "node:crypto";

export function inlineHashes(html, tagName) {
  const hashes = new Set();
  const pattern = new RegExp(
    `<${tagName}\\b([^>]*)>([\\s\\S]*?)<\\/${tagName}\\s*>`,
    "gi",
  );

  for (const [, attributes, content] of html.matchAll(pattern)) {
    if (tagName === "script" && /\bsrc\s*=/i.test(attributes)) continue;
    // The HTML parser normalizes line endings before checking CSP hashes.
    const normalized = content.replace(/\r\n?/g, "\n");
    const digest = createHash("sha256").update(normalized).digest("base64");
    hashes.add(`'sha256-${digest}'`);
  }

  return [...hashes].sort();
}

export function createPolicy({
  scripts = [],
  styles = [],
  objects = false,
  embedding = false,
  media = false,
} = {}) {
  return [
    "default-src 'none'",
    `script-src 'self'${scripts.length ? ` ${scripts.join(" ")}` : ""}`,
    "script-src-attr 'none'",
    "style-src 'self'",
    `style-src-elem 'self'${styles.length ? ` ${styles.join(" ")}` : ""}`,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    `media-src '${media ? "self" : "none"}'`,
    `object-src '${objects ? "self" : "none"}'`,
    // Browsers also check frame-src for documents embedded through <object>.
    `frame-src '${objects ? "self" : "none"}'`,
    `frame-ancestors '${embedding ? "self" : "none"}'`,
    "base-uri 'none'",
    "form-action 'none'",
  ].join("; ");
}

export function checkHeaderLength(policy) {
  if (Buffer.byteLength(`  Content-Security-Policy: ${policy}`) > 2000) {
    throw new Error("CSP exceeds Cloudflare's 2,000-byte asset header line limit.");
  }
}
