'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    delay?: number;
}

export default function SectionWrapper({ children, id, className, delay = 0.2 }: SectionWrapperProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id={id}
            ref={ref}
            className={cn('relative w-full py-16 md:py-24', className)}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay, ease: [0.17, 0.55, 0.55, 1] }}
            >
                {children}
            </motion.div>
        </section>
    );
}
