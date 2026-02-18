'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GaussianParticlesProps {
    count?: number;
    radius?: number;
}

export default function GaussianParticles({ count = 20, radius = 5 }: GaussianParticlesProps) {
    const pointsRef = useRef<THREE.Points>(null);

    // Vertex Shader: positions points & passes rotation
    const vertexShader = `
    uniform float uTime;
    attribute float size;
    attribute vec3 color;
    attribute float rotation; // Rotation angle
    attribute vec3 speed;     // Movement speed/direction params
    
    varying vec3 vColor;
    varying float vRotation;
    
    void main() {
      // Structured movement: slow drift + sine wave 
      vec3 pos = position;
      
      // Add subtle flow based on time and original position
      pos.x += sin(uTime * 0.1 + pos.z) * 0.2;
      pos.y += cos(uTime * 0.15 + pos.x) * 0.2;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      
      // Giant size for 3DGS look
      gl_PointSize = size * (1000.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      
      vColor = color;
      vRotation = rotation;
    }
  `;

    // Fragment Shader: creates soft Ellipsoid Splat
    const fragmentShader = `
    varying vec3 vColor;
    varying float vRotation;
    
    void main() {
      // 1. Rotate the point coordinates
      float c = cos(vRotation);
      float s = sin(vRotation);
      vec2 center = vec2(0.5);
      vec2 uv = gl_PointCoord - center;
      
      // Standard 2D rotation matrix
      vec2 rotatedUV = vec2(
          uv.x * c - uv.y * s,
          uv.x * s + uv.y * c
      );
      
      // 2. Scale specifically to make it an ellipsoid (e.g. 2:1 ratio)
      // Dividing x by 0.5 stretches it, or just use distance metric
      // Let's make it a squashed glowing blob
      
      float distSq = (rotatedUV.x * rotatedUV.x) * 4.0 + (rotatedUV.y * rotatedUV.y);
      
      // 3. Gaussian fade: exp(-distSq * factor)
      // Low factor = soft. 
      // We want really soft, so factor ~ 6.0
      float alpha = exp(-distSq * 6.0);
      
      // 4. Cap alpha to avoid bright white centers (clipping)
      // "Not intense center" -> scale alpha down
      alpha = alpha * 0.4; 

      if (alpha < 0.01) discard;
      
      gl_FragColor = vec4(vColor, alpha);
    }
  `;

    const generatedData = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const rotations = new Float32Array(count);

        // No velocity array needed for shader-based movement, 
        // but we can keep one if we want CPU interaction later.

        const colorPalette = [
            new THREE.Color('#06b6d4'),
            new THREE.Color('#8b5cf6'),
            new THREE.Color('#3b82f6'),
            new THREE.Color('#A020F0'), // Purple 
        ];

        for (let i = 0; i < count; i++) {
            // Distribute them widely but avoid center screen clutter
            // Use a wider spread
            const r = Math.sqrt(Math.random()) * radius * 1.5;
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            // Darken colors slightly to prevent whiteout
            colors[i * 3] = color.r * 0.8;
            colors[i * 3 + 1] = color.g * 0.8;
            colors[i * 3 + 2] = color.b * 0.8;

            // Giant random sizes
            sizes[i] = Math.random() * 8.0 + 4.0;

            // Random initial rotation
            rotations[i] = Math.random() * Math.PI * 2;
        }

        return { positions, colors, sizes, rotations };
    }, [count, radius]);

    useFrame((state) => {
        if (pointsRef.current) {
            // Pass time to shader
            const material = pointsRef.current.material as THREE.ShaderMaterial;
            if (material.uniforms) {
                material.uniforms.uTime.value = state.clock.elapsedTime;
            }
        }
    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
    }), []);

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={generatedData.positions}
                    itemSize={3}
                    args={[generatedData.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={generatedData.colors}
                    itemSize={3}
                    args={[generatedData.colors, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={generatedData.sizes}
                    itemSize={1}
                    args={[generatedData.sizes, 1]}
                />
                <bufferAttribute
                    attach="attributes-rotation"
                    count={count}
                    array={generatedData.rotations}
                    itemSize={1}
                    args={[generatedData.rotations, 1]}
                />
            </bufferGeometry>
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending} // Or NormalBlending? Additive creates whiteout.
            // Switching to Normal Blending to avoid whiteout if user dislikes it.
            // But generally particles need Additive. Let's stick to Additive with low alpha.
            />
        </points>
    );
}
