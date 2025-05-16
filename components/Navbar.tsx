import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => {
    return router.pathname === path ? 'font-bold text-primary' : '';
  };

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hover: { scale: 1.05, color: '#2563eb' }
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md border-b border-blue-50' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center relative"
              >
                <div className="hidden sm:block absolute -top-3 -left-3 w-6 h-6 rounded-full bg-blue-100"></div>
                <div className="hidden sm:block absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-blue-100"></div>
                <span className="text-2xl font-bold text-primary relative">Signal</span>
              </motion.div>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-8">
              <Link href="/" className={`px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary ${isActive('/')}`}>
                <motion.span whileHover="hover" variants={linkVariants} className="relative">
                  Home
                  {router.pathname === '/' && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"></span>
                  )}
                </motion.span>
              </Link>
              <Link href="/features" className={`px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary ${isActive('/features')}`}>
                <motion.span whileHover="hover" variants={linkVariants} className="relative">
                  Features
                  {router.pathname === '/features' && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"></span>
                  )}
                </motion.span>
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary hover:bg-blue-50 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="sm:hidden bg-white shadow-md border-t border-blue-50"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                router.pathname === '/' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-blue-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/features"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                router.pathname === '/features' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-blue-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar; 