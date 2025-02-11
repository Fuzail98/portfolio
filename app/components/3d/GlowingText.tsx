import { Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

const GlowingText = () => {
    return (
        <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100%] h-[300px] font-mono font-semibold">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <Text
                        fontSize={1}
                        position={[0, 0, 0]}
                        color="#00ff00" // Neon Green
                    >
                        Welcome to my Portfolio!
                    </Text>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default GlowingText;
