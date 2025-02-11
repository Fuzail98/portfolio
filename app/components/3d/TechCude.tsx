// TechCube.tsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const TechCube = () => {
    const cubeRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (cubeRef.current) {
            cubeRef.current.rotation.y += 0.01;
            cubeRef.current.rotation.x += 0.005;
        }
    });

    return (
        <mesh ref={cubeRef}>
            <boxGeometry args={[3, 3, 3]} />
            <meshStandardMaterial color="limegreen" />
        </mesh>
    );
};

export default TechCube;
