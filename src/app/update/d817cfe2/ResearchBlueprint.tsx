import styles from './report.module.css';
import CommentThread from './CommentThread';
import { commentsEnabled } from './comments-config';

export default function ResearchBlueprint() {
    return (
        <details id="blueprint" className={styles.blueprint}>
            <summary>
                <h2 id="blueprint-heading">
                    <span className={styles.blueprintTitle}>Research blueprint</span>
                    <span className={styles.blueprintMeta}>Long-term direction · updated 2026-10-27</span>
                </h2>
            </summary>
            <div className={styles.blueprintBody}>
                <p>I started with a simple question: <strong>can adding 3D information help world-action models (WAMs) handle new situations better?</strong> Reading FastWAM, FasterWAM, and the Geometric Action Model (GAM) led me to ask what the model should know about the world and how it should use that knowledge to act.</p>
                <p>My current focus is <strong>learning latent actions that transfer across embodiments</strong>. UniLAP’s Phase I learns without action labels, but its dataset-specific Phase II fine-tuning leaves open how well one policy generalizes. I am testing point-track supervision and diagnosing the latent space, with the goal of policies that need little or no fine-tuning. I also want to explore a unified action decoder and whether using action labels during Phase I helps it learn a more transferable representation.</p>
                <p>My goal is to build WAMs that <strong>understand 3D space better, handle unfamiliar scenes and tasks without extra training, and choose actions faster</strong>. The key is to find which information and imagined futures actually help the robot succeed, and whether that benefit is worth the time spent computing them.</p>
                {commentsEnabled && <CommentThread threadId="blueprint" title="the research blueprint" />}
            </div>
        </details>
    );
}
