import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Import Menu and X icons
import { useState } from 'react';

export default function Nav() {
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
        <div className="hidden md:flex space-x-8 text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">
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
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={"md:hidden absolute top-20 left-0 w-full p-5 space-y-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white"}>
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
