import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParticleEffect from '~/components/3d/ParticleEffect';
import TechCube from '~/components/3d/TechCude';
import Nav from '~/components/Nav';
import projects from "~/data/projects.json";
import constants from '~/utils/constants';

export default function ChatAppDownload() {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('darkMode') === 'true';
        }
        return true;
    });
    const navigate = useNavigate();

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        setDarkMode(savedMode === 'true');
    }, []);

    useEffect(() => {
        if (darkMode !== null) {
            localStorage.setItem('darkMode', darkMode.toString());
            document.documentElement.classList.toggle('dark', darkMode);
        }
    }, [darkMode]);

    const thisProject = projects.find((project) => project.id === constants.CHAT_APP_ID);
    useEffect(() => {
        if (!thisProject) {
            navigate("/404/not-found");
        }
    }, [thisProject, navigate]);
    return (
        <div className={`relative min-h-screen transition-colors duration-700 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-100 to-green-300 text-gray-900'}`}>
            <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?abstract,technology,innovation')" }}>
                <ParticleEffect />
            </div>

            {/* Flexbox layout to split the screen */}
            <div className="flex justify-between items-center min-h-screen">
                {/* Left Side */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }} // Reduce the vertical movement for better spacing
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="relative flex flex-col items-center justify-center min-h-screen px-6 sm:px-10 py-16 max-w-3xl text-center backdrop-blur-lg bg-white/20 dark:bg-black/40 rounded-xl shadow-2xl"
                >
                    <div className="container mx-auto p-6 max-w-4xl text-center mt-20">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                            Download ChatTy Chat App
                        </h1>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="flex justify-center mt-8"
                        >
                            <Canvas className="w-40 h-40">
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} />
                                <OrbitControls enableZoom={false} />
                                <TechCube />
                            </Canvas>
                        </motion.div>
                        <p className="mt-4 text-lg">Are you looking for ChatTy Chat App? Download from the following links:</p>
                        <div className="overflow-x-auto mt-6">
                            <motion.table
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="w-full border-collapse border border-gray-400 text-left"
                            >
                                <thead>
                                    <tr className="bg-gray-200 dark:bg-gray-700">
                                        <th className="border p-2">OS</th>
                                        <th className="border p-2">OS-Version</th>
                                        <th className="border p-2">Hardware Architecture</th>
                                        <th className="border p-2">Environment</th>
                                        <th className="border p-2">Download</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border p-2">Ubuntu</td>
                                        <td className="border p-2">22.04</td>
                                        <td className="border p-2">amd64</td>
                                        <td className="border p-2">Dev</td>
                                        <td className="border p-2">
                                            <a
                                                className="text-blue-600 hover:underline"
                                                href="/README.md"
                                                download="README.md"
                                            >
                                                Download
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">Ubuntu</td>
                                        <td className="border p-2">22.04</td>
                                        <td className="border p-2">amd64</td>
                                        <td className="border p-2">UAT</td>
                                        <td className="border p-2">
                                            <a className="text-blue-600 hover:underline" href="">
                                                Download
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">Mac-OS</td>
                                        <td className="border p-2">Sequoia 15.3.1</td>
                                        <td className="border p-2">Apple M2</td>
                                        <td className="border p-2">Dev</td>
                                        <td className="border p-2">
                                            <a
                                                className="text-blue-600 hover:underline"
                                                href="/README.md"
                                                download="README.md"
                                            >
                                                Download
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border p-2">Windows</td>
                                        <td className="border p-2">Windows 10</td>
                                        <td className="border p-2">64 bits</td>
                                        <td className="border p-2">NIL</td>
                                        <td className="border p-2">
                                            <a className="text-gray-500 cursor-not-allowed">Download (Coming Soon)</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </motion.table>
                        </div>
                    </div>
                    <footer className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
                        &copy; 2025 Fuzail Shareef. All rights reserved.
                    </footer>
                </motion.div>

                {/* Right Side */}
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
