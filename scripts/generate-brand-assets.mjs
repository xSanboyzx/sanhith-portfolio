import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import * as fontkit from "fontkit";
import postcss from "postcss";
import sharp from "sharp";
import wawoff2 from "wawoff2";

const root = fileURLToPath(new URL("../", import.meta.url));
const appDirectory = join(root, "src/app");
const brandingDirectory = join(root, "public/branding");
const fontsDirectory = join(appDirectory, "fonts");
const colors = {
  background: "#09090d",
  purple: "#b78aff",
  lavender: "#dcc8ff",
};

async function loadFont(filename) {
  const source = await readFile(join(fontsDirectory, filename));
  // Decode WOFF2 before selecting a variable weight in Fontkit.
  const buffer = filename.endsWith(".woff2")
    ? Buffer.from(await wawoff2.decompress(source))
    : source;
  return fontkit.create(buffer);
}

// The decoder reuses its WASM memory, so load and copy fonts sequentially.
const orbitronSource = await loadFont("orbitron-variable.ttf");
const spaceGroteskSource = await loadFont("space-grotesk-latin.woff2");
const monoSource = await loadFont("jetbrains-mono-latin.woff2");
const orbitron = orbitronSource.getVariation({ wght: 800 });
const laptopFont = orbitronSource.getVariation({ wght: 700 });
const headingFont = spaceGroteskSource.getVariation({ wght: 700 });
const bodyFont = spaceGroteskSource.getVariation({ wght: 500 });
const monoFont = monoSource.getVariation({ wght: 400 });

function escapeXml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    }[character];
  });
}

// Outlined glyphs keep the SVGs portable and require no font requests.
function outlineText(font, value, { size, x, y, fill, spacing = 0 }) {
  const { glyphs, positions } = font.layout(value);
  const scale = size / font.unitsPerEm;
  let cursor = 0;
  const paths = glyphs.map((glyph, index) => {
    const position = positions[index];
    const path = `<path transform="translate(${cursor + position.xOffset * scale} ${-position.yOffset * scale}) scale(${scale} ${-scale})" d="${glyph.path.toSVG()}" />`;
    cursor += position.xAdvance * scale + spacing;
    return path;
  });

  return `<g aria-label="${escapeXml(value)}" fill="${fill}" transform="translate(${x} ${y})">
    ${paths.join("\n    ")}
  </g>`;
}

function centeredMark(font, size, centerX, centerY) {
  const { glyphs, positions } = font.layout("S.");
  const scale = size / font.unitsPerEm;
  const left = glyphs[0].bbox.minX * scale;
  const right = (positions[0].xAdvance + glyphs[1].bbox.maxX) * scale;
  const height = glyphs[0].bbox.maxY * scale;
  return outlineText(font, "S.", {
    size,
    x: centerX - (left + right) / 2,
    y: centerY + height / 2,
    fill: colors.purple,
  });
}

const iconArtwork = `<rect width="128" height="128" rx="26" fill="${colors.background}" />
  ${centeredMark(orbitron, 92, 64, 64)}`;
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" role="img" aria-labelledby="title">
  <title id="title">Sanhith — S.</title>
  ${iconArtwork}
</svg>
`;

async function staticCoderArtwork() {
  const source = await readFile(
    join(root, "public/concepts/midnight-coder.svg"),
    "utf8",
  );
  const cssMatch = source.match(/<style>([\s\S]*?)<\/style>/);
  if (!cssMatch) throw new Error("Midnight Coder's source styles are missing.");

  const css = postcss.parse(cssMatch[1]);
  css.walkAtRules((rule) => rule.remove());
  css.walkDecls((declaration) => {
    if (/^(animation|transition|stroke-dash)/.test(declaration.prop)) {
      declaration.remove();
    }
  });
  css.walkRules((rule) => {
    if (rule.selector.includes(":hover") || rule.nodes.length === 0) {
      rule.remove();
    } else {
      rule.selectors = rule.selectors.map((selector) => `#midnight-coder ${selector}`);
    }
  });

  let artwork = source
    .replace(/<svg[\s\S]*?>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<title[\s\S]*?<\/desc>/, "")
    .replace(cssMatch[0], `<style>${css.toString()}</style>`)
    .replace(/\s*<ellipse cx="265" cy="284"[^>]*\/>/, "")
    .replace(/<!-- A transparent, contained flare[\s\S]*$/, "")
    .replace('d="M126 450 L386 450"', 'd="M126 450 L374 450"');

  const oldMark = /<g\s+class="line"\s+stroke="#dcc8ff"\s+stroke-width="4"\s+filter="url\(#mark-glow\)"\s+transform="rotate\(-4 300 352\)"\s*>[\s\S]*?<\/g>/;
  if (!oldMark.test(artwork)) {
    throw new Error("Midnight Coder's laptop mark has changed; update its export.");
  }

  const markRun = laptopFont.layout("S.");
  const markWidth = markRun.positions.reduce((width, position) => {
    return width + position.xAdvance * (34 / laptopFont.unitsPerEm) + 2;
  }, 0);
  const laptopMark = outlineText(laptopFont, "S.", {
    size: 34,
    x: 300 - markWidth / 2,
    y: 365,
    fill: colors.lavender,
    spacing: 2,
  });
  artwork = artwork.replace(
    oldMark,
    `<g filter="url(#mark-glow)" transform="rotate(-4 300 352)">${laptopMark}</g>`,
  );

  return `<svg id="midnight-coder" x="662" y="-24" width="640" height="640" viewBox="0 0 512 512" overflow="visible">
    ${artwork.trim()}
  </svg>`;
}

function starsArtwork() {
  const stars = [
    [87, 163, 1.2], [250, 67, 1], [447, 115, 1.4], [598, 73, 1],
    [673, 164, 1.5], [756, 64, 1], [1069, 79, 1.2], [1140, 180, 1],
    [1096, 269, 1.5], [1144, 401, 1], [687, 385, 1.2], [743, 477, 1],
    [670, 551, 1.4], [859, 565, 1], [1107, 557, 1.2], [466, 534, 1],
    [523, 468, 1.4], [191, 455, 1], [86, 590, 1.2], [345, 582, 1],
  ];
  const points = stars.map(([x, y, radius]) => {
    return `<circle cx="${x}" cy="${y}" r="${radius}" opacity=".35" />`;
  });
  const sparks = [[574, 183], [1114, 343], [711, 297]];
  const crosses = sparks.map(([x, y]) => {
    return `<path d="M${x - 4} ${y} H${x + 4} M${x} ${y - 4} V${y + 4}" stroke="${colors.purple}" stroke-width="1" opacity=".32" />`;
  });
  return `<g id="stars" fill="${colors.purple}">${points.join("\n")}${crosses.join("\n")}</g>`;
}

async function socialArtwork() {
  const text = (font, value, size, x, y, fill, spacing) => {
    return outlineText(font, value, { size, x, y, fill, spacing });
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="card-title card-description">
  <title id="card-title">Sanhith Amarathunge — Curiosity. Code. Possibility.</title>
  <desc id="card-description">A black and lavender portfolio card with Sanhith's name on the left and Midnight Coder, a curly-haired character with a glowing violet eye behind a laptop, on the right. sanhithamarathunge.net</desc>
  <defs>
    <radialGradient id="card-glow">
      <stop stop-color="${colors.purple}" stop-opacity=".12" />
      <stop offset="1" stop-color="${colors.purple}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${colors.background}" />
  <ellipse cx="952" cy="303" rx="365" ry="313" fill="url(#card-glow)" />
  ${starsArtwork()}
  <g id="brand-mark" transform="translate(64 64) scale(.34375)">${iconArtwork}</g>
  <g id="eyebrow">${text(monoFont, "SOFTWARE / DATA / CURIOSITY", 13, 128, 92, colors.lavender, 1.1)}</g>
  <g id="name">
    ${text(headingFont, "Sanhith", 82, 64, 250, "#f4edff")}
    ${text(headingFont, "Amarathunge", 72, 64, 334, "#f4edff")}
  </g>
  <g id="tagline">${text(bodyFont, "Curiosity. Code. Possibility.", 30, 67, 406, colors.purple)}</g>
  <path d="M67 491 H115" stroke="${colors.purple}" stroke-width="2" stroke-linecap="round" />
  <g id="domain">${text(monoFont, "sanhithamarathunge.net", 17, 67, 535, colors.lavender)}</g>
  ${await staticCoderArtwork()}
</svg>
`;
}

function icoFromPngs(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry[0] = size;
    entry[1] = size;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map(({ png }) => png)]);
}

await mkdir(brandingDirectory, { recursive: true });
await writeFile(join(appDirectory, "icon.svg"), iconSvg);

const iconBuffer = Buffer.from(iconSvg);
const faviconImages = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    png: await sharp(iconBuffer).resize(size, size).png().toBuffer(),
  })),
);
await writeFile(join(appDirectory, "favicon.ico"), icoFromPngs(faviconImages));
await sharp(iconBuffer)
  .resize(180, 180)
  .flatten({ background: colors.background })
  .png()
  .toFile(join(appDirectory, "apple-icon.png"));

const socialSvg = await socialArtwork();
await writeFile(join(brandingDirectory, "social-preview.svg"), socialSvg);
const socialPng = await sharp(Buffer.from(socialSvg))
  .removeAlpha()
  .png({ compressionLevel: 9 })
  .toBuffer();
if (socialPng.length >= 1_000_000) {
  throw new Error("The social preview must stay below 1 MB.");
}
await writeFile(join(brandingDirectory, "social-preview.png"), socialPng);
console.log(`Brand assets generated. Social preview: ${Math.ceil(socialPng.length / 1024)} KB.`);
