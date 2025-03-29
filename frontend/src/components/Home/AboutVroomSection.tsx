import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutVroomSection = () => {
  return (
    <div className="w-full bg-white py-12 md:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile and Desktop Layout Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Section: NOTRE HISTOIRE - Adjusted for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/3 text-center lg:text-left mb-8 lg:mb-0"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">NOTRE HISTOIRE</h2>
            <p className="text-gray-500 text-base sm:text-lg">Tout pour l&apos;automobile de demain.</p>
          </motion.div>

          {/* Center Section: Logo - Made responsive */}
          <div className="w-full lg:w-1/3 flex justify-center mb-8 lg:mb-0">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-black rounded-3xl shadow-lg">
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

          {/* Right Section: Slogan - Adjusted for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/3 text-center lg:text-right"
          >
            <p className="text-xl sm:text-2xl text-gray-800 px-4 sm:px-6 lg:px-0">
              Nous croyons que <span className="text-[#C8EC66] font-semibold">la meilleure route</span> est celle qui se
              construit avec <span className="text-[#C8EC66] font-semibold">nos clients</span>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutVroomSection;