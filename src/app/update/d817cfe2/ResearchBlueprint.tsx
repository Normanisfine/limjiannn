import styles from './report.module.css';
import CommentThread from './CommentThread';
import { commentsEnabled } from './comments-config';

export default function ResearchBlueprint() {
    return (
        <details id="blueprint" className={styles.blueprint}>
            <summary>
                <h2 id="blueprint-heading">
                    <span className={styles.blueprintTitle}>Research blueprint</span>
                    <span className={styles.blueprintMeta}>Long-term direction · updated 2026-09-15</span>
                </h2>
            </summary>
            <div className={styles.blueprintBody}>
                <p>I started with a simple question: <strong>can adding 3D information help world-action models (WAMs) handle new situations better?</strong> Reading FastWAM, FasterWAM, and the Geometric Action Model (GAM) led me to ask what the model should know about the world and how it should use that knowledge to act.</p>
                <p>I want to explore <strong>how to represent 3D information and where to use it</strong>: during training, when choosing actions, or both. Alongside video-based WAMs, I want to explore <strong>GAM-style models built around a geometry network</strong>. I also want to understand <strong>how much imagination is useful while the robot acts, and what it should imagine</strong>: future video frames or compact internal features (latents).</p>
                <p>My goal is to build WAMs that <strong>understand 3D space better, handle unfamiliar scenes and tasks without extra training, and choose actions faster</strong>. The key is to find which information and imagined futures actually help the robot succeed, and whether that benefit is worth the time spent computing them.</p>
                {commentsEnabled && <CommentThread threadId="blueprint" title="the research blueprint" />}
            </div>
        </details>
    );
}
