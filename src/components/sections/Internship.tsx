'use client';

import React from 'react';
import Image from 'next/image';
import SectionWrapper from '@/components/ui/SectionWrapper';

const internships = [
    {
        title: 'Software Engineer Intern',
        company: 'SeeM(useums)',
        location: 'Pittsburgh',
        duration: 'Dec 2024 – May 2025',
        logo: '/assets/seemuseums_logo.jpeg',
        responsibilities: [
            'Frontend: React, Next.js, Redux. Built authentication, project management.',
            'Backend: Python Flask, Docker, AWS. Scalable deployment.',
            '3D Pipeline: Implemented 3D Gaussian splatting & SuGaR with CUDA.',
        ],
        tags: ['React', 'Next.js', 'Python', 'AWS', '3DGS', 'CUDA']
    },
    {
        title: 'Quant Research Consultant',
        company: 'WorldQuant Brain',
        location: 'Remote',
        duration: 'Sep 2023 – Jan 2024',
        logo: '/assets/wq_logo.png',
        responsibilities: [
            'Built market-neutral strategy based on cross-field data and sentiment.',
            'Refined strategy to improve Sharpe ratio, turnover, and fitness.',
        ],
        tags: ['Quantitative Research', 'Backtesting', 'Pandas', 'Financial Modeling']
    },
    {
        title: 'Audit Intern',
        company: 'KPMG',
        location: 'Shanghai, China',
        duration: 'Jan 2023 – Feb 2023',
        logo: '/assets/kpmg_logo.jpeg',
        responsibilities: [
            'Conducted risk assessment and substantive procedures.',
            'Verified integrity of assets, payroll, and expense accounts.',
        ],
        tags: ['Audit', 'Risk Analysis']
    }
];

export default function Internship() {
    return (
        <SectionWrapper id="internship" className="flex flex-col justify-center container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-20 text-left text-glow pl-4 md:pl-12 border-l-4 border-l-accent w-full">
                INTERNSHIP
            </h2>

            <div className="relative max-w-5xl mx-auto w-full">
                {/* Central Line */}
                <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2"></div>

                <div className="space-y-20">
                    {internships.map((role, idx) => (
                        <div key={idx} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Timestamp for Desktop */}
                            <div className={`hidden md:block w-1/2 px-12 ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>
                                <span className="text-foreground/40 font-mono text-sm">{role.duration}</span>
                            </div>

                            {/* Logo Node */}
                            <div className="absolute left-[4px] md:left-1/2 top-0 w-12 h-12 rounded-full border-4 border-background bg-zinc-900 z-10 flex items-center justify-center md:-translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.2)] md:-ml-6">
                                <Image src={role.logo} alt={role.company} width={48} height={48} className="object-cover rounded-full" />
                            </div>

                            {/* Content */}
                            <div className={`w-full md:w-1/2 pl-20 md:pl-12 pr-0 ${idx % 2 === 0 ? 'md:pr-12 md:pl-0 md:text-right' : 'md:text-left'}`}>
                                <div className="group">
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">{role.company}</h3>
                                    <h4 className="text-lg font-medium text-primary mb-2">{role.title}</h4>
                                    <p className="md:hidden text-foreground/40 font-mono text-xs mb-4">{role.duration}</p>

                                    <ul className={`list-none space-y-2 text-foreground/80 font-light text-sm mb-4 ${idx % 2 === 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                                        {role.responsibilities.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>

                                    <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                                        {role.tags.map(tag => (
                                            <span key={tag} className="text-[10px] px-2 py-1 border border-white/10 rounded text-foreground/50 uppercase tracking-widest">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
