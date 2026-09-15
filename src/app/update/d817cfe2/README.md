# WAM + 3D research updates

Comments are currently disabled. `comments-config.ts` hides them on the website, and the Supabase `COMMENTS_ENABLED=false` secret blocks the live endpoint. Preserve the components and database for later use.

- `page.tsx`: page header, metadata, blueprint, and update list.
- `ResearchBlueprint.tsx`: the current research direction and summary.
- `updates/YYYY-MM-DD_YYYY-MM-DD.tsx`: one component per reporting period.
- `updates/index.ts`: update imports and display order, **newest first**.
- `report-components.tsx`: shared `Disclosure`, `Results`, and `Figure` components.
- `ReportFigure.tsx` / `figure-viewer.module.css`: full-size figures open in an in-page dialog with actual-size zoom, a Back to report button, Escape/backdrop closing, and restored keyboard focus. The ordinary image link remains a same-tab fallback without JavaScript.
- `FastWAMStructure.tsx` / `model-structure.module.css`: compact text explaining that LoRA and two new prediction heads train together, which models stay frozen, and what remains when acting. It also identifies the feature/target paths and combined loss. Pass a report-specific `id` and revise the explanation if the experiment changes.
- `report.module.css`: shared report styling.
- `CommentThread.tsx` / `comments.module.css`: guest comments with one Name / role input, linked replies, and stable comment permalinks.

## Add an update

1. Create a component in `updates/` named with its actual date range. Use the existing update as the template.
2. Give it a unique component name and exported `reportId`, such as `report-2026-09-28`. Derive heading IDs from that ID so reports can appear together without duplicate anchors.
3. Put its figures under `public/update/d817cfe2/YYYY-MM-DD_YYYY-MM-DD/`. Pass each full asset URL to `Figure` using its `src` prop.
4. Import the component and its ID in `updates/index.ts`, then add the entry at the **beginning** of `updates`. The page and “Latest report” link use this list automatically.
5. Update `ResearchBlueprint.tsx` if the findings change the big picture. Keep older report components intact.
6. Register `d817cfe2:<reportId>` in Supabase's `report_comment_threads` table. `page.tsx` adds the report's comment component automatically. See [comment setup](../../../../supabase/README.md) for the SQL and one-time deployment instructions. Keep old IDs unchanged to preserve their discussions.

Run the production build and lint the route after editing. No changes to `page.tsx` are needed to add another report.

## Reading layout

- Show the key findings and next steps without opening anything. Include the main uncertainty alongside the conclusion; do not force a fixed number of findings.
- Put papers and model names first among the expandable report sections, before experiment details. Use one short entry per paper with a linked model name, its meaning, and its relevance to my experiments. Introduce aliases such as GAM (DA3) / DA3-GAM and distinguish them from VGGT-GAM. Keep extra terminology and reading scope in an optional disclosure, experiment-specific details beside the experiments, and future reading under next steps.
- Group the report into question-led `Disclosure` sections. Main sections include a one-line takeaway; nested questions use just the title. The VGGT + CLIP and GAM subsections intentionally omit purpose labels and small summary lines.
- Give main sections a `purpose` label: `Reproducing results`, `Comparing`, `Testing a hypothesis`, `Getting insight`, `Methods`, `Checking limits`, or `Planning`. Labels describe intent, not whether the outcome was positive. Use `PurposeLabel` for sections without a disclosure.
- Reserve `Reproducing results` for work aimed at reproducing a published result under its protocol. The current released-model OOD screens use `Comparing` because their sampling and shared budgets differ from the published protocols.
- Put methods, full scores, figures, and caveats inside those sections; use at most one nested disclosure level.
- Cut repeated wording, not evidence. Retain denominators, units, uncertainty intervals, scope limits, sources, and negative results.
- Native disclosures work without JavaScript. Readers open individual sections as needed; omit the page subtitle and bulk reading toolbar.

The blueprint is a compact, collapsed blue-gray reference panel above the reports. Write its content as a short first-person narrative in plain language, not a list: motivation, questions about representation and imagination, then goals for spatial understanding, generalization, and speed. Keep its visual treatment separate from the green dated-report header. Report findings stay visible before any evidence disclosures so returning readers can skip the blueprint.
