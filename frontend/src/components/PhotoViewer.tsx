'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Expand, X, Info, Heart, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoViewerProps {
  photos: string[];
  carName?: string;
  carPrice?: string;
  carYear?: number;
  carMileage?: number;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({ 
  photos, 
  carName = "Véhicule", 
  carPrice = "25 990 €",
  carYear = 2022,
  carMileage = 60668
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Gestion du plein écran et synchronisation
  useEffect(() => {
    setIsClient(true);
    
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      if (!isNowFullscreen) {
        setShowInfo(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape' && isFullscreen) document.exitFullscreen();
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFullscreen]);

  // Gestion des gestes tactiles
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextPhoto();
      else prevPhoto();
      setTouchStart(null);
    }
  };

  const nextPhoto = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const toggleFullscreen = useCallback(() => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.error('Erreur lors de la tentative de plein écran:', err);
        });
      } else {
        document.exitFullscreen().catch(err => {
          console.error('Erreur lors de la sortie du plein écran:', err);
        });
      }
    } catch (error) {
      console.error('Erreur de gestion du plein écran:', error);
    }
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  const baseContent = (
    <motion.div 
      className="absolute inset-0 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Overlay amélioré */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
      
      {/* Header */}
      <motion.div 
        className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 md:p-6 pointer-events-auto"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">{carName}</h1>
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
            {currentIndex + 1}/{photos.length}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all shadow-md ${
              isFavorite 
                ? 'bg-[#C8EC66] text-gray-900' 
                : 'bg-white/30 text-white hover:bg-white/40'
            }`}
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-gray-900' : ''}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white/30 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-all shadow-md"
            aria-label="Partager"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all shadow-md ${
              showInfo 
                ? 'bg-[#C8EC66] text-gray-900' 
                : 'bg-white/30 text-white hover:bg-white/40'
            }`}
            aria-label={showInfo ? "Masquer les infos" : "Afficher les infos"}
          >
            <Info className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Contrôles */}
      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 flex items-end justify-between pointer-events-auto">
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevPhoto}
            className="p-2 md:p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-all shadow-md"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextPhoto}
            className="p-2 md:p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-all shadow-md"
            aria-label="Photo suivante"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>
        
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-10 px-5 py-2.5 bg-black/30 backdrop-blur-sm rounded-full text-[#C8EC66] font-medium shadow-lg border border-[#C8EC66]/30"
          >
            Utilisez les flèches <span className="font-bold">←</span> <span className="font-bold">→</span> pour naviguer
          </motion.div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleFullscreen}
          className="p-2 md:p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-all shadow-md"
          aria-label={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
        >
          {isFullscreen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Expand className="w-5 h-5 md:w-6 md:h-6" />}
        </motion.button>
      </div>
      
      {/* Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute left-4 md:left-6 right-4 md:right-6 bottom-20 md:bottom-24 bg-black/70 backdrop-blur-md rounded-xl p-4 shadow-xl pointer-events-auto"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{carName}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  <div className="flex items-center text-gray-300">
                    <span className="inline-block w-3 h-3 rounded-full bg-[#C8EC66] mr-2"></span>
                    {carYear}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="inline-block w-3 h-3 rounded-full bg-[#C8EC66] mr-2"></span>
                    {formatNumber(carMileage)} km
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="inline-block w-3 h-3 rounded-full bg-[#C8EC66] mr-2"></span>
                    Diesel
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="inline-block w-3 h-3 rounded-full bg-[#C8EC66] mr-2"></span>
                    Automatique
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#C8EC66]">{carPrice}</div>
                <span className="text-gray-300 text-sm">Prix TTC</span>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-2.5 bg-[#C8EC66] text-gray-900 font-medium rounded-lg hover:bg-[#d4f080] transition-all"
              >
                Réserver ce véhicule
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-2.5 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-all"
              >
                Voir tous les détails
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const thumbnails = (
    <motion.div 
      className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-auto z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex gap-2 bg-black/50 backdrop-blur-md rounded-xl p-3 max-w-[90%] overflow-x-auto shadow-lg">
        {photos.map((photo, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsLoading(true);
              setCurrentIndex(index);
            }}
            className={`relative flex-shrink-0 w-20 h-12 md:w-24 md:h-16 rounded-md overflow-hidden border-2 transition-all ${
              index === currentIndex ? 'border-[#C8EC66]' : 'border-white/30'
            }`}
          >
            <img 
              src={photo} 
              alt={`Miniature ${index + 1}`} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {index === currentIndex && (
              <motion.div 
                className="absolute inset-0 bg-[#C8EC66]/30"
                layoutId="activeThumbnail"
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  if (!isClient) {
    return (
      <div className="relative h-[300px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
        <img src={photos[0]} alt="Photo du véhicule" className="w-full h-full object-cover" />
        {baseContent}
      </div>
    );
  }

  return (
    <div 
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'h-[300px] md:h-[500px] lg:h-[600px]'} rounded-2xl overflow-hidden shadow-2xl`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Filtres rapides */}
      {!isFullscreen && (
        <motion.div 
          className="absolute top-16 right-4 z-30 flex flex-col gap-2 pointer-events-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-black/50 backdrop-blur-md p-2 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/20 hover:bg-[#C8EC66] hover:text-black text-white rounded-lg transition-all text-sm font-medium"
              >
                Extérieur
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/20 hover:bg-[#C8EC66] hover:text-black text-white rounded-lg transition-all text-sm font-medium"
              >
                Intérieur
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white/20 hover:bg-[#C8EC66] hover:text-black text-white rounded-lg transition-all text-sm font-medium"
              >
                Moteur
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Indicateur de chargement */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-20 bg-black/30 backdrop-blur-sm"
          >
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-[#C8EC66] animate-spin"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image principale */}
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentIndex}
          src={photos[currentIndex]}
          alt={`Photo ${currentIndex + 1} de ${carName}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onLoad={handleImageLoad}
          onError={() => setIsLoading(false)}
        />
      </AnimatePresence>

      {/* Contenu overlay */}
      {baseContent}
      {!isFullscreen && thumbnails}
    </div>
  );
};

export default PhotoViewer;