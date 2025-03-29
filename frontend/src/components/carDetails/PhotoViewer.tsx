'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image'; // Import next/image
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

  const nextPhoto = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Gestion du plein écran et synchronisation
  useEffect(() => {
    setIsClient(true);

    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      if (!isNowFullscreen) {
        setShowInfo(false); // Close info panel when exiting fullscreen
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape' && document.fullscreenElement) {
         document.exitFullscreen().catch(err => console.error("Error exiting fullscreen:", err));
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
       // Ensure exit fullscreen if component unmounts while in fullscreen
       if (document.fullscreenElement) {
         document.exitFullscreen().catch(err => console.error("Error exiting fullscreen on unmount:", err));
       }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- Added nextPhoto and prevPhoto
  }, [nextPhoto, prevPhoto]); // Add missing dependencies

  // Gestion des gestes tactiles
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null || e.touches.length === 0) return; // Check touch length
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    const threshold = 50; // Minimum distance to trigger swipe

    if (Math.abs(diff) > threshold) {
      if (diff > 0) { // Swipe left
        nextPhoto();
      } else { // Swipe right
        prevPhoto();
      }
      setTouchStart(null); // Reset touch start after swipe action
    }
  };

  const handleTouchEnd = () => {
    // Reset touch start if move wasn't enough to trigger swipe
    setTouchStart(null);
  };


  const toggleFullscreen = useCallback(() => {
    const element = document.documentElement; // Target the whole page typically

    try {
      if (!document.fullscreenElement) {
        // Attempt to enter fullscreen
        element.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        // Attempt to exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(err => {
             console.error(`Error attempting to disable full-screen mode: ${err.message} (${err.name})`);
          });
        }
      }
    } catch (error) {
      console.error('Fullscreen API error:', error);
    }
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
   const handleImageError = () => {
    setIsLoading(false);
    console.error("Error loading image:", photos[currentIndex]);
    // Optionally move to the next image or show a placeholder
  };


  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  // Base overlay content (buttons, info)
  const baseContent = (
    <motion.div
      className="absolute inset-0 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Improved Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Header */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 md:p-6 pointer-events-auto"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
      >
        <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm p-2 rounded-lg shadow-md">
          <h1 className="text-lg md:text-xl font-bold text-white line-clamp-1">{carName}</h1>
          <span className="px-2.5 py-1 bg-white/20 rounded-full text-xs text-white flex-shrink-0">
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
                : 'bg-black/30 text-white hover:bg-black/50' // Adjusted non-favorite style
            }`}
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-gray-900' : ''}`} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all shadow-md"
            aria-label="Partager"
            // Add share functionality here
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
                : 'bg-black/30 text-white hover:bg-black/50' // Adjusted non-info style
            }`}
            aria-label={showInfo ? "Masquer les infos" : "Afficher les infos"}
          >
            <Info className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Controls */}
      <div className={`absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 flex items-end ${isFullscreen ? 'justify-between' : 'justify-start'} pointer-events-auto`}>
        {/* Prev/Next always visible */}
         <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevPhoto}
            className="p-2 md:p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-all shadow-lg" // Increased shadow
            aria-label="Photo précédente"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextPhoto}
            className="p-2 md:p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-all shadow-lg" // Increased shadow
            aria-label="Photo suivante"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
         </div>

        {/* Fullscreen hint - Only in fullscreen mode */}
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full text-[#C8EC66] font-medium text-xs shadow-lg border border-[#C8EC66]/30"
          >
            Flèches <span className="font-bold mx-1">←</span> <span className="font-bold mx-1">→</span> / Swipe / Echap pour quitter
          </motion.div>
        )}

        {/* Expand/Collapse Button - Position depends on fullscreen */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleFullscreen}
          className={`p-2 md:p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/50 transition-all shadow-lg ${isFullscreen ? '' : 'absolute right-4 md:right-6 bottom-4 md:bottom-6'}`} // Adjust position
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            // Adjust bottom position based on whether thumbnails are shown
            className={`absolute left-4 md:left-6 right-4 md:right-6 ${isFullscreen ? 'bottom-20 md:bottom-24' : 'bottom-40 md:bottom-44'} bg-black/70 backdrop-blur-md rounded-xl p-4 shadow-xl pointer-events-auto`}
          >
             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
               <div>
                 <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-1">{carName}</h3>
                 {/* Simplified car details */}
                 <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-sm text-gray-300">
                   <span>{carYear}</span>
                   <span>•</span>
                   <span>{formatNumber(carMileage)} km</span>
                   <span>•</span>
                   <span>Diesel</span> {/* Example detail */}
                   <span>•</span>
                   <span>Automatique</span> {/* Example detail */}
                 </div>
               </div>
               <div className="text-left md:text-right flex-shrink-0">
                 <div className="text-2xl md:text-3xl font-bold text-[#C8EC66]">{carPrice}</div>
                 <span className="text-gray-300 text-xs md:text-sm">Prix TTC</span>
               </div>
             </div>
             {/* Action buttons */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="py-2.5 bg-[#C8EC66] text-gray-900 font-medium rounded-lg hover:bg-[#d4f080] transition-colors duration-200 text-sm"
              >
                Réserver ce véhicule
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="py-2.5 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm"
              >
                Voir tous les détails
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // Thumbnail section
  const thumbnails = (
    <motion.div
      className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-auto z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
    >
      <div className="flex gap-2 bg-black/50 backdrop-blur-md rounded-xl p-2 max-w-[90%] overflow-x-auto shadow-lg [scrollbar-width:thin] scrollbar-thumb-white/30 scrollbar-track-transparent">
        {photos.map((photo, index) => (
          <motion.button
            key={`${photo}-${index}`} // Use a more unique key if photos can repeat
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (index !== currentIndex) { // Prevent reload if clicking current
                setIsLoading(true);
                setCurrentIndex(index);
              }
            }}
            className={`relative flex-shrink-0 w-16 h-10 md:w-20 md:h-12 rounded-md overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 ${
              index === currentIndex ? 'border-[#C8EC66] ring-[#C8EC66]' : 'border-transparent hover:border-white/50' // Adjusted border/ring
            }`}
            aria-label={`Voir photo ${index + 1}`}
          >
             {/* Use Next/Image for thumbnails */}
            <Image
              src={photo}
              alt={`Miniature ${index + 1}`}
              fill // Use fill to cover the button area
              sizes="(max-width: 768px) 64px, 80px" // Basic sizes for thumbnails
              className="object-cover"
              loading="lazy" // Lazy load thumbnails
              unoptimized={!photo.startsWith('/')} // Example: Don't optimize external URLs if needed
            />
            {/* Active indicator using layout animation */}
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 border-2 border-[#C8EC66] rounded-[5px]" // Slightly inset border
                layoutId="activeThumbnail" // Shared layout ID
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  // Fallback for SSR or before client-side hydration
  if (!isClient) {
    return (
      <div className="relative h-[300px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-gray-200">
        {/* Basic Image for SSR/Initial Load */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
           src={photos[0]}
           alt="Chargement de la photo du véhicule"
           className="w-full h-full object-cover"
           />
        {/* Optionally show a simplified overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${isFullscreen ? 'fixed inset-0 z-[1000] bg-black' : 'h-[300px] md:h-[500px] lg:h-[600px] rounded-2xl shadow-lg'} overflow-hidden`} // Increased z-index for fullscreen
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd} // Add touch end handler
    >
      {/* Filter Buttons - Not in fullscreen */}
      {!isFullscreen && (
        <motion.div
          className="absolute top-4 right-4 z-30 flex flex-col gap-2 pointer-events-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
        >
          <div className="bg-black/40 backdrop-blur-md p-1.5 rounded-xl shadow-lg">
             {/* Example filter buttons */}
            <div className="grid grid-cols-1 gap-1.5">
              {['Extérieur', 'Intérieur', 'Détails'].map((filter) => ( // Example filters
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-[#C8EC66] hover:text-black text-white rounded-lg transition-all text-xs font-medium"
                >
                  {filter}
                </motion.button>
               ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Loading Indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-sm"
          >
            {/* Improved spinner */}
            <div className="w-12 h-12 border-4 border-white/30 border-t-[#C8EC66] rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Image Container (for Next/Image with fill) */}
      <AnimatePresence initial={false} mode="wait">
         {/* Use key to trigger AnimatePresence */}
        <motion.div
           key={currentIndex}
           className="absolute inset-0" // Container for fill Image
           initial={{ opacity: 0, scale: 1.03 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.97 }}
           transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} // Smoother ease
         >
          <Image
            src={photos[currentIndex]}
            alt={`Photo ${currentIndex + 1} de ${carName}`}
            fill // Use fill to cover the container
            sizes={isFullscreen ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"} // Adjust sizes
            className="object-cover" // Ensure image covers
            priority={currentIndex === 0} // Prioritize first image for LCP
            onLoad={handleImageLoad}
            onError={handleImageError}
            unoptimized={!photos[currentIndex]?.startsWith('/')} // Example: Don't optimize external URLs
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Content (Buttons, Info, etc.) */}
      {baseContent}
      {/* Thumbnails - Not in fullscreen */}
      {!isFullscreen && photos.length > 1 && thumbnails}
    </div>
  );
};

export default PhotoViewer;