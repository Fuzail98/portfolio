import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const GlassCard = () => {
    const cardRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (cardRef.current) {
            cardRef.current.rotation.y += 0.002;
        }
    });

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <mesh ref={cardRef}>
                <planeGeometry args={[2, 3]} />
                <meshStandardMaterial
                    color="white"
                    transparent
                    opacity={0.3}
                    roughness={0.1}
                    metalness={0.9}
                />
            </mesh>
        </Canvas>
    );
};

export default GlassCard;
