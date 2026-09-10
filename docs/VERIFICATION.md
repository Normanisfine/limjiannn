# Verification — green portfolio

## Latest content and layout update

The résumé links in About and Education were removed at the user’s request. The source PDF remains stored locally; it is no longer linked from the page.

Selected work now presents DanceNet3D, World Action Models and MRI Reconstruction as three equal columns on desktop and stacked entries below 900 px. All share the same category/title/description/note/link structure; the SO-ARM101 wording is removed from Selected work. Verified at 320, 390, 768, 1024 and 1440 px; screenshots are `screenshots/selected-layout-*.png`.

Per the user’s explicit confirmation, About now states that Mingjian is currently an MSE student in Computer and Information Science at UPenn. Education reads “Aug 2026 – Present”. Prior statements about retaining the original incoming status below refer to the initial redesign.

## Follow-up update

The name now fades in on the same timeline as the dancer and robot, including replay. Selected work uses a simple DanceNet3D title cover and a direct MRI label; the SO-ARM tile links to the new English World Action Model / 3D geometry research entry (September 2026–Present, with the supplied advisors and experimental details).

Build and lint pass. All 27 targeted update checks pass at 320, 390, 768 and 1440 px: synchronized animation, visible final heading, selected-work navigation, no overflow/errors, reduced motion, and no-JavaScript content. See `update-checks.json` and `screenshots/update-*.png`. Run `node scripts/capture.mjs --update-check` to repeat. The Lighthouse/performance measurements below belong to the earlier redesign baseline and were not rerun for this content/animation update.

## Original redesign verification

Verified locally September 10, 2026. Original source: `../limjiannn`; handoff: `../reconstruct_green/FRONTEND_BRIEF.md`. The original repository remains unchanged and nothing was deployed.

## Results

- `npm run build`: PASS, including TypeScript validation and static export of `/`, `/adv`, `/links`, `/nextgenphd`, and `/team7_ai_plan`.
- `npm run lint`: PASS, no warnings or errors.
- Browser integration checks: 38/38 PASS. See `interaction-checks.json`.
- Viewports: 320, 390, 768, 1024, 1440 CSS px, Chromium. No horizontal overflow or browser exceptions. Both hands visible with separate responsive contact coordinates.
- Preserved all 7 project entries, 4 internship entries, 17 courses, 20 Broadway photos, all section links and anchors; supplementary routes respond successfully. Original media files copied. Inventories are in `content-inventory.json`; the local content was also compared against the live homepage before implementation.
- Verified keyboard skip link, menu activation, expanded state, Escape and focus restoration; coursework disclosure; gallery next/previous and native lightbox; lazy video mount and offscreen pause; reduced motion; native navigation/coursework and 8 media fallback links without JavaScript.

## Performance

Lighthouse 13.4.1, installed Chrome on macOS, production static export served locally with gzip, standard Lighthouse simulated mobile throttling. Run timestamp: 2026-09-10T04:08:47.859Z.

| Measure | Final result |
| --- | --- |
| Performance / Accessibility / Best Practices / SEO | 96 / 100 / 100 / 100 |
| Largest Contentful Paint | 2.7 s |
| Cumulative Layout Shift | 0 |
| Total Blocking Time | 10 ms |

The Lighthouse LCP goal of ≤2.5 seconds is **not met** in this run; CLS ≤0.1 is met. See `lighthouse-mobile.report.html` and its JSON for the complete audit. Lighthouse scores vary by run and do not represent field measurements or an accessibility certification.

A separate browser run used a 390×844 viewport at DPR 2, 150 ms network latency, 1.6 Mbps download, 750 Kbps upload and 4× CPU slowdown. Observed LCP 0.932 s, CLS 0. The two-second idle sample recorded 0.000 ms script execution, 2.386 ms total task work, no active animations and no media requests. No persistent animation-frame loop is implemented. The longest observed task was 68 ms. Menu interactions completed in the test; no Event Timing entry above the observer threshold was recorded, so no field INP or exact input-latency claim is made. Raw results: `performance.json`.

## Actual hero asset sizes

| Long edge | Dancer bytes | Robot bytes | Combined bytes |
| --- | ---: | ---: | ---: |
| 480 | 19,782 | 17,200 | 36,982 |
| 640 | 28,750 | 24,592 | 53,342 |
| 960 | 52,714 | 43,482 | 96,196 |
| Original dimensions (1254 / 1271) | 75,624 | 60,702 | 136,326 |

The mobile DPR-2 test selected the 480 variants: **36,982 bytes encoded**, 37,582 bytes including resource-timing response overhead. The 1440px DPR-1 preview selected the 640 variants: **53,342 bytes encoded**. Both are below the handoff's mobile 250 KB / desktop 500 KB budgets. Even the largest two variants total 136,326 bytes. See `asset-sizes.json` and `responsive-checks.json`.

The mobile selected source bitmaps are 480×480 and 467×480; their calculated RGBA baseline is 1,818,240 bytes (~1.73 MiB). The 640 variants are 640×640 and 623×640, totaling 3,233,280 bytes (~3.08 MiB). These are pixel-count calculations, not measured process/GPU memory.

## Visual review and limitations

- `screenshots/1440-hero.png` and `screenshots/390-hero.png`: desktop/mobile opening composition.
- `screenshots/{320,390,768,1024,1440}.png`: complete responsive page references. Browser scrolling was used to activate lazy-loaded images before capture.
- `screenshots/desktop-*.png`, `mobile-menu.png`, `mobile-work.png`, `mobile-footer.png`: section and interaction details.
- `screenshots/asset-edge-review.png`: the WebP edges on ivory and forest. Slight white/yellow fringe exists in the supplied originals, more visible against dark green. No shape/material retouching was performed.
- The referenced responsive-concept.png was absent from the handoff; composition follows the written brief and actual PNGs.
- Robot project media was not supplied, so its selected-work tile uses project typography and the real description. The decorative AI robot is confined to the hero.
- Chromium emulation was tested, not physical iOS/Safari/Android devices. Background-tab cancellation is implemented but physical device/background lifecycle behavior was not comprehensively tested. External links were retained; individual third-party availability and Google Slides playback were not exhaustively checked.
- The supplementary technical-plan page retains its existing material and diagrams, with motion removed for readable static output.

## Reproduce

Run `npm ci`, `npm run build`, then `npm run preview` from this folder. Open http://localhost:3000. For development use `npm run dev`.

Optional local QA tools: `npm install --no-save --package-lock=false playwright lighthouse`. Use `node scripts/capture.mjs` for the browser checks. It expects installed macOS Google Chrome. The Lighthouse run used Node 24 and the command below:

```sh
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' /opt/homebrew/bin/node node_modules/lighthouse/cli/index.js http://127.0.0.1:3000 --output=json --output=html --output-path=docs/lighthouse-mobile --chrome-flags='--headless' --only-categories=performance,accessibility,best-practices,seo --quiet
```

The optional testing packages are not runtime requirements and were not added to the application dependency manifest. Font license notices are retained under `public/fonts/`; asset provenance and measured anchor coordinates are in `public/assets/hero/PROVENANCE.md`.

Latest layout and motion update: removed the Tools I work with section; Research uses open article layouts instead of nested boxes. Six dance clips play muted when visible and pause offscreen, respecting manual pause and reduced motion. Hero sculptures separate on downward scroll and close on upward scroll using independent transform wrappers. Build and lint pass; research-refresh-checks.json records 18 browser checks, and hero-scroll-checks.json records 27 checks at 320, 390 and 1440 px.

Selected Work now shares a sticky introduction scene with the hero. Scroll progress opens the sculptures, reveals the centered heading and project grid, and fades the hero details. Scrolling upward reverses the scene; reduced motion and no-JavaScript keep normal readable document flow. The latest production build and 21 coordinated-reveal checks pass (mobile/desktop progress, reverse scroll, overflow, project links, reduced motion and no-JavaScript). See work-reveal-checks.json; run node scripts/capture.mjs --work-reveal.
