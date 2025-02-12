'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3
    }
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <motion.div 
        className="w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <nav className="bg-white/80 shadow-lg rounded-full border border-gray-100">
          <div className="mx-auto px-4 lg:px-6">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/" className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src="/images/logo.png"
                        alt="VroomParis Logo"
                        width={60}
                        height={60}
                        priority
                        className="[filter:brightness(0)_sepia(100%)_hue-rotate(80deg)_saturate(700%)_brightness(1.1)]"
                      />
                    </motion.div>
                  </Link>
                </div>
                {/* Navigation desktop */}
                <div className="hidden sm:ml-4 sm:flex sm:items-center sm:space-x-6">
                  {['Acheter', 'Vendre', 'Services'].map((item, index) => (
                    <motion.div
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href={item === 'Services' ? '#' : `/${item.toLowerCase()}`}
                        className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:text-[#C8EC66] transition-colors"
                      >
                        {item}
                        {item === 'Services' && <ChevronDown className="ml-1 h-4 w-4" />}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Bouton Estimer */}
              <motion.div 
                className="hidden sm:ml-6 sm:flex sm:items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="bg-[#C8EC66] text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg flex items-center gap-2">
                  Estimer ma voiture
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </button>
              </motion.div>

              {/* Bouton menu mobile */}
              <motion.div 
                className="-mr-2 flex items-center sm:hidden"
                whileTap={{ scale: 0.9 }}
              >
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#C8EC66] transition-colors"
                >
                  <span className="sr-only">Ouvrir le menu</span>
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 180 }}
                        exit={{ rotate: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="block h-6 w-6" aria-hidden="true" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 180 }}
                        animate={{ rotate: 0 }}
                        exit={{ rotate: 180 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="block h-6 w-6" aria-hidden="true" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Menu mobile */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="sm:hidden overflow-hidden"
              >
                <div className="pt-2 pb-3 space-y-1">
                  {['Acheter', 'Vendre', 'Services'].map((item, index) => (
                    <motion.div
                      key={item}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item === 'Services' ? '#' : `/${item.toLowerCase()}`}
                        className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-[#C8EC66] hover:bg-gray-50 transition-colors"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    className="mt-4 px-4 pb-4"
                  >
                    <button className="w-full bg-[#C8EC66] text-black px-4 py-2.5 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                      Estimer ma voiture
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.div>
    </div>
  )
}

export default Navbar