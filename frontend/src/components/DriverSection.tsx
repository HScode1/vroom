import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users2, Phone, ChevronRight, BadgeCheck, 
  Star, Calendar, Headphones, CreditCard,
  Car, Award,  Clock, User, PhoneCall, Shield, Sparkles 
} from 'lucide-react';

const DriverCard = ({ type, title, features, phoneNumber, reverse = false, icon, accent = "#C8EC66" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = icon || BadgeCheck;
  
  const cardVariants = {
    hover: {
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 }
    }
  };
  
  const featureVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (index) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { delay: 0.1 + (index * 0.1) } 
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative rounded-3xl overflow-hidden shadow-lg ${
        reverse 
          ? 'bg-gradient-to-br from-[#C8EC66] to-[#a8d64d]' 
          : 'bg-white'
      }`}
    >
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full -ml-32 -mb-32"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle, ${reverse ? 'white' : accent} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative p-8 md:p-12">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium w-fit shadow-sm ${
              reverse ? 'bg-white text-[#C8EC66]' : `bg-${accent.replace('#', '')}/10 text-${accent.replace('#', '')}`
            }`}>
              <IconComponent className="w-4 h-4 mr-2" />
              {type}
            </span>
            
            <motion.div 
              className={`flex items-center gap-1 ${reverse ? 'text-white' : 'text-yellow-500'}`}
              animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5, times: [0, 0.5, 1] }}
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </motion.div>
          </div>

          <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${
            reverse ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h3>

          <div className="flex-grow space-y-4 mb-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                custom={index}
                initial="initial"
                animate="animate"
                transition={featureVariants.animate(index).transition}
                className="flex items-start gap-3"
              >
                <div className={`flex items-center justify-center p-1 rounded-full ${
                  reverse ? 'bg-white/20' : `bg-${accent.replace('#', '')}/10`
                }`}>
                  <BadgeCheck className={`w-4 h-4 ${
                    reverse ? 'text-white' : `text-${accent.replace('#', '')}`
                  }`} />
                </div>
                <span className={`${reverse ? 'text-white/90' : 'text-gray-600'} font-medium`}>
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href={`tel:${phoneNumber}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-medium transition-colors ${
                reverse 
                  ? 'bg-white text-[#C8EC66] hover:bg-white/90 shadow-lg' 
                  : 'bg-[#C8EC66] text-gray-900 hover:bg-[#C8EC66]/90 shadow-lg'
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              {phoneNumber}
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-medium ${
                reverse 
                  ? 'bg-black/10 text-white hover:bg-black/20 backdrop-blur-sm' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En savoir plus
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-4 h-4 ml-2" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const categories = {
  'particulier': {
    id: 'particulier',
    name: 'Particulier',
    options: [
      {
        id: 'famille',
        type: "👨‍👩‍👧‍👦 Famille",
        title: "Voyagez en toute sérénité",
        features: [
          "Véhicules spacieux et confortables",
          "Sièges enfants disponibles",
          "Forfaits kilométriques adaptés",
          "Assurance tous risques",
          "Assistance voyage 24/7"
        ],
        phoneNumber: "06 49 49 39 39",
        icon: Users2,
        accent: "#F59E0B",
        reverse: false
      },
      {
        id: 'jeune-permis',
        type: "🚀 Jeune permis",
        title: "Démarrez en toute confiance",
        features: [
          "Véhicules adaptés aux nouveaux conducteurs",
          "Assurance avantageuse pour les jeunes permis",
          "Accompagnement personnalisé",
          "Garantie 12 mois incluse",
          "Options de financement flexibles"
        ],
        phoneNumber: "06 49 49 39 39",
        icon: Car,
        accent: "#3B82F6",
        reverse: true
      }
    ]
  },
  'professionnel': {
    id: 'professionnel',
    name: 'Professionnel',
    options: [
      {
        id: 'vtc',
        type: "🚖 Chauffeur VTC",
        title: "Optimisez votre activité",
        features: [
          "Véhicules conformes aux normes VTC",
          "Entretien et maintenance inclus",
          "Kilométrage illimité",
          "Service d'assistance 24/7",
          "Solutions de remplacement disponibles"
        ],
        phoneNumber: "06 49 49 39 39",
        reverse: true,
        icon: Award,
        accent: "#C8EC66"
      },
      {
        id: 'entreprise',
        type: "💼 Entreprise",
        title: "Solutions sur mesure",
        features: [
          "Flotte personnalisée à vos besoins",
          "Gestion administrative simplifiée",
          "Facturation mensuelle unifiée",
          "Service de livraison/récupération",
          "Avantages fiscaux"
        ],
        phoneNumber: "06 49 49 39 39",
        reverse: false,
        icon: CreditCard,
        accent: "#8B5CF6"
      }
    ]
  }
};

const DriverSections = () => {
  const [activeCategory, setActiveCategory] = useState('particulier');
  
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8EC66]/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -ml-40 -mb-40"></div>
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(#C8EC66 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium mb-4 bg-[#C8EC66]/10 text-[#C8EC66]"
          >
            <Headphones className="w-4 h-4 mr-2" />
            NOUS VOUS ACCOMPAGNONS
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
            Une solution adaptée à <br />
            <span className="relative inline-block">
              chaque conducteur
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-1 bg-[#C8EC66]"
              />
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
            Que vous soyez particulier ou professionnel, nous avons 
            la solution parfaite pour vous.
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-12 overflow-x-auto pb-4 hide-scrollbar">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-xl shadow-inner">
            {Object.values(categories).map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.1 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {categories[activeCategory].options.map((option) => (
              <DriverCard
                key={option.id}
                type={option.type}
                title={option.title}
                features={option.features}
                phoneNumber={option.phoneNumber}
                reverse={option.reverse}
                icon={option.icon}
                accent={option.accent}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DriverSections;
