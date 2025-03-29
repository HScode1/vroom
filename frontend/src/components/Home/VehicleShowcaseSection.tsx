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

interface CarData {
  image: string;
  title: string;
  subtitle: string;
  year: string;
  transmission: string;
  mileage: number;
  price: number;
  department: string;
  state: string;
  label?: string;
  sellerType?: string;
  totalUsers?: number;
}

interface SimilarCarProps {
  data: CarData;
}

const SimilarCar: React.FC<SimilarCarProps> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="min-w-[300px] sm:min-w-[380px] flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border-2 border-gray-200 hover:border-[#C8EC66]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-3 sm:p-4 pt-3 sm:pt-4 pb-0">
        {/* Further reduced height for the image container */}
        <div className="relative overflow-hidden rounded-2xl w-full h-[180px] sm:h-[220px]">
          <motion.img
            src={data.image || "/api/placeholder/400/300"}
            alt={data.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.button
            className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Ajouter aux favoris"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </motion.button>
          {(data.label || data.sellerType) && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-2 flex-wrap">
                {data.label && (
                  data.label === "Bonne affaire" ? (
                    <div className="flex items-center gap-1 text-xs font-medium bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <ThumbsUp className="w-3 h-3" />
                      Bonne affaire
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs font-medium bg-blue-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Shield className="w-3 h-3" />
                      Offre équitable
                    </div>
                  )
                )}
                {data.sellerType && (
                  <div className="flex items-center gap-1 text-xs font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    {data.sellerType === "Vendeur professionnel" ? "Pro" : "Particulier"}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{data.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{data.subtitle}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{data.price.toLocaleString()} €</p>
            <p className="text-xs text-gray-500">Prix tout inclus</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-4 sm:mt-5">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full border border-gray-200 flex-shrink-0">
              <Fuel className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </div>
            <span className="truncate">{data.state}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full border border-gray-200 flex-shrink-0">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </div>
            <span>{data.year}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full border border-gray-200 flex-shrink-0">
              <Gauge className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </div>
            <span className="truncate">{data.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full border border-gray-200 flex-shrink-0">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </div>
            <span className="truncate">{data.transmission}</span>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-gray-700">
          <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full border border-gray-200 flex-shrink-0">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </div>
          <span className="truncate">Département {data.department}</span>
        </div>
        <motion.button
          className="mt-auto pt-4 sm:pt-6 w-full flex items-center justify-center gap-2 bg-[#C8EC66] text-gray-900 rounded-full py-3 sm:py-3.5 px-4 sm:px-6 font-medium transition-colors hover:bg-[#bddf5c] shadow-sm hover:shadow-md border-2 border-[#C8EC66] hover:border-[#bddf5c]"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Voir plus
          <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
};



// VehicleShowcaseSection component (Corrected for TypeScript)
export const VehicleShowcaseSection = () => {
  // **FIX: Explicitly type the ref as HTMLDivElement**
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [cardWidth, setCardWidth] = useState(320); // Default, will be updated

  // Update scroll values and card width
  const updateMeasurements = () => {
    // **FIX: Add null check for scrollRef.current**
    if (scrollRef.current) {
      // Now TypeScript knows these properties exist on HTMLDivElement
      setScrollPosition(scrollRef.current.scrollLeft);
      setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);

      // Calculate card width dynamically (more robust)
      // **FIX: Ensure querySelector exists and firstCard is Element**
      const firstCard = scrollRef.current.querySelector<HTMLDivElement>(':scope > div'); // Type the querySelector result
      if (firstCard) {
        const cardStyle = window.getComputedStyle(firstCard);
        const cardMargin = parseFloat(cardStyle.marginRight) || 0;
        setCardWidth(firstCard.offsetWidth + cardMargin);
      } else {
        setCardWidth(window.innerWidth < 640 ? 300 + 12 : 380 + 24);
      }
    }
  };

  // Handle resize and initial setup
  useEffect(() => {
    const timer = setTimeout(updateMeasurements, 100);
    window.addEventListener("resize", updateMeasurements);
    // Initial measurement on mount after delay
    updateMeasurements(); // Call once after mount as well

    return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", updateMeasurements);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Dependency array remains empty for mount/unmount effect

  // Update scroll position on scroll
  const handleScroll = () => {
    // **FIX: Add null check**
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  // Scroll function
  // **FIX: Add type for direction parameter**
  const scroll = (direction: 'left' | 'right') => {
    // **FIX: Add null check**
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Sample data (Unchanged)
  const similarCars = [{
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
    }
  ]
  // Services data (Unchanged)
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

  // Calculate number of dots needed
  // **FIX: Add null check for scrollRef.current here too**
  const numDots = scrollRef.current && maxScroll > 0 && cardWidth > 0
    ? Math.ceil(scrollRef.current.scrollWidth / cardWidth)
    : similarCars.length;

  // Determine active dot index
  const activeDotIndex = cardWidth > 0 ? Math.round(scrollPosition / cardWidth) : 0;


  return (
    <>
      <GlobalStyle />
      {/* Main Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden"
      >
        {/* Background Blobs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#C8EC66]/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#C8EC66]/10 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12 lg:mb-16 md:flex md:justify-between md:items-end"
          >
            <div>
              <div className="flex items-center mb-3 md:mb-4">
                <div className="w-8 md:w-10 h-1 bg-[#C8EC66] rounded-full mr-3"></div>
                <h2 className="text-base md:text-lg font-semibold text-gray-600 tracking-wide">NOTRE SÉLECTION</h2>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">NOS VÉHICULES</h2>
              <p className="text-lg md:text-xl text-gray-600">Un achat tout inclus, satisfaction garantie.</p>
            </div>
            <div className="hidden md:block mt-4 md:mt-0">
              <motion.a
                href="/vehicules"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 lg:px-8 py-3 bg-[#C8EC66] text-gray-900 font-medium rounded-full hover:bg-[#b5d85d] transition-all duration-300 shadow-md hover:shadow-lg border-2 border-[#C8EC66] hover:border-[#b5d85d]"
              >
                Voir tous nos véhicules
                <ChevronRight className="w-5 h-5 ml-2" />
              </motion.a>
            </div>
          </motion.div>

          {/* Services Section */}
          <div className="bg-gray-900 border border-[#C8EC66]/50 shadow-xl rounded-3xl p-6 md:p-8 mb-8 md:mb-12 lg:mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center text-center p-4 hover:bg-[#C8EC66]/10 rounded-lg transition-colors border border-transparent hover:border-[#C8EC66]/30"
                >
                  <div className="w-12 h-12 bg-[#C8EC66]/20 rounded-full flex items-center justify-center mb-3 border border-[#C8EC66]/30 flex-shrink-0">
                    <service.icon className="w-6 h-6 text-[#C8EC66]" />
                  </div>
                  <p className="text-sm font-medium text-[#C8EC66] mb-1">{service.text}</p>
                  <p className="text-xs text-gray-300 mt-1 leading-snug">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Carousel Section */}
          <div className="relative mb-8 md:mb-12 lg:mb-16">
             {/* Scrollable Container */}
            <div
              ref={scrollRef} // Ref is now correctly typed
              onScroll={handleScroll}
              className="flex gap-3 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-6 md:pb-10 -mx-4 px-4 md:px-0 md:-mx-0"
              style={{
                 scrollbarWidth: "none",
                 msOverflowStyle: "none",
              }}
            >
              {similarCars.map((car, index) => (
                <SimilarCar key={index} data={car} />
              ))}
            </div>

            {/* Scroll Buttons */}
            <AnimatePresence>
              {scrollPosition > 10 && (
                <motion.button
                  key="left-button"
                  initial={{ opacity: 0, x: -10, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.8 }}
                  whileHover={{ scale: 1.1, backgroundColor: "#ffffff" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scroll("left")} // Direction is typed
                  className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm shadow-xl rounded-full p-2 md:p-3 z-10 hover:bg-[#C8EC66]/20 transition-all border border-gray-200 hover:border-[#C8EC66]"
                  aria-label="Précédent"
                >
                  <ChevronLeft className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
                </motion.button>
              )}
              {maxScroll > 0 && scrollPosition < maxScroll - 10 && (
                 <motion.button
                    key="right-button"
                    initial={{ opacity: 0, x: 10, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.8 }}
                    whileHover={{ scale: 1.1, backgroundColor: "#ffffff" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => scroll("right")} // Direction is typed
                    className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm shadow-xl rounded-full p-2 md:p-3 z-10 hover:bg-[#C8EC66]/20 transition-all border border-gray-200 hover:border-[#C8EC66]"
                    aria-label="Suivant"
                 >
                    <ChevronRight className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
                 </motion.button>
               )}
            </AnimatePresence>

            {/* Navigation indicators */}
            <div className="flex justify-center gap-2 mt-4 md:mt-6">
              {Array.from({ length: numDots }).map((_, index) => {
                const isActive = index === activeDotIndex;
                return (
                  <motion.div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 border ${
                       isActive ? "bg-[#C8EC66] border-[#b5d85d]" : "bg-gray-300 border-gray-400"
                    }`}
                    animate={{
                      width: isActive ? 32 : 8,
                      backgroundColor: isActive ? "#C8EC66" : "#D1D5DB",
                      borderColor: isActive ? "#b5d85d" : "#9CA3AF"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}
            </div>
          </div>

          {/* Mobile "See All" Button */}
          <div className="text-center mt-4 md:mt-8 md:hidden">
            <motion.a
              href="/vehicules"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-[#C8EC66] text-gray-900 text-base font-medium rounded-full hover:bg-[#b5d85d] transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-[#C8EC66] hover:border-[#b5d85d]"
            >
              Voir tous nos véhicules
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default VehicleShowcaseSection;

// Global style to hide scrollbar (Unchanged)
const GlobalStyle = () => (
  <style jsx global>{`
    .scrollbar-hide::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
    .scrollbar-hide {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `}</style>
);