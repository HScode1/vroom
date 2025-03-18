'use client'

import React, { useState } from 'react';
import { MapPin, Camera, Share2, Heart, Shield, Star, MessageCircle, ChevronDown, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VehicleDetails from '@/components/vehiculeDetails';
import { SimilarCarsSection } from '@/components/SimilarCarSection';
import MaintenanceHistory from './MaintenanceHistory';
import PhotoViewer from './PhotoViewer';
import DeliveryModal from '@/components/DeliveryModal';
import MechanicalInspection from './MechanicalInspection';

const photos = [
  '/toyota/E114833244_STANDARD_2.jpg',
  '/toyota/E114833244_STANDARD_3.jpg',
  '/toyota/E114833244_STANDARD_4.jpg',
  '/toyota/E114833244_STANDARD_5.jpg',
  '/toyota/E114833244_STANDARD_6.jpg',
];

const PriceTag = ({ price }) => (
  <motion.div 
    className="flex items-end gap-1 mb-3 md:mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
  >
    <span className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">{price.toLocaleString()}</span>
    <span className="text-xl md:text-2xl mb-1 text-gray-900">€</span>
    <span className="text-gray-500 mb-1 ml-2 text-base md:text-lg">TTC</span>
  </motion.div>
);

const KeyMetric = ({ icon: Icon, label, value }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="flex flex-col items-center p-3 md:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
  >
    <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#C8EC66] mb-1 md:mb-2" />
    <span className="text-xs md:text-sm text-gray-500">{label}</span>
    <span className="text-sm md:text-base font-semibold text-gray-900">{value}</span>
  </motion.div>
);

const Advantage = ({ text, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-2"
  >
    <Shield className="w-4 h-4 md:w-5 md:h-5 text-[#C8EC66]" />
    <span className="text-sm md:text-base">{text}</span>
  </motion.div>
);

// Composant de contrôle mécanique interactif
const MechanicalInspectionInteractive = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  
  const inspectionSections = [
    {
      id: 'engine',
      title: 'Moteur et transmission',
      items: [
        { name: 'Démarrage moteur', status: 'pass' },
        { name: 'Niveau d\'huile', status: 'pass' },
        { name: 'Liquide de refroidissement', status: 'pass' },
        { name: 'Boîte de vitesses', status: 'pass' },
        { name: 'Régime de ralenti', status: 'warning', note: 'Légère instabilité à froid' }
      ]
    },
    {
      id: 'brakes',
      title: 'Système de freinage',
      items: [
        { name: 'Plaquettes avant', status: 'pass' },
        { name: 'Plaquettes arrière', status: 'pass' },
        { name: 'Disques avant', status: 'pass' },
        { name: 'Disques arrière', status: 'warning', note: 'Usure légère mais dans les normes' },
        { name: 'Liquide de frein', status: 'pass' }
      ]
    },
    {
      id: 'suspension',
      title: 'Suspension et direction',
      items: [
        { name: 'Amortisseurs avant', status: 'pass' },
        { name: 'Amortisseurs arrière', status: 'pass' },
        { name: 'Rotules de direction', status: 'pass' },
        { name: 'Silentblocs', status: 'pass' },
        { name: 'Alignement', status: 'pass' }
      ]
    },
    {
      id: 'electric',
      title: 'Système électrique',
      items: [
        { name: 'Batterie', status: 'pass' },
        { name: 'Alternateur', status: 'pass' },
        { name: 'Éclairage', status: 'pass' },
        { name: 'Démarreur', status: 'pass' },
        { name: 'Systèmes électroniques', status: 'pass' }
      ]
    }
  ];

  const toggleSection = (id) => {
    if (expandedSection === id) {
      setExpandedSection(null);
    } else {
      setExpandedSection(id);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pass':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <Shield className="w-4 h-4 text-amber-500" />;
      case 'fail':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pass':
        return 'bg-green-100 border-green-200 text-green-800';
      case 'warning':
        return 'bg-amber-100 border-amber-200 text-amber-800';
      case 'fail':
        return 'bg-red-100 border-red-200 text-red-800';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  return (
    <motion.section 
      className="mb-6 md:mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <motion.div 
        className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">Contrôle mécanique</h3>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Check className="w-3 h-3 mr-1" /> Conforme
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              <Shield className="w-3 h-3 mr-1" /> À surveiller
            </span>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {inspectionSections.map((section) => (
            <div 
              key={section.id} 
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <motion.button
                whileHover={{ backgroundColor: 'rgba(200, 236, 102, 0.05)' }}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 py-3 md:py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{section.title}</span>
                <motion.div
                  animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                      <ul className="space-y-2 md:space-y-3">
                        {section.items.map((item, index) => (
                          <li key={index} className="flex items-start justify-between">
                            <div className="flex items-center">
                              <div className={`p-1 rounded-full mr-2 ${getStatusColor(item.status)}`}>
                                {getStatusIcon(item.status)}
                              </div>
                              <span className="text-sm md:text-base text-gray-800">{item.name}</span>
                            </div>
                            {item.note && (
                              <span className="text-xs md:text-sm italic text-gray-600">{item.note}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default function CarDetailContent() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  const advantages = [
    "Garantie 12 mois incluse",
    "Contrôle technique à jour",
    "Historique d'entretien complet",
    "Reprise possible de votre véhicule"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Ajouter plus d'espace avant le contenu principal */}
        <div className="mt-8 md:mt-10 lg:mt-12"></div>
        
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 md:mb-12"
        >
          <PhotoViewer 
            photos={photos}
            carName="Toyota Yaris"
          />
        </motion.section>

        <section className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-12">
          <motion.div 
            className="md:col-span-2 bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex justify-between items-center mb-4 md:mb-6 px-2">
              <motion.div 
                className="flex items-center gap-2 text-gray-600"
                whileHover={{ scale: 1.02 }}
              >
                <MapPin className="w-5 h-5 text-[#C8EC66]" />
                <span className="text-base md:text-lg font-medium">Paris, France</span>
              </motion.div>
              <div className="flex gap-2">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  title="Partager"
                >
                  <Share2 className="w-5 h-5 text-gray-600" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setIsFavorite(!isFavorite)}
                  title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <Heart 
                    className="w-5 h-5" 
                    fill={isFavorite ? "currentColor" : "none"} 
                  />
                </motion.button>
              </div>
            </div>
            <VehicleDetails />
          </motion.div>

          <motion.div 
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.01 }}
            >
              <PriceTag price={6448} />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDeliveryModalOpen(true)}
                className="w-full mt-3 md:mt-4 bg-[#C8EC66] px-4 md:px-6 py-3 md:py-4 rounded-xl font-medium text-black hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md"
              >
                Réserver ce véhicule
              </motion.button>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900">Informations clés</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <KeyMetric icon={Camera} label="Kilométrage" value="30 000 km" />
                <KeyMetric icon={Star} label="Année" value="2008" />
                <KeyMetric icon={Shield} label="Garantie" value="12 mois" />
                <KeyMetric icon={MessageCircle} label="Propriétaires" value="3" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <motion.section 
          className="mb-6 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-gray-900">Les plus de ce véhicule</h3>
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {advantages.map((text, index) => (
                <Advantage key={text} text={text} delay={index * 0.1} />
              ))}
            </div>
          </motion.div>
        </motion.section>
          
        <MechanicalInspection />
        <MaintenanceHistory />
        <SimilarCarsSection />
      </main>

      <DeliveryModal 
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        onValidate={(option) => {
          console.log('Option sélectionnée:', option);
          setIsDeliveryModalOpen(false);
        }}
      />
    </div>
  );
}