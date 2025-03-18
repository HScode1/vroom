// BuyVehicleBanner.tsx
import React from 'react';
import Image from 'next/image';

interface BuyVehicleBannerProps {
  onGetTemplate?: () => void;
}

const BuyVehicleBanner: React.FC<BuyVehicleBannerProps> = ({ onGetTemplate = () => {} }) => {
  return (
    <div className="mb-20 relative flex flex-col md:flex-row items-center w-full max-w-[90rem] mx-auto bg-gradient-to-br from-black to-gray-900 rounded-3xl overflow-hidden p-4 md:p-6 transition-transform hover:scale-[1.01] duration-300 shadow-xl">
      {/* Contenu textuel */}
      <div className="flex-1 z-10 md:pr-6">
        <div className="backdrop-blur-sm bg-black/30 p-4 md:p-6 rounded-3xl inline-block transform transition-all duration-300 w-full md:w-auto">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 tracking-tight leading-tight">
            ACHETEZ VOTRE VEHICULE
          </h1>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-white">DEPUIS </span>
            <span className="bg-gradient-to-r from-[#a2d45e] to-[#7ab93d] text-transparent bg-clip-text">VOTRE CANAPE !</span>
          </h1>
          
          {/* CTA Principal Optimisé avec nouveau texte */}
          <button 
            onClick={onGetTemplate}
            className="mt-6 relative overflow-hidden group bg-gradient-to-r from-[#a2d45e] to-[#7ab93d] text-white py-4 px-8 rounded-full font-bold text-lg
            shadow-lg transform hover:-translate-y-1 transition-all duration-300 
            active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#a2d45e] focus:ring-offset-2 focus:ring-offset-black"
          >
            <span className="relative z-10 flex items-center group-hover:tracking-wider transition-all duration-300">
              Découvrir nos offres
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2 group-hover:ml-3 group-hover:animate-pulse transition-all" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#b6e373] to-[#8fd04c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute -inset-x-1 bottom-0 h-1 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
          </button>
        </div>
      </div>
      
      {/* Image du téléphone */}
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
              className="drop-shadow-2xl"
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

      {/* Mobile phone image (visible only on mobile) */}
      <div className="md:hidden w-full mt-4 flex justify-center">
        <div className="relative w-48 h-48">
          <Image
            src="/iphone.png"
            alt="Phone mockup"
            width={300}
            height={300}
            style={{ width: '200px', height: '200px' }}
            priority
            className="drop-shadow-xl"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            rounded-3xl p-3 w-20 h-20
            flex items-center justify-center shadow-lg backdrop-blur-sm">
            <Image
              src="/images/logo.png"
              alt="Polar bear logo"
              width={30}
              height={30}
              className="animate-pulse"
            />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#a2d45e] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#7ab93d] rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default BuyVehicleBanner;