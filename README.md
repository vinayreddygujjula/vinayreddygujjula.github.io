# Vinay Reddy: The Engineer's Control Room

Personal portfolio for Vinay Reddy, Java Full Stack Developer. Built with Next.js (App Router), TypeScript,
Tailwind CSS v4, Motion for React and Lucide icons. Diagrams are hand-built SVG and CSS. There's no 3D and no
canvas, and the only background animation is a static grid.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm start          # serve the production build
```

Node 18.18+ works. Node 20+ is recommended. Tailwind is pinned to 4.1.x because 4.2+ needs Node 20.
After upgrading Node you can move to `tailwindcss@latest` and Next.js 16.

## Design concept

**The Engineer's Control Room** is an engineering-drawing language set in a dark editorial layout:

- **Sheet and plates.** A static 96px drawing grid sits behind everything. Diagrams sit on "plates" with
  registration marks at their corners and `Fig. 01`-style captions.
- **Two voices.** Archivo, with its width axis expanded, carries the headlines. JetBrains Mono carries the margin
  annotations, indexes and technical labels.
- **Color with meaning.** Green `#9DFF73` means interaction or current state. Blue `#72A7FF` is informational.
  Each employer gets an environment hue that tints its explorer.
- **Motion with a job.** Connectors light up along a request path, dashed lines flow only on async hops, and
  sections reveal once. All Motion animations respect `prefers-reduced-motion`.

## Structure

```
src/
  content/                 ← all copy lives here (typed)
    profile.ts             name, intro, links, resume path, homepage request-flow diagram
    systems.ts             employers: contributions, metrics (with context), diagrams, lenses
    stack.ts               the six stack layers and where each tool was used
    projects.ts            case studies (null fields render as "To be provided")
    journey.ts             career chapters and technology threads
    types.ts               the types for everything above
  app/
    page.tsx               home: Hero → Systems → Stack → Work → Journey → Contact
    overview/              Quick Overview: plain, printable, under a minute to scan
    systems/[slug]/        full case study per employer
    work/[slug]/           eight-part project pages
    opengraph-image.tsx    generated OG image
    sitemap.ts, robots.ts, icon.svg, not-found.tsx
  components/
    SystemFlow.tsx         homepage signature diagram (Client → Gateway → Services → Kafka → DB)
    SystemsExplorer.tsx    employer environments, lenses, reading view
    ArchitectureMap.tsx    generic SVG architecture renderer (nodes on a grid, orthogonal routing)
    StackLayers.tsx        layered stack with the security band cutting across
    Journey.tsx            to-scale role timeline with technology threads
    Nav.tsx                top bar, desktop index rail, mobile bottom bar
```

Components only read from `src/content`. To change wording, edit the data files and leave the JSX alone.

## Content accuracy

Everything is sourced from `VinayReddy_Resume.docx` (the "Terry" version). Rules the content follows:

- Percentages always appear with the scope the resume gives them (see `Metric.context`).
- Architecture diagrams are labelled as generalized and illustrative, never as an employer's real system.
- The stack section separates tools tied to a role from tools that only appear in the skills list.
- Unknown project details are `null` and render as visible "To be provided" blocks. They're never invented.

## What still needs your input

| Item | Where | Notes |
| --- | --- | --- |
| Education | `profile.ts → education` | Not on the resume. The Overview shows it once added |
| Personal projects | `projects.ts` (`kind: 'personal'`) | The Work section has an empty slot reserved |
| Project details | `projects.ts → problem / decisions / challenges` | See each project's `needs` list |
| Screenshots / sanitized diagrams | `/public` + project pages | Only if your employer allows it |
| Resume PDF | `public/` + `profile.ts → resumeUrl` | Downloads are hidden for now because the original PDF includes your phone number. Add a phone-free PDF to `public/` and set `resumeUrl` to turn them back on |

## Deploy (GitHub Pages)

The site is a static export (`output: 'export'` in `next.config.ts`). `.github/workflows/deploy.yml` builds it
and publishes `out/` to GitHub Pages on every push to `main`.

- Live URL: https://vinayreddygujjula.github.io (repo `vinayreddygujjula.github.io`)
- One-time setup: go to repo **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**
- To update the site, commit and push to `main`. The Actions tab shows each deploy.

To preview the exported site locally, run `npm run build`, then `npx serve out`.

Because it's a static export, there's no server: no API routes, no runtime image optimization. The Open Graph
image is a static PNG at `src/app/opengraph-image.png`. If you change your name or tagline, regenerate it. The
original generator is kept locally in `private/opengraph-image.tsx.bak`, which isn't committed.

## Legacy

The previous Vite version is kept in `legacy-vite/` for reference. You can delete it at any time. It's excluded
from the TypeScript build.
