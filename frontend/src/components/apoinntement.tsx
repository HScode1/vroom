'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Popup from './Popup';

export default function AppointmentSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // Configuration des données
  const benefits = [
    "Conseil personnalisé avec nos experts certifiés",
    "Présentation de véhicules adaptés à vos besoins",
    "Options de financement sur mesure avec simulation",
    "Accompagnement dans toutes vos démarches administratives"
  ];

  // Badge SVG paths et textes
  const badges = [
    { path: "M5 13l4 4L19 7", text: "Sans engagement" },
    { path: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: "Réponse en 24h" },
    { path: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", text: "100% Confidentiel" }
  ];

  return (
    <section className="py-20 min-h-screen flex items-center justify-center overflow-hidden relative bg-[url('/images/gari2.jpg')] bg-cover bg-center bg-fixed">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Effets décoratifs */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-lime-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl"></div>
      
      {/* Titre principal */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ y: -30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">NOS SERVICES DE RENDEZ-VOUS</h1>
          <div className="w-28 h-1.5 bg-lime-400 mx-auto mb-5 rounded-full"></div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Rencontrez nos experts pour discuter de vos besoins en mobilité
          </p>
        </motion.div>

        {/* Carte principale */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row overflow-hidden"
        >
          {/* Partie gauche - Image */}
          <div className="w-full md:w-2/5 relative">
            <div className="absolute inset-0 bg-[url('/images/appointment-bg.jpg')] bg-cover bg-center opacity-80"></div>
            <div className="relative p-6 h-full flex items-center justify-center">
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block p-4 rounded-full bg-lime-400/30 mb-5 backdrop-blur-sm border border-lime-400/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-lime-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-3">Rencontrez Nos Experts</h3>
                <p className="text-gray-800">Notre équipe est disponible pour vous conseiller sur vos projets</p>
                
                {/* Badges */}
                <div className="mt-5 flex flex-wrap gap-2 justify-center">
                  {badges.map((badge, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-lime-100 text-gray-800 border border-lime-300">
                      <svg className="h-3.5 w-3.5 mr-1.5 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.path} />
                      </svg>
                      {badge.text}
                    </span>
                  ))}
                </div>
                
                {/* Témoignage */}
                <div className="mt-5 p-4 bg-white/60 rounded-lg border border-white/50">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-600 ml-2">184 avis</span>
                  </div>
                  <p className="text-sm italic text-gray-700">"Service exceptionnel ! Le conseiller m'a aidé à trouver le véhicule parfait pour mes besoins."</p>
                  <p className="text-sm font-medium text-gray-700 mt-2">– Marie D., Lyon</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Partie droite - CTA */}
          <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
            <div className="flex items-start mb-6">
              <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center mr-4 mt-1 border border-lime-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Prenez rendez-vous avec nous</h2>
                <p className="text-gray-600">Nos experts sont à votre disposition pour vous aider</p>
              </div>
            </div>
            
            {/* Liste d'avantages */}
            <div className="pl-14 mb-6">
              <div className="space-y-3">
                {benefits.map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 bg-lime-100 p-1 rounded-full">
                      <svg className="h-4 w-4 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bouton CTA */}
            <div className="pl-14 mb-8">
              <motion.button 
                onClick={() => setIsPopupOpen(true)} 
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(132, 204, 22, 0.4)" }} 
                whileTap={{ scale: 0.97 }} 
                className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center"
              >
                Prendre rendez-vous
                <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </div>
            
            {/* Avantages en bas */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center">
                <div className="bg-lime-100 p-2.5 rounded-full mr-3 border border-lime-200">
                  <svg className="h-4 w-4 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-600">Réponse en 24h</span>
              </div>
              <div className="flex items-center">
                <div className="bg-lime-100 p-2.5 rounded-full mr-3 border border-lime-200">
                  <svg className="h-4 w-4 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-600">Sans engagement</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Popup */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
}