import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedText } from '@/components/animated-text';
import Link from 'next/link';
import { ShoppingCart, MapPin } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="m-4 rounded-[2rem] overflow-hidden relative h-[calc(100vh-2rem)]">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/pexels-mikebirdy-244206.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Navigation */}
      <div className="absolute top-0 left-0 w-full z-20 p-8">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-white">
            Vroom Paris
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/locations" className="text-white hover:text-[#BADA55] transition-colors">
              Nos scooters
            </Link>
            <Link href="/pricing" className="text-white hover:text-[#BADA55] transition-colors">
              Tarifs
            </Link>
            <Link href="/about" className="text-white hover:text-[#BADA55] transition-colors">
              À propos
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-[#BADA55]">
              <MapPin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-[#BADA55]">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl">
          <h2 className="text-white text-xl mb-4">
            <AnimatedText text="Découvrez l'excellence de" delay={0.4} />
          </h2>
          
          <h1 className="text-[#BADA55] text-8xl md:text-[150px] leading-none font-bold mb-6">
            <AnimatedText 
              text="VROOM" 
              delay={0.6}
            />
          </h1>
          
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            LA CONCESSION AUTOMOBILE RÉINVENTÉE. Notre sélection ne doit pas être comme les autres. 
            Mais elle l'est. Ce n'est pas votre concession typique. C'est inutilement bon.
          </p>
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-8 left-0 w-full z-20 px-8">
        <div className="flex justify-between items-end max-w-7xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 max-w-xs border border-[#BADA55]/20">
            <h3 className="text-[#BADA55] text-2xl font-bold mb-2">Premium Cars</h3>
            <p className="text-white/80">
              "Le meilleur" est exactement là où nous voulons être. Tout au nom de l'excellence automobile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}