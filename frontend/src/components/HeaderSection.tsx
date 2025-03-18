import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeaderSection = () => {
  return (
    <div className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Section: NOTRE HISTOIRE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-0 lg:w-1/3 text-left lg:text-left text-center"
        >
          <h2 className="text-6xl font-extrabold text-gray-900 mb-6">NOTRE HISTOIRE</h2>
          <p className="text-gray-500 text-lg">Tout pour l'automobile de demain.</p>
        </motion.div>

        {/* Center Section: Logo */}
        <div className="lg:w-1/3 flex justify-center">
          <div className="relative w-48 h-48 bg-black rounded-3xl shadow-lg">
            <Image
              src="/images/logo.png"
              alt="Vroom Logo"
              fill
              className="object-contain"
              priority
              aria-label="Logo de Vroom"
            />
          </div>
        </div>

        {/* Right Section: Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:w-1/3 text-right mt-12 lg:mt-0 text-center lg:text-right"
        >
          <p className="text-2xl text-gray-800">
            Nous croyons que <span className="text-[#C8EC66] font-semibold">la meilleure route</span> est celle qui se
            construit avec <span className="text-[#C8EC66] font-semibold">nos clients</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeaderSection;