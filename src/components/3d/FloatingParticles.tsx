'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingParticlesProps {
    count?: number;
    radius?: number;
}

export default function FloatingParticles({ count = 50, radius = 5 }: FloatingParticlesProps) {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate initial random particle positions and velocities (slower)
    const particles = useMemo(() => {
        const data = [];
        for (let i = 0; i < count; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);

            // Random position within a sphere
            const x = radius * Math.random() * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.random() * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.random() * Math.cos(phi);

            // Random subtle velocity (drift)
            // Much slower than the previous network
            const vx = (Math.random() - 0.5) * 0.002;
            const vy = (Math.random() - 0.5) * 0.002;
            const vz = (Math.random() - 0.5) * 0.002;

            data.push({ x, y, z, vx, vy, vz });
        }
        return data;
    }, [count, radius]);

    // Positions array for the Points geometry
    const positions = useMemo(() => new Float32Array(count * 3), [count]);

    useFrame(() => {
        if (!pointsRef.current) return;

        // Update particle positions
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.z += p.vz;

            // Soft wrap around boundary
            const dist = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
            if (dist > radius) {
                // Gently push back towards center instead of hard bounce
                p.vx -= p.x * 0.0001;
                p.vy -= p.y * 0.0001;
                p.vz -= p.z * 0.0001;
            }

            positions[i * 3] = p.x;
            positions[i * 3 + 1] = p.y;
            positions[i * 3 + 2] = p.z;
        });

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            {/* Softer, possibly transparent material */}
            <pointsMaterial
                size={0.1}
                color="#06b6d4" // Cyan-ish, can be changed
                sizeAttenuation
                transparent
                opacity={0.6}
            />
        </points>
    );
}
