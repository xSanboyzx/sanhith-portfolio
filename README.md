# Sanhith's portfolio

Next.js App Router, TypeScript, and Tailwind CSS, deployed to Cloudflare Workers through OpenNext. Uses npm and Node.js 22.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Edit `src/app/page.tsx` for the homepage, `src/app/layout.tsx` for shared layout and metadata, and `src/app/globals.css` for global styles. Imports can use the `@/` alias for `src/`.

No environment variables are needed initially. For future configuration, copy `.env.example` to `.env.local` and `.dev.vars.example` to `.dev.vars`. Keep credentials in these ignored files; only use `NEXT_PUBLIC_` for values that can be public.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Next.js development server |
| `npm run check` | ESLint and TypeScript checks |
| `npm run build` | Production Next.js build |
| `npm run assets:branding` | Regenerate the favicon, Apple icon, and social preview |
| `npm run start` | Run the Next.js build in Node.js |
| `npm run build:worker` | Build Next.js and adapt it for Workers |
| `npm run preview` | Build and preview in the local Workers runtime |
| `npm run deploy` | Build and deploy to your Cloudflare account |
| `npm run cf-typegen` | Generate types after changing Worker bindings |

## Branding assets

The favicon and Apple icon use Next.js file conventions in `src/app/`. All four routes share the static `public/branding/social-preview.png` with route-specific metadata in `src/lib/site-metadata.ts`.

Edit `scripts/generate-brand-assets.mjs` to change the card's wording, layout, stars, or icon. Run `npm run assets:branding` and commit the regenerated assets. The script uses the local licensed fonts in `src/app/fonts/` and the editable Midnight Coder illustration in `public/concepts/midnight-coder.svg`. It freezes the character's animation and updates its laptop to the current Orbitron lettering. The exported `public/branding/social-preview.svg` remains editable vector artwork, with outlined text for font-independent rendering.

Generation tools are development dependencies only. The site serves the finished assets locally; neither fonts nor images are generated or fetched externally when a link is shared.

## Cloudflare and GitHub

The Git remote is https://github.com/xSanboyzx/sanhith-portfolio. The GitHub Actions workflow in `.github/workflows/ci.yml` checks lint, types, and the Workers build on pull requests and pushes to `main` once these files are pushed.

To enable hosting and automatic deployments using Cloudflare Workers Builds:

1. Commit and push the setup files to GitHub.
2. In the Cloudflare dashboard, go to **Workers & Pages**, create a Worker, and import the GitHub repository. Authorize Cloudflare's GitHub integration for this repository when prompted.
3. Use these settings:

   | Setting | Value |
   | --- | --- |
   | Worker name | `sanhith-portfolio` |
   | Production branch | `main` |
   | Root directory | Repository root |
   | Build command | `npm run check && npm run build:worker` |
   | Deploy command | `npx opennextjs-cloudflare deploy` |
   | Non-production branch deploy command, if enabled | `npx opennextjs-cloudflare upload` |
   | Node version | Node.js 22 (also specified in `.nvmrc`) |

4. Deploy. Cloudflare supplies a `workers.dev` address; a custom domain can be added later in the Worker's settings.

The build command performs the checks before deploying independently of GitHub Actions. Workers Builds handles GitHub-triggered deployments; no Cloudflare API token needs to be stored in this repository.

Alternatively, deploy from your computer:

```sh
npx wrangler login
npm run deploy
```

Complete the browser login using your Cloudflare account. If you belong to multiple accounts, select the intended account during deployment.

## Implementation notes

- `wrangler.jsonc` defines the Worker, static assets, and self-reference binding. Keep both Worker names in that file identical if renaming it.
- OpenNext retains the standard Next.js build. Cloudflare's newer default is vinext; this project explicitly uses the documented OpenNext adapter to keep the requested Next.js runtime.
- R2 caching, a database, and image optimization bindings are not configured. Add these when the site needs them, including persistent caching before using ISR/revalidation.
- Run the Workers preview before shipping features that use runtime APIs or Cloudflare bindings. A successful Next.js dev server alone does not verify Workers compatibility.
- OpenNext warns that Windows support is limited. If a future build fails on Windows, use WSL or the Linux CI/build environment.
- ESLint 9 is retained because the React lint plugins bundled with this Next.js release do not yet support ESLint 10.

References: [Cloudflare OpenNext guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/), [OpenNext setup](https://opennext.js.org/cloudflare/get-started), and [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).
