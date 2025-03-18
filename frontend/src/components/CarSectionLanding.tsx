import React, { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Check,
  ArrowRight,
  Shield,
  ThumbsUp,
  MapPin,
  Calendar,
  Clock,
  Fuel,
  Gauge,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SimilarCar = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="min-w-[380px] bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border-2 border-gray-200 hover:border-[#C8EC66]" // Added border-2 and hover effect
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image container avec marge intérieure */}
      <div className="p-4 pt-4 pb-0">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
          <motion.img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
          />

          <motion.button
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="w-5 h-5 text-gray-700" />
          </motion.button>

          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-2">
              {data.label === "Bonne affaire" ? (
                <div className="flex items-center gap-1 text-xs font-medium bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <ThumbsUp className="w-3 h-3" />
                  Bonne affaire
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs font-medium bg-blue-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Shield className="w-3 h-3" />
                  Offre équitable
                </div>
              )}

              <div className="flex items-center gap-1 text-xs font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                {data.sellerType === "Vendeur professionnel" ? "Pro" : "Particulier"}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{data.title}</h3>
            <p className="text-gray-600 text-sm">{data.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{data.price.toLocaleString()} €</p>
            <p className="text-xs text-gray-500">Prix tout inclus</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full border border-gray-200">
              <Fuel className="w-4 h-4 text-gray-600" />
            </div>
            {data.state}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full border border-gray-200">
              <Calendar className="w-4 h-4 text-gray-600" />
            </div>
            {data.year}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full border border-gray-200">
              <Gauge className="w-4 h-4 text-gray-600" />
            </div>
            {data.mileage.toLocaleString()} km
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full border border-gray-200">
              <Clock className="w-4 h-4 text-gray-600" />
            </div>
            {data.transmission}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full border border-gray-200">
            <MapPin className="w-4 h-4 text-gray-600" />
          </div>
          Département {data.department}
        </div>

        <motion.button
          className="mt-6 w-full flex items-center justify-center gap-2 bg-[#C8EC66] text-gray-900 rounded-xl py-3.5 px-6 font-medium transition-colors hover:bg-[#bddf5c] shadow-sm hover:shadow-md border-2 border-[#C8EC66] hover:border-[#bddf5c]" // Added border
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Voir plus
          <motion.div
            animate={{
              x: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export const CarSectionLanding = () => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // Mettre à jour les valeurs de défilement
  const updateScrollValues = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
      setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
    }
  };

  // Initialiser et mettre à jour lors du redimensionnement
  useEffect(() => {
    updateScrollValues();

    const handleResize = () => {
      updateScrollValues();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mettre à jour lors du défilement
  const handleScroll = () => {
    updateScrollValues();
  };

  const similarCars = [
    {
      image: "/autresvoitures/renault_clio5.jpg",
      title: "RENAULT CLIO 5",
      subtitle: "1.6 E-TECH 145 PREMIERE",
      year: "2021",
      transmission: "Auto",
      mileage: 89822,
      price: 16990,
      department: "51",
      state: "Hybride",
      label: "Offre équitable",
      sellerType: "Vendeur professionnel",
    },
    {
      image: "/autresvoitures/bmw_m4.jpg",
      title: "BMW M4 Competition",
      subtitle: "510ch Ultimate",
      year: "2023",
      transmission: "Auto",
      mileage: 12632,
      price: 117700,
      department: "78",
      state: "Essence",
      label: "Offre équitable",
      sellerType: "Vendeur particulier",
    },
    {
      image: "/autresvoitures/maclarren_720s.jpg",
      title: "McLaren 720S",
      subtitle: "V8 bi-turbo 720ch",
      year: "2022",
      transmission: "Auto",
      mileage: 7400,
      price: 315990,
      department: "89",
      state: "Essence",
      label: "Bonne affaire",
      sellerType: "Vendeur professionnel",
    },
    {
      image: "/autresvoitures/urus.jpg",
      title: "Lamborghini Urus",
      subtitle: "4.0 V8 650ch",
      year: "2023",
      transmission: "Auto",
      mileage: 15000,
      price: 298490,
      department: "68",
      state: "Essence",
      label: "Offre équitable",
      sellerType: "Vendeur professionnel",
    },
    {
      image: "/autresvoitures/GLE.jpg",
      title: "Mercedes GLE Coupé",
      subtitle: "400d 4MATIC AMG",
      year: "2023",
      transmission: "Auto",
      mileage: 25000,
      price: 108490,
      department: "75",
      state: "Diesel",
      label: "Offre équitable",
      sellerType: "Vendeur professionnel",
    },
  ];

  const services = [
    {
      text: "Inspection mécanique et administrative",
      icon: Shield,
      description: "135 points de contrôle complets pour une tranquillité d'esprit absolue",
    },
    {
      text: "Contrôle technique",
      icon: Check,
      description: "Validité garantie 24 mois sans contre-visite",
    },
    {
      text: "Révision & Entretien",
      icon: Gauge,
      description: "Vidange, filtres et pièces d'usure remplacées selon carnet d'entretien",
    },
    {
      text: "Livraison à votre domicile",
      icon: MapPin,
      description: "Service personnalisé avec remise en main propre sous 72h",
    },
    {
      text: "Préparation esthétique",
      icon: ThumbsUp,
      description: "Nettoyage professionnel intérieur/extérieur et traitement céramique",
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 400; // Largeur approximative d'une carte + marge
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <GlobalStyle />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 md:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden"
      >
        {/* Éléments décoratifs d'arrière-plan */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C8EC66]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#C8EC66]/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:flex md:justify-between md:items-end"
          >
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-1 bg-[#C8EC66] rounded-full mr-3"></div>
                <h2 className="text-lg font-medium text-gray-600">NOTRE SÉLECTION</h2>
              </div>
              <h2 className="text-4xl font-bold mb-2">NOS VÉHICULES</h2>
              <p className="text-xl text-gray-600">Un achat tout inclus, satisfaction garantie.</p>
            </div>

            <div className="hidden md:block">
              <motion.a
                href="/vehicules"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-[#C8EC66] text-gray-900 font-medium rounded-full hover:bg-[#b5d85d] transition-all duration-300 shadow-md hover:shadow-lg border-2 border-[#C8EC66] hover:border-[#b5d85d]" // Added border
              >
                Voir tous nos véhicules
                <ChevronRight className="w-5 h-5 ml-2" />
              </motion.a>
            </div>
          </motion.div>

          {/* Section des services - Style modifié avec bg-gray-900 */}
          <div className="bg-gray-900 border-2 border-[#C8EC66] shadow-xl rounded-3xl p-8 mb-12"> {/* Changed to border-2 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center text-center p-3 md:p-4 hover:bg-[#C8EC66]/10 rounded-lg transition-colors border border-transparent hover:border-[#C8EC66]/30" // Added border effect
                >
                  <div className="w-12 h-12 bg-[#C8EC66]/20 rounded-full flex items-center justify-center mb-3 border border-[#C8EC66]/30"> {/* Added border */}
                    <service.icon className="w-6 h-6 text-[#C8EC66]" />
                  </div>
                  <p className="text-sm font-medium text-[#C8EC66]">{service.text}</p>
                  <p className="text-xs text-white mt-1">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative px-4 mb-16">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto px-2 scrollbar-hide scroll-smooth pb-10 -mx-2 px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {similarCars.map((car, index) => (
                <SimilarCar key={index} data={car} />
              ))}
            </div>

            <AnimatePresence>
              {scrollPosition > 20 && (
                <motion.button
                  key="left-button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-xl rounded-full p-4 z-10 hover:bg-[#C8EC66]/10 transition-all border border-gray-200 hover:border-[#C8EC66]" // Added border
                  style={{ transform: "translate(0, -50%)" }}
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </motion.button>
              )}

              {scrollPosition < maxScroll - 20 && (
                <motion.button
                  key="right-button"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-xl rounded-full p-4 z-10 hover:bg-[#C8EC66]/10 transition-all border border-gray-200 hover:border-[#C8EC66]" // Added border
                  style={{ transform: "translate(0, -50%)" }}
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Indicateurs de navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.min(5, similarCars.length) }).map((_, index) => {
                const isActive =
                  scrollPosition >= index * (maxScroll / 4) && scrollPosition <= (index + 1) * (maxScroll / 4);
                return (
                  <motion.div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${isActive ? "bg-[#C8EC66] w-8 border border-[#b5d85d]" : "bg-gray-300 w-2 border border-gray-200"}`} // Added border
                    animate={{
                      width: isActive ? 32 : 8,
                      backgroundColor: isActive ? "#C8EC66" : "#D1D5DB",
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="text-center mt-8 md:hidden">
            <motion.a
              href="/vehicules"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-[#C8EC66] text-gray-900 text-lg font-medium rounded-full hover:bg-[#b5d85d] transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#C8EC66] hover:border-[#b5d85d]" // Added border
            >
              Voir tous nos véhicules
              <ChevronRight className="w-6 h-6 ml-2" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CarSectionLanding;

// Style global pour cacher la barre de défilement
const GlobalStyle = () => (
  <style jsx global>{`
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);