"use client"

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const SimilarCar = ({ data }) => (
  <div className="min-w-[380px] bg-white rounded-lg overflow-hidden border border-gray-100">
    <div className="aspect-[4/3] relative">
      <img 
        src={data.image} 
        alt={data.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold">{data.title}</h3>
      <p className="text-sm text-gray-600">{data.subtitle}</p>
      
      <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
        <span>{data.year}</span>
        <span>{data.transmission}</span>
        <span>{data.mileage} km</span>
        <span className="bg-gray-100 px-2 py-1 rounded">{data.state}</span>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="text-xl font-bold">{data.price} €</div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          data.label === 'Bonne affaire' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {data.label}
        </span>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {data.sellerType}
          </span>
          <span className="font-medium">Dept. {data.department}</span>
        </div>
        <button className="hover:text-[#C8EC66] transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

export const SimilarCarsSection = () => {
  const scrollRef = useRef(null);
  
  const similarCars = [
    {
      image: "/autresvoitures/renault_clio5.jpg",
      title: "RENAULT CLIO 5",
      subtitle: "1.6 E-TECH 145 PREMIERE",
      year: "2021",
      transmission: "Auto",
      mileage: "89 822",
      price: "16 990",
      department: "51",
      state: "Hybride",
      label: "Offre équitable",
      sellerType: "Vendeur professionnel"
    },
    {
      image: "/autresvoitures/bmw_m4.jpg",
      title: "BMW M4 Competition",
      subtitle: "510ch Ultimate",
      year: "2023",
      transmission: "Auto",
      mileage: "12 632",
      price: "117 700",
      department: "78",
      state: "Essence",
      label: "Offre équitable",
      sellerType: "Vendeur particulier"
    },
    {
      image: "/autresvoitures/maclarren_720s.jpg",
      title: "McLaren 720S",
      subtitle: "V8 bi-turbo 720ch",
      year: "2022",
      transmission: "Auto",
      mileage: "7 400",
      price: "315 990",
      department: "89",
      state: "Essence",
      label: "Bonne affaire",
      sellerType: "Vendeur professionnel"
    },
    {
      image: "/autresvoitures/urus.jpg",
      title: "Lamborghini Urus",
      subtitle: "4.0 V8 650ch",
      year: "2023",
      transmission: "Auto",
      mileage: "15 000",
      price: "298 490",
      department: "68",
      state: "Essence",
      label: "Offre équitable",
      sellerType: "Vendeur professionnel"
    },
    {
      image: "/autresvoitures/GLE.jpg",
      title: "Mercedes GLE Coupé",
      subtitle: "400d 4MATIC AMG",
      year: "2023",
      transmission: "Auto",
      mileage: "25 000",
      price: "108 490",
      department: "75",
      state: "Diesel",
      label: "Offre équitable",
      sellerType: "Vendeur professionnel"
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-1 h-6 bg-[#C8EC66]" />
            <h2 className="text-2xl font-bold">Notre sélection de véhicules similaires</h2>
          </div>
        </div>

        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto px-6 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {similarCars.map((car, index) => (
              <SimilarCar key={index} data={car} />
            ))}
          </div>

          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
            style={{ transform: 'translate(0, -50%)' }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
            style={{ transform: 'translate(0, -50%)' }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};