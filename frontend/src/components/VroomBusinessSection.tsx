import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, ExternalLink, Car, Building, TrendingUp } from 'lucide-react';

interface Partner {
  name: string;
  logo: string;
  href: string;
}

interface FeatureItem {
  icon: React.ElementType;
  text: string;
}

const VroomBusinessSection: React.FC = () => {
  // Logos des partenaires avec leurs liens
  const partners: Partner[] = [
    { name: "CER", logo: "https://upload.wikimedia.org/wikipedia/fr/a/a3/Centre_d%27%C3%A9ducation_routi%C3%A8re.png", href: "#autotrader" },
    { name: "Renault", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Renault_2021_Text.svg", href: "#cars" },
    { name: "Volkswagen", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/langfr-1920px-Volkswagen_logo_2019.svg.png", href: "#carfax" },
    { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Mercedes-Benz_Star_2022.svg/langfr-1920px-Mercedes-Benz_Star_2022.svg.png", href: "#autocheck" },
    { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/langfr-1920px-BMW_logo_%28gray%29.svg.png", href: "#truecar" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const featureItems: FeatureItem[] = [
    { icon: Car, text: "Gestion complète de votre flotte automobile" },
    { icon: Building, text: "Solutions adaptées aux entreprises de toutes tailles" },
    { icon: TrendingUp, text: "Économies garanties sur vos coûts d'exploitation" }
  ];

  return (
    <div className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#C8EC66]/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-[#C8EC66]/10 rounded-full blur-3xl -ml-40 -mb-40"></div>
      <div className="absolute top-1/2 left-1/3 -z-10 w-64 h-64 bg-[#C8EC66]/10 rounded-full blur-3xl"></div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl overflow-hidden shadow-xl bg-black">
          {/* Section Principale */}
          <div className="p-8 md:p-12 lg:p-16 relative border-b border-gray-800">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: 'radial-gradient(circle, #C8EC66 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-10 lg:gap-16">
              {/* Logo et Titre */}
              <div className="mb-6 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-left"
                >
                  <div className="relative inline-block">
                    <h2 className="text-white text-5xl md:text-6xl font-bold mb-2">vroom</h2>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="absolute -bottom-1 left-0 h-1 bg-[#C8EC66] rounded-full"
                    />
                  </div>
                  <p className="text-[#C8EC66] text-xl font-medium">for Business</p>
                </motion.div>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-8 space-y-3 hidden md:block"
                >
                  {featureItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div 
                        key={index}
                        variants={itemVariants} 
                        className="flex items-center gap-3"
                      >
                        <div className="flex items-center justify-center p-1.5 rounded-full bg-[#C8EC66]/20">
                          <IconComponent className="w-4 h-4 text-[#C8EC66]" />
                        </div>
                        <span className="text-gray-300 text-sm">
                          {item.text}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Texte */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl"
              >
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Vroom for Business facilite l'achat et la revente de véhicules pour votre entreprise. Profitez d'une plateforme dédiée et personnalisée pour gérer l'ensemble de votre flotte automobile avec des options de financement flexibles et simplifiées. Centralisez vos achats ou permettez à chaque département de gérer son propre parc automobile.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="#commencer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ 
                      scale: 1.03, 
                      backgroundColor: "#d5ff75",
                      boxShadow: "0 10px 25px -5px rgba(200, 236, 102, 0.4)"
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C8EC66] text-gray-800 font-medium rounded-xl shadow-lg transition-all duration-300"
                  >
                    Commencer maintenant
                    <motion.div
                      animate={{ 
                        x: [0, 5, 0],
                        transition: { 
                          duration: 1.5, 
                          repeat: Infinity,
                          repeatType: "loop"
                        }
                      }}
                    >
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </motion.div>
                  </motion.a>
                  
                  <motion.a
                    href="#en-savoir-plus"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/15 transition-all duration-300"
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Partenaires */}
          <div className="bg-gray-900 p-8 md:p-10">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-white font-medium">Nos partenaires de confiance</h3>
              <motion.a 
                href="#tous-les-partenaires"
                whileHover={{ x: 5 }}
                className="text-[#C8EC66] text-sm font-medium flex items-center"
              >
                Voir tous nos partenaires 
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </motion.a>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4"
            >
              {partners.map((partner, index) => (
                <motion.a
                  key={partner.name}
                  href={partner.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(200, 236, 102, 0.15)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-8 md:h-10 w-auto filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-300" 
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VroomBusinessSection;