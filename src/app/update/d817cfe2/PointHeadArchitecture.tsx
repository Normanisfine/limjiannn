import styles from './report.module.css';

export default function PointHeadArchitecture() {
    return <figure className={styles.pointArchitecture} aria-labelledby="point-head-title">
        <h4 id="point-head-title">Architecture · auxiliary point head</h4>
        <div className={styles.latentFlow}>
            <span>Image + instruction</span><span aria-hidden="true">→</span>
            <span>Shared policy<small>Phase I initialization · trainable</small></span><span aria-hidden="true">→</span>
            <strong>Latent actions z<small>16 tokens × 32 dimensions</small></strong>
        </div>
        <div className={styles.headBranches}>
            <section>
                <span className={styles.branchLabel}>z ↓ existing action branch</span>
                <h5>Action decoder</h5>
                <p>+ proprioception, visual tokens, language</p>
                <strong>16 × 7 robot actions</strong>
                <small>Supervision: action MSE</small>
            </section>
            <section>
                <span className={styles.branchLabel}>z ↓ added training branch</span>
                <h5>Point head</h5>
                <p>+ 128 query slots, sampled DINO features</p>
                <strong>16 future positions + visibility</strong>
                <small>Supervision: offline CoTracker tracks</small>
            </section>
        </div>
        <p className={styles.architectureLoss}>L = L<sub>action</sub> + 0.1 (L<sub>position</sub> + 0.5 L<sub>displacement</sub> + 0.1 L<sub>visibility</sub>)</p>
        <figcaption>Point-loss gradients reach the shared policy through z; the DINO feature input to the head is detached. Robot inference uses the action branch only.</figcaption>
        <details className={styles.moreVideos}>
            <summary>Inside the point head</summary>
            <p>Each query combines a bilinearly sampled DINO feature with Fourier-encoded coordinates in a 256-dimensional token. Four attention blocks (eight heads each) mix points spatially and cross-attend to the latent prefix z[:h] for future step h.</p>
            <p>The head predicts offsets from the initial coordinates and visibility logits over 16 steps. Position and displacement use masked Huber losses with balanced moving/static points; visibility uses masked binary cross-entropy. Future tracks supply targets only.</p>
            <p className={styles.note}>Source: exp1_point/scripts/train_joint.py and experiment_data.py; point_geo/lap_pg/predictors.py and losses.py.</p>
        </details>
    </figure>;
}
