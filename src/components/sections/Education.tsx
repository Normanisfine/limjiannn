'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Education() {
    const [showMore, setShowMore] = useState(false);

    const courses = [
        { name: 'Machine Learning', gpa: '4.0' },
        { name: 'Machine Learning Systems', gpa: '3.7' },
        { name: 'Software Engineering', gpa: '4.0' },
        { name: 'AR/VR', gpa: '4.0' },
        { name: 'Image and Video Processing', gpa: '4.0' },
        { name: 'Vertically Integrated Projects', gpa: 'P' },
        { name: 'Operating System', gpa: '4.0' },
        { name: 'Design and Analysis of Algorithms', gpa: '4.0' },
        { name: 'Object Oriented Programming', gpa: '4.0' },
        { name: 'Data Structure', gpa: '4.0' },
        { name: 'Probability and Statistics', gpa: '4.0' },
        { name: 'Honors Numerical Analysis', gpa: '4.0' },
        { name: 'Computer Architecture', gpa: '4.0' },
        { name: 'Intro to Database', gpa: '4.0' },
        { name: 'Ordinary Differential Equation', gpa: '4.0' },
        { name: 'Discrete Math', gpa: '4.0' },
        { name: 'Calculus III', gpa: '4.0' },
    ];

    const displayedCourses = showMore ? courses : courses.slice(0, 4);

    return (
        <SectionWrapper id="education" className="flex flex-col justify-center container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-left text-glow pl-4 md:pl-12 md:border-l-4 md:border-l-secondary w-full">
                EDUCATION
            </h2>

            <div className="space-y-12 max-w-5xl mx-auto w-full">
                {/* NYU */}
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10 p-6 md:p-0 rounded-xl transition-colors duration-300">
                    <div className="w-24 h-24 flex-shrink-0 bg-white rounded-lg p-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        <Image src="/assets/nyu_logo.jpeg" alt="NYU" width={100} height={100} className="object-contain w-full h-full" />
                    </div>
                    <div className="flex-grow">
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                            <h3 className="text-3xl font-bold text-primary drop-shadow-md">New York University</h3>
                            <span className="text-foreground/60 font-mono text-lg">2024 - 2026</span>
                        </div>
                        <p className="text-xl font-semibold mb-2">B.S. in Computer Science; Minor in Mathematics</p>
                        <p className="text-secondary font-bold mb-1 text-xl">GPA: 3.972/4.0</p>
                        <p className="text-accent font-semibold mb-4 text-lg">Dean's List</p>
                        
                        {/* Honors and Grants */}
                        <div className="mb-6 space-y-2">
                            <div className="flex items-start gap-2">
                                <span className="text-yellow-400 mt-1">🏆</span>
                                <div>
                                    <p className="text-base font-semibold text-foreground/90">NextGenPhD Scholars Program</p>
                                    <p className="text-sm text-foreground/70">$5,000 research grant for 3D reconstruction and medical imaging (Fall 2025)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-yellow-400 mt-1">🏆</span>
                                <div>
                                    <p className="text-base font-semibold text-foreground/90">Undergraduate Summer Research Program (UGSRP)</p>
                                    <p className="text-sm text-foreground/70">$5,000 grant for research on 3D Gaussian Splatting (Summer 2025)</p>
                                </div>
                            </div>
                        </div>

                        {/* Courses */}
                        <div className="mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                <AnimatePresence>
                                    {displayedCourses.map((course, idx) => (
                                        <motion.div
                                            key={course.name}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex justify-between items-center border-b border-white/5 py-1"
                                        >
                                            <span className="text-sm md:text-base text-gray-300 font-light">{course.name}</span>
                                            <span className="text-xs font-mono text-primary/70">{course.gpa}</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="mt-4 text-sm font-medium text-primary/70 transition-colors flex items-center gap-1"
                            >
                                {showMore ? 'Show Less' : 'Show More'} <ChevronDown size={14} className={`transform transition-transform ${showMore ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* SUFE */}
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10 p-6 md:p-0 rounded-xl transition-colors duration-300">
                    <div className="w-24 h-24 flex-shrink-0 bg-white rounded-lg p-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        <Image src="/assets/sufe_logo.jpeg" alt="SUFE" width={100} height={100} className="object-contain w-full h-full" />
                    </div>
                    <div className="flex-grow">
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                            <h3 className="text-2xl font-bold text-secondary drop-shadow-md">Shanghai Univ. of Finance & Economics</h3>
                            <span className="text-foreground/60 font-mono text-lg">2022 - 2023</span>
                        </div>
                        <p className="text-xl font-semibold mb-2">B.S. in Accounting; Minor in Statistics</p>
                        <p className="text-secondary font-bold mb-4 text-xl">GPA: 3.71/4.0</p>
                        <ul className="list-disc pl-5 text-foreground/80 space-y-1 font-light">
                            <li>Renmin Scholarship First Prize</li>
                            <li>Mathematical Contest in Modeling (2nd Prize)</li>
                        </ul>
                    </div>
                </div>

            </div>
        </SectionWrapper>
    );
}
