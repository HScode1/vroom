"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Phone, Check, AlertCircle, Camera, Share2, X, Download, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimilarCarsSection } from '@/components/SimilarCarSection';
import { Footer } from '@/components/Footer';
import VehiculeDetails from '@/components/vehiculeDetails';

const photos = [
  '/toyota/E114833244_STANDARD_2.jpg',
  '/toyota/E114833244_STANDARD_3.jpg',
  '/toyota/E114833244_STANDARD_4.jpg',
  '/toyota/E114833244_STANDARD_5.jpg',
  '/toyota/E114833244_STANDARD_6.jpg',
  '/toyota/E114833244_STANDARD_9.jpg',
  '/toyota/E114833244_STANDARD_12.jpg',
  '/toyota/E114833244_STANDARD_13.jpg',
  '/toyota/E114833244_STANDARD_14.jpg',
  '/toyota/E114833244_STANDARD_15.jpg',
];

const PhotoGallery = ({ isOpen, onClose, initialPhotoIndex, photos }) => {
    const [currentIndex, setCurrentIndex] = useState(initialPhotoIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const [loading, setLoading] = useState(true);
  
    const nextPhoto = (e) => {
      e?.stopPropagation();
      setIsZoomed(false);
      setLoading(true);
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    };
  
    const prevPhoto = (e) => {
      e?.stopPropagation();
      setIsZoomed(false);
      setLoading(true);
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };
  
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') onClose();
    };
  
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Header */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="fixed top-0 left-0 right-0 flex justify-between items-center p-6 bg-gradient-to-b from-black/50 to-transparent z-50"
            >
              <div className="flex items-center gap-4 text-white">
                <span className="text-lg font-medium">
                  {currentIndex + 1} / {photos.length}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 text-white hover:bg-white/10 rounded-full transition">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-white hover:bg-white/10 rounded-full transition">
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 text-white hover:bg-white/10 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
  
            {/* Main Image */}
            <div className="h-full flex items-center justify-center p-4">
              <button
                onClick={prevPhoto}
                className="fixed left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all transform hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
  
              <motion.div
                className="relative max-w-full max-h-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                )}
                <motion.img 
                  src={photos[currentIndex]}
                  alt={`View ${currentIndex + 1}`}
                  className={`max-h-[85vh] object-contain cursor-zoom-in transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  onLoad={() => setLoading(false)}
                  style={{ opacity: loading ? 0 : 1 }}
                />
              </motion.div>
  
              <button
                onClick={nextPhoto}
                className="fixed right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all transform hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
  
            {/* Thumbnails */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent"
            >
              <div className="max-w-6xl mx-auto p-6">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  {photos.map((photo, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                        setLoading(true);
                        setIsZoomed(false);
                      }}
                      className={`relative flex-shrink-0 group ${
                        currentIndex === index ? 'ring-2 ring-white' : ''
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src={photo}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-20 w-32 object-cover rounded-lg brightness-75 group-hover:brightness-100 transition-all"
                      />
                      {currentIndex === index && (
                        <motion.div 
                          layoutId="thumbnail-highlight"
                          className="absolute inset-0 bg-white/20 rounded-lg"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );

};
  

 


const MainGallerySection = ({ photos, onOpenGallery, setSelectedPhotoIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextImage = (e) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    };
  
    const prevImage = (e) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };
  
    // Prépare les 3 images suivantes pour les miniatures
    const thumbnailImages = [
      photos[(currentIndex + 1) % photos.length],
      photos[(currentIndex + 2) % photos.length],
      photos[(currentIndex + 3) % photos.length]
    ];
  
    return (
      <div className="grid grid-cols-12 gap-4">
        {/* Image principale */}
        <div className="col-span-8 relative rounded-2xl overflow-hidden group">
          <div className="relative w-full h-[600px] overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={photos[currentIndex]}
                  alt="Vue principale"
                  className="w-full h-full object-cover object-left"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Overlay sombre au hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  
          {/* Contrôles */}
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevImage}
              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
  
            <button
              onClick={nextImage}
              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
  
          {/* Compteur de photos et bouton galerie */}
          <div className="absolute bottom-0 inset-x-0 p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {photos.length}
            </span>
  
            <button 
              onClick={() => {
                setSelectedPhotoIndex(currentIndex);
                onOpenGallery(true);
              }}
              className="flex items-center gap-2 bg-white/90 hover:bg-white text-black px-4 py-2 rounded-full text-sm transition-colors"
            >
              <Camera className="w-4 h-4" />
              Toutes les photos
            </button>
          </div>
        </div>
  
        {/* Miniatures */}
        <div className="col-span-4 flex flex-col gap-4">
          {thumbnailImages.map((photo, index) => (
            <div 
              key={index}
              className="relative h-[190px] rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => {
                setSelectedPhotoIndex((currentIndex + index + 1) % photos.length);
                onOpenGallery(true);
              }}
            >
              <img 
                src={photo}
                alt={`Miniature ${index + 1}`}
                className="w-full h-full object-cover object-left"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    );
};

  

export default function CarDetailPage() {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <PhotoGallery 
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        initialPhotoIndex={selectedPhotoIndex}
        photos={photos}
      />
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">TOYOTA PRIUS 1.5 VVT-i</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="bg-[#BADA55] text-black px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" />
              06 49 49 39 39
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <MainGallerySection 
          photos={photos}
          onOpenGallery={setShowGallery}
          setSelectedPhotoIndex={setSelectedPhotoIndex}
        />
       
       
        
        {/* Price and Info */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <div className="bg-gray-50 rounded-3xl p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Prix TTC</p>
                  <h2 className="text-4xl font-bold">6 448 €</h2>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="bg-black text-white px-6 py-3 rounded-full"
                >
                  Prendre un rendez-vous
                </motion.button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Kilométrage", value: "30 000 KM" },
                  { label: "Année", value: "2008" },
                  { label: "Carburant", value: "ESSENCE" }
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-2xl p-4">
                    <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Services */}
            <div className="bg-[#BADA55]/10 rounded-3xl p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Un achat tout inclus</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Inspection mécanique et administrative",
                  "Contrôle technique",
                  "Révision & Entretien",
                  "Livraison à votre domicile",
                  "Préparation esthétique"
                ].map((service) => (
                  <div key={service} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#BADA55]" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {[
                { title: "Point fort", items: ["Android Auto", "Apple CarPlay", "Caméra de recul"] },
                { title: "Confort", items: ["Climatisation automatique", "Clim. automatique bi-zone"] },
                { title: "Sécurité", items: ["Attaches isofix", "Désactivation airbag passager avant"] }
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold mb-3">{section.title}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {section.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#BADA55]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            <div className="bg-black text-white rounded-3xl p-6">
              <AlertCircle className="w-6 h-6 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Besoin d'un conseil ?</h3>
              <p className="text-gray-300 mb-4">Nos experts sont là pour vous aider dans votre choix de véhicule.</p>
              <button className="w-full bg-white text-black rounded-full py-3 font-medium hover:bg-gray-100 transition-colors">
                Contactez-nous
              </button>
            </div>
          </div>
        </div>
        < VehiculeDetails />
          {/* Nouvelle section de véhicules similaires */}
          <div className="border-t border-gray-100">
                <SimilarCarsSection />
        </div>
      </div>
      <Footer/>
    </div>
  );
}