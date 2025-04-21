import { Canvas } from '@react-three/fiber';
import { useNavigate } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

import ParticleEffect from '~/components/3d/ParticleEffect';
import TechCube from '~/components/3d/TechCude';
import Nav from '~/components/Nav';
import projects from "~/data/projects.json";

export default function Projects() {
  const navigate = useNavigate();

  // State for hovered project
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <div className={"relative min-h-screen transition-colors duration-700 bg-gray-900 text-white"}>
      <Nav />

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
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-mono tracking-tight leading-tight bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mt-2 pb-1">
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
        <motion.div
          initial={{ opacity: 0, y: -30 }}  // Reduce the vertical movement for better spacing
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full backdrop:blur-0 bg-gray-200 dark:bg-gray-800 p-96 rounded-xl"
        >
          {selectedProject !== null ? (
            <>
              <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">{projects[selectedProject].title}</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">{projects[selectedProject].description}</p>
              <p className="mt-4 text-sm font-mono text-gray-500 dark:text-gray-400">Technologies: {projects[selectedProject].tech}</p>
            </>
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-300">Hover over a project to see the details here OR click on the project to know more.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
