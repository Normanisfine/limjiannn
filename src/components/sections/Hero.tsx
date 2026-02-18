'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Box, Brain, Theater } from 'lucide-react';

export default function Hero() {
    const scrollToSection = (id: string) => {
        const event = new CustomEvent('scroll-to-section', { detail: id });
        window.dispatchEvent(event);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 2.0, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center text-center px-4 relative">
            <div className="absolute inset-0 bg-transparent z-0"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10 relative pointer-events-auto"
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-secondary font-medium tracking-widest mb-4 uppercase text-sm md:text-base drop-shadow-lg"
                >
                    Software Engineer & Researcher
                </motion.h2>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-6 text-glow mix-blend-screen"
                >
                    MINGJIAN LI
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-foreground/90 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10 drop-shadow-md font-light"
                >
                    Crafting digital experiences with code and creativity. <br className="hidden md:block" />
                    Specializing in 3D Reconstruction, Machine Learning, and Full-Stack Development.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center gap-6"
                >
                    <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-widest">
                        Highlights
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
                        <button
                            onClick={() => scrollToSection('research-3d')}
                            className="group px-8 py-4 bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-foreground border border-primary/50 rounded-xl font-semibold transition-all hover:scale-105 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-3"
                        >
                            <Box size={20} className="text-primary group-hover:rotate-12 transition-transform" />
                            <span>3D Reconstruction</span>
                        </button>
                        
                        <button
                            onClick={() => scrollToSection('research-mri')}
                            className="group px-8 py-4 bg-gradient-to-r from-accent/20 to-purple-500/20 hover:from-accent/30 hover:to-purple-500/30 text-foreground border border-accent/50 rounded-xl font-semibold transition-all hover:scale-105 backdrop-blur-sm shadow-[0_0_20px_rgba(251,146,60,0.3)] flex items-center gap-3"
                        >
                            <Brain size={20} className="text-accent group-hover:scale-110 transition-transform" />
                            <span>MRI with Deep Learning</span>
                        </button>

                        <button
                            onClick={() => scrollToSection('broadway')}
                            className="group px-8 py-4 bg-gradient-to-r from-pink-500/20 to-red-500/20 hover:from-pink-500/30 hover:to-red-500/30 text-foreground border border-pink-500/50 rounded-xl font-semibold transition-all hover:scale-105 backdrop-blur-sm shadow-[0_0_20px_rgba(236,72,153,0.3)] flex items-center gap-3"
                        >
                            <Theater size={20} className="text-pink-400 group-hover:rotate-12 transition-transform" />
                            <span>Broadway</span>
                        </button>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/50 pointer-events-auto"
            >
                <ArrowDown size={32} />
            </motion.div>
        </section>
    );
}
