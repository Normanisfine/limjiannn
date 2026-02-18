'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, FileUser, Github, Linkedin } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <SectionWrapper id="about" className="flex flex-col justify-center container mx-auto px-4 relative py-16">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10 blur-3xl rounded-full"></div>

            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-left text-glow pl-4 md:pl-12 border-l-4 border-l-primary">
                ABOUT ME
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div className="space-y-8 text-left lg:pr-12">
                    <h3 className="text-3xl font-semibold text-primary drop-shadow-md">
                        Hi! I am Mingjian Li (李明键).
                    </h3>
                    <p className="text-xl text-foreground/90 leading-relaxed font-light">
                        I am currently a senior student at <span className="text-secondary font-bold">NYU Tandon</span>, majoring in Computer Science and minoring in Mathematics.
                        I am passionate about and have experience in <span className="text-accent font-medium">3D Reconstruction, MRI with Deep Learning, Neuroscience, Full-stack Development, Machine Learning, and Data Science.</span>
                    </p>
                    <p className="text-xl text-foreground/90 leading-relaxed font-light">
                        Before transferring to NYU, I studied Accounting at SUFE. Outside of tech, I love cats, Broadway shows, hiking, photography, board games, and ping-pong!
                    </p>

                    <div className="flex flex-wrap gap-6 justify-start pt-8">
                        <a href="https://www.linkedin.com/in/limjiannn/" target="_blank" rel="noopener noreferrer"
                            className="text-blue-400 transition-colors transform hover:scale-110">
                            <Linkedin size={32} />
                        </a>
                        <a href="https://github.com/Normanisfine" target="_blank" rel="noopener noreferrer"
                            className="text-gray-300 transition-colors transform hover:scale-110">
                            <Github size={32} />
                        </a>
                        <a href="mailto:limjiannn@gmail.com"
                            className="text-primary transition-colors transform hover:scale-110">
                            <Mail size={32} />
                        </a>
                        <a href="/assets/Resume.pdf" target="_blank" rel="noopener noreferrer"
                            className="text-accent transition-colors transform hover:scale-110">
                            <FileUser size={32} />
                        </a>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center lg:justify-end relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-2xl opacity-100 transition duration-500"></div>
                    <Image
                        src="/assets/photo.jpg"
                        alt="Mingjian Li"
                        width={400}
                        height={400}
                        className="relative rounded-2xl w-64 h-64 md:w-96 md:h-96 object-cover shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-primary/50 transition-all duration-300 transform -rotate-2"
                    />
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
