import { Disclosure, Figure, PurposeLabel, Results } from '../report-components';
import CompressionVideos from '../CompressionVideos';
import styles from '../report.module.css';

export const reportId = 'report-2026-10-03';
const assets = '/update/d817cfe2/2026-09-15_2026-10-03';

export default function Update20261003() {
    return <article id={reportId} aria-labelledby={`${reportId}-heading`} className={styles.entry}>
        <header>
            <p className={styles.eyebrow}>Progress report 02</p>
            <h2 id={`${reportId}-heading`}><time dateTime="2026-09-15">2026-09-15</time> – <time dateTime="2026-10-03">2026-10-03</time></h2>
            <p className={styles.lead}>WAM experiments: OOD robustness and inference efficiency.</p>
            <dl className={styles.findings}>
                <div><dt>FastWAM: VGGT + CLIP</dt><dd>Geometry and semantic supervision gave <strong>+1 and +2 successes</strong> in separate 60-case camera-shift screens, but limited compute has led me to put further training on hold.</dd></div>
                <div><dt>GAM: strong camera robustness</dt><dd>GAM led my LIBERO visual-shift screen with <strong>60/60 successes, including 15/15 camera trials</strong>, making it my main direction for improving stability and speed.</dd></div>
                <div><dt>Profiling: deep decoder cost</dt><dd>GAM’s <strong>deep geometry decoder</strong> dominates the measured GPU work, motivating my first attempt to reduce its image tokens with CoMe without retraining.</dd></div>
                <div><dt>CoMe: speed–quality tradeoff</dt><dd>In this small pilot, lighter merging reduced measured call latency by about <strong>17%</strong> while visual-shift success fell from <strong>45/45 to 42/45</strong>, with heavier merging causing a larger quality loss.</dd></div>
            </dl>
        </header>

        <Disclosure id={`${reportId}-reading`} purpose="Getting insight" title="01 · Models & ideas" takeaway="This period: FastWAM supervision, broader comparisons, GAM profiling and token compression.">
            <p><strong>Research directions this period</strong></p>
            <ol>
                <li><a href={`#${reportId}-supervision`}>VGGT + CLIP in FastWAM</a>: test geometry and semantic supervision inspired by Spatial Forcing and ROCKET.</li>
                <li><a href={`#${reportId}-comparison`}>Broader OOD and latency comparisons</a>: include GAM, FastWAM, FasterWAM, CSWAM and DeltaWAM on their supported benchmarks.</li>
                <li><a href={`#${reportId}-profile`}>Detailed GAM profiling</a>: trace the cost of each stage and the operations inside deep DA3.</li>
                <li><a href={`#${reportId}-come`}>Faster GAM with CoMe</a>: test token merging without retraining GAM or the released confidence head.</li>
            </ol>
            <p><strong>Models and methods</strong></p>
            <ul className={styles.reading}>
                <li><strong><a href="https://arxiv.org/abs/2606.17046">GAM (Geometric Action Model)</a>:</strong> I chose the DA3-based policy to explore whether a shared geometry backbone can provide camera robustness with lower inference cost.</li>
                <li><strong><a href="https://arxiv.org/abs/2603.16666">FastWAM (Fast-WAM)</a>:</strong> I use it as the baseline for efficient action prediction without generating future video at inference.</li>
                <li><strong><a href="https://arxiv.org/abs/2608.04404">FasterWAM (Faster-WAM)</a>:</strong> I chose it to test whether conditioning on future features improves robustness enough to justify its computation.</li>
                <li><strong><a href="https://arxiv.org/abs/2609.18462">CSWAM</a>:</strong> I included its causal semantic representations and visual history to compare another approach to generalization under visual shifts.</li>
                <li><strong><a href="https://arxiv.org/abs/2609.28811">DeltaWAM</a>:</strong> I chose the bimanual manipulation release to test whether compact frame changes and cached context reduce computation while retaining task success.</li>
                <li><strong><a href="https://arxiv.org/abs/2511.14751">CoMe</a>:</strong> I adapted its confidence-guided token merging as a way to reduce GAM’s deep-decoder computation without retraining.</li>
                <li><strong><a href="https://arxiv.org/abs/2510.12276">Spatial Forcing</a>:</strong> it teaches a VLA geometry by aligning an intermediate visual representation with frozen VGGT features, motivating geometry supervision inside FastWAM.</li>
                <li><strong><a href="https://arxiv.org/abs/2602.17951">ROCKET</a>:</strong> it extends geometry alignment across multiple layers through a shared projector with nested widths, which I adapted to FastWAM and combined with CLIP supervision.</li>
            </ul>
        </Disclosure>

        <Disclosure id={`${reportId}-supervision`} purpose="Testing a hypothesis" title="02 · VGGT + CLIP supervision in FastWAM" takeaway="Small measured gains from geometry and semantic supervision; further training is on hold with limited compute.">
            <p><strong>EXP-026:</strong> borrowing Spatial Forcing’s geometry alignment and ROCKET’s shared multilayer supervision, I aligned three late FastWAM video layers with frozen VGGT-Ω features through a shared training head, alongside depth and CLIP targets.</p>
            <Results caption="EXP-026 · Paired camera-shift success · Each change is relative to its own control" headings={['FastWAM variant', 'Camera', 'Change', 'Clean']} rows={[
                ['Action/video control', '45/60', '—', '8/10'],
                ['Depth + CLIP', '46/60', '+1 success', '8/10'],
                ['Multilayer geometry features', '44/60', '−1 success', '9/10'],
                ['Reweighted features', '45/60', 'No change', '8/10'],
            ]} />
            <p><strong>EXP-027:</strong> I ported ROCKET’s released shared projector and nested widths to ten FastWAM video layers, using original VGGT features and broader LoRA updates; I then added a CLIP target at the final supervised layer to teach visual semantics alongside geometry.</p>
            <Results caption="EXP-027 · Paired camera-shift success · Separate control and training setup" headings={['FastWAM variant', 'Camera', 'Change', 'Clean']} rows={[
                ['Action/video control', '44/60', '—', '10/10'],
                ['ROCKET geometry', '42/60', '−2 successes', '9/10'],
                ['ROCKET geometry + CLIP', '46/60', '+2 successes', '10/10'],
            ]} />
            <p><strong>These modifications do show small measured improvements</strong> in the depth + CLIP and ROCKET + CLIP variants, though the gains are not consistent: ROCKET + CLIP adds <strong>3.33 percentage points</strong>, with a 95% interval of <strong>[−6.67, +16.67]</strong> that includes zero.</p>
            <p><strong>With limited compute available, I am temporarily pausing this direction</strong> and focusing on GAM’s stability and inference efficiency; testing these encouraging but small gains more reliably would require additional training seeds and evaluation.</p>
            <p className={styles.note}>Both experiments retain FastWAM’s action/video training losses and remove teachers and training heads at deployment. Each arm ran 2,000 updates on 414 training episodes, with one seed and ten familiar task goals; these are FastWAM adaptations, not reproductions of the papers’ full results. EXP-026 and EXP-027 use different setups, so compare each variant only with its own control.</p>
        </Disclosure>

        <Disclosure id={`${reportId}-comparison`} purpose="Comparing" title="03 · Robustness & latency comparison" takeaway="GAM handles the tested camera shifts well; runtime optimizations also matter.">
            <p><strong>LIBERO preparation:</strong> I selected three bowl-to-plate tasks, with the bowl starting at the table center, between the plate and ramekin, or inside the top drawer. Each uses five saved initial states under the original scene and official LIBERO-Plus camera, background and lighting shifts at difficulty 2—<strong>60 episodes per model</strong>, fixed before evaluation with a shared 400-step budget.</p>
            <Results caption="EXP-036 · LIBERO / LIBERO-Plus · 3 tasks × 5 states per condition · GPU, eager" headings={['Model', 'Clean', 'Camera', 'Background', 'Light', 'Call median']} rows={[
                ['GAM', '15/15', '15/15', '15/15', '15/15', '73.4 ms'],
                ['FastWAM', '15/15', '4/15', '11/15', '15/15', '156.2 ms'],
                ['FasterWAM', '15/15', '11/15', '10/15', '15/15', '135.2 ms'],
            ]} />
            <p>GAM’s camera stability repeats the earlier result (<strong>77/80</strong> on new camera cases, EXP-022), supporting it as a base for my work without isolating geometry as the cause.</p>
            <p><strong>RoboTwin preparation:</strong> I used five tasks covered by DeltaWAM’s released checkpoint: adjusting a bottle, hammering a block, ranking blocks by size, pressing an alarm clock and ringing a bell. For each task, I fixed five seeds that the scripted expert could solve in both clean and randomized scenes before testing the policies—<strong>50 episodes per model</strong>, using the same robot, simulator and task-specific step limits.</p>
            <Results caption="EXP-036 · RoboTwin · 5 tasks × 5 seeds per condition · GPU, eager" headings={['Model', 'Clean', 'Randomized', 'Replan median / p95']} rows={[
                ['FastWAM', '25/25', '24/25', '145.3 / 151.9 ms'],
                ['FasterWAM', '25/25', '24/25', '124.9 / 130.6 ms'],
                ['CSWAM', '22/25', '14/25', '202.8 / 209.2 ms'],
                ['DeltaWAM', '19/25', '22/25', '135.5 / 171.2 ms'],
            ]} />
            <p>CSWAM and DeltaWAM offered less of an efficiency advantage than I expected: CSWAM was slower here, while DeltaWAM beat FastWAM per replan but not FasterWAM and had a wider latency tail. In a separate controlled-shift screen (EXP-037), camera changes caused extra failures; background and lighting matched the clean references.</p>
            <p className={styles.note}>380 episodes; zero runtime errors. These are descriptive pilots: GAM uses a different native simulator version, adapter parity remains pending, and strict OOD exposure is unverified except for the documented clean CSWAM policy on randomized RoboTwin. GAM has no verified RoboTwin policy here; CSWAM/DeltaWAM have no verified LIBERO policies. Timings exclude simulation, include first calls, and use native action chunks/cadences; RoboTwin replans include IPC. They are not deployment throughput or one five-model ranking.</p>
            <Disclosure title="Compilation changes the speed comparison">
                <p><strong>FastWAM’s released path includes compilation</strong>, with its optimized reference measuring <strong>88.5 ms</strong> on 12 saved inputs; in the same check, compiling FasterWAM reduced its median from <strong>134.6 to 82.9 ms</strong> (60 calls per arm, EXP-034).</p>
                <p className={styles.note}>This explains why code settings belong beside architecture comparisons. The optimized reference and the eager rollout table use different timing protocols; their difference is not a paired FastWAM speedup estimate. FasterWAM passed approximate action agreement, but compiled closed-loop quality is still untested.</p>
            </Disclosure>

        </Disclosure>

        <Disclosure id={`${reportId}-profile`} purpose="Getting insight" title="04 · GAM’s computation cost" takeaway="Most measured GPU work sits in the deep decoder, especially its dense projections.">
            <p>GAM uses DA3 (Depth Anything 3) as its geometry backbone, split around a future predictor into three stages:</p>
            <ol>
                <li><strong>Shallow DA3 — encode the scene.</strong> Blocks 0–12 turn the current main and wrist images into geometric features.</li>
                <li><strong>Future predictor — predict what comes next.</strong> A causal transformer predicts future visual features using the observed features, language and robot state.</li>
                <li><strong>Deep DA3 — turn future features into actions.</strong> Blocks 13–39 process predicted features alongside action tokens, alternating within-view and across-view attention; a small head then outputs an eight-action chunk.</li>
            </ol>
            <Figure src={`${assets}/gam-components.png`} alt="GAM component costs: deep geometric decoder dominates exclusive GPU kernel time and counted forward FLOPs, followed by the shallow encoder and future predictor" width={2210} height={680}>
                Archived component profile: mean cost across three saved task inputs (tasks 0, 3 and 7), RTX 5090, eager execution. Left: exclusive GPU kernel time per action chunk; right: counted computation in GFLOPs. Kernel time is not wall latency, and FLOP counts omit unregistered operations.
            </Figure>
            <p>The deep decoder accounts for <strong>78.5% of traced GPU time (41.72 ms)</strong>, making it the main target for reducing computation.</p>
            <Figure src={`${assets}/gam-deep-da3.png`} alt="Stacked operator costs for each deep DA3 block from 13 to 39: feed-forward projections dominate, followed by attention projections, with smaller attention mixing and normalization costs" width={1189} height={390}>
                Saved output from notebook 04, <strong>GAM: detailed quick inference profiling</strong>, cell 9. Each bar is one deep DA3 block; colors separate exclusive operator-attributed GPU time for one instrumented input in run gam-quick-detail-ubuntu-v1. This is a separate diagnostic from the three-input chart above.
            </Figure>
            <p>Across the 27 deep blocks, <strong>feed-forward projections take 24.56 ms</strong> and <strong>attention projections take 11.32 ms</strong>, compared with <strong>2.56 ms for attention mixing</strong>. Most work therefore scales with the number of tokens processed by these dense layers.</p>
            <Disclosure title="Token compression: a simple cost estimate">
                <p>With hidden widths fixed, feed-forward and attention-projection computation grows roughly with token count <strong>N</strong>, while attention mixing grows with <strong>N²</strong>.</p>
                <ol>
                    <li><strong>Start with 516 tokens:</strong> two views × (256 image patches + 1 camera token + 1 action token).</li>
                    <li><strong>Merge 25% of 2×2 groups:</strong> each view has 64 groups; merging 16 groups from four tokens to one saves 16 × 3 = 48 tokens, leaving 2 × (208 + 2) = <strong>420 tokens</strong>.</li>
                    <li><strong>Estimated arithmetic savings:</strong> 1 − 420/516 ≈ <strong>18.6%</strong> for projections and feed-forward layers; 1 − (420/516)² ≈ <strong>33.7%</strong> for attention mixing, with the same reduction ratio for within-view attention.</li>
                </ol>
                <p>Applying those ratios to the first chart’s counted deep-stage work gives <strong>(525.9 + 263.0) × 0.814 + 33.5 × 0.814² ≈ 664 GFLOPs</strong>, down from <strong>822 GFLOPs</strong> per chunk—about <strong>19% less counted decoder computation</strong>.</p>
                <p className={styles.note}>This estimates arithmetic, not measured latency. Shallow DA3 and the future predictor stay dense, confidence scoring and merging add overhead, and GPU efficiency can change with token shape; closed-loop success must also be checked.</p>
            </Disclosure>
            <p className={styles.note}>The archived runs use FP32 deep projections and BF16 shallow/predictor projections. Notebook 04 preserved actions exactly, but profiling increased the same input’s wall time from 64.36 to 275.23 ms; its bars are kernel costs, not wall-latency shares. Fresh EXP-038 independently found deep propagation to be the largest median stage span (49.5 ms), with a 72.2 ms uninstrumented call median across five repeats of one input. These remain diagnostic measurements.</p>
        </Disclosure>

        <Disclosure id={`${reportId}-come`} purpose="Testing a hypothesis" title="05 · GAM + CoMe: speed–quality tradeoff" takeaway="Merging reduces measured latency but loses task success.">
            <p>I used CoMe’s block-8 confidence scores to merge low-confidence <strong>2×2 patch groups</strong> before GAM’s deep blocks 13–39, keeping action and camera tokens separate; merging 25% or 50% of groups removes <strong>18.75% or 37.5% of patch tokens</strong>.</p>
            <Results caption="EXP-045 · Fresh paired evaluation · 60 episodes per policy, no retraining" headings={['Policy', 'Clean', 'Camera', 'Background', 'Light', 'Replay call']} rows={[
                ['GAM', '15/15', '15/15', '15/15', '15/15', '72.3 ms'],
                ['CoMe · 25% groups', '13/15', '14/15', '13/15', '15/15', '59.9 ms'],
                ['CoMe · 50% groups', '14/15', '12/15', '11/15', '13/15', '56.8 ms'],
            ]} />
            <p><strong>Visual-shift success falls from 100% to 93.3% and 80%</strong>, with lighter merging losing 3 of 45 shifted cases and heavier merging losing 9; clean performance also drops, so the extra speed does not preserve the robustness that made GAM attractive.</p>
            <p className={styles.note}>Timing: median of 48 input/round medians, 16 baseline-trajectory inputs from one task × 3 fresh rounds × 100 calls; RTX 5090, eager, including merge overhead, excluding video capture. Disabled-adapter and diagnostic parity passed; maximum baseline drift was 5.94%. Quality covers three related tasks, one policy seed, zero errors; condition-level paired intervals are wide and include zero. These are observed regressions, not a precise estimate of general OOD loss.</p>
            <CompressionVideos />
            <p><strong>Working hypothesis:</strong> confidence about geometry may not identify what matters for an action. I also transfer current-image confidence to predicted future patches by spatial position; that assumption may break as objects move.</p>
            <p className={styles.note}>An earlier, separate BF16 pilot (EXP-032) supports checking the selector: CoMe-50 achieved 10/16 versus 14/16 for count-matched random merging. It uses a different implementation and protocol, so I do not pool it with EXP-045.</p>
        </Disclosure>

        <section className={styles.nextSteps} aria-labelledby={`${reportId}-next`}>
            <PurposeLabel purpose="Planning" />
            <h3 id={`${reportId}-next`}>Next: preserve useful detail, spend less compute</h3>
            <ol>
                <li><strong>Protect action-relevant regions.</strong> Test whether preserving gripper, object and contact patches improves on confidence-only and random merging at the same token budget.</li>
                <li><strong>Adapt compression to the situation.</strong> Keep more tokens near contact or when views change; test whether current-to-future confidence remains reliable.</li>
                <li><strong>Separate runtime gains from information loss.</strong> Check precision and compilation before combining them with merging. Measure paired camera-shift success and full-call latency on new cases.</li>
            </ol>
        </section>
        <p className={styles.sources}>Evidence: EXP-022/026/027, EXP-034/036–038, archived component profiling, EXP-032 and EXP-045. <a href={`${assets}/evidence.json`}>Source paths, settings, counts and video provenance</a>. Earlier reports below retain their original conclusions.</p>
    </article>;
}
