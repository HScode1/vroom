import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, PhoneCall, ExternalLink, Shield, Calendar, Car, Award, TrendingUp } from 'lucide-react';

const DriverOptionsSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const featureVariant = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: 0.2 + (i * 0.1),
        duration: 0.4
      }
    })
  };

  // Les features pour chaque type de conducteur
  const driverTypes = [
    {
      id: "jeune-permis",
      title: "JEUNES PERMIS",
      subtitle: "Démarrez en toute confiance",
      bgColor: "bg-[#F4FBDB]",
      iconBg: "bg-[#C8EC66]/20",
      iconColor: "text-[#7ab93d]",
      textColor: "text-gray-800",
      accentColor: "[#C8EC66]",
      features: [
        "Véhicules adaptés pour débutants",
        "Financement spécial premier achat",
        "Assurance avantageuse jeune conducteur",
        "Entretien simplifié inclus",
        "Accompagnement personnalisé"
      ],
      icon: <Car className="w-7 h-7 text-[#7ab93d]" />
    },
    {
      id: "chauffeur-vtc",
      title: "CHAUFFEURS VTC",
      subtitle: "Optimisez votre activité",
      bgColor: "bg-gray-900",
      iconBg: "bg-[#C8EC66]/20",
      iconColor: "text-[#C8EC66]",
      textColor: "text-white",
      accentColor: "[#C8EC66]",
      features: [
        "Véhicules conformes aux normes VTC",
        "Solutions de financement professionnel",
        "Forfaits kilométrage illimité",
        "Maintenance prioritaire 7j/7",
        "Véhicule de remplacement garanti"
      ],
      icon: <Award className="w-7 h-7 text-[#C8EC66]" />
    }
  ];

  return (
    <section className="py-32 md:py-40 min-h-screen flex items-center overflow-hidden relative">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8EC66]/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C8EC66]/10 rounded-full blur-3xl -ml-40 -mb-40"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C8EC66]/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Partie gauche - Texte principal */}
          <div className="w-full lg:w-2/5 mb-16 lg:mb-0 pr-0 lg:pr-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium mb-8 bg-[#C8EC66]/10 text-[#7ab93d]"
            >
              <Car className="w-4 h-4 mr-2" />
              SOLUTIONS PERSONNALISÉES
            </motion.div>
            
            {/* Titre principal */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-5xl lg:text-6xl font-bold font-archivo leading-tight mb-8"
            >
              POUR CHAQUE
              <br />
              TYPE DE
              <br />
              CONDUCTEUR
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-10 max-w-lg"
            >
              Que vous soyez un jeune conducteur à la recherche de votre première voiture ou un chauffeur VTC ayant besoin d'un véhicule professionnel, nous avons des solutions adaptées à vos besoins spécifiques.
            </motion.p>
            
            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 30px -10px rgba(200, 236, 102, 0.4)" 
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center px-8 py-4 rounded-full bg-[#C8EC66] text-gray-600 font-medium shadow-lg hover:bg-[#d4f080] transition-all duration-300"
            >
              Prendre rendez-vous
              <PhoneCall className="w-5 h-5 ml-2" />
            </motion.button>
          </div>
          
          {/* Partie droite - Cartes des types de conducteurs */}
          <div className="w-full lg:w-3/5 pl-0 lg:pl-8">
            <div className="flex flex-col md:flex-row gap-6">
              {driverTypes.map((driverType, idx) => (
                <motion.div 
                  key={driverType.id}
                  variants={fadeInUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={idx}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  onHoverStart={() => setActiveCard(driverType.id)}
                  onHoverEnd={() => setActiveCard(null)}
                  className={`w-full md:w-1/2 h-[42rem] ${driverType.bgColor} ${driverType.textColor} rounded-3xl p-8 md:p-10 relative flex flex-col justify-between shadow-xl`}
                >
                  <div>
                    <div className="flex items-center mb-8">
                      <div className={`w-16 h-16 rounded-full overflow-hidden mr-4 flex items-center justify-center shadow-md ${driverType.iconBg}`}>
                        {driverType.icon}
                      </div>
                      <h4 className="font-medium text-xl">{driverType.id === "jeune-permis" ? "18-25 ans" : "Professionnels"}</h4>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-3 font-archivo">
                      {driverType.title}
                    </h3>
                    <p className="text-xl font-medium mb-8">
                      {driverType.subtitle}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      {driverType.features.map((feature, i) => (
                        <motion.div 
                          key={i}
                          variants={featureVariant}
                          initial="hidden"
                          whileInView="visible"
                          custom={i}
                          viewport={{ once: true }}
                          className="flex items-center"
                        >
                          <div className={`flex-shrink-0 ${driverType.iconBg} p-1.5 rounded-full`}>
                            <BadgeCheck className={`w-4 h-4 ${driverType.iconColor}`} />
                          </div>
                          <span className="ml-3 font-medium">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bouton d'action */}
                  <motion.button
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
                    }}
                    whileTap={{ scale: 0.97 }}
                    className={`mt-auto w-full py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center ${
                      driverType.id === "jeune-permis"
                        ? "bg-[#C8EC66] text-gray-600 hover:bg-[#d4f080]"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Découvrir nos offres
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </motion.button>
                  
                  {/* Statistique */}
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex items-center">
                      {driverType.id === "jeune-permis" ? (
                        <>
                          <Shield className="w-5 h-5 mr-2 text-[#7ab93d]" />
                          <span className="text-sm font-medium">Garantie 24 mois incluse</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-5 h-5 mr-2 text-[#C8EC66]" />
                          <span className="text-sm font-medium">+2500 professionnels équipés</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriverOptionsSection;