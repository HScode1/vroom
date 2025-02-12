'use client'

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoViewerProps {
  photos: string[];
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextPhoto = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  const prevPhoto = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const baseContent = (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 flex justify-between items-end">
        <h1 className="text-2xl md:text-4xl font-bold text-white">Toyota Yaris</h1>
        <div className="flex gap-2">
          <button
            onClick={prevPhoto}
            className="p-1 md:p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextPhoto}
            className="p-1 md:p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 p-1 md:p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition"
      >
        <Expand className="w-4 h-4 md:w-6 md:h-6" />
      </button>
    </>
  );

  if (!isClient) {
    return (
      <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
        <img 
          src={photos[0]} 
          alt="Photo du véhicule"
          className="w-full h-full object-cover"
        />
        {baseContent}
      </div>
    );
  }

  return (
    <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={photos[currentIndex]}
          alt={`Photo ${currentIndex + 1} de la voiture`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      {baseContent}
      
      <div className="absolute -bottom-20 left-0 right-0 flex justify-center">
        <div className="flex gap-2 overflow-x-auto py-2 px-4">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex ? 'border-[#C8EC66]' : 'border-transparent'
              }`}
            >
              <img src={photo} alt={`Miniature ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoViewer;
