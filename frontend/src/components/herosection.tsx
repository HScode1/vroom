import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { ArrowRight, ChevronDown } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' }
};

const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col bg-gradient-to-b from-gray-900 to-black">
      <Navbar />

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/WhatsApp Video 2024-12-12 at 17.52.55.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4">
        <motion.div
          className="text-center max-w-5xl"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight"
          >
            Votre voiture idéale
            <span className="block text-[#C8EC66] mt-2">à portée de clic</span>
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Découvrez des véhicules d'occasion premium, inspectés et livrés chez vous avec une garantie complète.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(200, 236, 102, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#C8EC66] text-black rounded-full font-semibold text-lg flex items-center gap-2 shadow-lg hover:bg-[#b8dc56] transition-all"
            >
              Explorer les véhicules
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
            >
              Vendre ma voiture
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown className="w-10 h-10 text-[#C8EC66] opacity-75" />
      </motion.div>
    </section>
  );
};

export default HeroSection;