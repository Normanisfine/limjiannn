'use client';

import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import Image from 'next/image';
import styles from './report.module.css';
import viewer from './figure-viewer.module.css';

export default function ReportFigure({ src, alt, children, width, height }: {
    src: string; alt: string; children: ReactNode; width: number; height: number;
}) {
    const id = useId();
    const dialog = useRef<HTMLDialogElement>(null);
    const returnButton = useRef<HTMLButtonElement>(null);
    const opener = useRef<HTMLAnchorElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [zoomed, setZoomed] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previousOverflow; };
    }, [isOpen]);

    function open(event: MouseEvent<HTMLAnchorElement>) {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        opener.current = event.currentTarget;
        setZoomed(false);
        dialog.current?.showModal();
        setIsOpen(true);
        returnButton.current?.focus();
    }

    function close() {
        dialog.current?.close();
    }

    function restoreReport() {
        setIsOpen(false);
        setZoomed(false);
        opener.current?.focus({ preventScroll: true });
    }

    function closeFromBackdrop(event: MouseEvent<HTMLDialogElement>) {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    }

    return <figure className={styles.figure}>
        <a href={src} onClick={open} aria-haspopup="dialog" aria-controls={id} aria-label={`Open full-size figure: ${alt}`}>
            <Image src={src} alt={alt} width={width} height={height} />
        </a>
        <figcaption>{children} <a href={src} onClick={open} aria-haspopup="dialog" aria-controls={id}>Open full size</a></figcaption>
        <dialog ref={dialog} id={id} className={viewer.dialog} aria-label="Full-size figure" onClose={restoreReport} onClick={closeFromBackdrop}>
            <div className={viewer.toolbar}>
                <strong>Full-size figure</strong>
                <div className={viewer.controls}>
                    <button type="button" aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? 'Fit to screen' : 'Actual size'}</button>
                    <button type="button" ref={returnButton} onClick={close} className={viewer.returnButton}>Back to report</button>
                </div>
            </div>
            <div className={`${viewer.imageArea} ${zoomed ? viewer.zoomed : ''}`} role="region" aria-label="Figure image; scroll to pan at actual size" tabIndex={0}>
                <Image src={src} alt={alt} width={width} height={height} className={viewer.fullImage} style={zoomed ? { width, height } : undefined} />
            </div>
            <div className={viewer.caption}>{children}</div>
        </dialog>
    </figure>;
}
