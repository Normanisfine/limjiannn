# Hero sculpture assets

Supplied by the user in `reconstruct_green/dancer.png` and `reconstruct_green/arm.png`. The brief describes both as AI-generated decorative rasters from the design conversation. They are not photographs of projects, open-source 3D models, or rigged assets. The supplied face-free form, dress, pose, and material are retained without retouching. Source PNGs remain available.

WebP derivatives are produced with `node scripts/prepare-assets.mjs` using Sharp, quality 82 and alpha quality 100. No upscaling. Slight white/yellow fringe is present in the source; conversion preserves it. This is least noticeable on ivory and remains more visible against forest green. No generated robot artwork is used as evidence of the SO-ARM101 project.

Measured source anchors: dancer fingertip approximately (1220, 120) / (1254, 1254), normalized (0.973, 0.096); robot upper gripper tip approximately (87, 207) / (1237, 1271), normalized (0.070, 0.163). Layout wrappers map each anchor to the shared stage contact point. Animation wrappers separately translate/rotate the entire image. Desktop gap 14 CSS px; mobile/tablet gap 8 px (7 px at 320).

The responsive-concept.png mentioned in the brief was not supplied. Implementation follows FRONTEND_BRIEF.md and the two actual PNGs.
