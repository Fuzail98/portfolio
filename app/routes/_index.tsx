import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParticleEffect from '~/components/3d/ParticleEffect';
import TechCube from '~/components/3d/TechCude';
import Nav from '~/components/Nav';

export default function Index() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return true; // Default to dark mode
  });

  useEffect(() => {
    // Ensure this runs only in the browser
    const savedMode = localStorage.getItem('darkMode');
    setDarkMode(savedMode === 'true'); // Convert to boolean
  }, []);

  useEffect(() => {
    if (darkMode !== null) { // Prevent running on first SSR render
      localStorage.setItem('darkMode', darkMode.toString());

      // Apply Tailwind's dark mode class
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode]);

  if (darkMode === null) return null; // Prevent flash on first render

  return (
    <div className={`relative min-h-screen transition-colors duration-700 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-100 to-green-300 text-gray-900'}`}>
      <Nav darkMode={darkMode} setDarkMode={setDarkMode} />

      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?abstract,technology,innovation')" }}
      >
        <ParticleEffect />
        {/* Small version of particle effect */}
        {/* <ParticleBackground />  */}
      </div>
      <div className="flex justify-between items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -30 }}  // Reduce the vertical movement for better spacing
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative flex flex-col items-center justify-center min-h-screen px-6 sm:px-10 py-16 max-w-3xl text-center backdrop-blur-lg bg-white/20 dark:bg-black/40 rounded-xl shadow-2xl"
        >
          <div className="w-20 h-20 md:w-32 md:h-32">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <TechCube />
            </Canvas>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-mono tracking-tight leading-tight bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mt-2 pb-1">
            Welcome to My Portfolio
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-mono text-gray-800 dark:text-gray-200">
            I’m Mohamed Fuzail Shareef, a passionate techie dedicated to innovation and excellence. Let's create something amazing together.
          </p>
          <motion.button
            className="mt-6 sm:mt-8 px-6 py-3 text-lg sm:text-xl font-mono rounded-full bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-600 text-white shadow-xl transform hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Explore More
          </motion.button>
        </motion.div>
        <div className="w-1/2 bg-gray-200 dark:bg-gray-800 p-6 rounded-xl">
          {/* Right side content can go here */}
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Right Side Content</h2>
          <p className="text-center text-gray-700 dark:text-gray-300">
            This is an example of the right side content. You can add more details or images here.
          </p>
        </div>
      </div>
    </div>
  );
}
