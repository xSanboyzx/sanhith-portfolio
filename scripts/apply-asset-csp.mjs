import { readFile, writeFile } from "node:fs/promises";
import { checkHeaderLength, createPolicy } from "./csp-policy.mjs";

const { assetPolicies } = JSON.parse(await readFile(".next/csp.json", "utf8"));
const baseline = (await readFile("public/_headers", "utf8")).replace(/\r\n?/g, "\n");
const defaultPolicy = createPolicy();
checkHeaderLength(defaultPolicy);
if (!/^\/\*\n/m.test(baseline)) throw new Error("Missing baseline asset header rule.");
// Duplicate path blocks replace earlier blocks in Cloudflare's parser.
const assetHeaders = baseline.replace(/^\/\*\n/m, `/*\n  Content-Security-Policy: ${defaultPolicy}\n`);
const rules = [];

for (const { paths, policy, frameOptions } of assetPolicies) {
  for (const assetPath of paths) {
    const headers = ["  ! Content-Security-Policy", `  Content-Security-Policy: ${policy}`];
    if (frameOptions) headers.push("  ! X-Frame-Options", `  X-Frame-Options: ${frameOptions}`);
    rules.push([assetPath, ...headers].join("\n"));
  }
}

await writeFile(".open-next/assets/_headers", assetHeaders.trimEnd() + "\n\n" + rules.join("\n\n") + "\n");
console.log("Applied CSP to Cloudflare asset headers.");
