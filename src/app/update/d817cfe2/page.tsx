import type { Metadata } from 'next';
import ResearchBlueprint from './ResearchBlueprint';
import { updates } from './updates';
import styles from './report.module.css';
import CommentThread from './CommentThread';
import { commentsEnabled } from './comments-config';

export const metadata: Metadata = {
    title: 'WAM + 3D Research Report',
    description: 'Research blueprint and dated progress reports on geometry, action, and generalization.',
    robots: { index: false, follow: false },
    referrer: 'no-referrer',
};

export default function ResearchUpdatesPage() {
    return <main id="main" className={styles.report}>
        <header className={styles.header}>
            <h1>wam + 3d research report</h1>
            <nav className={styles.contents} aria-label="Research report sections">
                <a href={`#${updates[0].id}`}>Latest report</a>
                <a href="#blueprint">Research blueprint</a>
            </nav>
        </header>

        <div id="research-report-content">
            <ResearchBlueprint />
            {updates.map(({ id, Component }) => <div key={id} className={styles.reportGroup}>
                <Component />
                {commentsEnabled && <CommentThread threadId={id} title={id.replace('report-', 'the report ending ')} />}
            </div>)}
        </div>
    </main>;
}
