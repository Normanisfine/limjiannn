'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { Github, Code, Database, Brain, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: 'ML Systems Implementation',
        desc: 'Implemented GPU tensor operators (CUDA/C++) and MLP with auto-differentiation via pybind11. Achieved 97% MNIST accuracy with optimized kernels on NVIDIA T4 GPUs.',
        tags: ['CUDA', 'C++', 'Python', 'PyTorch', 'pybind11'],
        link: 'https://github.com/Normanisfine/baregrad',
        icon: <Brain size={32} className="text-purple-400" />,
        type: 'ML Systems',
        date: 'Fall 2025'
    },
    {
        title: 'SkyRoute: Airline Management System',
        desc: 'Cloud-based airline platform with flight scheduling, booking, and admin control. Normalized MySQL (3NF) on AWS RDS with Next.js RESTful APIs and CI/CD on Vercel.',
        tags: ['Next.js', 'MySQL', 'AWS RDS', 'Vercel', 'REST API'],
        link: 'https://github.com/Normanisfine/SkyRoute',
        icon: <Code size={32} className="text-blue-400" />,
        type: 'Full-Stack',
        date: 'Spring 2025'
    },
    {
        title: 'Portfolio Management with AI',
        desc: 'Portfolio management app with visualization dashboard for tracking holdings and market trends. Integrated LLMs and News API for sentiment analysis and tailored financial advice.',
        tags: ['BERT', 'Transformer', 'OpenAI', 'React', 'MongoDB', 'Express'],
        link: null,
        icon: <Brain size={32} className="text-green-400" />,
        type: 'Full-Stack + AI',
        date: 'Oct 2024 - Present'
    },
    {
        title: 'Kaggle: Jane Street Forecasting',
        desc: 'Real-time market data forecasting with data cleaning, PCA, clustering. Implemented SVM, CNN, RNN, LSTM, ARIMA with multiple sampling methods and regularizations.',
        tags: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'ARIMA'],
        link: 'https://github.com/Normanisfine/Kaggle-Jane-Street-2024',
        icon: <Brain size={32} className="text-yellow-400" />,
        type: 'ML/AI',
        date: 'Oct 2024 - Present'
    },
    {
        title: 'EcoPantry: AI Food Manager',
        desc: 'Food management app with user authentication and AI chatbox for health analysis and recipe suggestions. Features dashboard with search and MongoDB storage for user data.',
        tags: ['React', 'Express', 'MongoDB', 'Node.js', 'Azure API', 'Redux', 'Sass'],
        link: 'https://github.com/Normanisfine/EcoPantry',
        icon: <Database size={32} className="text-green-400" />,
        type: 'Full-Stack + AI',
        date: 'June 2024'
    },
    {
        title: 'Supply Chain Optimization',
        desc: 'Math modeling project optimizing pricing and restocking strategies for supermarket vegetables. Processed 80,000+ data points using Random Forest, ARIMA, and Particle Swarm Optimization.',
        tags: ['Python', 'NumPy', 'Pandas', 'Random Forest', 'ARIMA', 'PSO'],
        link: null,
        icon: <Brain size={32} className="text-orange-400" />,
        type: 'ML/Optimization',
        date: 'Sep 2023',
        award: '2nd Prize - China Mathematical Contest'
    }
];

export default function Projects() {
    return (
        <SectionWrapper id="projects" className="flex flex-col justify-center container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-glow">
                PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="group relative p-8 border border-white/10 bg-gradient-to-br from-white/5 to-transparent rounded-2xl hover:bg-white/10 transition-all duration-300 flex flex-col"
                    >
                        {/* Glow effect always visible when in view, but stronger on hover if desired. User asked for "strengthening without hovering" */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.6 }}
                            className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl -z-10"
                        />

                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-black/30 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors shadow-lg">
                                {project.icon}
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                                <span className="text-xs font-mono px-3 py-1 bg-white/5 rounded-full text-foreground/50 border border-white/5 tracking-wider">
                                    {project.type}
                                </span>
                                <span className="text-[10px] px-2 py-1 text-foreground/40">
                                    {project.date}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold mb-4 transition-colors">{project.title}</h3>
                        <p className="text-foreground/70 mb-6 leading-relaxed font-light min-h-[80px]">
                            {project.desc}
                        </p>

                        {project.award && (
                            <div className="mb-4 px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                <p className="text-sm text-yellow-400 font-semibold">🏆 {project.award}</p>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-1 bg-black/20 rounded text-foreground/50 border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex-grow"></div>

                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" 
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-300 font-semibold text-sm rounded-lg border border-blue-500/30 group/btn mt-4 w-fit">
                                <Github size={18} className="group-hover/btn:scale-110 transition-transform" /> 
                                <span>View on GitHub</span>
                                <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
