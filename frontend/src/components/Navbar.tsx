'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Search, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      <div className={`w-full ${
        scrolled 
          ? 'bg-white/95 shadow-md' 
          : 'bg-white/80'
        } backdrop-blur-md border-b border-gray-100/50 transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="flex items-center"
            >
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/logo.png"
                  alt="VROOMPARIS LOGO"
                  width={60}
                  height={60}
                  className="[filter:brightness(0)_sepia(100%)_hue-rotate(80deg)_saturate(700%)_brightness(1.1)]"
                />
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Acheter', path: '/acheter' },
                { name: 'Vendre', path: '/vendre' },
                { name: 'Services', path: '#', hasDropdown: true },
                { name: 'À propos', path: '/a-propos' }
              ].map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="relative px-3 py-2 group"
                >
                  <Link
                    href={item.path}
                    className="text-gray-700 font-bold text-base hover:text-[#C8EC66] transition-colors flex items-center"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className="inline ml-1 w-3 h-3 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                  {/* Indicator for active link */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8EC66] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    whileHover={{ scaleX: 1 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-[#C8EC66] transition-colors"
              >
                <Search className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-[#C8EC66] transition-colors"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:text-[#C8EC66] transition-colors"
              >
                <User className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 0 15px rgba(200, 236, 102, 0.5)' 
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#C8EC66] text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#b8dc56] transition-all flex items-center gap-1"
              >
                Agence
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.div className="md:hidden" whileTap={{ scale: 0.9 }}>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-100"
            >
              <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
                {[
                  { name: 'ACHETER', path: '/acheter' },
                  { name: 'VENDRE', path: '/vendre' },
                  { name: 'SERVICES', path: '#' },
                  { name: 'À PROPOS', path: '/a-propos' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="block px-3 py-2 text-gray-700 font-bold text-base hover:bg-gray-50 hover:text-[#C8EC66] rounded-md transition-colors"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    className="flex-1 p-2 text-gray-700 font-medium text-sm hover:bg-gray-50 rounded-md border border-gray-200"
                    onClick={toggleMenu}
                  >
                    <Search className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    className="flex-1 p-2 text-gray-700 font-medium text-sm hover:bg-gray-50 rounded-md border border-gray-200"
                    onClick={toggleMenu}
                  >
                    <Heart className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    className="flex-1 p-2 text-gray-700 font-medium text-sm hover:bg-gray-50 rounded-md border border-gray-200"
                    onClick={toggleMenu}
                  >
                    <User className="w-4 h-4 mx-auto" />
                  </button>
                </div>
                
                <button
                  className="w-full mt-3 bg-[#C8EC66] text-black px-4 py-2 rounded-md font-medium text-sm hover:bg-[#b8dc56] transition-all rounded-full"
                  onClick={toggleMenu}
                >
                  AGENCE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;