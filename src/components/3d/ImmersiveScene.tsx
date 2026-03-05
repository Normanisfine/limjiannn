'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function SceneContent() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y += delta * 0.05;
    });

    return (
        <group ref={groupRef}>
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
            <Stars radius={150} depth={100} count={2000} factor={7} saturation={1} fade speed={1.5} />
            <Stars radius={50} depth={20} count={200} factor={10} saturation={1} fade speed={2} />
        </group>
    );
}

export default function ImmersiveScene({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen bg-background text-foreground">
            <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
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
                        <SceneContent />
                    </Canvas>
                </motion.div>
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
