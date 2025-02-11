import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';

const NeuralNetwork = () => {
    const nodes = useMemo(() => {
        const arr = new Float32Array(300 * 3);
        for (let i = 0; i < 300 * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 4;
        }
        return arr;
    }, []);

    return (
        <Canvas>
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" array={nodes} count={100} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.05} color="white" />
            </points>
        </Canvas>
    );
};

export default NeuralNetwork;
