import { Disclosure, Figure, PurposeLabel, Results } from '../report-components';
import FastWAMStructure from '../FastWAMStructure';
import styles from '../report.module.css';

export const reportId = 'report-2026-09-14';
const assets = '/update/d817cfe2/2026-09-08_2026-09-14';

export default function Update20260914() {
    return (
        <article id={reportId} aria-labelledby={`${reportId}-heading`} className={styles.entry}>
            <header>
                <p className={styles.eyebrow}>Progress report 01</p>
                <h2 id={`${reportId}-heading`}><time dateTime="2026-09-08">2026-09-08</time> - <time dateTime="2026-09-14">2026-09-14</time></h2>
                <p className={styles.lead}>Experiments comparing existing models and testing whether 3D supervision improves WAM generalization.</p>
                <dl className={styles.findings}>
                    <div><dt>VGGT + FastWAM: early test</dt><dd>I found better depth prediction (<strong>depth loss ↓15.4%</strong>) with VGGT + CLIP supervision, but task success outside LoRA training stayed around <strong>20%</strong>.</dd></div>
                    <div><dt>Geometric Action Model (GAM): better OOD results, lower latency</dt><dd>Plus success: <strong>GAM 85.0% vs FastWAM 68.6%</strong>. Median policy-call latency on matched Spatial/Object cases: <strong>38.6 vs 87.4 ms</strong>. Camera gains repeat; geometry is not isolated as the cause.</dd></div>
                </dl>
            </header>

            <Disclosure id={`${reportId}-reading`} purpose="Getting insight" title="01 · Papers & model names" takeaway="Key models and how they guide my experiments.">
                <p className={styles.note}>WAM = world-action model: a robot policy that learns about the world alongside predicting actions.</p>
                <ul className={styles.reading}>
                    <li><strong><a href="https://arxiv.org/abs/2603.16666">FastWAM (Fast-WAM)</a>:</strong> my baseline, trained with video prediction but acting without generating future video. It lets me test 3D supervision without adding work at inference.</li>
                    <li><strong><a href="https://arxiv.org/abs/2608.04404">FasterWAM (Faster-WAM)</a>:</strong> predicts future features once and reuses them while choosing actions. I include it to compare the value and cost of this imagination.</li>
                    <li><strong><a href="https://arxiv.org/abs/2606.17046">GAM (Geometric Action Model)</a>:</strong> uses one geometry network for perception, future features, and actions. Its official release uses <a href="https://arxiv.org/abs/2511.10647">DA3 (Depth Anything 3)</a>, an image-to-geometry model; <strong>GAM (DA3) and DA3-GAM mean this same policy.</strong></li>
                    <li><strong><a href="https://arxiv.org/abs/2503.11651">VGGT (Visual Geometry Grounded Transformer)</a>:</strong> predicts geometry from images. I use <a href="https://arxiv.org/abs/2605.15195">VGGT-Ω (Omega)</a> as a frozen depth teacher for FastWAM; <strong>VGGT-GAM</strong> instead replaces DA3 in a separate GAM policy.</li>
                    <li><strong><a href="https://arxiv.org/abs/2608.24714">GaussianWAM</a>:</strong> trains WAMs with geometry and visual meaning from 3D Gaussian fields, then removes teachers and extra heads for deployment. It motivates my first test with direct VGGT + CLIP supervision.</li>
                </ul>
                <Disclosure title="Other terms & reading scope">
                    <dl className={styles.termGuide}>
                        <div><dt><a href="https://arxiv.org/abs/2106.09685">LoRA</a></dt><dd>Low-Rank Adaptation: small trainable weight updates, here applied to FastWAM.</dd></div>
                        <div><dt><a href="https://arxiv.org/abs/2103.00020">CLIP</a></dt><dd>Contrastive Language–Image Pre-training: supplies visual-meaning targets for my training.</dd></div>
                        <div><dt>Backbone</dt><dd>A model&apos;s main feature-processing network.</dd></div>
                        <div><dt>OOD</dt><dd>Out-of-distribution: conditions that differ from policy training.</dd></div>
                        <div><dt>LIBERO / Plus / PRO</dt><dd>Robot-task benchmarks: standard tasks / visual and other shifts / position and task changes.</dd></div>
                        <div><dt>p50</dt><dd>Median latency: half the measured calls take this long or less.</dd></div>
                    </dl>
                    <p className={styles.note}>Reading scope: FastWAM is ongoing; FasterWAM, GAM, and GaussianWAM reviews focus on the protocol, architecture/source, and method respectively. VGGT papers are geometry background references.</p>
                </Disclosure>
            </Disclosure>

            <Disclosure id={`${reportId}-lora`} purpose="Testing a hypothesis" title="02 · Can VGGT supervision improve FastWAM?" takeaway="The adapter changes actions; a reliable success gain is still missing.">
                <p><strong>Why I started here:</strong> <a href="https://arxiv.org/html/2608.24714v1#S4.SS3">GaussianWAM reports</a> that direct VGGT + CLIP supervision improves LIBERO-Plus success from <strong>52.05% to 69.37%</strong>, with Gaussian-based supervision reaching <strong>71.29%</strong>. This motivated my early test of VGGT + CLIP supervision on FastWAM, before adding Gaussian-based supervision.</p>
                <p><strong>Work:</strong> I trained FastWAM with low-rank adaptation (LoRA), using offline VGGT-Ω depth and CLIP visual targets. I built and checked the pipeline, expanded the data, and tested adapter capacity, supervision location, a fresh seed, and the separate effects of depth and CLIP (EXP-016–020).</p>
                <Disclosure title="How do VGGT, CLIP, and LoRA fit together?">
                    <FastWAMStructure id={`${reportId}-architecture`} />
                    <ul>
                        <li><strong>LoRA placement:</strong> rank 8 updates to attention&apos;s query, key, value, and output projections in the final four blocks of both experts. 1.31M trainable policy parameters; 2,000 updates per arm.</li>
                        <li><strong>Data:</strong> 414 LIBERO-Spatial episodes / 1,656 windows; 20 episodes / 80 windows held out from LoRA updates, not certified unseen by the base model.</li>
                        <li><strong>Control:</strong> ordinary LoRA fine-tuning versus matched auxiliary supervision. Both adapt released Optional-IDM weights with ordinary FastWAM losses and first-frame inference—a shared objective mismatch.</li>
                        <li><strong>Scope:</strong> this small-adapter test does not reproduce GaussianWAM&apos;s Gaussian field or full training recipe. My VGGT-GAM code review motivated testing supervision where actions read visual features.</li>
                    </ul>
                    <Figure src={`${assets}/vggt-targets.png`} alt="Teacher-target preparation for agent and wrist cameras: RGB, VGGT depth, confidence, white used and black skipped loss-mask cells, and relative-depth targets with excluded cells in gray" width={2116} height={899}>
                        <strong>Teacher targets, not FastWAM predictions.</strong> Top: agent camera; bottom: wrist camera. Left to right: RGB → VGGT depth → confidence (brighter = higher) → loss mask (<strong>white = used, black = skipped</strong>) → 7×7 relative-depth target (gray = skipped). The mask selects reliable cells for training. Depth is not in meters. EXP-016 validation episode 4, frame 0, visualized in EXP-018; this mask applied to both losses. EXP-020 masks only depth and uses all CLIP patches.
                    </Figure>
                </Disclosure>
                <Disclosure title="Did more data, larger adapters, or earlier supervision help?">
                    <p>Each comparison is <strong>FastWAM + LoRA alone</strong> versus <strong>the same setup with VGGT + CLIP supervision</strong>. Counts show successful robot trials / total trials.</p>

                    <div className={styles.experimentChecks}>
                        <section>
                            <h4>More data: better depth, no clear task gain</h4>
                            <p>After expanding training to 414 episodes (EXP-016), extra supervision reduced depth error by <strong>15.4%</strong> (0.26750 → 0.22625). Success on 87 other tasks was <strong>35/174 for LoRA alone vs 34/174 with VGGT + CLIP</strong>, about 20% either way.</p>
                        </section>
                        <section>
                            <h4>Larger adapters: mixed results</h4>
                            <p>I tried adapting more layers and increasing rank, which makes each adapter larger (EXP-017).</p>
                            <Results caption="Camera trials · Same cases within each comparison" headings={['LoRA setup', 'LoRA alone', '+ VGGT / CLIP']} rows={[
                                ['Default: rank 8, last 4 blocks', '20/30', '20/30'],
                                ['More layers: rank 8, last 8 blocks', '20/30', '22/30'],
                                ['Larger rank: rank 32, last 4 blocks', '24/30', '23/30'],
                            ]} />
                            <p><strong>Bigger adapters did not consistently increase the benefit of supervision.</strong></p>
                        </section>
                        <section>
                            <h4>Earlier supervision: small gains, still uncertain</h4>
                            <p>I moved the heads earlier, before the final step where the action network reads visual features.</p>
                            <ul>
                                <li><strong>First test (EXP-018):</strong> 19/30 for LoRA alone vs 22/30 with VGGT + CLIP. <strong>3 more successes.</strong></li>
                                <li><strong>Repeat (EXP-019):</strong> 22/30 vs 24/30. <strong>2 more successes</strong>, with the net gain coming from just 1 of 10 goals.</li>
                            </ul>
                            <p>The repeat changed both training randomness and camera cases, so I cannot separate their effects.</p>
                        </section>
                    </div>

                    <p className={styles.note}><strong>Uncertainty:</strong> success-rate differences and 95% intervals, in percentage points: EXP-016 −0.57 [−3.45, +2.30]; EXP-018 +10 [−3.33, +23.33]; EXP-019 +6.67 [0, +20]. All intervals include zero gain. They account for trials sharing the same task.</p>
                    <p className={styles.note}>These small tests share task families, so I do not combine them as independent evidence. EXP-016&apos;s 87 tasks are outside the published base-training recipe; their absence from the released checkpoint&apos;s actual training data is unverified.</p>
                </Disclosure>
                <Disclosure title="Does depth help separately from CLIP?">
                    <Results caption="EXP-020 · Seed 44 · Matched camera cases and clean retention" headings={['Policy', 'Camera success', 'Clean']} rows={[
                        ['Initial FastWAM', '21/30 · 70.0%', '10/10'],
                        ['Control LoRA', '19/30 · 63.3%', '10/10'],
                        ['Depth-only LoRA', '21/30 · 70.0%', '10/10'],
                        ['CLIP-only LoRA', '20/30 · 66.7%', '10/10'],
                        ['Depth + CLIP LoRA', '19/30 · 63.3%', '10/10'],
                    ]} />
                    <p><strong>Primary contrasts:</strong> depth − control +6.67 points, adjusted 97.5% interval [−20.00, +33.33]; combined − CLIP −3.33 points, [−26.67, +16.67]. Neither establishes a gain.</p>
                    <Figure src={`${assets}/depth-clip-success.png`} alt="Depth and CLIP ablation success counts and paired uncertainty intervals" width={2062} height={787}>
                        EXP-020: all 200 scored rollouts complete. Intervals resample ten goals with their camera variants. Clean 10/10 is too small to establish absence of forgetting.
                    </Figure>
                </Disclosure>
                <Disclosure title="Why might this differ from GaussianWAM?">
                    <p>My early tests use a different setup from GaussianWAM. Possible explanations for the gap include:</p>
                    <ul>
                        <li><strong>Data and evaluation:</strong> my 414 training episodes cover ten closely related bowl-placement tasks. The 174-case test introduces 87 different tasks, while the paper&apos;s Plus result tests changes such as camera views, lighting, and noise. Better depth prediction may help perception without teaching a new skill.</li>
                        <li><strong>LoRA capacity:</strong> I tried more layers and a higher rank in EXP-017. Larger adapters did not consistently increase the benefit of extra supervision, so limited capacity is still a possibility, not an established cause.</li>
                        <li><strong>Training setup:</strong> my runs use 2,000 updates with an effective batch of two; the paper describes 70,000 updates with a batch of 32. These are different training stages. I also need to check the mismatch between the Optional-IDM starting checkpoint and the ordinary FastWAM training losses.</li>
                        <li><strong>Depth targets:</strong> my targets describe relative depth on a coarse 7×7 grid per camera. Predicting them more accurately may not capture the spatial information needed to complete a task.</li>
                    </ul>
                    <p className={styles.note}>These explanations remain hypotheses. In EXP-020, extra supervision changed actions on all 40 matched starting observations, confirming that it reaches the action computation. The benefit remains uncertain.</p>
                </Disclosure>
                <p className={styles.decision}><strong>My next steps:</strong> I plan to refine VGGT + CLIP supervision by checking the training setup and testing more varied task data, one change at a time. First, I will compare the saved models on the same earlier camera cases; any promising depth gain needs another training seed and a shuffled-depth comparison. Later, I plan to add Gaussian-based supervision to test whether organizing the teacher signals in a shared 3D representation improves robot performance beyond direct VGGT + CLIP supervision.</p>
            </Disclosure>

            <Disclosure id={`${reportId}-gam`} purpose="Comparing" title="03 · Where does GAM generalize better?" takeaway="Better Plus success and lower latency than FastWAM; task transfer remains weak.">
                <p>I compared released GAM (DA3), FastWAM, HUST FasterWAM, and the independent VGGT-GAM fork on matched simulation cases, with no additional training on LIBERO-Plus.</p>
                <Disclosure title="What did the LIBERO-Plus test show?">
                    <Results caption="EXP-021 · Four suites · 280 OOD + 40 clean cases per model" headings={['Released model', 'OOD success', 'Clean success']} rows={[
                        ['GAM (DA3)', '238/280 · 85.0%', '40/40'],
                        ['FastWAM', '192/280 · 68.6%', '40/40'],
                        ['FasterWAM', '219/280 · 78.2%', '39/40'],
                    ]} />
                    <p className={styles.note}><strong>Clean success:</strong> successful robot trials under the original benchmark conditions, without added camera, lighting, noise, or other perturbations. For example, 40/40 means all 40 clean trials succeeded. OOD success measures performance under changed conditions.</p>
                    <ul>
                        <li><strong>GAM − FastWAM:</strong> +16.43 points; adjusted 98.33% task-cluster interval [+8.57, +24.64]. Supports an advantage on this screen.</li>
                        <li><strong>GAM − FasterWAM:</strong> +6.81 points on 279 strict pairs; interval [−1.79, +15.11]. One RGB-rounding mismatch excluded only from paired inference; retaining it does not change the conclusion.</li>
                    </ul>
                    <p>All <strong>1,120 scored rollouts</strong> completed with zero runtime errors. VGGT-GAM covers only Spatial/Object (140 OOD + 20 clean); compare it on that shared subset below.</p>
                    <Figure src={`${assets}/ood-examples.png`} alt="One LIBERO manipulation goal under seven official LIBERO-Plus perturbation categories" width={2210} height={1530}>
                        EXP-021 inputs, seed 42: background, camera, language, lighting, object layout, robot initial state, sensor noise. These illustrate shifts, not outcomes; the language variant leaves the image unchanged.
                    </Figure>
                </Disclosure>
                <Disclosure title="How do success, speed, and GPU memory compare?">
                    <Results caption="EXP-021 · 140 matched OOD cases each · RTX 5090" headings={['Released model', 'OOD success', 'Call p50', 'GPU peak']} rows={[
                        ['GAM (DA3)', '126/140 · 90.0%', '38.6 ms', '6.4 GiB'],
                        ['FastWAM', '103/140 · 73.6%', '87.4 ms', '23.3 GiB'],
                        ['FasterWAM', '117/140 · 83.6%', '127.7 ms', '22.4 GiB'],
                        ['VGGT-GAM', '114/140 · 81.4%', '39.2 ms', '5.0 GiB'],
                    ]} />
                    <p className={styles.note}><strong>Call p50:</strong> the median time for one policy call, from an observation to an action chunk. GAM’s 38.6 ms means half the measured calls took about 38.6 ms or less; lower is faster. Timing includes preprocessing and action conversion and excludes the first five warm-up calls. Each chunk executes 8 actions for GAM or 10 for WAM, so this is time per call, not per action or complete task.</p>
                    <p><strong>Possible reasons:</strong> GAM&apos;s <a href="https://arxiv.org/html/2606.17046v1#S5.SS5">smaller geometry backbone and direct action prediction, without repeated action denoising</a>, likely contribute to its lower latency. Features learned for 3D geometry may also help with camera changes, but these comparisons do not isolate that benefit from training differences.</p>
                    <p><strong>VGGT-GAM − FastWAM:</strong> +7.86 points, adjusted 98.33% interval [−3.57, +20.71]; gain unproven. FasterWAM is slower than FastWAM in this full-policy measurement.</p>
                    <Figure src={`${assets}/gam-success-latency.png`} alt="Matched Spatial and Object OOD success versus warm observation-to-action latency for four released models" width={2160} height={864}>
                        EXP-021. Bars: descriptive Wilson 95% intervals; paired inference uses task-cluster intervals above. Warm calls include preprocessing/action conversion, exclude the first five calls; GAM executes 8 actions, WAM 10 per chunk. GPU figures are peak allocated memory.
                    </Figure>
                </Disclosure>
                <Disclosure title="Does it hold on new camera views and changed tasks?">
                    <Results caption="EXP-022 · Same released checkpoints · Spatial/Object" headings={['Model', 'New cameras', 'PRO changed task']} rows={[
                        ['GAM (DA3)', '77/80 · 96.2%', '1/20'],
                        ['FastWAM', '45/80 · 56.2%', '3/20'],
                        ['FasterWAM', '66/80 · 82.5%', '6/20'],
                        ['VGGT-GAM', '65/80 · 81.2%', '2/20'],
                    ]} />
                    <p><strong>Camera primary:</strong> GAM − FastWAM +40.0 points, adjusted 98.33% task-cluster interval [+22.5, +57.5]; GAM − FasterWAM +13.75, [+2.50, +26.25]. Independently generated configurations, not official Plus; one initial state and 20 related goals limit inference.</p>
                    <p><strong>PRO exploratory:</strong> changed scene–instruction combinations, not all new goal predicates. Position changes put every policy near the success floor. Visual robustness does not imply task transfer.</p>
                </Disclosure>
                <Disclosure title="Does matching robot coordinates help outside LIBERO?">
                    <Results caption="Fresh non-LIBERO scenes · Different experiment sets; do not pool" headings={['Model', 'EXP-023 overall', 'EXP-024 aligned lift', 'Aligned place']} rows={[
                        ['GAM (DA3)', '0/40', '10/10', '0/10'],
                        ['FastWAM', '1/40', '1/10', '0/10'],
                        ['FasterWAM', '0/40', '0/10', '0/10'],
                        ['VGGT-GAM', '0/40', '4/10', '0/10'],
                    ]} />
                    <p>EXP-023 lift/place policies sit near zero; no useful ranking. EXP-024 uses fresh scenes and expresses end-effector position relative to the <strong>0.8m support surface</strong>. Coordinate compatibility is a concrete diagnostic; lifting is not completed placement.</p>
                    <p className={styles.note}>Task-specific results are small and exploratory; only GAM’s pooled aligned-minus-raw contrast was primary. The aligned reference still has new tasks/assets, not an in-distribution baseline.</p>
                </Disclosure>
                <Disclosure title="What limits the comparison?">
                    <ul>
                        <li><strong>Protocol:</strong> EXP-021 uses one state/variant, two 256px views, 10 settling steps, action limits 220/280/300/520. WAM native evaluators use 30 settling steps and 400/400/400/700. Shared-budget screens are not full official benchmarks or native paper-score reproductions.</li>
                        <li><strong>Confounders:</strong> suite-specific GAM vs multi-suite WAM policies; different pretraining, policy training, preprocessing, and 8/10-action chunks. Rankings cannot isolate architecture.</li>
                        <li><strong>Holdout:</strong> GAM’s released config includes periodic Plus evaluation; author-level checkpoint-selection independence is unverified. No untouched-test claim.</li>
                        <li><strong>Timing:</strong> GAM eager, FastWAM compiled, FasterWAM native one-pass. Full-policy latency is not forward-only CUDA-graph paper timing.</li>
                        <li><strong>Uncertainty:</strong> adjusted 98.33% intervals cover three planned contrasts. Related goals and small samples limit generalization.</li>
                    </ul>
                </Disclosure>
                <p className={styles.decision}><strong>My next steps:</strong> I want to explore GAM-style models built around a geometry network and direct action prediction. I will inspect failures from reaching to release, check robot-coordinate conventions, and test geometry and future context within a fixed model and training setup.</p>
            </Disclosure>

            <section aria-labelledby={`${reportId}-next`} className={styles.nextSteps}>
                <PurposeLabel purpose="Planning" />
                <h3 id={`${reportId}-next`}>What happens next?</h3>
                <ol>
                    <li><strong>Refine VGGT + CLIP:</strong> I will check the training setup, data variety, and repeatability, then test whether Gaussian-based supervision adds a benefit.</li>
                    <li><strong>Explore GAM-style models:</strong> I want to test features learned for 3D geometry and direct action prediction. These models still use RGB images; they use a geometry backbone instead of a video-generation backbone.</li>
                    <li><strong>Explain OOD failures:</strong> separate visual robustness, coordinate compatibility, and goal completion.</li>
                </ol>
                <Disclosure purpose="Planning" title="Could geometric memory help?" takeaway="Next reading: LingBot-Map. A control benefit is still a hypothesis.">
                    <p>The September 14 notes point to <a href="https://arxiv.org/abs/2604.14141">LingBot-Map</a>, a streaming 3D reconstruction model whose Geometric Context Attention (GCA) retains scene context over time. I want to test whether that memory helps a robot use something seen earlier but now hidden; reconstruction results alone do not show a control benefit.</p>
                    <p><strong>Proposed test:</strong> compare a current frame, short visual history, and geometric context with the same active-context budget on occlusion and revisit tasks. This is separate from the immediate VGGT + CLIP and OOD checks.</p>
                    <p className={styles.note}>Further reading leads, not completed reviews: GeoVLA, SpatialVLA, and “Robotic Manipulation is Vision-to-Geometry Mapping”.</p>
                </Disclosure>
            </section>
            <footer className={styles.sources}>
                <p>Sources: EXP-016–024, September 8 discussion, notes0914_GAM_WAM_EXP.txt. Original experiment figures; no new training or rollouts for this report.</p>
            </footer>
        </article>
    );
}
