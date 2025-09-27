
'use client'
import React from 'react';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// Removed unused icons: MapPin, Check, Star, CheckCircle, Truck, BarChart
import { ChevronDown, Shield, MessageCircle, ArrowRight, Search, ShoppingCart, Sparkles, Target, Handshake, Award, DollarSign, BarChart2, Zap, Lock, CreditCard } from 'lucide-react';
import { FaqSection } from "@/components/Home/faq-section";
import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import DriverProfilesSection from '@/components/Home/DriverProfilesSection';
import { VehicleShowcaseSection } from '@/components/Home/VehicleShowcaseSection';
import BuyFromHomeBanner from '@/components/Home/BuyFromHomeBanner';
import SectionRendezVous from '@/components/Home/SectionRendezVous';
import AboutVroomSection from '@/components/Home/AboutVroomSection';
import VroomBusinessSection from '@/components/Home/VroomBusinessSection';
import ParcoursAchat from '@/components/Home/ParcoursAchat';
// Removed unused import: Head from 'next/head'; - 'use client' components usually don't need <Head> directly. Metadata API is preferred.

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

function ServiceCards() {
  const [isMobile, setIsMobile] = useState(true);

  // Effet pour détecter la taille d'écran côté client uniquement
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Vérification initiale
    checkMobile();

    // Ajout d'un listener pour les changements de taille d'écran
    window.addEventListener('resize', checkMobile);

    // Nettoyage du listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cards = [
    {
      id: 'buy',
      title: 'ACHETER UN VÉHICULE',
      subtitle: 'Trouvez la voiture de vos rêves',
      description: 'Parcourez notre sélection de véhicules certifiés et garantis. Nous proposons un large choix de marques et modèles, tous rigoureusement inspectés pour vous garantir une qualité optimale.',
      mobileDescription: 'Parcourez notre sélection de véhicules certifiés et garantis.',
      icon: <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />,
      image: "/psd/key.png",
      color: 'bg-white',
      benefits: [
        { icon: <Search className="w-4 h-4 md:w-5 md:h-5 text-[#C8EC66]" />, title: 'Véhicules inspectés' },
        { icon: <Shield className="w-4 h-4 md:w-5 md:h-5 text-[#C8EC66]" />, title: 'Garantie incluse' },
        { icon: <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-[#C8EC66]" />, title: 'Financement flexible' }
      ]
    },
    {
      id: 'order',
      title: 'COMMANDER UN VÉHICULE',
      subtitle: 'Sur mesure selon vos besoins',
      description: 'Vous ne trouvez pas exactement ce que vous cherchez ? Confiez-nous votre projet et nous nous chargeons de dénicher le véhicule qui correspond parfaitement à vos attentes.',
      mobileDescription: 'Confiez-nous votre projet et nous dénicherons le véhicule parfait pour vous.',
      icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6" />,
      image: "/psd/hangar3.png",
      color: 'bg-[#C8EC66]',
      benefits: [
        { icon: <Target className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />, title: 'Recherche personnalisée' },
        { icon: <Handshake className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />, title: 'Accompagnement dédié' },
        { icon: <Award className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />, title: 'Meilleur prix garanti' }
      ]
    },
    {
      id: 'sell',
      title: 'VENDRE UN VÉHICULE',
      subtitle: 'Vendez en toute simplicité',
      description: 'Optimisez la vente de votre véhicule avec notre service clé en main. Nous prenons en charge l\'estimation, la valorisation et la commercialisation de votre voiture.',
      mobileDescription: 'Service clé en main pour l\'estimation, valorisation et vente de votre véhicule.',
      icon: <DollarSign className="w-5 h-5 md:w-6 md:h-6" />,
      image: "/psd/hangar2.png",
      color: 'bg-gray-50',
      benefits: [
        { icon: <BarChart2 className="w-4 h-4 md:w-5 md:h-5 text-[#C8EC66]" />, title: 'Estimation gratuite' },
        { icon: <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#C8EC66]" />, title: 'Vente rapide' },
        { icon: <Lock className="w-4 h-4 md:w-5 md:h-5 text-[#C8EC66]" />, title: 'Paiement sécurisé' }
      ]
    }
  ];

  // Animation d'apparition des cartes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="text-center mb-10 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900">Nos Solutions</h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            {isMobile
              ? "Nos services personnalisés pour tous vos besoins automobiles"
              : "Découvrez nos services sur mesure pour répondre à tous vos besoins automobiles"}
          </p>
        </motion.div>

        {/* Modifié: grid avec des colonnes plus larges et moins de gap */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-xl md:max-w-none mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`${card.color} rounded-3xl overflow-hidden relative mb-8 md:mb-0 ${card.color === 'bg-white' ? 'border-2 border-gray-200 shadow-sm' : 'border border-gray-100'
                } hover:shadow-xl transition-shadow w-full`}
              variants={cardVariants}
            >
              <motion.div className="h-full p-6 md:p-8 flex flex-col">
                {/* Image au-dessus de la carte */}
                <div className="relative w-full h-40 md:h-56 mb-6 md:mb-8 rounded-xl overflow-hidden">
                  <Image 
                    src={card.image} 
                    alt={card.title} 
                    fill 
                    className="object-contain" 
                  />
                </div>
                
                {/* Header avec emojis */}
                <div className="flex items-center gap-3 md:gap-5 mb-4 md:mb-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    card.id === 'order'
                      ? 'bg-white text-gray-800'
                      : 'bg-gray-100 text-gray-800'
                    }`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold tracking-wide text-gray-900">
                      {card.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-700 font-medium">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description complète, toujours affichée */}
                {/* <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                  {isMobile ? card.mobileDescription : card.description}
                </p> */}

                {/* Benefits */}
                {/* <ul className="space-y-3 md:space-y-4 mb-5 md:mb-8 grow">
                  {card.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 md:gap-3">
                      <div className={`p-1 rounded-full flex-shrink-0 ${card.id === 'order' ? 'bg-white' : 'bg-gray-50'}`}>
                        {benefit.icon}
                      </div>
                      <span className="text-gray-800 font-medium text-sm md:text-base">{benefit.title}</span>
                    </li>
                  ))}
                </ul> */}

                {/* Footer */}
                <div className="mt-auto">
                  <button
                    className={`w-full py-2.5 md:py-3 rounded-xl font-medium text-sm md:text-base transition-colors flex items-center justify-center gap-2 ${card.id === 'order'
                        ? 'bg-[#5D6970] text-white hover:bg-[#4A565C]'
                        : 'bg-[#C8EC66] text-gray-800 hover:bg-[#d4f080]'
                      }`}
                  >
                    En savoir plus
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}




const HeroSection = () => {
  // État pour contrôler l'affichage du contenu.
  // S'initialise en vérifiant sessionStorage pour se souvenir si la vidéo a déjà été jouée.
  const [showContent, setShowContent] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem('videoHasPlayed') === 'true'
  );

  // Fonction appelée lorsque la vidéo se termine.
  const handleVideoEnd = () => {
    setShowContent(true);
    // Enregistre dans sessionStorage que la vidéo a été jouée.
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('videoHasPlayed', 'true');
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col">
      <Navbar />
      
      {/* Conteneur de la vidéo de fond */}
      <div className="absolute inset-0 z-0 flex items-center justify-center px-4">
        <div className="w-full h-[85vh] rounded-[2.5rem] overflow-hidden relative">
          {/* Superposition sombre sur la vidéo */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          
          <video
            // La vidéo ne joue que si le contenu n'est pas encore affiché
            autoPlay={!showContent} 
            muted
            playsInline
            // L'événement `onEnded` se déclenche à la fin de la lecture
            onEnded={handleVideoEnd}
            // `poster` affiche une image fixe lorsque la vidéo ne joue pas.
            // Remplacez 'last-frame-of-video.jpg' par le nom de votre image.
            poster="/last-frame-of-video.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/Header.mp4" type="video/mp4" />
          </video>
          
          {/* Logo Vroom */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-10 right-12 z-20"
          >
            <div className="relative">
              <h2 className="font-archivo text-4xl md:text-5xl font-bold text-white">vroom</h2>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contenu principal (texte et boutons) */}
      <div className="flex-1 flex items-center justify-center relative z-20">
        <div className="max-w-7xl w-full px-4">
          <motion.div 
            className="text-center"
            variants={staggerChildren}
            initial="initial"
            // L'animation ne se déclenche que lorsque `showContent` devient `true`
            animate={showContent ? "animate" : "initial"}
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <h1 className="font-archivo text-5xl md:text-7xl font-bold tracking-tight">
                <span className="text-white">ACHETER UNE VOITURE</span>
                <div className="text-[#C8EC66] mt-2">N&apos;A JAMAIS ÉTÉ AUSSI SIMPLE</div>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mt-8">
                Des véhicules d&apos;occasion contrôlés et garantis, livrés directement à votre domicile
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp} 
              className="mt-10 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(200, 236, 102, 0.5)", backgroundColor: "#d4f080" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-[#C8EC66] text-gray-800 rounded-full font-semibold text-lg shadow-2xl border-2 border-[#C8EC66] hover:bg-[#d4f080] transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
              >
                Voir nos véhicules
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(200, 236, 102, 0.5)", backgroundColor: "rgba(200, 236, 102, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-[#C8EC66]/20 text-white rounded-full font-semibold text-lg border-2 border-[#C8EC66] hover:bg-[#C8EC66]/30 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
              >
                Prendre rendez-vous
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            </motion.div>
            
            {/* Indicateurs de confiance */}
            <motion.div 
              variants={fadeInUp}
              className="mt-12 flex justify-center space-x-6 md:space-x-10"
            >
              <div className="flex items-center text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#C8EC66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm">Garantie 12 mois</span>
              </div>
              <div className="flex items-center text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#C8EC66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-sm">Paiement sécurisé</span>
              </div>
              <div className="flex items-center text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#C8EC66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm">Livraison à domicile</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Flèche de défilement animée */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </motion.div>
    </section>
  );
};


export default function Home() {
  return (
    <>
      {/* No <Head> needed here in App Router client components */}
      <div className="min-h-screen bg-white antialiased"> {/* Added antialiased */}
        <HeroSection />
        <AboutVroomSection />
        <ServiceCards />
        <BuyFromHomeBanner />
        <VehicleShowcaseSection />
        {/* Section pour les Jeunes Permis et Chauffeurs VTC */}
        <div id="jeunes-permis" className="scroll-mt-20"> {/* Added scroll-mt for anchor offset */}
          <DriverProfilesSection />
        </div>
        {/* <ProcessGridSection /> */}
        <ParcoursAchat />
        {/* Section pour les Entreprises */}
        <div id="entreprises" className="scroll-mt-20"> {/* Added scroll-mt */}
          <VroomBusinessSection />
        </div>
        {/* Section pour les Rendez-vous */}
        <div id="rendez-vous" className="scroll-mt-20"> {/* Added scroll-mt */}
          <SectionRendezVous />
        </div>
        <FaqSection />
        <Footer />
      </div>
    </>
  );
}

