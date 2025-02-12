'use client'
import React from 'react';
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Check, Star, Shield, MessageCircle, ArrowRight } from 'lucide-react';
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/Footer";
import DriverSections from "@/components/DriverSection";
import Navbar from "@/components/Navbar";
import ProcessGridSection from '@/components/ProcessGrid';
import TestimonialsSection from '@/components/TestimonialsSection';
import VehiculesSection from '@/components/vehiculesection';
import { SimilarCarsSection } from '@/components/SimilarCarSection';


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
      emoji: '🚗',
      color: 'bg-[#F0F0F0E3]',
      benefits: [
        { icon: '🔍', title: 'Véhicules inspectés' },
        { icon: '🛡️', title: 'Garantie incluse' },
        { icon: '💳', title: 'Financement flexible' }
      ]
    },
    {
      id: 'order',
      title: 'COMMANDER UN VÉHICULE',
      subtitle: 'Sur mesure selon vos besoins',
      description: 'Vous ne trouvez pas exactement ce que vous cherchez ? Confiez-nous votre projet et nous nous chargeons de dénicher le véhicule qui correspond parfaitement à vos attentes.',
      emoji: '✨',
      color: 'bg-[#C8EC66]',
      benefits: [
        { icon: '🎯', title: 'Recherche personnalisée' },
        { icon: '🤝', title: 'Accompagnement dédié' },
        { icon: '💎', title: 'Meilleur prix garanti' }
      ]
    },
    {
      id: 'sell',
      title: 'VENDRE UN VÉHICULE',
      subtitle: 'Vendez en toute simplicité',
      description: 'Optimisez la vente de votre véhicule avec notre service clé en main. Nous prenons en charge l\'estimation, la valorisation et la commercialisation de votre voiture.',
      emoji: '💰',
      color: 'bg-[#F0F0F0E3]',
      benefits: [
        { icon: '📊', title: 'Estimation gratuite' },
        { icon: '⚡', title: 'Vente rapide' },
        { icon: '🔒', title: 'Paiement sécurisé' }
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
        x: '-50%' // Déplacement vers la gauche
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Nos Solutions</h2>
          <p className="text-xl text-gray-600">Découvrez nos services sur mesure pour répondre à tous vos besoins automobiles</p>
        </div>

        <div className="grid grid-cols-3 gap-6 h-[400px]">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`${card.color} rounded-3xl overflow-hidden relative hover:shadow-xl transition-shadow`}
              animate={getCardStyle(card.id)}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div className="h-full p-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{card.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold">
                      {card.title}
                    </h3>
                    <p className="text-gray-700">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-8">
                  {hoveredCard === card.id ? card.description : card.description.slice(0, 80) + '...'}
                </p>

                {/* Benefits */}
                <ul className="space-y-4 mb-8">
                  {card.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="text-xl">{benefit.icon}</span>
                      <span className="text-gray-700">{benefit.title}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="absolute bottom-6 right-6">
                  {card.id === 'order' ? (
                    <button className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors">
                      En savoir plus
                    </button>
                  ) : (
                    <div className="p-2 hover:bg-black/5 rounded-full transition-colors">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

 


const HeroSection = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col">
      <Navbar />
      
      {/* Background Video Container with Rounded Corners */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[90%] max-w-6xl h-[70vh] rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/WhatsApp Video 2024-12-12 at 17.52.55.mp4" type="video/mp4" />
          </video>
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
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                La meilleure façon
                <div className="text-[#C8EC66]">d'acheter une voiture 🚗</div>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                Des véhicules d'occasion contrôlés et garantis, livrés à domicile 🏠
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUp} 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#C8EC66] text-black rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                Voir nos véhicules 🔍
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all backdrop-blur-sm"
              >
                Vendre mon véhicule 💰
              </motion.button>
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
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ServiceCards />
      {/* <StatsSection /> */}
      <ProcessSection />
      <VehiculesSection />
      {/* <SimilarCarsSection /> */}
      <DriverSections />
      <ProcessGridSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </div>
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