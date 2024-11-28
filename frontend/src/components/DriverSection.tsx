// DriverSections.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface DriverSectionProps {
  type: 'new' | 'pro';
  title: string;
  subtitle?: string;
  description: string;
  phone: string;
  direction: 'left' | 'right';
}

const DriverSection: React.FC<DriverSectionProps> = ({ 
  type, 
  title, 
  description, 
  phone,
  direction
}) => {
  return (
    <motion.div
      initial={{ 
        x: direction === 'left' ? -200 : 200,
        opacity: 0
      }}
      whileInView={{ 
        x: 0,
        opacity: 1
      }}
      viewport={{ 
        once: false,
        margin: "-100px"
      }}
      transition={{ 
        type: "spring",
        bounce: 0.2,
        duration: 1.8,
        delay: direction === 'left' ? 0 : 0.2
      }}
      className={`rounded-3xl p-8 ${type === 'new' ? 'bg-gray-100' : 'bg-[#DCFF85]'}`}
    >
      <div className="inline-block px-4 py-1 bg-white rounded-full text-sm mb-6">
        {type === 'new' ? 'Jeune permis' : 'Chauffeur privé'}
      </div>
      
      <h2 className="text-3xl font-bold mb-2">
        {title}
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-xl">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Nos véhicules
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
        >
          {phone}
        </motion.button>
      </div>
    </motion.div>
  );
};

const DownArrow: React.FC = () => (
  <motion.svg
    className="w-12 h-12 text-[#DCFF85] mx-auto my-8"
    viewBox="0 0 24 24"
    fill="currentColor"
    initial={{ y: -20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: false }}
    transition={{ duration: 1, delay: 0.5 }}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13l-4-4h8l-4 4z" />
  </motion.svg>
);

const DriverSections: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        className="text-2xl font-bold mb-4"
      >
        VOUS ÊTES
      </motion.h1>
      
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h2 className="text-xl text-gray-500 mb-2">Seul, on va plus vite,</h2>
        <p className="text-2xl text-[#DCFF85]">Ensemble on va plus loin.</p>
      </motion.div>
      
      <DownArrow />
      
      <div className="grid md:grid-cols-2 gap-6">
        <DriverSection
          type="new"
          direction="left"
          title="CONDUISEZ EN TOUTE SÉRÉNITÉ DÈS AUJOURD'HUI !"
          description="Vous venez d'obtenir votre permis et vous cherchez votre premier véhicule ? Nous vous proposons des voitures fiables, économiques et faciles à conduire, idéales pour les nouveaux conducteurs. Profitez de nos offres spéciales avec des facilités de paiement, afin de démarrer votre aventure sur la route en toute sérénité !"
          phone="06 19 93 37 65"
        />
        
        <DriverSection
          type="pro"
          direction="right"
          title="ALLIEZ CONFORT & ÉCONOMIE AU QUOTIDIEN !"
          description="Besoin d'un véhicule pour votre activité de chauffeur VTC ? Découvrez notre sélection de voitures confortables et élégantes, conçues pour offrir une expérience premium à vos clients. Nous proposons également des solutions de financement adaptées à votre profession."
          phone="06 19 93 37 65"
        />
      </div>
    </div>
  );
};

export default DriverSections;