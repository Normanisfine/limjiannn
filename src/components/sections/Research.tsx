'use client';

import React from 'react';
import Image from 'next/image';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

export default function Research() {
    const danceVideos = [
        { name: 'AttitudePromenade', src: '/assets/dance_videos/AttitudePromenade.webm' },
        { name: 'BartSimpson', src: '/assets/dance_videos/BartSimpson.webm' },
        { name: 'BiancaGolden_Chimee', src: '/assets/dance_videos/BiancaGolden_Chimee.webm' },
        { name: 'Chacha', src: '/assets/dance_videos/Chacha.webm' },
        { name: 'HouseFootworkAdvanced', src: '/assets/dance_videos/HouseFootworkAdvanced.webm' },
        { name: 'RobertRubama_RussiaCostume', src: '/assets/dance_videos/RobertRubama_RussiaCostume.webm' },
    ];

    return (
        <SectionWrapper id="research" className="flex flex-col justify-center container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-glow">
                RESEARCH
            </h2>

            <div className="max-w-7xl mx-auto">

                {/* Main Project */}
                <div id="research-3d" className="w-full space-y-8">
                    <h3 className="text-3xl font-bold text-primary mb-4 drop-shadow-lg">
                        NYU Video Lab: 3D Dancing Human Reconstruction Dataset
                    </h3>

                    <div className="flex flex-wrap gap-3 mb-6">
                        {['Computer Vision', '3DGS', 'PyTorch', 'Camera Calibration', 'Unity AR/VR', 'Unreal Engine' ].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs uppercase tracking-wider border border-primary/20">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="text-lg text-foreground/80 font-light leading-relaxed mb-4">
                        A benchmark dataset with multiview, multiframe human dancer sequences, including building a full pipeline for raw data processing, 3D Gaussian construction with PSNR ≈ 34.
                    </p>

                    <p className="text-lg text-foreground/80 font-light leading-relaxed mb-4">
                        Unity player integrated with AR/VR capabilities for real-time 3D Gaussian Splatting visualization, enabling interactive playback on mobile devices with seamless cross-platform deployment.
                    </p>

                    <p className="text-lg text-foreground/80 font-light leading-relaxed mb-6">
                        Unreal Engine plugin with native VR support for immersive 3D reconstruction visualization, featuring high-performance rendering and interactive VR display capabilities for enhanced spatial understanding.
                    </p>

                    <a href="https://nyuvideolab.github.io/DanceNet3D/" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-medium border-b border-yellow-400/30 hover:border-yellow-300/50 pb-1 mb-8">
                        <ExternalLink size={18} /> View DanceNet3D Dataset
                    </a>

                    {/* Dancing Human Videos - Horizontal Scroll */}
                    <div className="mb-8">
                        <h4 className="text-xl font-semibold mb-4 text-secondary">3D Reconstruction Examples</h4>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
                            {danceVideos.map((video) => (
                                <div key={video.name} className="flex-shrink-0 w-64 md:w-80">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-auto rounded-lg border border-white/10 shadow-lg"
                                    >
                                        <source src={video.src} type="video/webm" />
                                        <source src={video.src.replace('.webm', '.mp4')} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <p className="text-sm text-foreground/60 mt-2 text-center">{video.name.replace(/_/g, ' ')}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Unity AR/VR Display */}
                    <div className="mb-12">
                        <h4 className="text-2xl font-bold mb-6 text-secondary">Unity AR/VR Display</h4>
                        <div className="flex flex-col md:flex-row gap-8 items-center bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-2xl border border-white/5">
                            <div className="w-full md:w-2/5 max-w-xs rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                                <video
                                    src="/assets/unity_ar_display.mp4"
                                    controls
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="w-full md:w-3/5 space-y-4 flex flex-col justify-center h-full">
                                <div className="space-y-4">
                                    <p className="text-lg text-foreground/90 leading-relaxed font-light">
                                        A Unity plugin for streaming and playing back animated 3D Gaussian Splatting sequences in real time, with AR and VR support.
                                    </p>
                                    <div className="space-y-3 bg-black/20 p-5 rounded-lg border border-white/5">
                                        <h5 className="text-lg font-bold text-primary flex items-center gap-2 mb-3">
                                            <span className="w-1 h-5 bg-primary rounded"></span>
                                            Key Features
                                        </h5>
                                        <ul className="text-base text-foreground/80 space-y-2.5 pl-1">
                                            <li className="flex items-start gap-3">
                                                <span className="text-primary mt-1 text-lg">▹</span>
                                                <span className="leading-relaxed">Real-time sequence playback with transport controls</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-primary mt-1 text-lg">▹</span>
                                                <span className="leading-relaxed">Play, Pause, Loop modes with adjustable speed (0.1x - 5x)</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-primary mt-1 text-lg">▹</span>
                                                <span className="leading-relaxed">Batch conversion of PLY files to optimized assets</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-primary mt-1 text-lg">▹</span>
                                                <span className="leading-relaxed">VR/AR support for Quest 3, Vive, Varjo and more</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-primary mt-1 text-lg">▹</span>
                                                <span className="leading-relaxed">Interactive timeline and frame-by-frame scrubbing</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <a href="https://github.com/Normanisfine/Unity_Stream_GS" target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 font-semibold text-base group">
                                        <Github size={20} className="group-hover:scale-110 transition-transform" /> 
                                        <span className="border-b border-blue-400/30 group-hover:border-blue-300">View GitHub Repository</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Unreal Display */}
                    <div className="mb-12">
                        <h4 className="text-2xl font-bold mb-6 text-secondary">Unreal Engine Display</h4>
                        <div className="flex flex-col md:flex-row gap-8 items-center bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-2xl border border-white/5">
                            <div className="w-full md:w-2/5 max-w-xs rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                                <video
                                    src="/assets/unreal_display.mp4"
                                    controls
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="w-full md:w-3/5 space-y-4 flex flex-col justify-center">
                                <p className="text-lg text-foreground/90 leading-relaxed font-light">
                                    A production-ready Unreal Engine plugin for streaming and rendering animated 3D Gaussian Splatting sequences with native VR integration.
                                </p>
                                <div className="space-y-3 bg-black/20 p-4 rounded-lg border border-white/5">
                                    <h5 className="text-lg font-bold text-accent flex items-center gap-2">
                                        <span className="w-1 h-5 bg-accent rounded"></span>
                                        Key Features
                                    </h5>
                                    <ul className="text-base text-foreground/80 space-y-2 pl-1">
                                        <li className="flex items-start gap-2">
                                            <span className="text-accent mt-1">▹</span>
                                            <span>Memory-efficient streaming with bounded VRAM (60MB for unlimited lengths)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-accent mt-1">▹</span>
                                            <span>Built-in playback UI with keyboard controls (P, comma, period)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-accent mt-1">▹</span>
                                            <span>Full transport controls: Play, Pause, Stop, frame scrubbing</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-accent mt-1">▹</span>
                                            <span>Multi-sequence playlist with runtime switching</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-accent mt-1">▹</span>
                                            <span>Native VR support with immersive display capabilities</span>
                                        </li>
                                        {/* <li className="flex items-start gap-2">
                                            <span className="text-accent mt-1">▹</span>
                                            <span>Click-to-select actor control for multi-actor scenes</span>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MRI Research Section */}
                    <div id="research-mri" className="mt-16 pt-16 border-t border-white/10">
                        <h3 className="text-3xl font-bold text-primary mb-6 drop-shadow-lg">
                            Deep Learning Based Accelerated MR Image Reconstruction
                        </h3>

                        {/* Links Section - Right under heading */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <a href="https://github.com/Normanisfine/IVP_MRI_Final" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-300 font-semibold text-sm rounded-lg border border-blue-500/30 group">
                                <Github size={18} className="group-hover:scale-110 transition-transform" /> 
                                <span>GitHub Repository</span>
                            </a>
                            <a href="/assets/mri_report.pdf" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:text-green-300 transition-all duration-300 font-semibold text-sm rounded-lg border border-green-500/30 group">
                                <ExternalLink size={18} className="group-hover:scale-110 transition-transform" /> 
                                <span>Research Report</span>
                            </a>
                            <a href="/assets/mri_presentation.pptx" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-300 font-semibold text-sm rounded-lg border border-purple-500/30 group">
                                <ExternalLink size={18} className="group-hover:scale-110 transition-transform" /> 
                                <span>Presentation</span>
                            </a>
                        </div>

                        <div className="space-y-8">
                            <div className="flex flex-wrap gap-3">
                                {['Deep Learning', 'MRI', 'PyTorch', 'CUDA', 'FastMRI', 'Diffusion Models'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-secondary/10 text-secondary text-xs uppercase tracking-wider border border-secondary/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p className="text-lg text-foreground/80 font-light leading-relaxed">
                                Research on deep learning–based magnetic resonance (MR) image reconstruction, aiming to accelerate scan times by reconstructing high-quality images from undersampled k-space data.
                            </p>

                            <p className="text-lg text-foreground/80 font-light leading-relaxed">
                                Comprehensive evaluation study of supervised, self-supervised, and zero-shot learning approaches using CNN, UNet, and diffusion-based models (Variational Networks, Score-based Diffusion Models) on the FastMRI dataset.
                            </p>

                            {/* Technical Achievements - Before images */}
                            <div className="bg-black/20 p-6 rounded-lg border border-white/5">
                                <h5 className="text-lg font-bold text-secondary flex items-center gap-2 mb-4">
                                    <span className="w-1 h-5 bg-secondary rounded"></span>
                                    Technical Achievements & Results
                                </h5>
                                <ul className="text-base text-foreground/80 space-y-2.5 pl-1">
                                    <li className="flex items-start gap-3">
                                        <span className="text-secondary mt-1 text-lg">▹</span>
                                        <span className="leading-relaxed"><strong className="text-foreground/90">VarNet Implementation:</strong> Achieved PSNR of 34.62 ± 3.78 dB with 4× acceleration and 0.24s inference time per slice</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-secondary mt-1 text-lg">▹</span>
                                        <span className="leading-relaxed"><strong className="text-foreground/90">Score-Based Diffusion:</strong> Implemented SENSE parallel imaging achieving 12.5× speedup (from 30,000 to 2,000 evaluations)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-secondary mt-1 text-lg">▹</span>
                                        <span className="leading-relaxed"><strong className="text-foreground/90">Multi-GPU HPC:</strong> Refined PyTorch/CUDA implementations with distributed training achieving 4× speedup in performance</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-secondary mt-1 text-lg">▹</span>
                                        <span className="leading-relaxed"><strong className="text-foreground/90">Systematic Evaluation:</strong> Tested 7 checkpoints to identify optimal model (epoch 50) with best generalization performance</span>
                                    </li>
                                </ul>
                            </div>

                            {/* MRI Image Reconstruction Flow */}
                            <div className="bg-gradient-to-r from-secondary/5 to-transparent p-8 rounded-2xl border border-white/5">
                                <h4 className="text-xl font-semibold mb-6 text-secondary text-center">Image Reconstruction Pipeline</h4>
                                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                    {/* Undersampled Image */}
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-red-500/50 shadow-xl">
                                            <Image
                                                src="/assets/mri_undersampled.jpeg"
                                                alt="Undersampled MRI"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-lg text-red-400">Undersampled</p>
                                            <p className="text-sm text-foreground/60">Low-quality input</p>
                                        </div>
                                    </div>

                                    {/* Arrow with DL Model label */}
                                    <div className="flex flex-col items-center">
                                        <ArrowRight className="text-primary hidden md:block" size={48} strokeWidth={2.5} />
                                        <div className="text-center mt-2 mb-2">
                                            <p className="font-bold text-primary text-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/30">
                                                Deep Learning Model
                                            </p>
                                            <p className="text-xs text-foreground/50 mt-1">UNet / Diffusion</p>
                                        </div>
                                        <ArrowRight className="text-primary hidden md:block" size={48} strokeWidth={2.5} />
                                    </div>

                                    {/* Recovered Image */}
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-green-500/50 shadow-xl">
                                            <Image
                                                src="/assets/mri_recovered.jpeg"
                                                alt="Recovered MRI"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-lg text-green-400">Recovered</p>
                                            <p className="text-sm text-foreground/60">High-quality output</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </SectionWrapper>
    );
}
