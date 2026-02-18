'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Contact() {
    return (
        <SectionWrapper id="contact" className="min-h-[80vh] flex flex-col justify-center items-center container mx-auto px-4 relative py-32">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent -z-10"></div>

            <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-5xl md:text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter">
                    Let's Connect
                </h2>
                <p className="text-xl md:text-2xl text-foreground/60 mb-16 font-light max-w-2xl mx-auto">
                    Open to discuss new opportunities, collaborations, or just have a chat about technology.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
                    <a href="mailto:limjiannn@gmail.com"
                        className="group relative px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        <span className="relative flex items-center gap-3 text-lg">
                            <Mail size={24} /> Send Email
                        </span>
                    </a>

                    <div className="flex gap-6">
                        <a href="https://www.linkedin.com/in/limjiannn/" target="_blank" rel="noopener noreferrer"
                            className="p-5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/50 hover:text-white text-foreground/50 transition-all hover:scale-110">
                            <Linkedin size={28} />
                        </a>

                        <a href="https://github.com/Normanisfine" target="_blank" rel="noopener noreferrer"
                            className="p-5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/50 hover:text-white text-foreground/50 transition-all hover:scale-110">
                            <Github size={28} />
                        </a>
                    </div>
                </div>

                <div className="mt-16 md:mt-32 text-xs text-foreground/20 font-mono tracking-widest uppercase">
                    © {new Date().getFullYear()} Mingjian Li
                </div>
            </div>
        </SectionWrapper>
    );
}
