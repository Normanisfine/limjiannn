# Mingjian Li — green portfolio

A separate Next.js redesign of `../limjiannn`, following `../reconstruct_green/FRONTEND_BRIEF.md`. The original folder and live website are unchanged.

## Preview

```sh
cd /Users/limingjian/portfolio/portfolio_green
npm run dev
```

For the verified production export:

```sh
npm run build
npm run preview
```

Open http://localhost:3000. `npm start` also serves the static export. The local server supports clean routes, video range requests, and gzip for text assets. For a fresh checkout, run `npm ci` first. The original Next.js 16.1.6 / React 19.2.3 stack is retained.

## What changed

- Ivory, forest green, sage and pale yellow palette; locally hosted Geist and Outfit fonts with SIL OFL licenses.
- Oversized name, separate mobile sculpture stage, pixel-anchored near-touch composition, one-time entrance and scroll-linked separation (down to separate, up to close). Reduced motion and background-tab cancellation are supported.
- Selected DanceNet3D, robot-learning and MRI work; full About, Education, Internship, Research, Publications, Projects, Broadway and Contact content.
- All 7 projects, 4 internships, 17 courses, 20 Broadway photos, existing local media and original section URLs retained. The four supplementary routes are preserved.
- Workshop award context and exact citation retained, including equal contribution. Degree status and dates are unchanged from source.
- Native expandable navigation/coursework, visible keyboard focus, manual gallery controls and native dialog with Escape/focus restoration.
- Dance clips load and play muted when visible, with looping and native controls; manual pauses persist. Demo videos load after activation. All videos pause offscreen, and no-JavaScript links remain available. No particle scene or scroll hijacking.
- Responsive transparent WebP hero assets, optimized thumbnails, video posters, stable image dimensions and static export.

## Files and evidence

- `src/app/globals.css`: responsive visual system.
- `src/components/sections/`: redesigned sections.
- `src/components/layout/Navbar.tsx`: responsive navigation.
- `src/components/ui/MediaPlayer.tsx`: lazy media activation.
- `public/assets/hero/`: supplied originals, derivatives and provenance.
- `public/fonts/`: self-hosted font files and licenses.
- `scripts/prepare-assets.mjs`: regenerate optimized images (uses Sharp installed with Next).
- `scripts/preview.mjs`: static preview server.
- `scripts/capture.mjs`: reproducible browser verification and screenshots.
- `docs/VERIFICATION.md`: results, measurements and limitations.
- `docs/screenshots/`: screenshots at 320, 390, 768, 1024 and 1440 px, plus section/menu/footer and edge inspection images.

Optional QA tools were installed locally without changing application dependencies. To reproduce browser QA, install `playwright` and `lighthouse` with `npm install --no-save --package-lock=false playwright lighthouse`; `node scripts/capture.mjs` uses local Chrome on macOS. Lighthouse 13 requires Node 22.19+ (the recorded run used Node 24). These tools are not needed to build or preview the site.

The handoff did not include its referenced responsive-concept screenshot. The supplied dancer and arm images were used unchanged apart from resizing/encoding; minor source fringing is documented in `public/assets/hero/PROVENANCE.md`. No deployment was performed.
