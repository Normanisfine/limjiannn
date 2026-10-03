import styles from './report.module.css';
import CommentThread from './CommentThread';
import { commentsEnabled } from './comments-config';

export default function ResearchBlueprint() {
    return (
        <details id="blueprint" className={styles.blueprint}>
            <summary>
                <h2 id="blueprint-heading">
                    <span className={styles.blueprintTitle}>Research blueprint</span>
                    <span className={styles.blueprintMeta}>Long-term direction · updated 2026-10-03</span>
                </h2>
            </summary>
            <div className={styles.blueprintBody}>
                <p>I started with a simple question: <strong>can adding 3D information help world-action models (WAMs) handle new situations better?</strong> Reading FastWAM, FasterWAM, and the Geometric Action Model (GAM) led me to ask what the model should know about the world and how it should use that knowledge to act.</p>
                <p>My current focus is <strong>making GAM lighter and faster while preserving its camera-shift robustness</strong>. VGGT + CLIP experiments show small measured gains, but limited compute has led me to temporarily pause further training in that direction. Profiling and an initial CoMe test now let me ask which image details and predicted features the robot can compress safely.</p>
                <p>My goal is to build WAMs that <strong>understand 3D space better, handle unfamiliar scenes and tasks without extra training, and choose actions faster</strong>. The key is to find which information and imagined futures actually help the robot succeed, and whether that benefit is worth the time spent computing them.</p>
                {commentsEnabled && <CommentThread threadId="blueprint" title="the research blueprint" />}
            </div>
        </details>
    );
}
