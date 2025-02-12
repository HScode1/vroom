'use client'

import React, { useState } from 'react';
import { Car, PaintBucket, Armchair, DoorOpenIcon as Door, Users, CircleDot, Calendar, Gauge, Fuel, Cog, Users2, Wind, Info, BadgeCheck, Settings, Activity, Smartphone, Camera, Monitor, Eye, Navigation, Thermometer, Power, Radio, Lightbulb, Shield, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TabButton = ({ active, icon: Icon, label, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-full text-sm transition-all duration-300 ${
      active 
        ? 'bg-[#BADA55] text-black shadow-lg' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    <Icon className="w-4 h-4 md:w-5 md:h-5" />
    <span className="font-medium whitespace-nowrap text-xs md:text-sm">{label}</span>
  </motion.button>
);

const DetailCard = ({ Icon, label, value, description = null }) => {
  if (!Icon) return null;
  
  return (
    <motion.div 
      className="bg-white p-4 md:p-6 rounded-xl hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -2, scale: 1.01 }}
    >
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <div className="absolute -inset-1.5 bg-[#BADA55]/10 rounded-lg blur-sm" />
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#98B544] relative" />
        </div>
        <div className="min-w-0">
          <div className="text-xs md:text-sm text-gray-500 mb-0.5">{label}</div>
          <div className="font-semibold text-sm md:text-base text-gray-900 truncate">{value}</div>
          {description && (
            <div className="text-xs md:text-sm text-gray-500 mt-0.5 truncate">{description}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PerformanceCard = ({ icon: Icon, label, value, badge = null }) => (
  <motion.div 
    className="bg-white rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300"
    whileHover={{ y: -2, scale: 1.01 }}
  >
    <div className="flex items-center gap-3">
      <div className="relative shrink-0">
        <div className="absolute -inset-1.5 bg-[#BADA55]/10 rounded-lg blur-sm" />
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#98B544] relative" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs md:text-sm text-gray-500 truncate">{label}</span>
          {badge && (
            <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded-full flex items-center gap-1 shrink-0">
              <BadgeCheck className="w-3 h-3 md:w-4 md:h-4" />
              <span className="truncate">{badge}</span>
            </span>
          )}
        </div>
        <div className="font-semibold text-sm md:text-base mt-0.5 truncate">{value}</div>
      </div>
    </div>
  </motion.div>
);

const EquipmentCategory = ({ title, items }) => (
  <motion.div 
    className="bg-white rounded-xl p-4 md:p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h3 className="font-semibold text-lg md:text-xl mb-4">{title}</h3>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Check className="w-5 h-5 text-[#98B544] shrink-0" />
          <span className="text-sm md:text-base text-gray-700">{item}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const TabContent = ({ data, type }) => {
  if (type === "equipment") {
    return (
      <div className="grid gap-4 md:gap-6">
        {data.categories.map((category, index) => (
          <EquipmentCategory
            key={index}
            title={category.title}
            items={category.items}
          />
        ))}
      </div>
    );
  }
  if (type === "performance") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {data.map((item) => (
          <PerformanceCard
            key={item.label}
            icon={item.icon}
            label={item.label}
            value={item.value}
            badge={item.badge}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {data.map((item) => (
        <DetailCard
          key={item.label}
          Icon={item.Icon}
          label={item.label}
          value={item.value}
          description={item.description}
        />
      ))}
    </div>
  );
};

const VehicleDetails = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    {
      id: "general",
      label: "Caractéristiques générales",
      icon: Car,
      data: [
        {
          Icon: Car,
          label: "Classe du véhicule",
          value: "Berline",
          description: "Véhicule compact et économique"
        },
        {
          Icon: PaintBucket,
          label: "Couleur extérieure",
          value: "Gris Métallisé",
          description: "Peinture métallisée"
        },
        {
          Icon: Armchair,
          label: "Sellerie",
          value: "Tissu noir",
          description: "Matériaux haute qualité"
        },
        {
          Icon: Door,
          label: "Nombre de portes",
          value: "5",
          description: "Configuration familiale"
        },
        {
          Icon: Users,
          label: "Places assises",
          value: "4",
          description: "Configuration confortable"
        },
        {
          Icon: CircleDot,
          label: "Type de pneumatiques",
          value: "4 saisons",
          description: "Pneus polyvalents"
        }
      ]
    },
    {
      id: "technical",
      label: "Spécifications techniques",
      icon: Settings,
      data: [
        {
          Icon: Calendar,
          label: "Mise en circulation",
          value: "12/09/2024",
          description: "Première immatriculation"
        },
        {
          Icon: Gauge,
          label: "Kilométrage",
          value: "30 000 KM",
          description: "Certifié et vérifié"
        },
        {
          Icon: Fuel,
          label: "Carburant",
          value: "Essence",
          description: "Sans-plomb 95"
        },
        {
          Icon: Cog,
          label: "Transmission",
          value: "Automatique",
          description: "Boîte CVT"
        },
        {
          Icon: Users2,
          label: "Propriétaires",
          value: "3",
          description: "Historique complet"
        },
        {
          Icon: Wind,
          label: "Puissance",
          value: "122 ch",
          description: "90 kW"
        }
      ]
    },
    {
      id: "performance",
      label: "Performances",
      icon: Activity,
      data: [
        {
          icon: Cog,
          label: "Transmission",
          value: "Automatique CVT",
          badge: "Entretien à jour"
        },
        {
          icon: Wind,
          label: "Émissions de CO2",
          value: "104 g/km",
          badge: "Crit'Air 1"
        },
        {
          icon: Fuel,
          label: "Consommation mixte",
          value: "4.7L/100km",
          badge: "Économique"
        },
        {
          icon: Info,
          label: "Norme antipollution",
          value: "Euro 6d",
          badge: "Conforme"
        }
      ]
    },
    {
      id: "equipment",
      label: "Équipements",
      icon: Plus,
      data: {
        categories: [
          {
            title: "Point fort",
            items: [
              "Android Auto",
              "Apple CarPlay",
              "Caméra de recul",
              "Cockpit virtuel",
              "Détecteur d'angle mort",
              "GPS intégré"
            ]
          },
          {
            title: "Confort",
            items: [
              "Climatisation automatique",
              "Clim. automatique bi-zone",
              "Démarrage sans clé"
            ]
          },
          {
            title: "Multimédia",
            items: [
              "Prise USB",
              "Système audio/radio"
            ]
          },
          {
            title: "Éclairage et visibilité",
            items: [
              "Feux anti-brouillard avant",
              "Feux de jour"
            ]
          },
          {
            title: "Sécurité",
            items: [
              "Attaches isofix",
              "Désactivation airbag passager avant"
            ]
          },
          {
            title: "Autres",
            items: [
              "Roue de secours standard",
              "Start & Stop"
            ]
          }
        ]
      }
    }
  ];

  return (
    <div className="py-6 md:py-8">
      <div className="flex gap-2 md:gap-3 mb-6 md:mb-8 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            icon={tab.icon}
            label={tab.label}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabContent 
              data={tabs.find(tab => tab.id === activeTab).data}
              type={activeTab === "performance" ? "performance" : 
                    activeTab === "equipment" ? "equipment" : "details"}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VehicleDetails;


