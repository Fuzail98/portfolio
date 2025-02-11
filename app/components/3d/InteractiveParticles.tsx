import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const InteractiveParticles = () => {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 2000;

    const positions = useMemo(() => {
        const arr = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i += 3) {
            arr[i] = (Math.random() - 0.5) * 5;
            arr[i + 1] = (Math.random() - 0.5) * 5;
            arr[i + 2] = (Math.random() - 0.5) * 5;
        }
        return arr;
    }, []);

    useFrame(() => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    itemSize={3}
                    count={particleCount}
                />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="white" />
        </points>
    );
};

const ParticleBackground = () => {
    return (
        <Canvas className="absolute top-0 left-0 w-full h-full">
            <InteractiveParticles />
        </Canvas>
    );
};

export default ParticleBackground;
