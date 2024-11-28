import React from 'react';
import { 
  Car as CarIcon,
  PaintBucket as PaintBucketIcon,
  Armchair as ArmchairIcon,
  Door as DoorIcon,
  Users as UsersIcon,
  CircleDot as TireIcon,
  Calendar as CalendarIcon,
  Gauge as GaugeIcon,
  Fuel as FuelIcon,
  Cog as CogIcon,
  Users2 as Users2Icon,
  Wind as WindIcon,
  Info as InfoIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

const DetailItem = ({ Icon, label, value }) => {
  if (!Icon) return null;
  
  return (
    <motion.div 
      className="flex-1 p-6 flex flex-col items-center text-center group hover:bg-white rounded-xl transition-all duration-300 hover:shadow-lg"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        <div className="absolute -inset-2 bg-[#C8EC66]/20 rounded-full blur-sm group-hover:bg-[#C8EC66]/30 transition-all duration-300" />
        <Icon className="w-8 h-8 mb-2 text-gray-800 relative" />
      </div>
      <div className="text-sm text-gray-500 mt-3 font-medium">{label}</div>
      <div className="font-semibold mt-1 text-lg">{value}</div>
    </motion.div>
  );
};

const ConsumptionItem = ({ label, value, icon: Icon }) => (
  <motion.div 
    className="flex items-center justify-between p-6 bg-white rounded-xl hover:shadow-md transition-all duration-300"
    whileHover={{ scale: 1.01 }}
  >
    <div className="flex items-center gap-4">
      {Icon && <Icon className="w-5 h-5 text-gray-600" />}
      <span className="text-gray-600">{label}</span>
    </div>
    <span className="font-semibold">{value}</span>
  </motion.div>
);

export default function VehicleDetails() {
  const details = [
    {
      section: "Caractéristiques",
      items: [
        {
          Icon: CarIcon,
          label: "Classe du véhicule",
          value: "CLASSE DU VÉHICULE"
        },
        {
          Icon: PaintBucketIcon,
          label: "Couleur",
          value: "COULEUR"
        },
        {
          Icon: ArmchairIcon,
          label: "Sellerie",
          value: "SELLERIE"
        },
        {
          Icon: DoorIcon,
          label: "Portes",
          value: "5"
        },
        {
          Icon: UsersIcon,
          label: "Nombre de place",
          value: "4"
        },
        {
          Icon: TireIcon,
          label: "Saison des pneus",
          value: "SAISON DES PNEUS"
        }
      ]
    },
    {
      section: "Informations techniques",
      items: [
        {
          Icon: CalendarIcon,
          label: "1ère immatriculation",
          value: "12/09/2024"
        },
        {
          Icon: GaugeIcon,
          label: "Kilométrage",
          value: "30 000 KM"
        },
        {
          Icon: FuelIcon,
          label: "Carburant",
          value: "ESSENCE"
        },
        {
          Icon: CogIcon,
          label: "Transmission",
          value: "TRANSMISSION"
        },
        {
          Icon: Users2Icon,
          label: "Anciens propriétaires",
          value: "3"
        },
        {
          Icon: WindIcon,
          label: "Puissance",
          value: "PUISSANCE"
        }
      ]
    }
  ];

  const consumption = [
    {
      label: "Transmission",
      value: "TRANSMISSION",
      icon: CogIcon
    },
    {
      label: "Émissions de CO2",
      value: "ÉMISSION DE CO2",
      icon: WindIcon
    },
    {
      label: "Consommation",
      value: "CONSOMMATION",
      icon: FuelIcon
    },
    {
      label: "Certificat qualité de l'air",
      value: "CERTIFICAT QUALITÉ DE L'AIR",
      icon: InfoIcon
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {details.map((section) => (
        <motion.div 
          key={section.section} 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-8 bg-[#C8EC66] rounded-full" />
            <h2 className="text-2xl font-bold">{section.section}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-gray-50/50 rounded-2xl p-4">
            {section.items.map((item) => (
              <DetailItem
                key={item.label}
                Icon={item.Icon}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </motion.div>
      ))}

      <motion.div 
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-8 bg-[#C8EC66] rounded-full" />
          <h2 className="text-2xl font-bold">MOTEUR, TRANSMISSION ET CONSOMMATION</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {consumption.map((item, index) => (
            <ConsumptionItem
              key={item.label}
              label={item.label}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}