import { Disclosure, Figure, PurposeLabel, Results } from '../report-components';
import PointTrackingVideos from '../PointTrackingVideos';
import PointHeadArchitecture from '../PointHeadArchitecture';
import styles from '../report.module.css';

export const reportId = 'report-2026-10-27';
const assets = '/update/d817cfe2/2026-10-04_2026-10-27';

export default function Update20261027() {
    return <article id={reportId} aria-labelledby={`${reportId}-heading`} className={styles.entry}>
        <header>
            <p className={styles.eyebrow}>Progress report 03</p>
            <h2 id={`${reportId}-heading`}><time dateTime="2026-10-04">2026-10-04</time> – <time dateTime="2026-10-27">2026-10-27</time></h2>
            <p className={styles.lead}>UniLAP: checkpoint evaluation, point supervision, and how unified the latent actions really are.</p>
            <dl className={styles.findings}>
                <div><dt>Ray’s checkpoints</dt><dd>Google pick-can reaches <strong>206/300 (68.7%)</strong>, close to the reported 68.3%. Bridge reaches 45/96; carrot grasping accounts for most of the shortfall.</dd></div>
                <div><dt>Point tracking & training</dt><dd>Later mask initialization expands tracking coverage, but training from Phase I with point supervision gives <strong>mixed policy results</strong>: best checkpoint 7/96 versus 4/96, final checkpoint 3/96 versus 8/96.</dd></div>
                <div><dt>Latent action visualization & analysis</dt><dd>Phase I learns without action labels, but the visualizations retain dataset structure. Dataset-specific Phase II fine-tuning does not by itself establish generalization to unseen embodiments.</dd></div>
            </dl>
        </header>
        <Disclosure id={`${reportId}-reading`} title="01 · Models & ideas">
            <p><strong>UniLAP:</strong> my working base for learning a common latent-action representation in Phase I without action labels, then training embodiment-specific policies in Phase II.</p>
            <p><strong><a href="https://arxiv.org/abs/2610.10846">Cross-Embodiment Robot Foundation World Models with Latent Actions (LAC-WM)</a></strong> motivates this diagnosis through its study of shared latent actions for world modeling and adaptation to new embodiments. I am testing whether UniLAP’s latent neighborhoods share motion semantics across datasets, beyond the results achieved through separate fine-tuning.</p>
        </Disclosure>
        <Disclosure id={`${reportId}-ray`} title="02 · Checkpoint reproduction">
            <Results caption="Completed checkpoint evaluations · gaps are local minus reported, in percentage points" headings={['Task', 'Local success', 'Reported rate', 'Gap']} rows={[
                ['Bridge · spoon', '14/24 · 58.3%', '58.3%', '0.0 pp'],
                ['Bridge · carrot', '7/24 · 29.2%', '54.2%', '−25.0 pp'],
                ['Bridge · stack', '4/24 · 16.7%', '12.5%', '+4.2 pp'],
                ['Bridge · eggplant', '20/24 · 83.3%', '83.3%', '0.0 pp'],
                ['Bridge · overall', '45/96 · 46.9%', '52.1%', '−5.2 pp'],
                ['Google pick-can · VM', '206/300 · 68.7%', '68.3%', '+0.4 pp'],
                ['GR1 · bottle → cabinet', '19/50 · 38.0%', '42.0%', '−4.0 pp'],
            ]} />
            <p><strong>Carrot grasping accounts for most of the Bridge shortfall:</strong> 13 of 17 failures never registered a grasp, while four grasped but failed placement. Fixing an aggregation bug that excluded eggplant corrected the overall score but left these carrot failures unresolved.</p>
            <p>Two completed pick-can runs both score 206/300: upright 92/100, left/right 73/100, and laid vertically 41/100. Both use visual matching (VM); they should not be compared with the visual aggregation (VA) baseline.</p>
            <p className={styles.note}>GR1 uses 50 episodes with one environment versus ten parallel environments in the paper. This changes the episode stream and policy noise sampling, so it is not yet a matched reproduction. Google move-near/drawer, VA, and the other five GR1 tasks have no completed results here. Missing results are not zero success.</p>
            <p>Next checks: rerun GR1 with ten environments and compare carrot inputs, checkpoint hashes, predicted action chunks, and episode outcomes with Ray’s original run.</p>
        </Disclosure>
        <Disclosure id={`${reportId}-point`} title="03 · Point tracking & policy learning">
            <p>I now initialize each instance from <strong>its first usable mask</strong>, allowing objects missed at frame zero to enter the tracks later. SAM3 uses instruction-derived object names and fixed arm, gripper, or hand prompts; points sampled within its masks seed full-video CoTracker3 tracks, including predictions before the anchor frame. Track identities stay fixed, with visibility and confidence filters controlling display.</p>
            <p>The Bridge comparison below shows both methods on the same episode, with additional examples from a 21-episode gallery spanning seven dataset settings. For training labels, discovery at one-second intervals with local refinement reduces segmentation work.</p>
            <PointTrackingVideos />
            <p className={styles.note}>Both methods generate labels offline using the complete clip, and missed or duplicated detections remain possible. Verification checked decoding, frame counts, and timestamps for all 84 gallery videos, plus initialization points against masks; it does not establish correspondence accuracy.</p>
            <PointHeadArchitecture />
            <h3>Training from the Phase I checkpoint</h3>
            <p>I trained a Bridge action-only baseline and a point-supervised variant for <strong>5,000 updates</strong>, using 1,024 training episodes, 128 validation episodes, seed 42, and global batch size 16. The auxiliary point loss, weighted at 0.1, updates both the point head and the trainable shared policy through the latent representation. “Best” denotes selection by validation action MSE, while “last” denotes the final checkpoint.</p>
            <Results caption="Bridge closed-loop evaluation · four tasks × 24 episodes = 96 per checkpoint" headings={['Checkpoint', 'Spoon', 'Carrot', 'Stack', 'Eggplant', 'Overall']} rows={[
                ['Baseline · best', '2/24', '2/24', '0/24', '0/24', '4/96 · 4.2%'],
                ['Point · best', '2/24', '5/24', '0/24', '0/24', '7/96 · 7.3%'],
                ['Baseline · last', '3/24', '5/24', '0/24', '0/24', '8/96 · 8.3%'],
                ['Point · last', '3/24', '0/24', '0/24', '0/24', '3/96 · 3.1%'],
            ]} />
            <p><strong>The result is mixed:</strong> point supervision adds three successes at the validation-selected checkpoint but loses five at the final checkpoint. With one seed, low overall success, and no successful stack or eggplant episodes, this small evaluation does not establish a reliable benefit. These short training runs are separate from Ray’s released checkpoints.</p>
        </Disclosure>
        <Disclosure id={`${reportId}-latent`} title="04 · Latent action visualization & analysis">
            <p><strong>EgoDex is clearly separated in the Phase I projections, while early tokens show stronger dataset separation in the Phase II views after dataset-specific fine-tuning.</strong> This suggests the latent actions may not yet form a fully unified cross-embodiment representation, although these projections alone cannot attribute the separation to fine-tuning. A possible improvement is to align similar motions across embodiments through shared motion supervision, then test whether this improves transfer with less adaptation.</p>
            <p><strong>Shared Phase I:</strong> 1,920 windows from 150 episodes, with 480 windows each from Bridge, Fractal, GR1, and EgoDex. Each chunk contains 16 tokens of 32 dimensions. The displayed projections use seed 42 and raw features.</p>
            <Figure src={`${assets}/phase1-chunks.png`} alt="Shared Phase I: first token, chunk mean, and ordered full chunk in PCA and UMAP." width={2550} height={1700}>Phase I · three chunk representations. PCA explained variance: 37.9%, 46.1%, and 28.1% respectively.</Figure>
            <p>Bridge and EgoDex occupy more distinct regions; Fractal and GR1 overlap more in parts of the projection. Averaging the chunk removes temporal order; flattening preserves token order but does not equalize physical duration across datasets. The three columns are independently fitted, so their coordinates are not directly comparable.</p>
            <Figure src={`${assets}/phase1-tokens.png`} alt="Shared Phase I: token positions zero, three, seven and fifteen in one shared projection." width={3060} height={1530}>Phase I · token positions in one shared PCA and one shared UMAP fit, with identical axis limits across columns.</Figure>
            <p>Here all 30,720 tokens share one fitted projection, making token-position panels comparable within each row. Dataset structure persists across positions, while the distributions shift with token index. Token positions and nearby windows are correlated observations.</p>
            <h3>Phase II · each dataset uses its own checkpoint</h3>
            <p>These plots use 1,440 windows from 135 episodes: 480 each for Bridge, Fractal, and GR1, routed only to their corresponding Phase II checkpoint, with four Euler steps. EgoDex is excluded because no corresponding Phase II checkpoint is available.</p>
            <Figure src={`${assets}/phase2-chunk_mean.png`} alt="Phase II chunk mean PCA and UMAP for Bridge, Fractal and GR1." width={2040} height={850}>Phase II · chunk mean, 32D. The first two PCs explain 23.2% of variance.</Figure>
            <Figure src={`${assets}/phase2-first_token.png`} alt="Phase II first token PCA and UMAP for Bridge, Fractal and GR1." width={2040} height={850}>Phase II · first token z[0], 32D. PCA explained variance: 31.0%.</Figure>
            <Figure src={`${assets}/phase2-token_3.png`} alt="Phase II token three PCA and UMAP." width={2040} height={850}>Phase II · z[3], 32D. PCA explained variance: 21.2%.</Figure>
            <Figure src={`${assets}/phase2-token_7.png`} alt="Phase II token seven PCA and UMAP." width={2040} height={850}>Phase II · z[7], 32D. PCA explained variance: 22.6%.</Figure>
            <Figure src={`${assets}/phase2-token_15.png`} alt="Phase II token fifteen PCA and UMAP." width={2040} height={850}>Phase II · z[15], 32D. PCA explained variance: 32.6%.</Figure>
            <p><strong>The first token has clearer dataset separation than the chunk mean in these views.</strong> Later tokens change the pattern: at z[15], Bridge and Fractal overlap strongly in the first two principal components while GR1 remains more distinct. This makes z[0] alone an incomplete summary of the chunk.</p>
            <p className={styles.note}>Phase II projections are fitted separately per representation and separately from Phase I. Dataset identity is confounded with checkpoint identity: separation can reflect different data, different learned weights, or both. PCA retains only the displayed fraction of variance, and UMAP emphasizes local neighborhoods; neither plot proves shared physical action semantics or transfer ability. These figures do not establish that fine-tuning caused greater separation.</p>
        </Disclosure>
        <Disclosure id={`${reportId}-motion`} title="05 · Motion similarity (pending)">
            <p>The motion predictor’s cosine-similarity visualization is on another machine; I will add the figures, compared features, and interpretation after transferring the results.</p>
        </Disclosure>
        <section className={styles.nextSteps} aria-labelledby={`${reportId}-next`}>
            <PurposeLabel purpose="Planning" />
            <h3 id={`${reportId}-next`}>Direction · shared actions with less adaptation</h3>
            <p>UniLAP shows promise for training a unified latent action model without action labels in Phase I. However, Phase II fine-tunes on individual embodiments and datasets, so its downstream success is not strong evidence that one policy generalizes without adaptation. I want to make the latent actions more consistent across embodiments and train policies that need no fine-tuning, or substantially less.</p>
            <ol>
                <li><strong>Test transfer directly:</strong> hold out embodiments and compare zero-shot performance and fixed small fine-tuning budgets, with shared evaluation conditions.</li>
                <li><strong>Improve shared motion semantics:</strong> test whether point supervision helps match similar motions across embodiments while preserving information needed for control. Evaluate original-space representations and downstream success, alongside projections.</li>
                <li><strong>Explore a unified action decoder:</strong> compare separate decoders with a shared decoder conditioned on embodiment information, accounting for different action dimensions, units, and control rates.</li>
                <li><strong>Ablate action labels during Phase I:</strong> compare the label-free baseline with an auxiliary unified action decoder trained where labels exist. Test whether supervision improves transfer or encourages embodiment-specific representations, while retaining unlabeled video training.</li>
            </ol>
        </section>
        <footer className={styles.sources}>
            <p>Evidence: <a href={`${assets}/ray-evaluation-summary.md`}>Ray checkpoint evaluation and audit summary</a>; <a href={`${assets}/point-evaluation.json`}>point-training evaluation summaries</a>; <a href={`${assets}/latent-provenance.json`}>latent projection provenance</a>; <a href={`${assets}/tracking-verification.json`}>tracking verification</a>. Results reflect saved experiment outputs; no new training or evaluation was run for this report.</p>
        </footer>
    </article>;
}
