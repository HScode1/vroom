// BuyFromHomeBanner.tsx
import React from 'react';
import Image from 'next/image';

interface BuyFromHomeBannerProps {
  onGetTemplate?: () => void;
}

const BuyFromHomeBanner: React.FC<BuyFromHomeBannerProps> = ({ onGetTemplate = () => {} }) => {
  return (
    <div className="mb-10 md:mb-20 relative flex flex-col md:flex-row items-center w-full max-w-[90rem] mx-auto bg-gradient-to-br from-black to-gray-900 rounded-3xl overflow-hidden p-6 md:p-6 transition-transform hover:scale-[1.01] duration-300 shadow-xl">
      {/* Contenu textuel */}
      <div className="w-full md:flex-1 z-10 md:pr-6 text-center md:text-left">
        <div className="p-2 md:p-6 rounded-3xl inline-block transform transition-all duration-300 w-full md:w-auto">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mb-1 md:mb-3 tracking-tight leading-tight">
            ACHETEZ VOTRE
          </h1>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mb-1 md:mb-3 tracking-tight leading-tight">
            VEHICULE
          </h1>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 md:mb-3">
            <span className="text-white">DEPUIS </span>
            <span className="bg-gradient-to-r from-[#C8EC66] to-[#b5e43d] text-transparent bg-clip-text">
              VOTRE CANAPE !
            </span>
          </h1>
          
          {/* CTA Principal - Bouton avec couleur harmonisée */}
          <button 
            onClick={onGetTemplate}
            className="mt-2 md:mt-6 relative overflow-hidden group bg-[#C8EC66] hover:bg-[#d4f080] text-gray-800 py-2.5 md:py-4 px-4 md:px-8 rounded-full font-bold text-base md:text-lg max-w-[80%] mx-auto md:mx-0 md:max-w-none
            shadow-lg transform transition-all duration-300 
            active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C8EC66] focus:ring-offset-2 focus:ring-offset-black"
          >
            <span className="relative z-10 flex items-center justify-center md:justify-start group-hover:tracking-wider transition-all duration-300">
              Découvrir nos offres
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 md:h-5 md:w-5 ml-2 group-hover:ml-3 transition-all" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      
      {/* Image du téléphone (desktop) */}
      <div className="hidden md:block flex-1 relative h-full">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-4">
          <div className="relative transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <Image
              src="/iphone.png"
              alt="Phone mockup"
              width={600}
              height={800}
              style={{ width: '460px', height: '450px' }}
              priority
              className="drop-shadow-2xl rounded-3xl overflow-hidden"
            />
            {/* Logo de l'ours blanc sur l'écran du téléphone */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              rounded-3xl p-4 w-40 h-40
              flex items-center justify-center shadow-lg backdrop-blur-sm">
              <Image
                src="/images/logo.png"
                alt="Polar bear logo"
                width={110}
                height={110}
                className="animate-pulse"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile phone image (visible only on mobile) avec coins arrondis */}
      <div className="md:hidden w-full mt-8 flex justify-center">
        <div className="relative">
          <Image
            src="/iphone.png"
            alt="Phone mockup"
            width={440}
            height={920}
            priority
            className="drop-shadow-xl object-contain rounded-[2rem] overflow-hidden"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Polar bear logo"
              width={66}
              height={66}
              className="animate-pulse"
            />
          </div>
        </div>
      </div>

      {/* Decorative elements avec couleur harmonisée */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#C8EC66] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#C8EC66] rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default BuyFromHomeBanner;