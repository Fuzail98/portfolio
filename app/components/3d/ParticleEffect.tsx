import { PointMaterial, Points } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const ParticleCloud = () => {
    const ref = useRef<THREE.Points>(null);
    const count = 5000;

    // Generate random positions
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 5;
        }
        return arr;
    }, []);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.001;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial size={0.015} color="white" transparent opacity={0.8} />
        </Points>
    );
};

const ParticleEffect = () => {
    return (
        <Canvas camera={{ position: [0, 0, 3], fov: 75 }} className="absolute inset-0">
            <ambientLight intensity={0.5} />
            <ParticleCloud />
        </Canvas>
    );
};

export default ParticleEffect;
