'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Popup from '@/components/popup';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className={`w-full ${scrolled ? 'bg-white/95 shadow-md' : 'bg-white/80'} backdrop-blur-md border-b border-gray-100/50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
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
            <div className="hidden md:flex items-center space-x-2 relative">
              {[
                { name: 'Véhicules', path: '/vehicules' },
                // { name: 'Commander', path: '/commander' },
                // { name: 'Vendre', path: '/vendre' },
                { name: 'Solutions', path: '#', hasDropdown: true },
                { name: 'Rendez-vous', path: '#', action: () => setShowPopup(true) },
                { name: 'À propos', path: '/a-propos' }
              ].map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="relative px-3 py-2 group"
                  onMouseEnter={() => item.hasDropdown && setShowSolutions(true)}
                  onMouseLeave={() => item.hasDropdown && setShowSolutions(false)}
                >
                  {item.hasDropdown ? (
                    <span className="text-gray-700 font-bold text-base hover:text-[#C8EC66] cursor-pointer flex items-center">
                      {item.name}
                      <ChevronDown className="inline ml-1 w-3 h-3 transition-transform group-hover:rotate-180" />
                    </span>
                  ) : item.action ? (
                    <span
                      className="text-gray-700 font-bold text-base hover:text-[#C8EC66] cursor-pointer"
                      onClick={item.action}
                    >
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-gray-700 font-bold text-base hover:text-[#C8EC66]"
                    >
                      {item.name}
                    </Link>
                  )}

                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8EC66] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

                  {/* Dropdown Solutions */}
                  {item.hasDropdown && showSolutions && (
                    <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-56 z-50">
                      {[
                        { name: 'Jeunes Permis', id: 'jeunes-permis' },
                        { name: 'Chauffeurs VTC', id: 'jeunes-permis' }, // Note: id is the same as 'Jeunes Permis'
                        { name: 'Entreprises', id: 'entreprises' }
                      ].map((link) => (
                        <button
                          key={link.name}
                          onClick={() => scrollToSection(link.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {link.name}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center">
              {isSignedIn ? (
                <motion.div className="relative">
                  <div className="absolute -inset-0.5 bg-[#C8EC66]/50 rounded-full opacity-70 blur-sm"></div>
                  <div className="relative">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 rounded-full",
                        },
                      }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div className="flex items-center gap-4">
                  <SignInButton mode="modal">
                    <button className="flex items-center gap-1 text-gray-700 font-medium hover:text-[#C8EC66] transition-colors">
                      <User className="w-4 h-4" />
                      Se connecter
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    {/* Fixed unescaped apostrophe */}
                    <button className="bg-[#C8EC66] text-black px-4 py-1.5 rounded-full font-medium hover:bg-[#b8dc56] transition-all">
                      S&apos;inscrire
                    </button>
                  </SignUpButton>
                </motion.div>
              )}
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
                  { name: 'Véhicules', path: '/vehicules' },
                //   { name: 'Commander', path: '/commander' }, // Uncomment if needed
                //   { name: 'Vendre', path: '/vendre' }, // Uncomment if needed
                  { name: 'Jeunes Permis', id: 'jeunes-permis' },
                  { name: 'Chauffeurs VTC', id: 'jeunes-permis' }, // Note: id is the same as 'Jeunes Permis'
                  { name: 'Entreprises', id: 'entreprises' },
                  { name: 'Rendez-vous', action: () => {
                    setShowPopup(true);
                    setIsOpen(false);
                  }},
                  { name: 'À propos', path: '/a-propos' }
                ].map((item) => (
                  item.id ? (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left px-3 py-2 text-gray-700 font-bold text-base hover:bg-gray-50 hover:text-[#C8EC66] rounded-md transition-colors"
                    >
                      {item.name}
                    </button>
                  ) : item.action ? (
                    <button
                      key={item.name}
                      onClick={item.action}
                      className="block w-full text-left px-3 py-2 text-gray-700 font-bold text-base hover:bg-gray-50 hover:text-[#C8EC66] rounded-md transition-colors"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.path as string} // Added 'as string' for type safety
                      className="block px-3 py-2 text-gray-700 font-bold text-base hover:bg-gray-50 hover:text-[#C8EC66] rounded-md transition-colors"
                      onClick={toggleMenu}
                    >
                      {item.name}
                    </Link>
                  )
                ))}

                {/* Auth mobile */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {isSignedIn ? (
                    <div className="w-full flex justify-center py-2">
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-10 h-10 rounded-full",
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <SignInButton mode="modal">
                        <button className="w-full border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors">
                          SE CONNECTER
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        {/* Fixed unescaped apostrophe */}
                        <button className="w-full bg-[#C8EC66] text-black px-4 py-2 rounded-md font-medium text-sm hover:bg-[#b8dc56] transition-all">
                          S&apos;INSCRIRE
                        </button>
                      </SignUpButton>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Popup pour les rendez-vous */}
      {showPopup && <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} />}
    </motion.nav>
  );
};

export default Navbar;