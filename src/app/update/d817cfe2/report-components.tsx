import type { ReactNode } from 'react';
import styles from './report.module.css';
export { default as Figure } from './ReportFigure';

export type ReportPurpose =
    | 'Reproducing results'
    | 'Comparing'
    | 'Testing a hypothesis'
    | 'Getting insight'
    | 'Methods'
    | 'Checking limits'
    | 'Planning';

export function PurposeLabel({ purpose }: { purpose: ReportPurpose }) {
    return <span className={styles.purpose} aria-label={`Purpose: ${purpose}`}>{purpose}</span>;
}

export function Disclosure({ title, takeaway, purpose, children, id }: {
    title: string; takeaway?: string; purpose?: ReportPurpose; children: ReactNode; id?: string;
}) {
    return <details id={id} className={styles.disclosure}>
        <summary>
            <span>
                <span className={styles.disclosureHeading}>
                    {purpose && <PurposeLabel purpose={purpose} />}
                    <span className={styles.disclosureTitle}>{title}</span>
                </span>
                {takeaway && <span className={styles.disclosureTakeaway}>{takeaway}</span>}
            </span>
        </summary>
        <div className={styles.disclosureBody}>{children}</div>
    </details>;
}

export function Results({ caption, headings, rows }: { caption: string; headings: string[]; rows: string[][] }) {
    return <div className={styles.tableScroll} role="region" aria-label={caption} tabIndex={0}>
        <table>
            <caption>{caption}</caption>
            <thead><tr>{headings.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>{rows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0
                ? <th key={i} scope="row">{cell}</th>
                : <td key={i}>{cell}</td>)}</tr>)}</tbody>
        </table>
    </div>;
}
