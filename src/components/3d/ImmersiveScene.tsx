'use client';

// Force Rebuild
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, Stars, useScroll } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const SECTION_OFFSETS = {
    hero: 0,
    about: 0.13,
    education: 0.28,
    research: 0.45,
    internship: 0.60,
    projects: 0.75,
    contact: 0.92
};

import GaussianParticles from './GaussianParticles';

function ScrollHandler() {
    const scroll = useScroll();

    useEffect(() => {
        const handleScrollTo = (e: any) => {
            const id = e.detail;
            const element = document.getElementById(id);
            if (element && scroll.el) {
                // Find the relative offset of the target element within the scroll container
                const containerRect = scroll.el.getBoundingClientRect();
                const elementRect = element.getBoundingClientRect();
                const relativeOffset = elementRect.top - containerRect.top + scroll.el.scrollTop;

                scroll.el.scrollTo({
                    top: relativeOffset,
                    behavior: 'smooth'
                });
            }
        };

        window.addEventListener('scroll-to-section', handleScrollTo);
        return () => window.removeEventListener('scroll-to-section', handleScrollTo);
    }, [scroll.el]);

    return null;
}

function SceneContent() {
    const scroll = useScroll();
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Gentle background rotation
        groupRef.current.rotation.y += delta * 0.05;

        // Smooth scroll interaction (tilting the network)
        const targetRotationX = scroll.offset * Math.PI * 0.5;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, delta * 2);
    });

    return (
        <group ref={groupRef}>
            <ScrollHandler />
            {/* Layer 1: Base stars - white, dense, steady */}
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

            {/* Layer 2: Distant stars - subtle, blue tint (via slight saturation and speed) */}
            <Stars radius={150} depth={100} count={2000} factor={7} saturation={1} fade speed={1.5} />

            {/* Layer 3: Close-up "hero" stars - brighter, cyan/blue feel */}
            <Stars radius={50} depth={20} count={200} factor={10} saturation={1} fade speed={2} />

            {/* Ambient blue glow stars can be simulated with slightly more saturation in distant layers */}
        </group>
    );
}

export default function ImmersiveScene({ children }: { children: React.ReactNode }) {
    const [pages, setPages] = useState(10);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculatePages = () => {
            if (contentRef.current) {
                const contentHeight = contentRef.current.scrollHeight;
                const viewportHeight = window.innerHeight;
                // Calculate pages based on content height, with minimum of 8 and add 1 for buffer
                const calculatedPages = Math.max(8, Math.ceil(contentHeight / viewportHeight) + 1);
                setPages(calculatedPages);
            }
        };

        // Calculate on mount and when window resizes
        calculatePages();
        window.addEventListener('resize', calculatePages);
        
        // Recalculate after a short delay to account for content loading
        const timer = setTimeout(calculatePages, 500);

        return () => {
            window.removeEventListener('resize', calculatePages);
            clearTimeout(timer);
        };
    }, [children]);

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-background text-foreground">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="w-full h-full"
            >
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <pointLight position={[-10, -10, -5]} color="#8b5cf6" intensity={1} />

                    <ScrollControls pages={pages} damping={0.6} distance={1}>
                        <SceneContent />
                        <Scroll html style={{ width: '100vw' }}>
                            <div ref={contentRef} className="w-full px-4 md:px-12 relative z-10 pointer-events-auto">
                                {children}
                            </div>
                        </Scroll>
                    </ScrollControls>
                </Canvas>
            </motion.div>
        </div>
    );
}
