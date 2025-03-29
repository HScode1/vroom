"use client"; // Assuming this is for Next.js App Router

import React, { useState, useEffect, ReactNode } from 'react'; // Added ReactNode type
import { motion } from 'framer-motion';
import { BadgeCheck, PhoneCall, ExternalLink, Shield, Car, Award, TrendingUp } from 'lucide-react';

// Define an interface for the structure of each driver type object
interface DriverType {
  id: string;
  title: string;
  subtitle: string;
  bgColor: string;
  iconBg: string;
  iconColor: string;
  textColor: string;
  accentColor: string;
  features: string[];
  icon: ReactNode; // Use ReactNode for JSX elements
}

const DriverProfilesSection = () => {
  const [selectedDriverType, setSelectedDriverType] = useState<string>("jeune-permis");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // useEffect to detect mobile on the client side only
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Use 768px for md breakpoint
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once on mount and cleans up on unmount

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ // Add type for custom prop if used, though idx is used below
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1 // Add a slight stagger based on index
       }
    })
  };

  const featureVariant = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({ // Explicitly type the custom prop 'i'
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + (i * 0.1), // Stagger feature appearance
        duration: 0.4
      }
    })
  };

  // Define driver types with the explicit interface
  const driverTypes: DriverType[] = [
    {
      id: "jeune-permis",
      title: "JEUNES PERMIS",
      subtitle: "Démarrez en toute confiance",
      bgColor: "bg-[#F4FBDB]",
      iconBg: "bg-[#C8EC66]/20",
      iconColor: "text-[#7ab93d]", // More specific green
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
    <section className="py-16 md:py-24 lg:py-32 min-h-screen flex items-center overflow-hidden relative bg-gradient-to-br from-white via-white to-[#F4FBDB]/30">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#C8EC66]/10 rounded-full blur-3xl -mr-32 -mt-32 md:-mr-48 md:-mt-48 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 md:w-80 md:h-80 bg-[#C8EC66]/10 rounded-full blur-3xl -ml-28 -mb-28 md:-ml-40 md:-mb-40 opacity-70"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-[#C8EC66]/5 rounded-full blur-3xl opacity-50"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Main text */}
          <div className="w-full lg:w-2/5 mb-12 lg:mb-0 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium mb-6 bg-[#C8EC66]/20 text-[#7ab93d]"
            >
              <Car className="w-4 h-4 mr-2" />
              SOLUTIONS PERSONNALISÉES
            </motion.div>

            {/* Main title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-archivo text-gray-900 leading-tight mb-6"
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
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Que vous soyez un jeune conducteur à la recherche de votre première voiture ou un chauffeur VTC ayant besoin d&apos;un véhicule professionnel, nous avons des solutions adaptées à vos besoins spécifiques.
            </motion.p>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 25px -10px rgba(200, 236, 102, 0.5)" // Adjusted shadow
              }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-[#C8EC66] text-gray-800 font-semibold shadow-lg hover:bg-[#b8d65c] transition-all duration-300"
            >
              Prendre rendez-vous
              <PhoneCall className="w-5 h-5 ml-2" />
            </motion.button>
          </div>

          {/* Right side - Driver type cards */}
          <div className="w-full lg:w-3/5 lg:pl-12">
            {/* Mobile driver type selector - client-side only */}
            {isMobile && ( // Render container only if isMobile is true
              <div className="flex mb-6 p-1 bg-gray-100 rounded-full lg:hidden">
                {driverTypes.map((driverType) => (
                  <button
                    key={driverType.id}
                    onClick={() => setSelectedDriverType(driverType.id)}
                    className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedDriverType === driverType.id
                        ? "bg-[#C8EC66] text-gray-800 shadow-md"
                        : "bg-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {driverType.id === "jeune-permis" ? "Jeunes permis" : "Chauffeurs VTC"}
                  </button>
                ))}
              </div>
            )}

            {/* Cards display - Adaptive */}
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
              {driverTypes.map((driverType: DriverType, idx: number) => ( // Add types here
                <motion.div
                  key={driverType.id}
                  variants={fadeInUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  custom={idx} // Use idx for stagger delay
                  viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is visible
                  whileHover={{
                    y: isMobile ? 0 : -8, // Disable hover effect on mobile
                    transition: { duration: 0.3 }
                  }}
                  className={`w-full md:w-1/2 ${
                    // Conditional display logic based on state
                    (!isMobile || selectedDriverType === driverType.id)
                      ? "block"
                      : "hidden md:block" // Always block on medium screens and up
                  } ${driverType.bgColor} ${driverType.textColor} rounded-3xl p-6 sm:p-8 md:p-8 lg:p-10 relative flex flex-col justify-between shadow-xl overflow-hidden ${
                    // Adaptive height on mobile
                    "min-h-[450px] md:min-h-[600px] lg:min-h-[670px]" // Use min-h for consistent height
                  }`}
                >
                  {/* Card Content */}
                  <div>
                    <div className="flex items-center mb-6">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden mr-4 flex items-center justify-center shadow-md ${driverType.iconBg}`}>
                        {driverType.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg sm:text-xl opacity-80">{driverType.id === "jeune-permis" ? "18-25 ans" : "Professionnels"}</h4>
                        <h3 className="text-2xl sm:text-3xl font-bold font-archivo leading-tight">
                          {driverType.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-base sm:text-lg font-medium mb-6 sm:mb-8 opacity-90">
                      {driverType.subtitle}
                    </p>

                    {/* Features list */}
                    <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                      {driverType.features.map((feature: string, i: number) => ( // Add types here
                        <motion.div
                          key={feature} // Use feature string as key if unique, otherwise index 'i'
                          variants={featureVariant}
                          initial="hidden"
                          whileInView="visible"
                          custom={i} // Pass index 'i' to variants
                          viewport={{ once: true }}
                          className="flex items-center"
                        >
                          <div className={`flex-shrink-0 ${driverType.iconBg} p-1.5 rounded-full`}>
                            <BadgeCheck className={`w-4 h-4 ${driverType.iconColor}`} />
                          </div>
                          <span className="ml-3 font-medium text-sm sm:text-base opacity-95">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom part: Button and Stat */}
                  <div className="mt-auto">
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center text-sm sm:text-base ${
                        driverType.id === "jeune-permis"
                          ? "bg-[#C8EC66] text-gray-800 hover:bg-[#b8d65c]"
                          : "bg-white text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      Découvrir nos offres
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </motion.button>

                    {/* Stat */}
                    <div className="mt-4 sm:mt-5 text-center">
                      <div className="inline-flex items-center opacity-70">
                        {driverType.id === "jeune-permis" ? (
                          <>
                            <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 text-[#7ab93d]" />
                            <span className="text-xs sm:text-sm font-medium">Garantie 24 mois incluse</span>
                          </>
                        ) : (
                          <>
                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 text-[#C8EC66]" />
                            <span className="text-xs sm:text-sm font-medium">+2500 professionnels équipés</span>
                          </>
                        )}
                      </div>
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

export default DriverProfilesSection;