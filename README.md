# Sanhith Amarathunge — Portfolio

**Curiosity. Code. Possibility.**

My personal portfolio as a Computer Science student at Ontario Tech University, bringing together software projects, enterprise analytics experience, and community work. The site uses a charcoal-and-lavender sci-fi theme, with an original animated character, Midnight Coder, at its centre.

[Visit the portfolio](https://sanhithamarathunge.net) · [LinkedIn](https://www.linkedin.com/in/sanhith-amarathunge) · [Email](mailto:sanhith.amarathunge@gmail.com)

![Portfolio branding featuring Midnight Coder and the Curiosity. Code. Possibility. tagline](public/branding/social-preview.png)

## What to explore

- **Experience:** analytics at Scotiabank, technical leadership with Google Developer Group at Ontario Tech, infrastructure delivery at Kochasoft, and earlier legal administration work.
- **Projects:** Aurora, a wellness app built with Flutter, Dart, and Firebase; and MindMetrics-ML, a quality-of-life prediction pipeline built with Python, PyTorch, and Streamlit.
- **Skills in context:** Data & ML, Apps, Cloud, and Delivery categories connect tools to examples of my work.
- **Education and contact:** my Computer Science degree timeline, plus direct email and LinkedIn actions on the homepage.

This repository contains the portfolio website and its presentation of those projects; it does not contain the Aurora app or MindMetrics-ML pipeline source code.

## Site features

- A typed hero headline followed by Midnight Coder's one-time flare and character entrance, with glasses and eye effects.
- A subtle twinkling star field, local SVG logos, and illustrated project cards.
- A desktop reticle cursor with rotating corners, hover feedback, and click effects; touch devices retain their native behavior.
- A sticky homepage section tracker, clickable career statistics, and links that open the relevant experience or project dossier.
- Independent expandable panels, section-wide Expand all / Collapse all controls, and brief border and bullet-marker animations.
- Responsive navigation with an animated mobile hamburger menu. Home returns to the top of the page.
- Matching favicon, Apple touch icon, and a shared social preview with page-specific metadata and canonical URLs.

The disclosures keep their content in the rendered HTML. Without JavaScript, native disclosures and section links remain usable, and all skill categories remain readable. Keyboard users get disclosure controls, skill tabs, and focused destinations after explicit jumps. Motion respects `prefers-reduced-motion`, and the custom cursor falls back to the native pointer in forced-colors mode.

### Current scope

The homepage and Projects page contain the main portfolio content. About and Contact have their visual layouts, but their detailed page copy is still being developed. Working email and LinkedIn links are available in the homepage contact banner.

## Built with

| Layer | Technology |
| --- | --- |
| Application | Next.js 16 App Router, React 19, TypeScript |
| Styling | Tailwind CSS 4, global CSS, and CSS Modules |
| Artwork and motion | Editable SVG, CSS animations, and browser animation APIs |
| Typography | Locally served Space Grotesk, JetBrains Mono, and Orbitron |
| Deployment configuration | Cloudflare Workers through OpenNext and Wrangler |
| Quality checks | ESLint, TypeScript, and GitHub Actions |

Portfolio content is shared between the homepage and Projects page. Server-rendered content is enhanced with focused client components for navigation, disclosures, tabs, and motion. The homepage uses the project dossier presentation; the separate Projects page retains its own disclosure presentation. No additional animation library is used.

## Run locally

Use **Node.js 22.13 or newer within the 22.x release line**, as specified in `package.json`, and npm. `.nvmrc` selects Node.js 22.

```sh
git clone https://github.com/xSanboyzx/sanhith-portfolio.git
cd sanhith-portfolio
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

The current site does not require environment variables. If configuration is added later, use `.env.local` for Next.js and `.dev.vars` for local Cloudflare development; examples are included. Both local files are ignored by Git. Only browser-safe values should use the `NEXT_PUBLIC_` prefix.

### Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run check` | Run ESLint and TypeScript checks |
| `npm run build` | Create a production Next.js build |
| `npm run start` | Serve the production build locally |
| `npm run assets:branding` | Regenerate favicon, Apple icon, and social preview assets |
| `npm run build:worker` | Build Next.js and adapt it for Cloudflare Workers |
| `npm run preview` | Build and preview the site in the local Workers runtime |
| `npm run deploy` | Build and deploy using an authenticated Cloudflare account |
| `npm run cf-typegen` | Regenerate types after changing Worker bindings |

## Find your way around the code

| Location | Responsibility |
| --- | --- |
| [`src/app/`](src/app/) | Home, About, Projects, and Contact routes; shared layout, icons, and global styles |
| [`src/lib/portfolio-content.ts`](src/lib/portfolio-content.ts) | Experience summaries, achievements, project details, tools, and skill-to-work mappings |
| [`src/components/portfolio-work.tsx`](src/components/portfolio-work.tsx) | Experience entries, project artwork and presentations, and education |
| [`src/components/homepage-exploration.tsx`](src/components/homepage-exploration.tsx) | Shared dossier state, animated native disclosures, fragment navigation, and focus handling |
| [`src/components/section-tracker.tsx`](src/components/section-tracker.tsx) | Sticky section links and passive scroll tracking |
| [`src/components/skill-explorer.tsx`](src/components/skill-explorer.tsx) | Selectable skill categories and supporting work links |
| [`src/components/site-shell.tsx`](src/components/site-shell.tsx) | Shared navbar, mobile menu, footer, and scroll reveals |
| [`src/components/home-hero.tsx`](src/components/home-hero.tsx) | Hero layout and headline-to-character entrance sequence |
| [`src/components/midnight-coder.tsx`](src/components/midnight-coder.tsx) | Homepage character SVG; animation styles live beside it |
| [`src/components/reticle-cursor.tsx`](src/components/reticle-cursor.tsx) | Mouse tracking, interaction feedback, and native cursor fallback |
| [`src/lib/site-metadata.ts`](src/lib/site-metadata.ts) | Domain, descriptions, canonical URLs, and Open Graph / Twitter metadata |
| [`public/`](public/) | Local logos, branding assets, and the standalone character concept preview |
| [`scripts/generate-brand-assets.mjs`](scripts/generate-brand-assets.mjs) | Editable branding export workflow |
| [`wrangler.jsonc`](wrangler.jsonc) and [`open-next.config.ts`](open-next.config.ts) | Cloudflare Worker and adapter configuration |

To update portfolio information, start with `portfolio-content.ts`. Keep dossier IDs stable: career statistics, skill examples, and shared URLs use those anchors. Explicit navigation updates the URL fragment and focuses its destination; passive scroll tracking leaves browser history unchanged. Open panels and the chosen skill category are preserved while exploring the homepage. A fresh load starts collapsed unless the URL targets a dossier.

### Branding and assets

The homepage character is an editable SVG component. The original standalone concept and preview are in [`public/concepts/`](public/concepts/). When changing the illustration, keep the branding source in sync as well.

The branding generator uses `public/concepts/midnight-coder.svg` and local fonts to export a static 1200×630 social card, an SVG favicon, a multi-size ICO, and an Apple touch icon. Edit the script for card wording, layout, or stars, then run:

```sh
npm run assets:branding
```

Commit the regenerated files together with their source changes. [`public/branding/social-preview.svg`](public/branding/social-preview.svg) retains editable vector artwork with outlined lettering. Fonts, logos, and finished branding assets are served locally; sharing previews do not require runtime image generation.

## Validation

Before shipping code changes, run:

```sh
npm run check
npm run build
```

For Cloudflare changes, also run `npm run preview` to verify the Workers runtime. GitHub Actions runs `npm run check` and `npm run build:worker` on pull requests and pushes to `main`.

Interaction checks are currently performed in the browser; this repository does not yet include an automated end-to-end test suite. Check the following when editing the homepage:

- Statistics and skill links open the correct file; deep-link refresh and Back/Forward work.
- Panels operate independently; Expand all, Collapse all, and rapid toggles stay responsive.
- Home returns to the top; section jumps and focused headings clear both sticky bars.
- Keyboard controls, visible focus, reduced motion, and JavaScript-disabled disclosures work.
- Mobile, zoomed, and wide layouts remain readable without horizontal overflow.
- The hero, cursor, mobile menu, and separate Projects page retain their behavior.

## Deployment

The repository is configured for Cloudflare Workers through OpenNext. `wrangler.jsonc` names the Worker `sanhith-portfolio` and serves the generated `.open-next` output. Keep its Worker name and self-reference service name aligned if renaming it.

For Cloudflare Workers Builds, connect this GitHub repository and use:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | Repository root |
| Node version | `22` |
| Build command | `npm run check && npm run build:worker` |
| Deploy command | `npx opennextjs-cloudflare deploy` |

For a local deployment:

```sh
npx wrangler login
npm run deploy
```

No database or R2 cache is configured. If the Workers toolchain encounters a Windows-specific build issue, use WSL or the Linux CI environment.

See the [Cloudflare OpenNext guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/) and [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) for provider setup.

## License and credits

The code is licensed under the [MIT License](LICENSE). Fonts and third-party icons retain their own licenses; organization logos identify experience and belong to their respective owners.

- [Local font sources and licenses](src/app/fonts/README.md)
- [Technology and language icon credits](public/icons/languages/README.md)
- [Organization and project logo sources](public/icons/portfolio/README.md)
