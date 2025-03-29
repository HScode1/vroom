import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, ExternalLink, Car, Building, TrendingUp } from 'lucide-react';
import Image from 'next/image'; // Import next/image

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
    // Note: Using Wikipedia logos might have licensing implications. Replace with official/approved logos.
    { name: "CER", logo: "https://upload.wikimedia.org/wikipedia/fr/a/a3/Centre_d%27%C3%A9ducation_routi%C3%A8re.png", href: "#cer" },
    { name: "Renault", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Renault_2021_Text.svg", href: "#renault" },
    { name: "Volkswagen", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/100px-Volkswagen_logo_2019.svg.png", href: "#vw" }, // Smaller SVG version
    { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Mercedes-Benz_Star_2022.svg/100px-Mercedes-Benz_Star_2022.svg.png", href: "#mercedes" }, // Smaller SVG version
    { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/100px-BMW_logo_%28gray%29.svg.png", href: "#bmw" } // Smaller SVG version
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
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } // Smoother ease
    }
  };

  const featureItems: FeatureItem[] = [
    { icon: Car, text: "Gestion complète de votre flotte automobile" },
    { icon: Building, text: "Solutions adaptées aux entreprises de toutes tailles" },
    { icon: TrendingUp, text: "Optimisation des coûts et processus simplifiés" } // Reworded
  ];

  return (
    <div className="relative py-12 lg:py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -z-10 w-72 h-72 lg:w-96 lg:h-96 bg-[#C8EC66]/5 rounded-full blur-3xl -mr-36 -mt-36 lg:-mr-48 lg:-mt-48 opacity-70"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-64 h-64 lg:w-80 lg:h-80 bg-[#C8EC66]/5 rounded-full blur-3xl -ml-32 -mb-32 lg:-ml-40 lg:-mb-40 opacity-70"></div>
      <div className="absolute top-1/2 left-1/3 -z-10 w-48 h-48 lg:w-64 lg:h-64 bg-[#C8EC66]/5 rounded-full blur-3xl opacity-50"></div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }} // Animate when in view
        viewport={{ once: true, amount: 0.2 }} // Trigger once
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-gray-900"> {/* Use gray-900 for deeper black */}
          {/* Main Section */}
          <div className="p-6 sm:p-8 md:p-12 lg:p-16 relative border-b border-gray-700"> {/* Adjusted border color */}
            {/* Pattern overlay - Subtle */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: 'radial-gradient(circle, #C8EC66 0.5px, transparent 0.5px)',
              backgroundSize: '15px 15px' // Smaller pattern
            }}></div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 lg:gap-16">
              {/* Logo and Title section */}
              <div className="mb-6 md:mb-0 flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-left"
                >
                  <div className="relative inline-block mb-2">
                    <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">vroom</h2> {/* Added tracking */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                      style={{ originX: 0 }}
                      className="absolute -bottom-1 left-0 h-1 bg-[#C8EC66] rounded-full w-full"
                    />
                  </div>
                  <p className="text-[#C8EC66] text-lg sm:text-xl font-medium tracking-wide">for Business</p> {/* Added tracking */}
                </motion.div>

                {/* Feature items */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible" // Animate when in view
                  viewport={{ once: true }}
                  className="mt-6 space-y-3 block"
                >
                  {featureItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={index} // Using index as key here is acceptable if items don't change order
                        variants={itemVariants}
                        className="flex items-center gap-2.5" // Increased gap
                      >
                        <div className="flex items-center justify-center p-1.5 rounded-full bg-[#C8EC66]/15 border border-[#C8EC66]/20"> {/* Added border */}
                          <IconComponent className="w-4 h-4 text-[#C8EC66]" /> {/* Adjusted size */}
                        </div>
                        <span className="text-gray-300 text-sm sm:text-base leading-snug"> {/* Adjusted size/leading */}
                          {item.text}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Text and CTA section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-2xl mt-4 md:mt-0"
              >
                 {/* Fixed unescaped entities using ' */}
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                  Vroom for Business facilite l&apos;achat et la revente de véhicules pour votre entreprise. Profitez d&apos;une plateforme dédiée et personnalisée pour gérer l&apos;ensemble de votre flotte automobile avec des options de financement flexibles et simplifiées.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="#commencer" // Consider using a more descriptive href or onClick handler
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "#d5ff75", // Slightly lighter green on hover
                      boxShadow: "0 10px 20px -5px rgba(200, 236, 102, 0.3)" // Adjusted shadow
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 bg-[#C8EC66] text-gray-900 font-semibold rounded-lg sm:rounded-xl shadow-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#C8EC66]" // Added focus states
                  >
                    Découvrir nos offres Pro
                    <motion.span // Animate the icon container
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="ml-2"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.span>
                  </motion.a>

                  <motion.a
                    href="#en-savoir-plus"
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.15)" }} // Slightly lighter hover
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 bg-white/10 text-white font-medium rounded-lg sm:rounded-xl hover:bg-white/15 transition-colors duration-300 text-sm sm:text-base w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white" // Added focus states
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Partners Section */}
          <div className="bg-black p-5 sm:p-8 md:p-10"> {/* Use black for consistency */}
            <div className="mb-5 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h3 className="text-white text-sm sm:text-base font-medium tracking-wide">Nos partenaires de confiance</h3>
              <motion.a
                href="#tous-les-partenaires"
                whileHover={{ x: 3 }} // Subtle hover effect
                className="text-[#C8EC66] hover:text-[#d5ff75] text-xs sm:text-sm font-medium flex items-center transition-colors" // Added hover color
              >
                Voir tous nos partenaires
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </motion.a>
            </div>

            {/* Logo Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants} // Use container variants for staggering
              className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-4" // Adjusted grid for better spacing
            >
              {partners.map((partner) => (
                <motion.a
                  key={partner.name} // Use a unique and stable key like partner name
                  href={partner.href}
                  target="_blank" // Open partner links in new tab
                  rel="noopener noreferrer"
                  variants={itemVariants} // Use item variants for individual animation
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.05)", // Subtle hover background
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center p-4 sm:p-5 rounded-lg sm:rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 aspect-video sm:aspect-auto" // Use aspect-video for consistent shape on smaller screens
                  title={`Visiter ${partner.name}`} // Add title for accessibility
                >
                   {/* Use Next/Image */}
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={120} // Provide base width
                    height={40} // Provide base height
                    className="object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-300 max-h-[30px] sm:max-h-[40px]" // Use object-contain and max-h
                    unoptimized={true} // Since logos are external SVGs/PNGs
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