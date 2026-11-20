# Mahlet Wondwosen Portfolio

A modern, animated portfolio built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content

Everything on the page comes from `lib/data.ts`: profile, skills, projects, experience, education and certifications. Change the text there and the site updates.

To show real project screenshots, put images in `public/projects/` and set `image: "/projects/name.png"` on a project in `lib/data.ts`. Add `url` for a live link. Until then, each project shows a styled UI sketch.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New Project** and import the repository. Vercel detects Next.js, so no settings need changing.
3. Add the environment variable `NEXT_PUBLIC_SITE_URL` with your final address (for example `https://mahlet.dev`). It is used for the social sharing preview.
4. Click **Deploy**. Add a custom domain later under **Settings > Domains**.

## Add your photo

Save a vertical portrait as `public/images/mahlet.jpg`. Until then the hero shows an "MW" monogram. Project screenshots can be added the same way: put the file in `public/images/` and set `image: "/images/name.png"` on the project in `lib/data.ts`.

## What is included

- A purple hero with slowly drifting line-mesh waves, large name, pill buttons and a live Addis Ababa clock
- Motion: opening counter curtain, masked headline reveals, waves that follow the pointer, magnetic buttons, a tool marquee, count-up numbers, tilting spotlight cards and a timeline that fills as you scroll (all respect reduced motion)
- A bento-grid About section, and an editorial heading-rail layout for the other sections
- A toolkit index, a card grid of the six banking products, and a scroll-aware navigation
- A thesis section with animated results, pipeline, charts and ceremony time limits (from the COIF paper)
- Experience and education written as plain, readable rows
- Light theme by default with a dark toggle, and a Ctrl/Cmd+K menu
- Contact section with copy buttons and a form that opens the visitor's email app
- Generated social preview image, favicon, metadata and reduced-motion support

## Notes

- The light theme is the default. Visitors can switch to dark with the Dark button in the header.
- Colors are defined once in `app/globals.css`. Change `--accent`, `--gold` and `--bad` to re-theme the whole site. Fonts are Young Serif, Schibsted Grotesk and Noto Serif Ethiopic, loaded in `app/layout.tsx`.
- The contact form uses `mailto:` so it needs no backend. To send messages directly, add a Next.js route handler with an email service.
