import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

interface VehicleCardProps {
  model: string;
  price: number;
  year: number;
  details: string;
  fuelType: string;
  mileage: string;
  imageSrc: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  model,
  price,
  year,
  details,
  fuelType,
  mileage,
  imageSrc
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-100 rounded-3xl overflow-hidden"
    >
      <div className="relative aspect-[4/3]">
        <img 
          src={imageSrc} 
          alt={model} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{model}</h3>
            <p className="text-gray-600">{details}</p>
          </div>
          <p className="text-xl font-bold">{price.toLocaleString()} €</p>
        </div>
        <div className="flex gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3">⛽</span>
            {fuelType}
          </div>
          <div className="flex items-center gap-2">
            <span>📅</span>
            {year}
          </div>
          <div className="flex items-center gap-2">
            <span>🛣️</span>
            {mileage}
          </div>
        </div>
        <button className="mt-4 w-full flex items-center justify-center gap-2 bg-black text-white rounded-full py-3 px-6 hover:bg-gray-800 transition-colors">
          Voir plus
          <ArrowRight className="w-4 h-4" />
        </button>
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
          <VehicleCard
            model="Toyota Prius 1.5 VVT-i"
            price={6448}
            year={2008}
            details="Comfort Ecc Airco Cruise Control Goed"
            fuelType="Essence"
            mileage="30 000 km"
            imageSrc="/api/placeholder/800/600"
          />
          {/* Add more vehicle cards as needed */}
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