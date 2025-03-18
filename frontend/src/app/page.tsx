'use client'
import React from 'react';
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Check, Star, Shield, MessageCircle, ArrowRight,  CheckCircle, Truck, Search, BarChart, ShoppingCart, Sparkles, Target, Handshake, Award, DollarSign, BarChart2, Zap, Lock, CreditCard } from 'lucide-react';
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/Footer";
import DriverSections from "@/components/DriverSection";
import Navbar from "@/components/Navbar";
import ProcessGridSection from '@/components/ProcessGrid';
import  DriverOptionsSection from '@/components/TestimonialsSection';
import VehiculesSection from '@/components/vehiculesection';
import { CarSectionLanding } from '@/components/CarSectionLanding';
import BuyVehicleBanner from '@/components/BuyVehicleBanner';
import PartenaireMobiliteSection from '@/components/PartenaireMobiliteSection';
import Apoinntement from '@/components/apoinntement';
import HeaderSection from '@/components/HeaderSection';
import VroomBusinessSection from '@/components/VroomBusinessSection';
import Head from 'next/head';




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
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: 'buy',
      title: 'ACHETER UN VÉHICULE',
      subtitle: 'Trouvez la voiture de vos rêves',
      description: 'Parcourez notre sélection de véhicules certifiés et garantis. Nous proposons un large choix de marques et modèles, tous rigoureusement inspectés pour vous garantir une qualité optimale.',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-white',
      benefits: [
        { icon: <Search className="w-5 h-5 text-[#C8EC66]" />, title: 'Véhicules inspectés' },
        { icon: <Shield className="w-5 h-5 text-[#C8EC66]" />, title: 'Garantie incluse' },
        { icon: <CreditCard className="w-5 h-5 text-[#C8EC66]" />, title: 'Financement flexible' }
      ]
    },
    {
      id: 'order',
      title: 'COMMANDER UN VÉHICULE',
      subtitle: 'Sur mesure selon vos besoins',
      description: 'Vous ne trouvez pas exactement ce que vous cherchez ? Confiez-nous votre projet et nous nous chargeons de dénicher le véhicule qui correspond parfaitement à vos attentes.',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'bg-[#C8EC66]',
      benefits: [
        { icon: <Target className="w-5 h-5 text-gray-800" />, title: 'Recherche personnalisée' },
        { icon: <Handshake className="w-5 h-5 text-gray-800" />, title: 'Accompagnement dédié' },
        { icon: <Award className="w-5 h-5 text-gray-800" />, title: 'Meilleur prix garanti' }
      ]
    },
    {
      id: 'sell',
      title: 'VENDRE UN VÉHICULE',
      subtitle: 'Vendez en toute simplicité',
      description: 'Optimisez la vente de votre véhicule avec notre service clé en main. Nous prenons en charge l\'estimation, la valorisation et la commercialisation de votre voiture.',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-gray-50',
      benefits: [
        { icon: <BarChart2 className="w-5 h-5 text-[#C8EC66]" />, title: 'Estimation gratuite' },
        { icon: <Zap className="w-5 h-5 text-[#C8EC66]" />, title: 'Vente rapide' },
        { icon: <Lock className="w-5 h-5 text-[#C8EC66]" />, title: 'Paiement sécurisé' }
      ]
    }
  ];
  
  const getCardStyle = (cardId) => {
    if (hoveredCard === null) return {};
    
    const cardIndex = cards.findIndex(card => card.id === cardId);
    const hoveredIndex = cards.findIndex(card => card.id === hoveredCard);
    
    // Si c'est la carte "sell" qui est survolée
    if (hoveredCard === 'sell' && cardId === 'sell') {
      return { 
        width: '150%',
         x: '-35%' // Déplacement vers la gauche
      };
    }
    
    // Si la carte "sell" est survolée, déplacer les autres cartes vers la droite
    if (hoveredCard === 'sell' && cardIndex < hoveredIndex) {
      return { x: '-50%' };
    }
    
    // Pour les autres cartes survolées
    if (hoveredCard === cardId && cardId !== 'sell') {
      return { width: '150%' };
    }
    
    // Si une autre carte est survolée
    if (cardIndex > hoveredIndex) {
      return { x: '50%' };
    }
    
    return {};
  };

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-gray-900">Nos Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Découvrez nos services sur mesure pour répondre à tous vos besoins automobiles</p>
        </div>

        <div className="grid grid-cols-3 gap-10 h-[550px]">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`${card.color} rounded-3xl overflow-hidden relative ${
                card.color === 'bg-white' ? 'border-2 border-gray-200 shadow-sm' : 'border border-gray-100'
              } hover:shadow-2xl transition-shadow`}
              initial={{ scale: 1, originX: card.id === 'sell' ? 1 : 0.5 }}
              animate={getCardStyle(card.id)}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div className="h-full p-10 flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-5 mb-8">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    card.id === 'order' 
                      ? 'bg-white text-gray-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-wide text-gray-900">
                      {card.title}
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed mb-10">
                  {hoveredCard === card.id ? card.description : card.description.slice(0, 80) + '...'}
                </p>

                {/* Benefits */}
                <ul className="space-y-5 mb-10 grow">
                  {card.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className={`p-1 rounded-full ${card.id === 'order' ? 'bg-white' : 'bg-gray-50'}`}>
                        {benefit.icon}
                      </div>
                      <span className="text-gray-800 font-medium text-lg">{benefit.title}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="mt-auto">
                  <button 
                    className={`w-full py-4 rounded-xl font-medium text-lg transition-colors flex items-center justify-center gap-2 ${
                      card.id === 'order' 
                        ? 'bg-[#5D6970] text-white hover:bg-[#4A565C]' 
                        : 'bg-[#C8EC66] text-gray-800 hover:bg-[#d4f080]'
                    }`}
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImportSection() {
  return (
    <section className="py-20 px-4 bg-gray-100">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-4xl mx-auto text-gray-800">
            DÉCOUVREZ NOTRE SERVICE D&apos;IMPORTATION : UN CHOIX DE VÉHICULES MULTIPLES & PERSONNALISÉS, AVEC UN
            ACCOMPAGNEMENT SUR-MESURE !
          </h2>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Import Card */}
          <motion.div
            variants={fadeInUp}
            className="bg-[#2F4C3B] text-white p-8 rounded-2xl md:col-span-1 flex flex-col justify-center items-center text-center"
          >
            <h3 className="text-2xl font-bold mb-6">ENVIE D&apos;IMPORTER VOTRE FUTURE VEHICULE ?</h3>
            <p className="mb-6">VROOM VOUS ACCOMPAGNE DANS VOS PROJETS AUTOMOBILES</p>
            <ArrowRight className="w-12 h-12 text-[#C8EC66]" />
          </motion.div>

          {/* Advantages Card */}
          <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg md:col-span-2">
            <div className="flex items-center mb-4">
              <BarChart className="w-10 h-10 text-[#C8EC66] mr-4" />
              <h3 className="text-2xl font-bold">AVANTAGES</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-[#C8EC66] mr-2" />
                Prix compétitifs
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-[#C8EC66] mr-2" />
                Présent dans tous les marchés automobiles européens
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-[#C8EC66] mr-2" />
                Services d&apos;accompagnement tout-en-un
              </li>
            </ul>
          </motion.div>

          {/* Expertise Card */}
          <motion.div variants={fadeInUp} className="bg-[#2F4C3B] text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">EXPERTISE</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#C8EC66] mr-2 mt-1 flex-shrink-0" />
                <span>SUIVI ET INSPECTION DE L&apos;HISTORIQUE DU VEHICULE</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#C8EC66] mr-2 mt-1 flex-shrink-0" />
                <span>INSPECTION MECANIQUE & KILOMETRIQUES</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#C8EC66] mr-2 mt-1 flex-shrink-0" />
                <span>CONSEIL SUR LE CHOIX DE VOTRE VEHICULE ET DES OPTIONS</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#C8EC66] mr-2 mt-1 flex-shrink-0" />
                <span>PAS DE TRACAS ADMINISTRATIF ON S&apos;OCCUPE DE TOUT</span>
              </li>
            </ul>
          </motion.div>

          {/* Transparency Card */}
          <motion.div variants={fadeInUp} className="bg-[#2F4C3B] text-white p-8 rounded-2xl">
            <div className="flex items-center mb-4">
              <Search className="w-10 h-10 text-[#C8EC66] mr-4" />
              <h3 className="text-2xl font-bold">TRANSPARENCE</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-[#C8EC66] mr-2" />
                TRANSPARENCE COMPLETE SUR LE CHOIX DE VOTRE VEHICULE
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-[#C8EC66] mr-2" />
                PAS DE FRAIS CACHES
              </li>
            </ul>
          </motion.div>

          {/* Flexibility Card */}
          <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <Truck className="w-10 h-10 text-[#C8EC66] mr-4" />
              <h3 className="text-2xl font-bold">FLEXIBILITE</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-[#C8EC66] mr-2" />
                LIVRAISON A DOMICILE DANS TOUTE LA FRANCE
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-[#C8EC66] mr-2" />
                SUPPLEMENT HORS ILE-DE-FRANCE
              </li>
            </ul>
            <div className="mt-6 text-sm text-right flex items-center justify-end gap-2">Made in France 🇫🇷</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col">
      <Navbar />
      
      {/* Background Video Container with Rounded Corners */}
      <div className="absolute inset-0 z-0 flex items-center justify-center px-4">
        <div className="w-full h-[85vh] rounded-[2.5rem] overflow-hidden relative">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/WhatsApp Video 2024-12-12 at 17.52.55.mp4" type="video/mp4" />
          </video>
          
          {/* Vroom logo positioned inside video canvas, bottom right */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-10 right-12 z-20"
          >
            <div className="relative">
              <h2 className="font-archivo text-4xl md:text-5xl font-bold text-white">vroom</h2>
              {/* <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute -bottom-1 left-0 h-1 bg-[#C8EC66] rounded-full"
              /> */}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content - Perfectly Centered */}
      <div className="flex-1 flex items-center justify-center relative z-20">
        <div className="max-w-7xl w-full px-4">
          <motion.div 
            className="text-center"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <h1 className="font-archivo text-5xl md:text-7xl font-bold tracking-tight">
                <span className="text-white">ACHETER UNE VOITURE</span>
                <div className="text-[#C8EC66] mt-2">N'A JAMAIS ÉTÉ AUSSI SIMPLE</div>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mt-8">
                Des véhicules d'occasion contrôlés et garantis, livrés directement à votre domicile
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp} 
              className="mt-10 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 25px rgba(200, 236, 102, 0.5)",
                  backgroundColor: "#d4f080" 
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-[#C8EC66] text-gray-800 rounded-full font-semibold text-lg shadow-2xl border-2 border-[#C8EC66] hover:bg-[#d4f080] transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
              >
                Voir nos véhicules
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 25px rgba(200, 236, 102, 0.5)",
                  backgroundColor: "rgba(200, 236, 102, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-[#C8EC66]/20 text-white rounded-full font-semibold text-lg border-2 border-[#C8EC66] hover:bg-[#C8EC66]/30 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
              >
                Prendre rendez-vous
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              variants={fadeInUp}
              className="mt-12 flex justify-center space-x-6 md:space-x-10"
            >
              <div className="flex items-center text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#C8EC66]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm">Garantie 12 mois</span>
              </div>
              <div className="flex items-center text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#C8EC66]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="text-sm">Paiement sécurisé</span>
              </div>
              <div className="flex items-center text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#C8EC66]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm">Livraison à domicile</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

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

const StatsSection = () => (
  <section className="py-20 bg-[#C8EC66]/10">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { number: "1000+", label: "Véhicules vendus 🚗" },
          { number: "98%", label: "Clients satisfaits 😊" },
          { number: "24/7", label: "Support client 💬" },
          { number: "30+", label: "Villes couvertes 🌍" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >
            <div className="text-3xl md:text-4xl font-bold text-[#C8EC66]">{stat.number}</div>
            <div className="text-gray-600 mt-2">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const ProcessSection = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Comment ça marche? 🤔</h2>
        <p className="text-xl text-gray-600">Simple, rapide et transparent</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { emoji: "🔍", title: "1. Trouvez", desc: "Parcourez notre sélection de véhicules certifiés" },
          { emoji: "📝", title: "2. Réservez", desc: "Choisissez votre véhicule et réservez en ligne" },
          { emoji: "🚗", title: "3. Roulez", desc: "Recevez votre véhicule ou venez le chercher" }
        ].map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
          >
            <span className="text-5xl mb-6 block">{step.emoji}</span>
            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-white">
      <HeroSection />
      <HeaderSection />
      <ServiceCards />
      <BuyVehicleBanner />
      {/* <StatsSection /> */}
      {/* <ProcessSection /> */}
      {/* <VehiculesSection /> */}
      <CarSectionLanding />
      {/* <SimilarCarsSection /> */}
      <DriverOptionsSection />
      {/* <DriverSections /> */}
      {/* <ImportSection /> */}
      <ProcessGridSection />
      <VroomBusinessSection />
      <Apoinntement />
      {/* <PartenaireMobiliteSection /> */}
      <FaqSection />
    
      <Footer />
      
    </div>
    </>
  );
}

{/* <FadeIn delay={1.4} className="absolute bottom-6 right-6 z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
            <Image
              src="/placeholder.svg?height=20&width=20"
              alt="French flag"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-sm">Made in France</span>
          </div>
        </FadeIn> */}


      //   <FadeIn delay={1.2} className="absolute bottom-0 left-0 z-10 p-6">
      //   <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg p-6 max-w-sm">
      //     <h3 className="text-2xl font-bold mb-2">24/7 Disponible</h3>
      //     <p className="text-gray-600">
      //       Profitez de nos services de location à toute heure, tous les jours de la semaine.
      //     </p>
      //   </div>
      // </FadeIn>