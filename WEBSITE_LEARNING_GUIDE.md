# marvinjb.dev — Website Learning Guide

This guide explains how the portfolio is structured, how a browser request becomes a rendered page, where each part of the site lives, which dependencies are active, and how the GitHub-to-Hostinger deployment works.

## 1. The project in one sentence

`marvinjb.dev` is a React 19 portfolio built with the Next.js App Router programming model, compiled by Vinext and Vite, and deployed to Hostinger as a standalone Node.js server.

The production path is:

```text
Edit locally → Test → Vinext build → GitHub main → Hostinger → marvinjb.dev
```

## 2. High-level architecture

```text
Browser
   │
   ▼
Hostinger proxy and CDN
   │
   ▼
server.js
   │ imports the generated standalone server
   ▼
dist/standalone/server.js
   │
   ▼
Vinext production server
   │
   ├── renders React Server Components
   ├── serves browser JavaScript and CSS
   └── serves files from public/
```

Important distinction:

- This is **not a static Vite site**.
- The application runs as a persistent **Node.js server**.
- `npm run build` creates the production bundle.
- `server.js` starts that generated bundle on Hostinger.

## 3. Important folders and files

```text
marvinjb.dev/
├── app/
│   ├── layout.tsx          Global HTML shell and SEO metadata
│   ├── page.tsx            Homepage content and section structure
│   ├── globals.css         Complete visual design and responsive styling
│   ├── MobileNav.tsx       Interactive mobile menu
│   └── chatgpt-auth.ts     Optional, currently unused auth helpers
├── public/
│   ├── marvin-portrait.jpg Portrait displayed on the site
│   ├── og.png              Social-sharing preview image
│   └── favicon.svg         Browser icon
├── tests/
│   └── rendered-html.test.mjs  Production-render tests
├── db/
│   ├── index.ts            Optional Cloudflare D1 connection helper
│   └── schema.ts           Empty optional database schema
├── examples/d1/            Example database code; not active in the portfolio
├── worker/index.ts         Cloudflare/Sites worker adapter; not Hostinger's entry
├── server.js               Hostinger's production entry file
├── next.config.ts          Enables standalone Node output
├── vite.config.ts          Configures Vinext, Vite, and optional Sites tooling
├── package.json            Scripts, dependencies, and Node version
├── tsconfig.json           TypeScript compiler rules
├── postcss.config.mjs      Tailwind/PostCSS integration
├── .openai/hosting.json    Legacy Sites capability declaration; no active DB/R2
└── .gitignore              Files Git must not publish
```

Generated folders such as `dist/`, `node_modules/`, `.next/`, and `.wrangler/` are intentionally ignored by Git. Hostinger recreates the production build from source during every deployment.

## 4. The homepage: `app/page.tsx`

This file defines the visible content and semantic structure of the homepage.

### Data near the top

Three arrays hold repeated card content:

- `skills`: skill labels, names, and descriptions.
- `projects`: placeholder project cards, descriptions, and technology labels.
- `posts`: planned blog posts and summaries.

React uses `.map()` to turn each array item into an `<article>`. This avoids manually repeating identical markup.

Example pattern:

```tsx
{skills.map(([label, title, description]) => (
  <article key={title}>...</article>
))}
```

### Page structure

The homepage is organized in this order:

1. Sticky top navigation
2. Fixed desktop sidebar
3. Personal introduction
4. “What would you like to know about me?” map
5. Profile and skills
6. Selected projects
7. Notes and blog
8. Contact section
9. Footer

The section IDs power the anchor links:

| ID | Destination |
|---|---|
| `#map` | Personal introduction and page map |
| `#skills` | Profile and capabilities |
| `#projects` | Project cards |
| `#blog` | Notes and planned posts |
| `#resume` | Résumé placeholder |
| `#contact` | Email call to action |

### Server component behavior

`app/page.tsx` does not contain `"use client"`, so it is a React Server Component. Vinext renders its initial HTML on the server. This improves first-load performance and means most of the page needs no browser-side JavaScript.

## 5. The mobile menu: `app/MobileNav.tsx`

The mobile menu needs browser interaction, so it begins with:

```tsx
"use client";
```

It uses React's `useState` hook:

```tsx
const [open, setOpen] = useState(false);
```

- `open === false`: only the Menu button appears.
- Clicking the button calls `setOpen(true)`.
- React renders the mobile navigation.
- Selecting an internal link closes it again.

This is currently the main client-side interactive feature. The rest of the homepage is mostly server-rendered HTML and CSS.

## 6. Layout and metadata: `app/layout.tsx`

The root layout wraps every route in the shared `<html>` and `<body>` structure.

It is responsible for:

- Loading Geist and Geist Mono fonts.
- Importing `globals.css` once for the whole application.
- Setting the page title and description.
- Setting the canonical URL to `https://marvinjb.dev`.
- Creating Open Graph metadata for LinkedIn, messaging apps, and other previews.
- Creating X/Twitter card metadata.
- Using `public/og.png` as the social preview image.

`generateMetadata()` reads the incoming host and protocol so it can create absolute image URLs in local development and production.

## 7. Styling: `app/globals.css`

The visual identity lives in one global stylesheet.

### Design tokens

The `:root` variables define reusable colors and layout measurements:

```css
:root {
  --bg: #f8f8f6;
  --ink: #171817;
  --muted: #676965;
  --line: #d9dad6;
  --accent: #e85d2f;
  --lime: #d8ff5f;
  --side: 280px;
}
```

Changing a variable updates every rule that references it.

### Major styling areas

- `.topbar` and `.topnav`: sticky header and navigation.
- `.sidebar`: fixed AI Hero-inspired exploration panel.
- `.page-content`: main content offset by the sidebar width.
- `.personal-intro`: photo, greeting, professional description, and biography.
- `.question-map`: four first-person navigation choices.
- `.info-card`: shared skill, project, and post card structure.
- `.contact-section`: dark contact call to action.
- `.mobile-menu`: small-screen navigation.

### Technical grid

The construction-paper grid is CSS-generated. Multiple `radial-gradient()` backgrounds produce:

- horizontal dotted guides;
- vertical dotted guides;
- stronger major intersections.

No image is downloaded for the grid.

Pseudo-elements such as `::before` and `::after` create the measurement rulers, ticks, crosshair, and lime drafting hatches without adding decorative markup to `page.tsx`.

### Responsive design

The primary breakpoints are:

- `900px`: narrows the sidebar and hides some desktop links.
- `700px`: removes the fixed sidebar, enables the mobile menu, stacks layouts, and reduces grid spacing.

When editing desktop styles, always inspect the matching mobile override near the bottom of the stylesheet.

## 8. Static assets: `public/`

Files in `public/` are served from the website root.

Examples:

```text
public/marvin-portrait.jpg → https://marvinjb.dev/marvin-portrait.jpg
public/og.png              → https://marvinjb.dev/og.png
public/favicon.svg         → https://marvinjb.dev/favicon.svg
```

In React markup, these are referenced with root-relative paths:

```tsx
<img src="/marvin-portrait.jpg" alt="Portrait of Marvin" />
```

## 9. Vinext, Vite, and React

These technologies have different jobs:

### React

React defines components and renders the interface. `page.tsx`, `layout.tsx`, and `MobileNav.tsx` are React files.

### Next.js programming model

The project follows Next.js conventions such as:

- the `app/` directory;
- layouts and pages;
- server and client components;
- `next/font`;
- `next/headers`;
- metadata APIs.

### Vinext

Vinext implements the Next.js App Router model on Vite. Its commands are:

```text
vinext dev
vinext build
```

### Vite

Vite performs transformation, bundling, development reloads, and multi-environment builds for the browser, React Server Components, and server-side rendering.

## 10. Production server and Hostinger

`next.config.ts` contains:

```ts
const nextConfig = {
  output: "standalone",
};
```

This tells Vinext to generate a self-contained Node application at:

```text
dist/standalone/server.js
```

The tracked root `server.js` imports that generated server:

```js
import "./dist/standalone/server.js";
```

Hostinger starts the root file, and the root file starts the compiled Vinext application.

### Required Hostinger settings

| Setting | Value |
|---|---|
| Framework | Other |
| Node version | 22.x |
| Branch | `main` |
| Root directory | `/` or `./` |
| Package manager | npm |
| Build command | `npm run build` |
| Output directory | blank |
| Entry file | `server.js` |
| Environment variables | none currently required |

Hostinger supplies the `PORT` environment variable. The generated Vinext server reads it and binds to `0.0.0.0` so Hostinger's proxy can reach it.

## 11. `package.json` scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server with live reload |
| `npm run build` | Create the production Vinext bundle |
| `npm start` | Start production through `server.js` |
| `npm test` | Build, then test the rendered production HTML |
| `npm run lint` | Check source-code quality rules |
| `npm run db:generate` | Generate optional Drizzle database migrations |

For normal website work, use:

```bash
npm run dev
npm test
```

`npm test` already runs the complete production build before running the tests.

## 12. Active dependencies

### Runtime dependencies

| Package | Role |
|---|---|
| `react` | Component model and rendering |
| `react-dom` | Connects React to HTML and the browser |
| `drizzle-orm` | Optional database ORM; not used by the current homepage |

### Important development/build dependencies

| Package | Role |
|---|---|
| `vinext` | Next.js-compatible application runtime and compiler |
| `vite` | Development server and build system |
| `typescript` | Static type checking for `.ts` and `.tsx` files |
| `@vitejs/plugin-react` | React support inside Vite |
| `@vitejs/plugin-rsc` | React Server Component support |
| `tailwindcss` | CSS tooling; imported but the design mainly uses custom CSS |
| `@tailwindcss/postcss` | Processes Tailwind through PostCSS |
| `eslint` | Source-code linting |
| `wrangler` | Cloudflare development/build tooling inherited from the starter |
| `@cloudflare/vite-plugin` | Cloudflare-compatible build environments |
| `@openai/sites-vite-plugin` | Sites compatibility inherited from the original starter |
| `drizzle-kit` | Optional database migration generation |

Dependencies under `devDependencies` are still required during Hostinger's build. Do not deploy with `npm ci --omit=dev`.

## 13. Tests: `tests/rendered-html.test.mjs`

The test imports the generated production worker from `dist/server/index.js`, sends it an HTTP request, and checks the returned HTML.

It verifies that production contains:

- the correct title;
- the personal greeting;
- the SQL Server introduction;
- first-person section headings;
- contact email;
- LinkedIn URL;
- required section IDs;
- portrait asset;
- no leftover starter preview.

These are rendering tests, not screenshot tests. They confirm that critical content exists but do not judge visual spacing or color.

## 14. Optional starter features that are not currently active

The repository began from a more general full-stack starter. Some files remain available but do not power the public portfolio today.

### Database

- `db/index.ts`
- `db/schema.ts`
- `drizzle.config.ts`
- `examples/d1/`

`.openai/hosting.json` currently declares both `d1` and `r2` as `null`, so no database or object-storage binding is active.

### ChatGPT authentication

`app/chatgpt-auth.ts` contains safe helper functions for optional ChatGPT identity headers. No current page imports these helpers, so visitors do not sign in.

### Cloudflare worker

`worker/index.ts` supports the original Sites/Cloudflare build path and image optimization. Hostinger starts `server.js`, not `worker/index.ts`.

Do not delete optional starter files casually. First confirm they are not needed by the build configuration or a future feature.

## 15. How to make common changes

### Change biography text

Edit the `.personal-intro` content in `app/page.tsx`.

### Add a real project

Replace an item in the `projects` array at the top of `app/page.tsx`. Add a real URL field when the card should link to a repository, demo, or case-study route.

### Add a blog post

The current posts are display-only placeholders. A real blog will need route files such as:

```text
app/blog/page.tsx
app/blog/[slug]/page.tsx
```

### Add the résumé

1. Put the PDF at `public/resume.pdf`.
2. Replace `#resume` placeholder URLs with `/resume.pdf`.
3. Add `target="_blank"` if it should open in a new tab.

### Change colors

Edit the variables in `:root` near the top of `app/globals.css` instead of searching for every individual color.

### Change sidebar width

Update `--side`. Both `.sidebar` and `.page-content` use that variable, so they remain aligned.

## 16. Safe learning workflow

Use this loop when practicing:

1. Create or use a non-production branch.
2. Run `npm run dev`.
3. Make one small change.
4. Inspect desktop and mobile behavior.
5. Run `npm test`.
6. Read the error before making another change.
7. Commit with a message that describes the outcome.
8. Merge or push to `main` only when production-ready.

Example branch:

```bash
git switch -c codex/learn-project-cards
```

Useful Git commands:

```bash
git status
git diff
git log --oneline -10
```

Avoid editing generated files in `dist/`. They will be replaced by the next build. Always edit the source under `app/`, `public/`, or the project configuration files.

## 17. Deployment checklist

Before publishing:

- [ ] Review the changed text and links.
- [ ] Check desktop layout.
- [ ] Check mobile layout.
- [ ] Run `npm test`.
- [ ] Confirm the build creates `dist/standalone/server.js`.
- [ ] Commit with a clear message.
- [ ] Push to GitHub `main`.
- [ ] Confirm Hostinger deploys the same commit.
- [ ] Flush Hostinger CDN only when stale content remains.
- [ ] Verify `https://marvinjb.dev/`.

## 18. Recommended next learning exercises

1. Move the `skills`, `projects`, and `posts` arrays into a separate `app/content.ts` file.
2. Add TypeScript types for each content record.
3. Turn project cards into real links.
4. Add `public/resume.pdf` and replace résumé placeholders.
5. Create the first real blog detail route.
6. Add an automated test for every external profile link.
7. Run an accessibility review for heading order, keyboard focus, and color contrast.

These exercises move from low risk to higher complexity while teaching component boundaries, data modeling, routing, testing, and deployment.
