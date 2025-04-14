import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react'; // Import Menu and X icons
import { useState } from 'react';

// Define types for props
interface NavProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Nav({ darkMode, setDarkMode }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent py-5 z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          className="text-2xl text-green-600"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            to="/"
            className="text-4xl font-semibold text-green-600 hover:text-green-400 transition-all duration-500 transform hover:scale-105 hover:rotate-3"
          >
            MFS
          </Link>
        </motion.div>


        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg font-semibold">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <Link
              to="/"
              className="hover:text-green-400 transition duration-300 font-mono text-green-200"
            >
              Home
            </Link>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group"
          >
            <Link
              to="/about"
              className="hover:text-green-400 transition duration-300 font-mono text-green-200"
            >
              About
            </Link>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <Link
              to="/projects"
              className="hover:text-green-400 transition duration-300 font-mono text-green-200"
            >
              Projects
            </Link>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative group"
          >
            <Link
              to="/contact"
              className="hover:text-green-400 transition duration-300 font-mono text-green-200"
            >
              Contact
            </Link>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-500 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3 relative">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <X size={24} className="text-green-400" />
            ) : (
              <Menu size={24} className="text-green-400" />
            )}
          </button>

          {/* Dark/Light Mode Toggle Button */}
          <button
            className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-700 dark:from-gray-700 dark:to-gray-400 shadow-lg hover:scale-110 transition-transform mt-[-5px] z-50 relative"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} className="text-gray-900" />}
          </button>
        </div>

        {/* Dark/Light Mode Toggle Button in Desktop */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}  // Reduce the vertical movement for better spacing
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="hidden md:flex items-center">
          <button
            className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-700 dark:from-gray-700 dark:to-gray-400 shadow-lg hover:scale-110 transition-transform"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} className="text-gray-900" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden absolute top-20 left-0 w-full p-5 space-y-6 ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-green-500 to-green-400 text-green-700'}`}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <Link
              to="/"
              className="text-lg font-bold font-mono  hover:text-green-400 transition-all duration-300 text-green-200"
            >
              Home
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative group"
          >
            <Link
              to="/about"
              className="text-lg font-bold font-mono hover:text-green-400 transition-all duration-300 text-green-200"
            >
              About
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <Link
              to="/projects"
              className="text-lg font-bold font-mono hover:text-green-400 transition-all duration-300 text-green-200"
            >
              Projects
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative group"
          >
            <Link
              to="/contact"
              className="text-lg font-bold font0mono hover:text-green-400 transition-all duration-300 text-green-200"
            >
              Contact
            </Link>
          </motion.div>
        </div>
      )}
    </nav>
  );
}
