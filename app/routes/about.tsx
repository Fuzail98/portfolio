import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import ParticleEffect from '~/components/3d/ParticleEffect';
import TechCube from '~/components/3d/TechCude';
import Nav from '~/components/Nav';

export default function About() {
  return (
    <div className={"relative min-h-screen transition-colors duration-700 bg-gray-900 text-white"}>
      <Nav />

      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?abstract,technology,code')" }}
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
            About Me
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-mono text-gray-800 dark:text-gray-200">
            Hi, I’m Mohamed Fuzail Shareef, a passionate software developer with a love for creating innovative solutions. With a strong foundation in computer science and years of experience in the tech industry, I specialize in building scalable and efficient applications.
          </p>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-mono text-gray-800 dark:text-gray-200">
            My journey in technology began with a curiosity for how things work, and it has since evolved into a career dedicated to solving complex problems and delivering high-quality software. I’m always eager to learn new technologies and collaborate with like-minded individuals.
          </p>
          <motion.button
            className="mt-6 sm:mt-8 px-6 py-3 text-lg sm:text-xl font-mono rounded-full bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-600 text-white shadow-xl transform hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              window.location.href = '/contact'; // Example: navigate to projects page
            }}
          >
            Get in Touch
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}  // Reduce the vertical movement for better spacing
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-full backdrop:blur-0 bg-gray-200 dark:bg-gray-700 p-96 rounded-xl"
        >
          {/* Right side content can go here */}
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Right Side Content</h2>
          <p className="text-center text-gray-700 dark:text-gray-300">
            This is an example of the right side content. You can add more details or images here.
          </p>
        </motion.div>
      </div>
    </div>
  );
}