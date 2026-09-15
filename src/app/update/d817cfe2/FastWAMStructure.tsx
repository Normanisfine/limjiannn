import styles from './model-structure.module.css';

export default function FastWAMStructure({ id }: { id: string }) {
    return <section id={id} className={styles.structure} aria-label="What trains and what stays frozen">
        <p className={styles.lead}>I train <strong>LoRA adapters + two new heads (depth and CLIP)</strong> together.</p>
        <p>The depth and CLIP heads read FastWAM&apos;s <strong>internal current-image features</strong>, not its generated video. I match their predictions to targets from VGGT and CLIP on the <strong>same real images</strong>.</p>
        <dl className={styles.roles}>
            <div><dt>Keep frozen</dt><dd>FastWAM&apos;s original weights, VGGT, and CLIP.</dd></div>
            <div><dt>When acting</dt><dd>Keep FastWAM + learned LoRA. Remove both heads and the teachers.</dd></div>
        </dl>
        <p className={styles.loss}><strong>Loss:</strong> normal video/action losses + 0.01 × depth error + 0.01 × CLIP feature error.</p>
    </section>;
}
