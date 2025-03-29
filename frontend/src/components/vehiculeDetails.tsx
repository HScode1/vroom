'use client'

import React, { useState } from 'react';
// Removed unused icons: Smartphone, Camera, Monitor, Eye, Navigation, Thermometer, Power, Radio, Lightbulb, Shield
import { Car, PaintBucket, Armchair, DoorOpenIcon as Door, Users, CircleDot, Calendar, Gauge, Fuel, Cog, Users2, Wind, Info, BadgeCheck, Settings, Activity, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Explicitly type props for better type safety
interface TabButtonProps {
  active: boolean;
  icon: React.ElementType; // More specific type for Lucide icons
  label: string;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ active, icon: Icon, label, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-full text-sm transition-all duration-300 ${
      active
        ? 'bg-[#BADA55] text-black shadow-md' // Adjusted shadow
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> {/* Added flex-shrink-0 */}
    <span className="font-medium whitespace-nowrap text-xs md:text-sm">{label}</span>
  </motion.button>
);

interface DetailCardProps {
  Icon: React.ElementType | null; // Allow Icon to be null
  label: string;
  value: string | number; // Value can be string or number
  description?: string | null; // Optional description
}

const DetailCard: React.FC<DetailCardProps> = ({ Icon, label, value, description = null }) => {
  // Handle case where Icon might be null or undefined gracefully
  if (!Icon) {
    return (
      <motion.div
        className="bg-white p-4 md:p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100" // Added border
        whileHover={{ y: -2, scale: 1.01 }}
      >
        <div className="min-w-0">
          <div className="text-xs md:text-sm text-gray-500 mb-0.5">{label}</div>
          <div className="font-semibold text-sm md:text-base text-gray-900 truncate">{value}</div>
          {description && (
            <div className="text-xs md:text-sm text-gray-500 mt-0.5 truncate">{description}</div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white p-4 md:p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100" // Added border
      whileHover={{ y: -2, scale: 1.01 }}
    >
      <div className="flex items-start gap-3">
        <div className="relative shrink-0 mt-1"> {/* Added margin-top for alignment */}
          {/* Subtle background glow effect */}
          <div className="absolute -inset-1 bg-[#BADA55]/10 rounded-full blur-sm opacity-70" />
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#98B544] relative" />
        </div>
        <div className="min-w-0 flex-1"> {/* Added flex-1 */}
          <div className="text-xs md:text-sm text-gray-500 mb-0.5">{label}</div>
          <div className="font-semibold text-sm md:text-base text-gray-900 break-words">{value}</div> {/* Use break-words */}
          {description && (
            <div className="text-xs md:text-sm text-gray-500 mt-0.5 break-words">{description}</div> )}
        </div>
      </div>
    </motion.div>
  );
};

interface PerformanceCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  badge?: string | null;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ icon: Icon, label, value, badge = null }) => (
  <motion.div
    className="bg-white rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300 border border-gray-100" // Added border
    whileHover={{ y: -2, scale: 1.01 }}
  >
    <div className="flex items-center gap-3">
      <div className="relative shrink-0">
        <div className="absolute -inset-1 bg-[#BADA55]/10 rounded-full blur-sm opacity-70" />
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#98B544] relative" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs md:text-sm text-gray-500 truncate">{label}</span>
          {badge && (
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full flex items-center gap-1 shrink-0"> {/* Adjusted badge style */}
              <BadgeCheck className="w-3 h-3 md:w-4 md:h-4" />
              <span className="truncate">{badge}</span>
            </span>
          )}
        </div>
        <div className="font-semibold text-sm md:text-base mt-0.5 break-words">{value}</div> {/* Use break-words */}
      </div>
    </div>
  </motion.div>
);

interface EquipmentCategoryProps {
  title: string;
  items: string[];
}

const EquipmentCategory: React.FC<EquipmentCategoryProps> = ({ title, items }) => (
  <motion.div
    className="bg-white rounded-xl p-4 md:p-6 border border-gray-100" // Added border
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }} // Added slight delay
  >
    <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4">{title}</h3> {/* Adjusted size */}
    <ul className="space-y-2 md:space-y-3"> {/* Changed div to ul */}
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2"> {/* Changed div to li, items-start */}
          <Check className="w-4 h-4 md:w-5 md:h-5 text-[#98B544] shrink-0 mt-0.5" /> {/* Adjusted size/margin */}
          <span className="text-sm md:text-base text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

// Define types for tab data
type DetailItem = { Icon: React.ElementType | null; label: string; value: string | number; description?: string | null };
type PerformanceItem = { icon: React.ElementType; label: string; value: string | number; badge?: string | null };
type EquipmentCategoryData = { title: string; items: string[] };
type EquipmentData = { categories: EquipmentCategoryData[] };

interface TabContentProps {
  data: DetailItem[] | PerformanceItem[] | EquipmentData;
  type: 'details' | 'performance' | 'equipment';
}

const TabContent: React.FC<TabContentProps> = ({ data, type }) => {
  if (type === "equipment" && 'categories' in data) { // Type guard for equipment data
    return (
      <div className="grid gap-4 md:gap-6">
        {(data as EquipmentData).categories.map((category, index) => (
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
        {(data as PerformanceItem[]).map((item) => (
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
  
  // Default to 'details' type
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {(data as DetailItem[]).map((item) => (
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

// Define the structure for each tab more explicitly
interface TabDefinition {
  id: string;
  label: string;
  icon: React.ElementType;
  data: DetailItem[] | PerformanceItem[] | EquipmentData;
  type: 'details' | 'performance' | 'equipment'; // Add type to tab definition
}

const VehicleDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("general");

  const tabs: TabDefinition[] = [ // Use the TabDefinition type
    {
      id: "general",
      label: "Caractéristiques", // Shortened label
      icon: Car,
      type: "details", // Specify type
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
          value: "5"
        },
        {
          Icon: Users,
          label: "Places assises",
          value: "4"
        },
        {
          Icon: CircleDot,
          label: "Type de pneumatiques",
          value: "4 saisons"
        }
      ]
    },
    {
      id: "technical",
      label: "Spécifications", // Shortened label
      icon: Settings,
      type: "details", // Specify type
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
          description: "Certifié" // Shortened
        },
        {
          Icon: Fuel,
          label: "Carburant",
          value: "Essence",
          description: "Sans-plomb 95 / E10" // Added E10
        },
        {
          Icon: Cog,
          label: "Transmission",
          value: "Automatique",
          description: "Boîte CVT"
        },
        {
          Icon: Users2,
          label: "Propriétaires Préc.", // Shortened label
          value: "3", // Changed to number
          description: "Historique disponible" // Changed description
        },
        {
          Icon: Wind,
          label: "Puissance Fiscale", // Clarified label
          value: "6 CV", // Assuming CV is fiscal horsepower
          description: "122 ch DIN / 90 kW" // Added DIN HP
        }
      ]
    },
    {
      id: "performance",
      label: "Performances",
      icon: Activity,
      type: "performance", // Specify type
      data: [
        {
          icon: Cog,
          label: "Transmission",
          value: "Automatique CVT",
          badge: "Entretien OK" // Shortened badge
        },
        {
          icon: Wind,
          label: "Émissions CO₂ (WLTP)", // Clarified label
          value: "104 g/km",
          badge: "Crit'Air 1"
        },
        {
          icon: Fuel,
          label: "Conso. Mixte (WLTP)", // Clarified label
          value: "4.7 L/100km",
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
      type: "equipment", // Specify type
      data: {
        categories: [
          {
            title: "Points forts", // Changed title
            items: [
              "Android Auto / Apple CarPlay", // Combined
              "Caméra de recul",
              "Cockpit virtuel",
              "Détecteur d'angle mort",
              "Système de navigation GPS" // Clarified
            ]
          },
          {
            title: "Confort",
            items: [
              "Climatisation automatique bi-zone", // Combined
              "Accès et Démarrage sans clé", // Combined
              "Sièges avant chauffants", // Example addition
              "Régulateur de vitesse adaptatif" // Example addition
            ]
          },
          {
            title: "Multimédia",
            items: [
              "Prise USB",
              "Système audio Premium", // Example refinement
              "Bluetooth" // Example addition
            ]
          },
          {
            title: "Éclairage & Visibilité", // Corrected title
            items: [
              "Phares LED", // Example refinement
              "Feux anti-brouillard avant",
              "Feux de jour LED", // Example refinement
              "Capteurs de pluie et de luminosité" // Example addition
            ]
          },
          {
            title: "Sécurité",
            items: [
              "Fixations ISOFIX", // Corrected name
              "Airbags multiples", // Example refinement
              "Aide au freinage d'urgence", // Example addition
              "Alerte de franchissement de ligne" // Example addition
            ]
          },
          {
            title: "Autres",
            items: [
              "Roue de secours", // Simplified
              "Système Start & Stop", // Corrected name
              "Jantes alliage 17 pouces" // Example addition
            ]
          }
        ]
      }
    }
  ];

  // Find the currently active tab data
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="py-6 md:py-8">
       {/* Horizontal Scroll for Tabs */}
      <div className="relative mb-6 md:mb-8">
        <div className="flex space-x-2 md:space-x-3 overflow-x-auto pb-2 px-1
                        [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
         {/* Optional: Add fading edges for scrollable area */}
         <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
         <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* Tab Content Area */}
      <div className="bg-gray-50/50 rounded-2xl p-4 md:p-6 min-h-[300px]"> {/* Added min-height */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // Key change triggers animation
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }} // Adjusted transition
          >
            {/* Render content only if activeTabData is found */}
            {activeTabData ? (
              <TabContent
                data={activeTabData.data}
                type={activeTabData.type} // Pass the type from tab definition
              />
            ) : (
              <div>Contenu non disponible</div> // Fallback
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VehicleDetails;