'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Popup from '../popup';

// Define SVG paths for badges for clarity
const badgePaths = {
  check: "M5 13l4 4L19 7",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  lock: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
};

export default function SectionRendezVous() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Configuration des données
  const benefits = [
    "Conseil personnalisé avec nos experts certifiés",
    "Présentation de véhicules adaptés à vos besoins",
    "Options de financement sur mesure avec simulation",
    "Accompagnement dans toutes vos démarches administratives"
  ];

  // Badges configuration
  const badges = [
    { path: badgePaths.check, text: "Sans engagement" },
    { path: badgePaths.clock, text: "Réponse en 24h" },
    { path: badgePaths.lock, text: "100% Confidentiel" }
  ];

  return (
    <section className="py-10 md:py-20 min-h-screen flex items-center justify-center overflow-hidden relative bg-[url('/images/gari2.jpg')] bg-cover bg-center bg-fixed">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70"></div>

      {/* Effets décoratifs - more subtle */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-lime-400/5 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-lime-400/5 rounded-full blur-3xl opacity-50 animate-pulse delay-500"></div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Titre principal */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }} // Animate when in view
          viewport={{ once: true, amount: 0.5 }} // Trigger animation once
          transition={{ type: 'spring', stiffness: 80, delay: 0.1 }}
          className="text-center mb-8 md:mb-14"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"> {/* Use extrabold */}
            <span className="block mb-1 md:mb-2">PRENEZ RENDEZ-VOUS</span> {/* Changed text */}
            <span className="block text-lime-400">AVEC NOS EXPERTS</span> {/* Use accent color */}
          </h1>
          <div className="w-20 sm:w-28 h-1 bg-lime-400 mx-auto my-4 sm:my-5 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto">
            Rencontrez notre équipe pour un accompagnement personnalisé dans votre projet automobile.
          </p>
        </motion.div>

        {/* Section Carte */}
        <div className="max-w-lg md:max-w-4xl mx-auto">
          {/* Section "Rencontrez Nos Experts" - Desktop Only */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', delay: 0.2, duration: 0.6 }}
            className="hidden md:block bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden mb-8" // Increased shadow, blur, reduced opacity
          >
            <div className="p-8">
              <div className="flex items-center mb-5">
                <div className="bg-lime-100 p-3 rounded-full mr-4 border border-lime-200 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> {/* Adjusted icon style */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Pourquoi nous rencontrer ?</h2>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {badges.map((badge, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-lime-100 text-lime-800 border border-lime-300 shadow-sm"> {/* Adjusted badge style */}
                    <svg className="h-4 w-4 mr-1.5 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={badge.path} />
                    </svg>
                    {badge.text}
                  </span>
                ))}
              </div>

              {/* Témoignage */}
              <blockquote className="bg-lime-50 rounded-lg border border-lime-100 p-4 shadow-inner"> {/* Use blockquote */}
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600 ml-2">(+180 avis)</span> {/* Simplified text */}
                </div>
                {/* Fixed quotation marks with proper escaping */}
                <p className="text-sm italic text-gray-700 leading-relaxed">&quot;Service exceptionnel ! Le conseiller m&apos;a aidé à trouver le véhicule parfait pour mes besoins.&quot;</p>
                <footer className="text-sm font-medium text-gray-700 mt-2">– Marie D., Lyon</footer> {/* Use footer */}
              </blockquote>
            </div>
          </motion.div>

          {/* Carte principale - Prenez rendez-vous */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', delay: 0.3, duration: 0.6 }}
            className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden" // Consistent styling
          >
            <div className="p-5 sm:p-8">
              <div className="flex items-center mb-4 sm:mb-5">
                <div className="bg-lime-100 p-3 sm:p-3 rounded-full mr-3 sm:mr-4 border border-lime-200 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}> {/* Adjusted icon style */}
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /> {/* Using CalendarDays icon */}
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Planifiez Votre Rendez-vous</h2> {/* Changed title */}
              </div>

              {/* Témoignage - Mobile Only */}
              <blockquote className="block md:hidden bg-lime-50 rounded-lg border border-lime-100 p-3 mb-5 shadow-inner">
                <div className="flex items-center mb-1.5">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-600 ml-2">(+180 avis)</span>
                </div>
                {/* Fixed quotation marks with proper escaping */}
                <p className="text-xs italic text-gray-700 leading-relaxed">&quot;Service exceptionnel ! Le conseiller m&apos;a aidé à trouver le véhicule parfait pour mes besoins.&quot;</p>
                <footer className="text-xs font-medium text-gray-700 mt-1.5">– Marie D., Lyon</footer>
              </blockquote>

              {/* Liste d'avantages */}
              <ul className="space-y-3 mb-6 sm:mb-8"> {/* Use ul */}
                {benefits.map((item, i) => (
                  <li key={i} className="flex items-start"> {/* Use li */}
                    <div className="flex-shrink-0 mt-1 bg-lime-100 p-1 rounded-full border border-lime-200">
                      <svg className="h-3.5 w-3.5 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}> {/* Bold check */}
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700 text-sm sm:text-base leading-relaxed">{item}</p> {/* Adjusted spacing/leading */}
                  </li>
                ))}
              </ul>

              {/* Badges scrollable - Mobile Only */}
              <div className="block md:hidden -mx-1 px-1 mb-5">
                 <div className="flex flex-nowrap overflow-x-auto pb-2 gap-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {badges.map((badge, i) => (
                      <span key={i} className="inline-flex items-center whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium bg-lime-100 text-lime-800 border border-lime-300 flex-shrink-0 shadow-sm">
                        <svg className="h-3.5 w-3.5 mr-1.5 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={badge.path} />
                        </svg>
                        {badge.text}
                      </span>
                    ))}
                 </div>
              </div>

              {/* Bouton CTA */}
              <motion.button
                onClick={() => setIsPopupOpen(true)}
                whileHover={{ scale: 1.03, boxShadow: '0 10px 15px -3px rgba(163, 230, 53, 0.3), 0 4px 6px -2px rgba(163, 230, 53, 0.2)' }} // Enhanced hover effect
                whileTap={{ scale: 0.98 }}
                className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center text-base sm:text-lg" // Increased shadow, consistent text size
              >
                Je prends rendez-vous
                <svg className="h-5 w-5 ml-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>

              {/* Avantages en bas - Hidden on Desktop (already shown above) */}
              <div className="hidden md:flex justify-center items-center space-x-4 sm:space-x-6 mt-5"> {/* Use mt-5 for spacing */}
                 {/* These are now redundant on desktop as they are in the badges list */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Popup */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
}