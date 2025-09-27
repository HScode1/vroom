'use client';

import { useState } from 'react';
import type { ReactNode, ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// --- START OF FIX ---

// Composant d'icône réutilisable pour la clarté du code
// 1. Add `strokeWidth` to the props type definition.
// 2. Destructure it in the function arguments, providing a default value.
// 3. Use the `strokeWidth` variable in the <svg> element.
const Icon = ({ path, className = "w-6 h-6", strokeWidth = 1.5 }: { path: string, className?: string, strokeWidth?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);
// --- END OF FIX ---

// Define the structure for a single step's content.
interface StepContent {
  title: string;
  subtitle?: ReactNode;
  description: string;
  phoneContent: {
    screen: ReactElement;
  };
}

// Explicitly type the `stepsContent` object to allow numeric keys.
const stepsContent: { [key: number]: StepContent } = {
  1: {
    title: "DÉCOUVREZ VROOMADVISOR",
    subtitle: <>LA NOUVELLE ÈRE DU CONSEIL <span className="text-green-400">AUTOMOBILE</span></>,
    description: "VroomAdvisor accompagne les clients dans le processus d'achat automobile en fournissant des conseils adaptés à leurs besoins, leurs attentes et leur budget.",
    phoneContent: {
      screen: (
        <div className="bg-white h-full flex flex-col">
          <div className="px-4 pt-4">
            <div className="flex justify-between items-center">
              <Image src="/images/logo.png" alt="Vroom Logo" width={32} height={32} className="w-8 h-8 visible" />
              <div className="flex items-center space-x-4">
                <Icon path="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" className="w-5 h-5 text-black" />
                <Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>
          <div className="flex-grow flex flex-col justify-center items-center text-center -mt-10">
            <div className="text-6xl font-bold text-black leading-none space-y-2">
              <div>BOOK.</div>
              <div>
                <span className="bg-blue-300/80 px-2 rounded-lg">TALK.</span>
              </div>
              <div>DRIVE.</div>
            </div>
            <button className="mt-8 bg-black text-white text-sm font-semibold py-2 px-6 rounded-md">
              Speak
            </button>
          </div>
        </div>
      )
    }
  },
  2: {
    title: "CONSEILLER À VOTRE SERVICE",
    description: "Choisissez votre expert, bénéficiez de son accompagnement, et accédez à un service pensé pour vous.",
    phoneContent: {
      screen: (
        <div className="p-4 bg-white h-full text-black">
          <div className="relative mb-4">
            <Icon path="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search" className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none" />
            <Icon path="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12 7.5v-1.5m-6 7.5v-1.5m-6-13.5a6 6 0 016-6v1.5m6 0v1.5m-6-1.5a6 6 0 00-6 6v1.5m6-7.5a6 6 0 016 6v1.5" className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">Authors</h3>
              <a href="#" className="text-sm text-blue-500">See All</a>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Rachel Maddow', role: 'Finance, stocks', img: 'https://i.pravatar.cc/150?img=1' },
                { name: 'Chris Hayes', role: 'Economics, Currencies', img: 'https://i.pravatar.cc/150?img=3' },
                { name: 'Brian Williams', role: 'Politics', img: 'https://i.pravatar.cc/150?img=5' },
              ].map(author => (
                <div key={author.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image src={author.img} alt={author.name} width={40} height={40} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <div className="font-semibold">{author.name}</div>
                      <div className="text-xs text-gray-500">{author.role}</div>
                    </div>
                  </div>
                  <Icon path="M8.25 4.5l7.5 7.5-7.5 7.5" className="w-4 h-4 text-gray-300" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">Articles</h3>
              <a href="#" className="text-sm text-blue-500">See All</a>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-xs font-bold text-blue-500 mb-1">MARKETS</div>
              <p className="font-semibold leading-tight">Euro-Area Economy Posts Strong 2017 Finish Buoyed by ECB</p>
            </div>
          </div>
        </div>
      )
    }
  },
  3: {
    title: "CONSULTATIONS FLEXIBLES",
    description: "Avec nos consultations flexibles, choisissez votre créneau, votre mode de contact et même votre conseiller.",
    phoneContent: {
      screen: (
        <div className="p-4 bg-white h-full text-black text-sm">
          <div className="flex justify-between items-center mb-4">
            <Icon path="M15.75 19.5L8.25 12l7.5-7.5" className="w-5 h-5" />
            <h2 className="font-bold text-lg">January</h2>
            <Icon path="M8.25 4.5l7.5 7.5-7.5 7.5" className="w-5 h-5" />
          </div>

          <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-2">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => <div key={day}>{day}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {['', '', '', '', '', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].slice(1).map((day, i) => (
              <div key={i} className={`w-8 h-8 flex items-center justify-center rounded-full mx-auto ${day === 12 ? 'bg-black text-white' : ''} ${day !== '' && day !== 12 ? 'hover:bg-gray-100' : ''}`}>
                {day}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-bold mb-2">Result for these days</h3>
            <div className="flex space-x-2">
              {[{label: 'All task', value: '32', percent: '100%'}, {label: 'Done', value: '24', percent: '75%'}, {label: 'In process', value: '8', percent: '25%'}].map(item => (
                <div key={item.label} className="flex-1 bg-gray-100 p-3 rounded-lg">
                  <div className="text-xs text-gray-500">{item.label}</div>
                  <div className="font-bold text-lg">{item.value} <span className="text-gray-400 text-xs">/{item.percent}</span></div>
                  <div className="w-full bg-gray-200 h-1 rounded-full mt-2"><div className="bg-black h-1 rounded-full" style={{width: item.percent}}></div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold mb-2">Tasks for these days</h3>
            <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-semibold">Business meeting</div>
                <div className="text-xs text-gray-500">Call about project edits</div>
              </div>
              <div className="text-xs flex items-center space-x-2 text-gray-500">
                <span>18:00</span>
                <span>15.02.25</span>
                <span>work</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  },
  4: {
    title: "CONSEILS SUR-MESURE",
    description: "Des recommandations adaptées à vos besoins et à votre budget.",
    phoneContent: {
      screen: (
        <div className="p-4 bg-white h-full text-black">
          <div className="flex space-x-2 mb-4">
            {['All', 'Porsche', 'BMW', 'Lamborghini'].map((cat, i) => (
              <button key={cat} className={`px-4 py-1.5 rounded-lg text-sm font-medium ${i === 0 ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>
                {cat}
              </button>
            ))}
          </div>
          
          <h2 className="font-bold text-xl mb-3">Popular cars</h2>
          <div className="space-y-4">
            {[
              { name: 'Porsche Taycan', img: 'https://images-porsche.imgix.net/-/media/261EF9F86B2B4F45AC57EA8D26C3B081_A4BAE2D2A1C74C5E87E3AB8A5B8F5124_TA24Q3BIX0010-taycan-side?w=2560&h=697&q=45&crop=faces%2Centropy%2Cedges&auto=format', rating: 10.0, seats: 4, price: 120 },
              { name: 'Toyota GR Supra', img: 'https://kong-proxy-intranet.toyota-europe.com/c1-images/resize/ccis/680x680/zip/fr/product-token/7be8f51e-46db-4afa-a4b7-28e740f98d21/vehicle/4cf50350-0d39-42b9-a8d4-187d67ba5eac/padding/50,50,50,50/image-quality/70/day-exterior-04_d05.png', rating: 9.9, seats: 2, price: 115 },
            ].map(car => (
              <div key={car.name} className="bg-gray-100 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{car.name}</h3>
                  <Icon path="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" className="w-5 h-5 text-gray-400" />
                </div>
                <Image src={car.img} alt={car.name} width={256} height={98} className="my-2 w-full object-contain h-24" />
                <div className="flex justify-between items-center text-sm">
                  <div className="flex space-x-3 text-gray-600">
                    <span className="flex items-center"><Icon path="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345h5.518a.562.562 0 01.329.89l-4.062 2.924a.563.563 0 00-.182.557l1.528 4.702a.562.562 0 01-.812.622l-4.124-3.113a.563.563 0 00-.576 0L4.99 21.18a.562.562 0 01-.812-.622l1.528-4.702a.563.563 0 00-.182-.557l-4.062-2.924a.562.562 0 01.329-.89h5.518a.563.563 0 00.475-.345L11.48 3.5z" className="w-4 h-4 mr-1 text-yellow-500" /> {car.rating}</span>
                    <span className="flex items-center"><Icon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" className="w-4 h-4 mr-1" /> {car.seats}</span>
                  </div>
                  <div className="font-bold">${car.price}<span className="font-normal text-gray-500">/day</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  },
  5: {
    title: "VOTRE PROJET, NOTRE PRIORITÉ",
    description: "Des recommandations adaptées à vos besoins et à votre budget.",
    phoneContent: {
      screen: (
        <div className="bg-gray-100 h-full text-black flex flex-col">
          <div className="p-4 flex justify-between items-center">
            <Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" className="w-5 h-5" />
            <h2 className="font-bold">Safty - Open</h2>
            <Icon path="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" className="w-5 h-5" />
          </div>
          <div className="flex-grow flex items-center justify-center relative">
            <Image src="https://e7.pngegg.com/pngimages/927/1020/png-clipart-mclaren-12c-mclaren-650s-mclaren-automotive-car-maclaren-compact-car-car.png" alt="Car top down view" width={192} height={192} className="w-48" />
            {[
              {top: '25%', left: '15%'}, {top: '25%', right: '15%'},
              {top: '48%', left: '15%'}, {top: '48%', right: '15%'},
              {top: '70%', left: '25%'}, {top: '70%', right: '25%'},
            ].map((pos, i) => (
              <div key={i} className="absolute w-5 h-5 bg-green-400/30 rounded-full flex items-center justify-center" style={pos}>
                <div className="w-3.5 h-3.5 bg-green-400 rounded-full flex items-center justify-center">
                   <Icon path="M13.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75M3.75 10.5h16.5v1.5c0 2.485-2.015 4.5-4.5 4.5h-7.5c-2.485 0-4.5-2.015-4.5-4.5v-1.5z" className="w-2 h-2 text-white"/>
                </div>
              </div>
            ))}
            <div className="absolute w-5 h-5 bg-red-500/30 rounded-full flex items-center justify-center" style={{bottom: '18%', left: '50%', transform: 'translateX(-50%)'}}>
              <div className="w-3.5 h-3.5 bg-red-500 rounded-full"></div>
            </div>
          </div>
          <div className="p-4 flex justify-around">
            {['Doors', 'Tires', 'Cameras'].map((item, i) => (
              <button key={item} className={`px-5 py-2 rounded-lg font-medium text-sm ${i === 0 ? 'bg-gray-200 text-black' : 'text-gray-500'}`}>{item}</button>
            ))}
          </div>
        </div>
      )
    }
  }
};

export default function SectionRendezVous() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <>
      <section className="min-h-screen bg-black flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Côté gauche - Maquette de téléphone */}
            <div className="flex justify-center items-center">
              <div className="relative">
                {/* Cadre du téléphone */}
                <div className="relative w-[320px] h-[650px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl border-2 border-gray-700">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Encoche (Notch) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-black rounded-b-2xl z-20 flex items-center justify-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                      <div className="w-10 h-2 bg-gray-700 rounded-full"></div>
                    </div>
                    {/* Barre de statut */}
                    <div className="absolute top-2 left-4 right-4 z-10 flex justify-between items-center px-2">
                      <span className="text-black font-semibold text-xs">
                        {currentStep === 1 ? '16:40' : '15:41'}
                      </span>
                      <div className="flex items-center space-x-1">
                        {/* The component call is now valid */}
                        <Icon path="M8.288 15.038a5.25 5.25 0 01-5.288-5.288" className="w-3.5 h-3.5 text-black" strokeWidth={2}/>
                        <Icon path="M4.06 11.94a10.453 10.453 0 010-3.882" className="w-3.5 h-3.5 text-black" strokeWidth={2}/>
                        <Image src="https://icongr.am/clarity/battery.svg?size=18&color=000000" alt="battery" width={18} height={18} />
                      </div>
                    </div>
                    {/* Contenu de l'application avec animation */}
                    <div className="absolute top-8 left-0 right-0 bottom-[76px] overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.4 }}
                          className="h-full"
                        >
                          {stepsContent[currentStep].phoneContent.screen}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    {/* Barre de navigation inférieure */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gray-50/80 backdrop-blur-lg border-t border-gray-200 px-4 pt-2 pb-4 rounded-b-[2.5rem]">
                      <div className="flex justify-around items-center">
                        <div className="flex flex-col items-center text-gray-400 space-y-1"><Icon path="M9 12h3.75M9 15h3.75M9 18h3.75m-7.5-12h15M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-7 h-7" /><span className="text-[10px]">Task</span></div>
                        <div className="flex flex-col items-center text-gray-400 space-y-1"><Icon path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" className="w-7 h-7" /><span className="text-[10px]">Calendar</span></div>
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center -mt-2"><span className="text-white text-3xl font-light">+</span></div>
                        <div className="flex flex-col items-center text-gray-400 space-y-1"><Icon path="M3 13.125C3 12.504 3.504 12 4.125 12h3.75c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-3.75A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-3.75a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-3.75a1.125 1.125 0 01-1.125-1.125V4.125z" className="w-7 h-7" /><span className="text-[10px]">Goal</span></div>
                        <div className="flex flex-col items-center text-gray-400 space-y-1"><Icon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" className="w-7 h-7" /><span className="text-[10px]">Profile</span></div>
                      </div>
                      <div className="text-center mt-1"><span className="text-xs text-gray-400">Vroom.com</span></div>
                    </div>
                  </div>
                </div>
                {/* Image de la main */}
                <div className="absolute -bottom-24 -left-16 w-[280px] h-[280px] z-[-1] opacity-90" style={{ backgroundImage: `url('https://i.imgur.com/gJeB5jM.png')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
              </div>
            </div>
            
            {/* Côté droit - Contenu textuel */}
            <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', duration: 0.8 }} className="text-white space-y-8">
              <div>
                <AnimatePresence mode="wait">
                  <motion.div key={currentStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-2 uppercase">
                      {stepsContent[currentStep].title}
                    </h1>
                    {stepsContent[currentStep].subtitle && (
                      <h2 className="text-xl md:text-2xl text-gray-300 font-medium uppercase">
                        {stepsContent[currentStep].subtitle}
                      </h2>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 h-0.5 bg-gray-700 relative">
                    <motion.div className="h-full bg-white" animate={{ width: `${(currentStep / 5) * 100}%` }} transition={{ duration: 0.5, ease: "easeInOut" }} />
                  </div>
                  <motion.span key={currentStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-semibold">{currentStep}/5</motion.span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p key={currentStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }} className="text-lg text-gray-300 leading-relaxed max-w-md">
                    {stepsContent[currentStep].description}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex items-center space-x-6 pt-6">
                <div className="flex space-x-4">
                  <motion.button onClick={prevStep} disabled={currentStep === 1} whileHover={{ scale: currentStep > 1 ? 1.1 : 1 }} className="w-12 h-12 border-2 rounded-full flex items-center justify-center transition-all disabled:border-gray-600 disabled:text-gray-600 border-white text-white hover:enabled:bg-white hover:enabled:text-black">
                    <Icon path="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" className="w-6 h-6" />
                  </motion.button>
                  <motion.button onClick={nextStep} disabled={currentStep === 5} whileHover={{ scale: currentStep < 5 ? 1.1 : 1 }} className="w-12 h-12 border-2 rounded-full flex items-center justify-center transition-all disabled:border-gray-600 disabled:text-gray-600 border-white text-white hover:enabled:bg-white hover:enabled:text-black">
                    <Icon path="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" className="w-6 h-6" />
                  </motion.button>
                </div>
                <motion.button onClick={() => setIsPopupOpen(true)} whileHover={{ scale: 1.05 }} className="flex-grow bg-white text-black px-6 py-3.5 rounded-full font-semibold text-base flex items-center justify-center hover:bg-gray-200 transition-colors">
                  JE PRENDS RENDEZ-VOUS
                  <div className="ml-3 bg-green-400 p-0.5 rounded-full">
                     <Icon path="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" className="w-4 h-4 text-black" />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popup pour la prise de rendez-vous */}
      <AnimatePresence>
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-black"
            >
              <h3 className="text-2xl font-bold mb-4">Prenez rendez-vous</h3>
              <p className="text-gray-600 mb-6">
                Notre équipe vous contactera dans les plus brefs délais pour planifier votre consultation personnalisée.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-black font-semibold hover:bg-gray-100 transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={() => setIsPopupOpen(false)} 
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  Confirmer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};