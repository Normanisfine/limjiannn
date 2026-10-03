'use client';

import { useState } from 'react';
import styles from './report.module.css';

const assets = '/update/d817cfe2/2026-09-15_2026-10-03';
const cases = [
    { id: 'camera', label: 'Camera shift · heavier merge fails', description: 'Bowl from table center, state 0: GAM and CoMe-25 succeed; CoMe-50 reaches the 400-step limit.' },
    { id: 'clean', label: 'Clean · all three succeed', description: 'Bowl from table center, state 0: all three policies succeed.' },
    { id: 'background', label: 'Background shift · heavier merge fails', description: 'Bowl between plate and ramekin, state 0: GAM and CoMe-25 succeed; CoMe-50 reaches the 400-step limit.' },
    { id: 'light', label: 'Lighting shift · all three succeed', description: 'Bowl from table center, state 0: all three policies succeed.' },
];

export default function CompressionVideos() {
    const [selected, setSelected] = useState('camera');
    const current = cases.find(c => c.id === selected)!;
    return <figure className={styles.videoFigure}>
        <h4>Watch confidence, merging and action attention</h4>
        <label htmlFor="come-video-case">Example</label>
        <select id="come-video-case" value={selected} onChange={e => setSelected(e.target.value)}>
            {cases.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <p aria-live="polite">{current.description}</p>
        <video key={current.id} controls playsInline preload="none" poster={`${assets}/${current.id}.jpg`} aria-label={`GAM and CoMe attention comparison: ${current.label}`} width={1248} height={1088}>
            <source src={`${assets}/${current.id}.mp4`} type="video/mp4" />
            <a href={`${assets}/${current.id}.mp4`}>Open the annotated video</a>
        </video>
        <figcaption>
            <p><strong>Left → right:</strong> GAM, CoMe-25, CoMe-50. <strong>Top → bottom:</strong> original cameras; geometry confidence with orange merge outlines; action-token attention at blocks 25 and 39. Brighter means a higher score within each shared color scale. Confidence is not a success probability.</p>
            <p>Each column follows its own recorded trajectory on the same simulation clock; finished episodes hold their last frame. Overlays update at replans. Attention averages 24 heads and two action queries; it shows associations, not the cause of failure. Examples are deliberately selected to show both success and regression, not their frequency.</p>
            <a href={`${assets}/${current.id}.mp4`}>Open video at full size</a>
        </figcaption>
    </figure>;
}
