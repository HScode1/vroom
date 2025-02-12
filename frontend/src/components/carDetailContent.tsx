'use client'

import React, { useState } from 'react';
import { MapPin, Camera, Share2, Heart, Shield, Star, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import VehicleDetails from '@/components/vehiculeDetails';
import { SimilarCarsSection } from '@/components/SimilarCarSection';
import MechanicalInspection from './MechanicalInspection';
import MaintenanceHistory from './MaintenanceHistory';
import PhotoViewer from './PhotoViewer';
import DeliveryModal from '@/components/DeliveryModal';

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
    transition={{ duration: 0.5, type: "spring" }}
  >
    <span className="text-4xl md:text-5xl font-bold tracking-tight">{price.toLocaleString()}</span>
    <span className="text-xl md:text-2xl mb-1">€</span>
    <span className="text-gray-500 mb-1 ml-2 text-base md:text-lg">TTC</span>
  </motion.div>
);

const KeyMetric = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center p-3 md:p-4 bg-white rounded-xl shadow-sm">
    <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#C8EC66] mb-1 md:mb-2" />
    <span className="text-xs md:text-sm text-gray-500">{label}</span>
    <span className="text-sm md:text-base font-semibold">{value}</span>
  </div>
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
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <section className="mb-6 md:mb-12">
          <PhotoViewer photos={photos} />
        </section>

        <section className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-12">
          <div className="md:col-span-2 bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-base md:text-lg">Disponible à Paris</span>
              </div>
              <div className="flex gap-2">
                <button className="p-1 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                  <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button 
                  className={`p-1 md:p-2 rounded-full transition ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className="w-4 h-4 md:w-5 md:h-5" fill={isFavorite ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
            <VehicleDetails />
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
              <PriceTag price={6448} />
              <button 
                onClick={() => {
                  console.log('Bouton cliqué');
                  setIsDeliveryModalOpen(true);
                  console.log('isDeliveryModalOpen après clic:', true);
                }}
                className="w-full mt-3 md:mt-4 bg-[#C8EC66] px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium text-black hover:bg-opacity-90 transition"
              >
                Réserver ce véhicule
              </button>
            </div>

            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Informations clés</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <KeyMetric icon={Camera} label="Kilométrage" value="30 000 km" />
                <KeyMetric icon={Star} label="Année" value="2008" />
                <KeyMetric icon={Shield} label="Garantie" value="12 mois" />
                <KeyMetric icon={MessageCircle} label="Propriétaires" value="3" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 md:mb-12">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Les plus de ce véhicule</h3>
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {advantages.map((text, index) => (
                <Advantage key={text} text={text} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </section>
          
        <MechanicalInspection />
        <MaintenanceHistory />
        <SimilarCarsSection />
      </main>

      {/* Modal placée en dehors des autres divs */}
      <DeliveryModal 
        isOpen={isDeliveryModalOpen}
        onClose={() => {
          console.log('Fermeture de la modal');
          setIsDeliveryModalOpen(false);
        }}
        onValidate={(option) => {
          console.log('Option sélectionnée:', option);
          setIsDeliveryModalOpen(false);
        }}
      />
    </div>
  );
}
