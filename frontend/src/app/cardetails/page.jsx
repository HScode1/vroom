import CarDetailContent from '@/components/CarDetailContent';
import { Footer } from '@/components/Footer';
import Navbar from '@/components/Navbar';


export default function CarDetailPage() {
  return (
    <>
      <Navbar />
      <CarDetailContent />
      
      <Footer />
    </>
  );
}










// "use client"
// import React, { useState, useEffect } from 'react';
// import { 
//   Car, PaintBucket, Armchair, Door, Users, CircleDot, Calendar, Gauge,
//   Fuel, Cog, Users2, Wind, Info, BadgeCheck, Zap, Settings, Activity,
//   ChevronLeft, ChevronRight, Phone, Check, AlertCircle, Camera,
//   Share2, Heart, Shield, Star, MessageCircle, MapPin, Expand
// } from 'lucide-react';
// import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// import { SimilarCarsSection } from '@/components/SimilarCarSection';
// import { Footer } from '@/components/Footer';
// import VehicleDetails from '@/components/vehiculeDetails';

// const photos = [
//   '/toyota/E114833244_STANDARD_2.jpg',
//   '/toyota/E114833244_STANDARD_3.jpg',
//   '/toyota/E114833244_STANDARD_4.jpg',
//   '/toyota/E114833244_STANDARD_5.jpg',
//   '/toyota/E114833244_STANDARD_6.jpg',
//   '/toyota/E114833244_STANDARD_9.jpg',
//   '/toyota/E114833244_STANDARD_12.jpg',
//   '/toyota/E114833244_STANDARD_13.jpg',
//   '/toyota/E114833244_STANDARD_14.jpg',
//   '/toyota/E114833244_STANDARD_15.jpg',
// ];

// const PriceTag = ({ price }) => (
//   <motion.div 
//     className="flex items-end gap-1"
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, type: "spring" }}
//   >
//     <span className="text-5xl font-bold tracking-tight">{price.toLocaleString()}</span>
//     <span className="text-2xl mb-1">€</span>
//     <span className="text-gray-500 mb-1 ml-2 text-lg">TTC</span>
//   </motion.div>
// );

// const KeyMetric = ({ label, value, icon: Icon }) => (
//   <motion.div 
//     className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
//     whileHover={{ y: -4, scale: 1.02 }}
//   >
//     <div className="flex items-center gap-3 mb-3">
//       <div className="p-2 bg-[#C8EC66]/20 rounded-lg">
//         <Icon className="w-5 h-5 text-[#98B544]" />
//       </div>
//       <div className="text-sm text-gray-500">{label}</div>
//     </div>
//     <div className="text-2xl font-semibold">{value}</div>
//   </motion.div>
// );

// const Advantage = ({ text, delay = 0 }) => (
//   <motion.div 
//     className="flex items-start gap-3"
//     initial={{ opacity: 0, x: -20 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ duration: 0.5, delay, type: "spring" }}
//   >
//     <div className="mt-1">
//       <div className="p-1.5 rounded-full bg-[#C8EC66]">
//         <Check className="w-4 h-4" />
//       </div>
//     </div>
//     <span className="text-gray-600 text-lg">{text}</span>
//   </motion.div>
// );

// const KeyInformationSection = () => {
//   const metrics = [
//     { label: "Kilométrage", value: "30 000 km", icon: Gauge },
//     { label: "Année", value: "2008", icon: Calendar },
//     { label: "Carburant", value: "Essence", icon: Fuel }
//   ];

//   const advantages = [
//     "Garantie 12 mois incluse",
//     "Contrôle technique à jour",
//     "Historique d'entretien complet",
//     "Reprise possible de votre véhicule"
//   ];

//   return (
//     // Changement de space-y-8 à space-y-16 pour augmenter l'espacement vertical
//     <div className="space-y-16">
//       <div className="bg-gradient-to-br from-[#C8EC66]/20 to-[#C8EC66]/5 rounded-3xl p-8 border border-[#C8EC66]/20">
//         <motion.div 
//           className="flex items-center gap-2 text-gray-600 mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <MapPin className="w-5 h-5" />
//           <span className="text-lg">Disponible à Paris</span>
//         </motion.div>
        
//         <div className="flex justify-between items-start">
//           <PriceTag price={6448} />
//           <motion.button 
//             className="bg-[#C8EC66] px-8 py-4 rounded-full font-medium flex items-center gap-3 hover:shadow-lg transition-all text-lg"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Réserver ce véhicule
//             <ChevronRight className="w-5 h-5" />
//           </motion.button>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-6">
//         {metrics.map((metric) => (
//           <KeyMetric 
//             key={metric.label}
//             label={metric.label}
//             value={metric.value}
//             icon={metric.icon}
//           />
//         ))}
//       </div>

//       <motion.div 
//         className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
//         whileHover={{ scale: 1.01 }}
//       >
//         <h3 className="text-xl font-semibold mb-8">Les plus de ce véhicule</h3>
//         <div className="grid grid-cols-2 gap-6">
//           {advantages.map((advantage, index) => (
//             <Advantage 
//               key={advantage} 
//               text={advantage} 
//               delay={index * 0.1}
//             />
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const IncludedServicesSection = () => (
//   <motion.div 
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="bg-gradient-to-br from-[#C8EC66]/15 to-[#C8EC66]/5 rounded-3xl p-8 mb-8 border border-[#C8EC66]/20"
//   >
//     <div className="flex items-center gap-6 mb-8 mt-10">
//       <div className="bg-[#C8EC66] p-4 rounded-xl">
//         <Shield className="w-8 h-8 text-black" />
//       </div>
//       <div>
//         <h3 className="text-2xl font-bold mb-1">Services inclus</h3>
//         <p className="text-gray-500 text-lg">Tout est compris dans votre achat</p>
//       </div>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {[
//         "Inspection complète",
//         "Garantie 6 mois",
//         "Entretien à jour",
//         "Livraison possible",
//         "Contrôle technique",
//         "Préparation esthétique"
//       ].map((service, index) => (
//         <motion.div
//           key={service}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.1 }}
//           whileHover={{ scale: 1.03 }}
//           className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-100"
//         >
//           <div className="bg-[#C8EC66] p-2 rounded-lg">
//             <Check className="w-5 h-5 text-black" />
//           </div>
//           <span className="font-medium text-lg">{service}</span>
//         </motion.div>
//       ))}
//     </div>
//   </motion.div>
// );

// const ExpertAdviceSection = () => (
//   <motion.div 
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-8 shadow-xl border border-gray-700"
//   >
//     <div className="flex flex-col items-start">
//       <div className="bg-[#C8EC66] p-4 rounded-xl mb-6">
//         <MessageCircle className="w-8 h-8 text-black" />
//       </div>
//       <h3 className="text-3xl font-bold mb-3">Besoin d'un expert ?</h3>
//       <p className="text-gray-300 text-lg mb-8">
//         Nos conseillers automobiles sont à votre disposition pour vous accompagner dans votre choix.
//       </p>
//       <div className="space-y-4 w-full">
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           className="w-full bg-[#C8EC66] text-black rounded-xl py-4 font-medium hover:bg-[#C8EC66]/90 transition-colors flex items-center justify-center gap-3 text-lg"
//         >
//           <Phone className="w-5 h-5" />
//           Contactez-nous
//         </motion.button>
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           className="w-full bg-white/10 text-white rounded-xl py-4 font-medium hover:bg-white/20 transition-colors text-lg"
//         >
//           Prendre rendez-vous
//         </motion.button>
//       </div>
//     </div>
//   </motion.div>
// );

// const TabButton = ({ active, icon: Icon, label, onClick }) => (
//   <motion.button
//     whileHover={{ scale: 1.02 }}
//     whileTap={{ scale: 0.98 }}
//     onClick={onClick}
//     className={`flex items-center gap-4 px-8 py-5 rounded-xl transition-all duration-300 ${
//       active 
//         ? 'bg-[#C8EC66] text-black shadow-lg' 
//         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//     }`}
//   >
//     <Icon className="w-6 h-6" />
//     <span className="font-medium text-lg whitespace-nowrap">{label}</span>
//   </motion.button>
// );

// const DetailCard = ({ Icon, label, value, description = null }) => {
//   if (!Icon) return null;
  
//   return (
//     <motion.div 
//       className="bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100"
//       whileHover={{ y: -4, scale: 1.02 }}
//     >
//       <div className="flex items-start gap-4">
//         <div className="relative">
//           <div className="absolute -inset-3 bg-[#C8EC66]/10 rounded-xl blur-sm" />
//           <Icon className="w-7 h-7 text-[#98B544] relative" />
//         </div>
//         <div className="flex-1">
//           <div className="text-sm text-gray-500 mb-2">{label}</div>
//           <div className="font-semibold text-xl text-gray-900">{value}</div>
//           {description && (
//             <div className="text-sm text-gray-500 mt-2">{description}</div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };


// const MainGallerySection = ({ photos, onOpenGallery, setSelectedPhotoIndex }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   const nextImage = (e) => {
//     e.stopPropagation();
//     setCurrentIndex((prev) => (prev + 1) % photos.length);
//   };

//   const prevImage = (e) => {
//     e.stopPropagation();
//     setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
//   };

//   const handleOpenGallery = () => {
//     setSelectedPhotoIndex(currentIndex);
//     onOpenGallery(true);
//   };

//   return (
//     <motion.div 
//       className="relative rounded-3xl overflow-hidden h-[650px] cursor-pointer mb-12"
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       onClick={handleOpenGallery}
//     >
//       <AnimatePresence initial={false}>
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           transition={{ duration: 0.4 }}
//           className="absolute inset-0"
//         >
//           <img 
//             src={photos[currentIndex]}
//             alt="Main view"
//             className="w-full h-full object-cover transition-transform duration-500"
//             style={{
//               transform: isHovered ? 'scale(1.03)' : 'scale(1)'
//             }}
//           />
//         </motion.div>
//       </AnimatePresence>

//       <motion.div 
//         className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: isHovered ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       />

//       <motion.div 
//         className="absolute inset-0 flex items-center justify-between px-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: isHovered ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={nextImage}
//           className="p-4 bg-white/90 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white"
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={prevImage}
//           className="p-4 bg-white/90 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white"
//         >
//           <ChevronRight className="w-6 h-6" />
//         </motion.button>
//       </motion.div>

//       <motion.div 
//         className="absolute bottom-0 inset-x-0 p-8 flex justify-between items-center"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="flex items-center gap-4">
//           <span className="text-white px-6 py-3 rounded-full text-lg bg-black/40 backdrop-blur-sm">
//             {currentIndex + 1} / {photos.length}
//           </span>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleOpenGallery}
//             className="flex items-center gap-3 bg-[#C8EC66] text-black px-8 py-4 rounded-full text-lg font-medium shadow-lg"
//           >
//             <Camera className="w-5 h-5" />
//             Voir toutes les photos
//           </motion.button>
//         </div>
//         <motion.div
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           className="p-4 bg-white/90 rounded-full shadow-lg backdrop-blur-sm hover:bg-white"
//         >
//           <Expand className="w-6 h-6" />
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// const HeroSection = () => {
//   const { scrollY } = useScroll();
  
//   const y = useTransform(scrollY, [0, 300], [0, -30]);
//   const scale = useTransform(scrollY, [0, 300], [1, 1.05]);
  
//   return (
//     <div className="max-w-7xl mx-auto px-8 mt-12 mb-16">
//       {/* Container avec position relative pour le positionnement absolu du titre */}
//       <div className="relative">
//         {/* Titre avec position absolue et z-index supérieur */}
//         <motion.div 
//           className="absolute -top-8 inset-x-0 z-10"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           <div className="text-center bg-white/80 backdrop-blur-sm py-2 rounded-full max-w-2xl mx-auto">
//             <h1 className="text-4xl font-bold text-gray-900">
//               Performance,
//               <span className="text-[#C8EC66]"> Confiance </span>
//               & Fiabilité
//             </h1>
//           </div>
//         </motion.div>

//         {/* Container de l'image avec effet parallax */}
//         <motion.div 
//           className="relative pt-8"
//           style={{ y }}
//         >
//           <motion.div
//             className="relative rounded-3xl overflow-hidden shadow-lg"
//             style={{ scale }}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.5 }}
//           >
//             <img 
//               src="bmw." 
//               alt="Voiture vue de face"
//               className="w-full h-[400px] object-cover"
//             />
//           </motion.div>

//           {/* Points clés superposés sur l'image */}
//           <div className="absolute inset-x-0 bottom-6 flex justify-center gap-6">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.8 }}
//               className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md text-sm"
//             >
//               <span className="font-medium">Design Premium</span>
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 1 }}
//               className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md text-sm"
//             >
//               <span className="font-medium">Confort Exceptionnel</span>
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 1.2 }}
//               className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md text-sm"
//             >
//               <span className="font-medium">Technologie Avancée</span>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };




// export default function CarDetailPage() {
//   const [showGallery, setShowGallery] = useState(false);
//   const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b">
//         <div className="max-w-7xl mx-auto px-8 py-4">
//           <nav className="flex items-center justify-between">
//             <div className="flex items-center gap-6">
//               <motion.button 
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="p-2 hover:bg-gray-100 rounded-full"
//               >
//                 <ChevronLeft className="w-6 h-6" />
//               </motion.button>
//               <div>
//                 <h1 className="text-2xl font-bold">TOYOTA PRIUS 1.5 VVT-i</h1>
//                 <div className="flex items-center gap-2 text-gray-500 mt-1">
//                   <MapPin className="w-4 h-4" />
//                   <span>Paris, France</span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsFavorite(!isFavorite)}
//                 className={`p-3 rounded-full ${isFavorite ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100'}`}
//               >
//                 <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="p-3 hover:bg-gray-100 rounded-full"
//               >
//                 <Share2 className="w-6 h-6" />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="bg-[#C8EC66] text-black px-8 py-4 rounded-full font-medium flex items-center gap-3 text-lg"
//               >
//                 <Phone className="w-5 h-5" />
//                 06 49 49 39 39
//               </motion.button>
//             </div>
//           </nav>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-8 py-8">
//         <MainGallerySection 
//           photos={photos}
//           onOpenGallery={setShowGallery}
//           setSelectedPhotoIndex={setSelectedPhotoIndex}
//         />

//         <div className="grid grid-cols-12 gap-8">
//           <div className="col-span-8">
//             <KeyInformationSection />
//             <IncludedServicesSection />
//             <VehicleDetails />
//           </div>

//           <div className="col-span-4">
//             <div className="sticky top-24">
//               <ExpertAdviceSection />
//             </div>
//           </div>
//         </div>
//         <HeroSection />

//         <SimilarCarsSection />
//       </main>
      
//       <Footer />
//     </div>
//   );
// }