'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CircleDot, 
  Disc, 
  Cog, 
  FuelIcon, 
  CarIcon, 
  ShipWheel, 
  LucideIcon // Import LucideIcon type for better icon typing
} from 'lucide-react'
import React from 'react' // Import React for types like React.FC, ReactNode

// --- Type Definitions ---

// Props for SidebarItem
interface SidebarItemProps {
  icon: LucideIcon; // Use LucideIcon type
  label: string;
  isActive?: boolean; // Optional because it has a default value
  onClick: () => void;
}

// Data structure for a single tire
interface TireDataDetails {
  brand: string;
  dimensions: string;
  depth: string;
  type: string;
}

// Props for TireInfo
interface TireInfoProps {
  position: string;
  data: TireDataDetails | undefined; // Data might be undefined if not provided
}

// Data structure for braking system parts
interface BrakeComponentState {
  discs: string;
  pads: string;
  calipers: string;
}

// Data structure for braking info
interface BrakingData {
  front: BrakeComponentState;
  rear: BrakeComponentState;
  abs: string;
  esp: string;
  parkingBrake: string;
}

// Props for BrakingInfo
interface BrakingInfoProps {
  data: BrakingData | undefined;
}

// Data structure for distribution info
interface DistributionData {
  type: string;
  condition: string;
  currentKm: string; // Use string for potential formatting like "120,000"
  lastService: string;
  nextService: string;
}

// Props for DistributionInfo
interface DistributionInfoProps {
  data: DistributionData | undefined;
}

// Data structure for engine info
interface EngineData {
  type: string;
  displacement: string;
  power: string;
  torque: string;
  oilLevel: string;
  coolantLevel: string;
  beltCondition: string;
  errorCodes: string; // Or potentially string[] if multiple codes possible
}

// Props for EngineInfo
interface EngineInfoProps {
  data: EngineData | undefined;
}

// Data structure for chassis info
interface ChassisData {
  frontSuspension: string;
  rearSuspension: string;
  springs: string;
  steeringType: string;
  steeringCondition: string;
  geometry: string;
  transmission: string; // Assuming this covers boîte de vitesses
}

// Props for ChassisInfo
interface ChassisInfoProps {
  data: ChassisData | undefined;
}

// Data structure for drive test info
interface DriveTestData {
  acceleration: string;
  braking: string;
  handling: string;
  comfort: string;
  soundInsulation: string;
  drivingAids: string;
  notes: string;
}

// Props for DriveTestInfo
interface DriveTestInfoProps {
  data: DriveTestData | undefined;
}

// Main component Props
interface FullTireData {
  avantGauche?: TireDataDetails; // Make individual tires optional too
  avantDroit?: TireDataDetails;
  arriereGauche?: TireDataDetails;
  arriereDroit?: TireDataDetails;
}

interface MechanicalInspectionProps {
  tireData?: FullTireData; // Mark all data props as optional
  brakingData?: BrakingData;
  distributionData?: DistributionData;
  engineData?: EngineData;
  chassisData?: ChassisData;
  driveTestData?: DriveTestData;
}

// --- Components ---

// Composant pour chaque élément du menu latéral
const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, isActive = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-4 rounded-xl transition-all ${
      isActive
        ? 'bg-[#C8EC66] text-black'
        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon className="w-6 h-6" /> 
    <span className="font-medium">{label}</span>
  </button>
)

// Composant pour les informations des pneus
const TireInfo: React.FC<TireInfoProps> = ({ position, data }) => (
  <div className="space-y-2">
    <h3 className="text-[#C8EC66] font-medium text-lg">{position}</h3>
    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
      <span className="text-gray-600">Marque :</span>
      <span className="font-medium">{data?.brand ?? 'N/A'}</span>
      <span className="text-gray-600">Dimensions :</span>
      <span className="font-medium">{data?.dimensions ?? 'N/A'}</span>
      <span className="text-gray-600">Profondeur restante :</span>
      <span className="font-medium">{data?.depth ?? 'N/A'}</span>
      <span className="text-gray-600">Type de pneu :</span>
      <span className="font-medium">{data?.type ?? 'N/A'}</span>
    </div>
  </div>
)

// Composant pour les informations de freinage
const BrakingInfo: React.FC<BrakingInfoProps> = ({ data }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-[#C8EC66] font-medium text-lg mb-3">État du système de freinage</h3>
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">Freins avant</h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <span className="text-gray-600">Disques :</span>
            <span className="font-medium">{data?.front?.discs ?? 'N/A'}</span>
            <span className="text-gray-600">Plaquettes :</span>
            <span className="font-medium">{data?.front?.pads ?? 'N/A'}</span>
            <span className="text-gray-600">Étriers :</span>
            <span className="font-medium">{data?.front?.calipers ?? 'N/A'}</span>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">Freins arrière</h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <span className="text-gray-600">Disques :</span>
            <span className="font-medium">{data?.rear?.discs ?? 'N/A'}</span>
            <span className="text-gray-600">Plaquettes :</span>
            <span className="font-medium">{data?.rear?.pads ?? 'N/A'}</span>
            <span className="text-gray-600">Étriers :</span>
            <span className="font-medium">{data?.rear?.calipers ?? 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h4 className="font-medium text-gray-800 mb-2">Système ABS et aides au freinage</h4>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-w-md">
        <span className="text-gray-600">ABS :</span>
        <span className="font-medium">{data?.abs ?? 'N/A'}</span>
        <span className="text-gray-600">ESP :</span>
        <span className="font-medium">{data?.esp ?? 'N/A'}</span>
        <span className="text-gray-600">Frein à main :</span>
        <span className="font-medium">{data?.parkingBrake ?? 'N/A'}</span>
      </div>
    </div>
  </div>
)

// Composant pour les informations de distribution
const DistributionInfo: React.FC<DistributionInfoProps> = ({ data }) => (
  <div className="space-y-6">
    <h3 className="text-[#C8EC66] font-medium text-lg mb-3">Système de distribution</h3>
    <div className="grid sm:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">État général</h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Type :</span>
          <span className="font-medium">{data?.type ?? 'N/A'}</span>
          <span className="text-gray-600">État :</span>
          <span className="font-medium">{data?.condition ?? 'N/A'}</span>
          <span className="text-gray-600">Kilométrage actuel :</span>
          <span className="font-medium">{data?.currentKm ? `${data.currentKm} km` : 'N/A'}</span>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Maintenance</h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Dernier entretien :</span>
          <span className="font-medium">{data?.lastService ? `${data.lastService} km` : 'N/A'}</span>
          <span className="text-gray-600">Prochain entretien :</span>
          <span className="font-medium">{data?.nextService ? `${data.nextService} km` : 'N/A'}</span>
          <span className="text-gray-600">Remarque :</span>
          <span className="font-medium">Aucun bruit anormal détecté</span>
        </div>
      </div>
    </div>
  </div>
)

// Composant pour les informations du moteur
const EngineInfo: React.FC<EngineInfoProps> = ({ data }) => (
  <div className="space-y-6">
    <h3 className="text-[#C8EC66] font-medium text-lg mb-3">État du moteur</h3>
    <div className="grid sm:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Caractéristiques</h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Type :</span>
          <span className="font-medium">{data?.type ?? 'N/A'}</span>
          <span className="text-gray-600">Cylindrée :</span>
          <span className="font-medium">{data?.displacement ?? 'N/A'}</span>
          <span className="text-gray-600">Puissance :</span>
          <span className="font-medium">{data?.power ?? 'N/A'}</span>
          <span className="text-gray-600">Couple :</span>
          <span className="font-medium">{data?.torque ?? 'N/A'}</span>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Diagnostics</h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Huile moteur :</span>
          <span className="font-medium">{data?.oilLevel ?? 'N/A'}</span>
          <span className="text-gray-600">Liquide de refroidissement :</span>
          <span className="font-medium">{data?.coolantLevel ?? 'N/A'}</span>
          <span className="text-gray-600">Courroie accessoire :</span>
          <span className="font-medium">{data?.beltCondition ?? 'N/A'}</span>
          <span className="text-gray-600">Codes erreur :</span>
          <span className="font-medium">{data?.errorCodes ?? 'N/A'}</span>
        </div>
      </div>
    </div>
  </div>
)

// Composant pour les informations du châssis
const ChassisInfo: React.FC<ChassisInfoProps> = ({ data }) => (
  <div className="space-y-6">
    <h3 className="text-[#C8EC66] font-medium text-lg mb-3">État du châssis</h3>
    <div className="grid sm:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Suspension</h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Amortisseurs avant :</span>
          <span className="font-medium">{data?.frontSuspension ?? 'N/A'}</span>
          <span className="text-gray-600">Amortisseurs arrière :</span>
          <span className="font-medium">{data?.rearSuspension ?? 'N/A'}</span>
          <span className="text-gray-600">Ressorts :</span>
          <span className="font-medium">{data?.springs ?? 'N/A'}</span>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Direction</h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Type :</span>
          <span className="font-medium">{data?.steeringType ?? 'N/A'}</span>
          <span className="text-gray-600">État :</span>
          <span className="font-medium">{data?.steeringCondition ?? 'N/A'}</span>
          <span className="text-gray-600">Géométrie :</span>
          <span className="font-medium">{data?.geometry ?? 'N/A'}</span>
        </div>
      </div>
    </div>
    
    <div className="pt-4">
      <h4 className="font-medium text-gray-800 mb-3">Éléments de transmission</h4>
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-w-md">
        <span className="text-gray-600">Cardan :</span>
        <span className="font-medium">Bon état</span> 
        <span className="text-gray-600">Boîte de vitesses :</span>
        <span className="font-medium">{data?.transmission ?? 'N/A'}</span>
        <span className="text-gray-600">Embrayage :</span>
        <span className="font-medium">Bon état</span> 
      </div>
    </div>
  </div>
)

// Composant pour les informations de test de conduite
const DriveTestInfo: React.FC<DriveTestInfoProps> = ({ data }) => (
  <div className="space-y-6">
    <h3 className="text-[#C8EC66] font-medium text-lg mb-3">Résultats du test de conduite</h3>
    
    <div className="space-y-4">
      <h4 className="font-medium text-gray-800">Performance</h4>
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Accélération :</span>
          <span className="font-medium">{data?.acceleration ?? 'N/A'}</span>
          <span className="text-gray-600">Freinage :</span>
          <span className="font-medium">{data?.braking ?? 'N/A'}</span>
          <span className="text-gray-600">Tenue de route :</span>
          <span className="font-medium">{data?.handling ?? 'N/A'}</span>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Confort :</span>
          <span className="font-medium">{data?.comfort ?? 'N/A'}</span>
          <span className="text-gray-600">Insonorisation :</span>
          <span className="font-medium">{data?.soundInsulation ?? 'N/A'}</span>
          <span className="text-gray-600">Aides à la conduite :</span>
          <span className="font-medium">{data?.drivingAids ?? 'N/A'}</span>
        </div>
      </div>
    </div>
    
    <div className="space-y-4 pt-2">
      <h4 className="font-medium text-gray-800">Remarques supplémentaires</h4>
      <p className="text-gray-700">
        {data?.notes ?? 'Aucune remarque supplémentaire.'}
      </p>
    </div>
  </div>
)

// --- Main Component ---

const MechanicalInspection: React.FC<MechanicalInspectionProps> = ({ 
  tireData, 
  brakingData, 
  distributionData, 
  engineData, 
  chassisData, 
  driveTestData 
}) => {
  const [activeSection, setActiveSection] = useState<string>('pneumatiques');
  
  const renderContent = (): JSX.Element | null => {
    switch (activeSection) {
      case 'pneumatiques':
        return tireData ? (
          <div className="grid sm:grid-cols-2 gap-8">
            <TireInfo position="Avant Gauche" data={tireData.avantGauche} />
            <TireInfo position="Avant Droit" data={tireData.avantDroit} />
            <TireInfo position="Arrière Gauche" data={tireData.arriereGauche} />
            <TireInfo position="Arrière Droit" data={tireData.arriereDroit} />
          </div>
        ) : null;
      case 'freinage':
        return <BrakingInfo data={brakingData} />;
      case 'distribution':
        return <DistributionInfo data={distributionData} />;
      case 'moteur':
        return <EngineInfo data={engineData} />;
      case 'chassis':
        return <ChassisInfo data={chassisData} />;
      case 'test-conduite':
        return <DriveTestInfo data={driveTestData} />;
      default:
        return null;
    }
  }
  
  const currentContent = renderContent();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 md:mb-12">
      <h2 className="text-2xl font-bold mb-6">Contrôle mécanique</h2>
      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        {/* Sidebar */}
        <div className="space-y-3">
          <SidebarItem 
            icon={CircleDot}
            label="Pneumatiques"
            isActive={activeSection === 'pneumatiques'}
            onClick={() => setActiveSection('pneumatiques')}
          />
          {/* ... other SidebarItems ... */}
           <SidebarItem 
            icon={Disc}
            label="Freinage"
            isActive={activeSection === 'freinage'}
            onClick={() => setActiveSection('freinage')}
          />
          <SidebarItem 
            icon={Cog}
            label="Distribution"
            isActive={activeSection === 'distribution'}
            onClick={() => setActiveSection('distribution')}
          />
          <SidebarItem 
            icon={FuelIcon}
            label="Moteur"
            isActive={activeSection === 'moteur'}
            onClick={() => setActiveSection('moteur')}
          />
          <SidebarItem 
            icon={CarIcon}
            label="Chassis"
            isActive={activeSection === 'chassis'}
            onClick={() => setActiveSection('chassis')}
          />
          <SidebarItem 
            icon={ShipWheel}
            label="Test de conduite"
            isActive={activeSection === 'test-conduite'}
            onClick={() => setActiveSection('test-conduite')}
          />
        </div>
        
        {/* Content Area */}
        <div className="bg-gray-50 rounded-xl p-6 min-h-[300px]"> 
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* *** FIX APPLIED HERE: Type Assertion *** */}
              {(currentContent !== null ? (
                currentContent
              ) : (
                <div className="text-gray-500">Aucune donnée disponible pour cette section.</div>
              )) as React.ReactNode} 
              {/* Asserting the final result as React.ReactNode */}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default MechanicalInspection;