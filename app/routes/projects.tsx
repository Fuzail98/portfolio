import { Canvas } from '@react-three/fiber';
import { useNavigate } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import ParticleEffect from '~/components/3d/ParticleEffect';
import TechCube from '~/components/3d/TechCude';
import Nav from '~/components/Nav';
import projects from "~/data/projects.json";

export default function Projects() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return true; // Default to dark mode
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    setDarkMode(savedMode === 'true');
  }, []);

  useEffect(() => {
    if (darkMode !== null) {
      localStorage.setItem('darkMode', darkMode.toString());
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode]);

  if (darkMode === null) return null;

  // State for hovered project
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <div className={`relative min-h-screen transition-colors duration-700 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 to-blue-300 text-gray-900'}`}>
      <Nav darkMode={darkMode} setDarkMode={setDarkMode} />

      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?abstract,technology,code')" }}
      >
        <ParticleEffect />
      </div>

      <div className="flex justify-between items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
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
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-mono tracking-tight leading-tight bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mt-2 pb-1">
            My Projects
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-mono text-gray-800 dark:text-gray-200">
            Hi, I’m Mohamed Fuzail Shareef, a passionate software developer with a love for creating innovative solutions.
          </p>

          {/* Project List */}
          <div className="mt-8 w-full">
            <ul>
              {projects.map((project, index) => (
                <motion.li
                  key={index}
                  className="mb-4 cursor-pointer hover:text-blue-500"
                  onClick={() => navigate(project.link)}
                  onMouseEnter={() => setSelectedProject(index)}
                  onMouseLeave={() => setSelectedProject(null)}
                >
                  <h2 className="text-xl font-bold" >{project.title}</h2>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Side: Project Details */}
        <div className="w-1/2 bg-gray-200 dark:bg-gray-800 p-6 rounded-xl">
          {selectedProject !== null ? (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">{projects[selectedProject].title}</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">{projects[selectedProject].description}</p>
              <p className="mt-4 text-sm font-mono text-gray-500 dark:text-gray-400">Technologies: {projects[selectedProject].tech}</p>
            </>
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-300">Hover over a project to see the details here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
