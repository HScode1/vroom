"use client";
import React from 'react';
import { Lock } from 'lucide-react';
import Image from 'next/image';

const ParcoursAchat = () => {
  return (
    <section className="bg-white font-sans" aria-labelledby="parcours-achat-title">
      <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        
        {/* --- BANNIÈRE PRINCIPALE --- */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-50 via-stone-100 to-stone-100 shadow-lg mb-8 aspect-[3/2]">
          <video 
            src="/WhatsApp Video 2024-12-12 at 17.52.55.mp4" 
            alt="Land Rover Defender vert avec galerie de toit" 
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay={true}
            loop
            muted
          />
          <div className="relative z-10 p-8 sm:p-12 h-full flex flex-col items-center justify-center text-center">
            <h1 id="parcours-achat-title" className="sr-only">Parcours d&apos;achat de véhicule simplifié</h1>
            <h2 className="text-2xl font-bold uppercase sm:text-3xl lg:text-4xl text-white text-center max-w-4xl mx-auto" style={{letterSpacing: '0.02em'}}>
              ACHETER UNE <span className="text-lime-500 font-extrabold">VOITURE</span> N&apos;A JAMAIS ÉTÉ AUSSI <span className="text-lime-500 font-extrabold">SIMPLE</span>
            </h2>
          </div>
        </div>

        {/* --- GRILLE DES ÉTAPES DU PARCOURS --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* CARTE 1: CONSEILLER */}
          <div className="flex flex-col rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
            <p className="text-sm font-medium uppercase text-gray-400 mb-2 tracking-wide">CONSEILLER VROOM</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              Transformez vos idées<br />en réalité
            </h3>
            <div className="flex flex-grow items-end justify-center mt-auto">
              <Image 
                src="/humain.png" 
                alt="Portrait d'un conseiller souriant en pull vert" 
                width={280}
                height={280}
                className="w-full max-w-[280px] object-cover rounded-lg" 
              />
            </div>
          </div>

          {/* CARTE 2: RECHERCHE */}
          <div className="flex flex-col rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
            <p className="text-sm font-medium uppercase text-gray-400 mb-2 tracking-wide">VROOM SEARCH</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              On <span className="text-blue-600">cherche</span>,<br />vous <span className="text-purple-600">validez</span>.
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Pour acheter, vous décidez et profiter sans vous fatiguer.
            </p>
            <div className="relative mt-auto h-48 flex items-end justify-center">
              {/* Voiture noire en arrière-plan */}
              <div className="absolute bottom-0 left-4 z-10">
                <Image 
                  src="/car.png" 
                  alt="SUV Mercedes noir" 
                  width={256}
                  height={150}
                  className="w-64 h-auto object-contain" 
                />
              </div>
            </div>
          </div>

          {/* CARTE 3: LIVRAISON */}
          <div className="flex flex-col rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
            <p className="text-sm font-medium uppercase text-gray-400 mb-2 tracking-wide">VROOM DELIVERY</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              On gère tout,<br />jusqu&apos;à la <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text  font-extrabold">livraison</span> !
            </h3>
            <div className="flex flex-col items-center justify-between flex-grow">
              {/* Voiture vue du dessus */}
              <div className="flex-grow flex items-center justify-center mb-8">
                <Image 
                  src="/Porsche de haut.png" 
                  alt="Vue de dessus d'une voiture noire" 
                  width={200}
                  height={150}
                  className="w-full max-w-[200px] object-contain" 
                />
              </div>
              {/* Icônes de sécurité */}
              <div className="flex items-center gap-8 rounded-full bg-gray-100 px-8 py-4 shadow-sm border border-gray-200">
                <Lock className="w-8 h-8 text-gray-400" />
                <Lock className="w-8 h-8 text-gray-300" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ParcoursAchat;