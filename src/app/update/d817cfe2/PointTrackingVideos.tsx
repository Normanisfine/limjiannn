'use client';
import { useState } from 'react';
import styles from './report.module.css';
const assets = '/update/d817cfe2/2026-10-04_2026-10-27';
const cases = [['robocasa_opendrawer_000000', 'RoboCasa atomic · open drawer'], ['bridge_000000', 'Bridge · spoon to tray'], ['fractal_000002', 'Fractal'], ['dreamdojo_gr1_000_000000', 'GR1 teleoperation'], ['gr1_sim_003_000000', 'GR1 simulation'], ['egodex_add_remove_lid_1', 'EgoDex · lid manipulation'], ['robocasa_composite_rotatepan_000000', 'RoboCasa composite · rotate pan']];
export default function PointTrackingVideos() {
    const [selected, setSelected] = useState(cases[0][0]);
    const label = cases.find(c => c[0] === selected)![1];
    return <figure className={styles.videoFigure}>
        <h4>Bridge · point-tracking comparison</h4>
        <div className={styles.videoComparison}>
            {([['current', 'Current · first usable mask'], ['naive', 'Baseline · frame-zero mask']] as const).map(([method, title]) => <div key={method}>
                <h5>{title}</h5>
                <video controls playsInline preload="metadata" aria-label={`${title}: Bridge episode 000002`}>
                    <source src={`${assets}/bridge_000002-${method}.mp4`} type="video/mp4" />
                    <a href={`${assets}/bridge_000002-${method}.mp4`}>Open video</a>
                </video>
                <a href={`${assets}/bridge_000002-${method}.mp4`}>Open full-size video</a>
            </div>)}
        </div>
        <figcaption>Same Bridge episode (000002), shown at normal speed with independent playback controls. Compare tracking coverage under current and frame-zero initialization; this qualitative example does not measure correspondence accuracy.</figcaption>
        <details className={styles.moreVideos}>
        <summary>More dataset examples</summary>
        <label htmlFor="point-tracking-example">Dataset example</label>
        <select id="point-tracking-example" value={selected} onChange={e => setSelected(e.target.value)}>
            {cases.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
        </select>
        <video key={selected} controls playsInline preload="none" poster={`${assets}/${selected}.jpg`} aria-label={`Current point tracking: ${label}`}>
            <source src={`${assets}/${selected}.mp4`} type="video/mp4" />
            <a href={`${assets}/${selected}.mp4`}>Open tracking video</a>
        </video>
        <p className={styles.note}>Current method, normal speed. Masks and tracks cover successfully seeded instruction-conditioned detections. Seven examples selected from the 21-episode gallery; these demonstrate coverage, not benchmark accuracy. <a href={`${assets}/${selected}.mp4`}>Open full-size video</a>.</p>
        {selected === cases[0][0] && <>
            <h4>Frame-zero initialization baseline · same drawer episode</h4>
            <video controls playsInline preload="none" aria-label="Frame-zero point tracking baseline: open drawer">
                <source src={`${assets}/drawer-naive.mp4`} type="video/mp4" />
            </video>
            <p className={styles.note}>The current method seeds the drawer at frame 14, yielding two instances versus one in the frame-zero baseline. Both use the same offline tracker and full video; playback controls are independent.</p>
        </>}
        </details>
    </figure>;
}
