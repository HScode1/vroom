import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';

interface VehicleCardProps {
  title: string;
  subtitle: string;
  price: string;
  year: string;
  state: string;
  mileage: string;
  image: string;
  transmission: string;
  department: string;
  label: string;
  sellerType: string;
}

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
    label: "Offre équitable",
    sellerType: "Vendeur professionnel"
  },
  {
    image: "/autresvoitures/porsche_911.jpg",
    title: "Porsche 911 GT3",
    subtitle: "4.0 510ch PDK",
    year: "2023",
    transmission: "Auto",
    mileage: "3 500",
    price: "289 900",
    department: "75",
    state: "Essence",
    label: "Offre premium",
    sellerType: "Vendeur professionnel"
  },
  {
    image: "/autresvoitures/audi_rs6.jpg",
    title: "Audi RS6 Avant",
    subtitle: "V8 TFSI 600ch Quattro",
    year: "2022",
    transmission: "Auto",
    mileage: "15 300",
    price: "149 900",
    department: "92",
    state: "Essence",
    label: "Offre équitable",
    sellerType: "Vendeur professionnel"
  },
  {
    image: "/autresvoitures/mercedes_amg.jpg",
    title: "Mercedes-AMG GT",
    subtitle: "V8 bi-turbo 585ch",
    year: "2023",
    transmission: "Auto",
    mileage: "8 900",
    price: "198 500",
    department: "69",
    state: "Essence",
    label: "Offre premium",
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

const VehicleCard: React.FC<VehicleCardProps> = ({
  title,
  subtitle,
  price,
  year,
  state,
  mileage,
  image,
  transmission,
  department,
  label,
  sellerType
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="relative aspect-[4/3]">
        <Image 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <p className="text-xl font-bold">{price} €</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3">⛽</span>
            {state}
          </div>
          <div className="flex items-center gap-2">
            <span>📅</span>
            {year}
          </div>
          <div className="flex items-center gap-2">
            <span>🛣️</span>
            {mileage} km
          </div>
          <div className="flex items-center gap-2">
            <span>🔄</span>
            {transmission}
          </div>
          <div className="flex items-center gap-2">
            <span>📍</span>
            Dep. {department}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
            {label}
          </span>
          <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            {sellerType}
          </span>
        </div>
        <motion.button 
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#C8EC66] text-black rounded-full py-3 px-6 hover:bg-opacity-90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Voir plus
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const VehiculesSection: React.FC = () => {
  const services = [
    "Inspection mécanique et administrative",
    "Contrôle technique",
    "Révision & Entretien",
    "Livraison à votre domicile",
    "Préparation esthétique"
  ];

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">NOS VÉHICULES</h2>
          <p className="text-xl text-gray-600">Un achat tout inclus.</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {services.map((service, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-sm"
              >
                <Check className="w-4 h-4" />
                {service}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarCars.map((car, index) => (
            <VehicleCard
              key={index}
              {...car}
            />
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <button className="inline-flex items-center gap-2 bg-[#DCFF85] text-black rounded-full px-8 py-4 font-medium hover:bg-opacity-90 transition-colors">
            Tous nos véhicules
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default VehiculesSection;