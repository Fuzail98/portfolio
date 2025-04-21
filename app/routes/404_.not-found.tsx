import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import ParticleEffect from '~/components/3d/ParticleEffect';
import TechCube from '~/components/3d/TechCude';
import Nav from '~/components/Nav';

export default function NotFound() {
    return (
        <div className={"relative min-h-screen transition-colors duration-700 bg-gray-900 text-white"}>
            <Nav />


            <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?404,error,technology')" }}
            >
                <ParticleEffect />
            </div>

            <div className="flex items-center justify-center min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="relative flex flex-col items-center justify-center px-6 sm:px-10 py-16 max-w-3xl text-center backdrop-blur-lg bg-white/20 dark:bg-black/40 rounded-xl shadow-2xl"
                >
                    <div className="w-20 h-20 md:w-32 md:h-32">
                        <Canvas>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <TechCube />
                        </Canvas>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-mono tracking-tight leading-tight text-red-600 dark:text-red-400 mt-4 pb-1">
                        404 - Page Not Found
                    </h1>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-mono text-gray-800 dark:text-gray-200">
                        Oops! Looks like you've wandered off the map. The page you're looking for doesn’t exist or is still under development.
                    </p>
                    <motion.button
                        className="mt-6 sm:mt-8 px-6 py-3 text-lg sm:text-xl font-mono rounded-full bg-gradient-to-r from-red-600 to-red-400 hover:from-red-500 hover:to-red-600 text-white shadow-xl transform hover:scale-105 transition-all"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => {
                            window.location.href = '/'; // Navigate back to home
                        }}
                    >
                        Go Home
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}
