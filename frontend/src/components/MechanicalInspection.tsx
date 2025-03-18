'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CircleDot, Disc, Cog, FuelIcon, CarIcon, ShipWheel } from 'lucide-react'

// Composant pour chaque élément du menu latéral
const SidebarItem = ({ icon: Icon, label, isActive = false, onClick }) => (
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
const TireInfo = ({ position, data }) => (
  <div className="space-y-2">
    <h3 className="text-[#C8EC66] font-medium text-lg">{position}</h3>
    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
      <span className="text-gray-600">Marque :</span>
      <span className="font-medium">{data.brand}</span>
      <span className="text-gray-600">Dimensions :</span>
      <span className="font-medium">{data.dimensions}</span>
      <span className="text-gray-600">Profondeur restante :</span>
      <span className="font-medium">{data.depth}</span>
      <span className="text-gray-600">Type de pneu :</span>
      <span className="font-medium">{data.type}</span>
    </div>
  </div>
)

// Composant pour les informations de freinage
const BrakingInfo = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-[#C8EC66] font-medium text-lg mb-3">État du système de freinage</h3>
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">Freins avant</h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <span className="text-gray-600">Disques :</span>
            <span className="font-medium">Excellent état (90%)</span>
            <span className="text-gray-600">Plaquettes :</span>
            <span className="font-medium">Neuves (95%)</span>
            <span className="text-gray-600">Étriers :</span>
            <span className="font-medium">Bon état</span>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">Freins arrière</h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <span className="text-gray-600">Disques :</span>
            <span className="font-medium">Bon état (85%)</span>
            <span className="text-gray-600">Plaquettes :</span>
            <span className="font-medium">Bon état (80%)</span>
            <span className="text-gray-600">Étriers :</span>
            <span className="font-medium">Bon état</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h4 className="font-medium text-gray-800 mb-2">Système ABS et aides au freinage</h4>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-w-md">
        <span className="text-gray-600">ABS :</span>
        <span className="font-medium">Fonctionnel</span>
        <span className="text-gray-600">ESP :</span>
        <span className="font-medium">Fonctionnel</span>
        <span className="text-gray-600">Frein à main :</span>
        <span className="font-medium">Électronique - Parfait état</span>
      </div>
    </div>
  </div>
)

// Composant pour les informations de distribution
const DistributionInfo = () => (
  <div className="space-y-6">
    <h3 className="text-[#C8EC66] font-medium text-lg mb-3">Système de distribution</h3>
    <div className="grid sm:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">État général</h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Type :</span>
          <span className="font-medium">Chaîne de distribution</span>
          <span className="text-gray-600">État :</span>
          <span className="font-medium">Excellent</span>
          <span className="text-gray-600">Kilométrage actuel :</span>
          <span className="font-medium">42,850 km</span>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Maintenance</h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Dernier entretien :</span>
          <span className="font-medium">30,000 km</span>
          <span className="text-gray-600">Prochain entretien :</span>
          <span className="font-medium">60,000 km</span>
          <span className="text-gray-600">Remarque :</span>
          <span className="font-medium">Aucun bruit anormal détecté</span>
        </div>
      </div>
    </div>
  </div>
)

// Composant pour les informations du moteur
const EngineInfo = () => (
  <div className="space-y-6">
    <h3 className="text-[#C8EC66] font-medium text-lg mb-3">État du moteur</h3>
    <div className="grid sm:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Caractéristiques</h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Type :</span>
          <span className="font-medium">4 cylindres en ligne</span>
          <span className="text-gray-600">Cylindrée :</span>
          <span className="font-medium">1.5L Turbo</span>
          <span className="text-gray-600">Puissance :</span>
          <span className="font-medium">160 ch</span>
          <span className="text-gray-600">Couple :</span>
          <span className="font-medium">250 Nm</span>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Diagnostics</h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Huile moteur :</span>
          <span className="font-medium">Niveau correct</span>
          <span className="text-gray-600">Liquide de refroidissement :</span>
          <span className="font-medium">Niveau correct</span>
          <span className="text-gray-600">Courroie accessoire :</span>
          <span className="font-medium">Bon état</span>
          <span className="text-gray-600">Codes erreur :</span>
          <span className="font-medium">Aucun</span>
        </div>
      </div>
    </div>
  </div>
)

// Composant pour les informations du châssis
const ChassisInfo = () => (
  <div className="space-y-6">
    <h3 className="text-[#C8EC66] font-medium text-lg mb-3">État du châssis</h3>
    <div className="grid sm:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Suspension</h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Amortisseurs avant :</span>
          <span className="font-medium">Bon état</span>
          <span className="text-gray-600">Amortisseurs arrière :</span>
          <span className="font-medium">Bon état</span>
          <span className="text-gray-600">Ressorts :</span>
          <span className="font-medium">Bon état</span>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">Direction</h4>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Type :</span>
          <span className="font-medium">Assistée électrique</span>
          <span className="text-gray-600">État :</span>
          <span className="font-medium">Excellent</span>
          <span className="text-gray-600">Géométrie :</span>
          <span className="font-medium">Réglages conformes</span>
        </div>
      </div>
    </div>
    
    <div className="pt-4">
      <h4 className="font-medium text-gray-800 mb-3">Éléments de transmission</h4>
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-w-md">
        <span className="text-gray-600">Cardan :</span>
        <span className="font-medium">Bon état</span>
        <span className="text-gray-600">Boîte de vitesses :</span>
        <span className="font-medium">Automatique - Excellent état</span>
        <span className="text-gray-600">Embrayage :</span>
        <span className="font-medium">Non applicable</span>
      </div>
    </div>
  </div>
)

// Composant pour les informations de test de conduite
const DriveTestInfo = () => (
  <div className="space-y-6">
    <h3 className="text-[#C8EC66] font-medium text-lg mb-3">Résultats du test de conduite</h3>
    
    <div className="space-y-4">
      <h4 className="font-medium text-gray-800">Performance</h4>
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Accélération :</span>
          <span className="font-medium">Excellente réactivité</span>
          <span className="text-gray-600">Freinage :</span>
          <span className="font-medium">Efficace et stable</span>
          <span className="text-gray-600">Tenue de route :</span>
          <span className="font-medium">Très bonne</span>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          <span className="text-gray-600">Confort :</span>
          <span className="font-medium">Excellent</span>
          <span className="text-gray-600">Insonorisation :</span>
          <span className="font-medium">Très bonne</span>
          <span className="text-gray-600">Aides à la conduite :</span>
          <span className="font-medium">Toutes fonctionnelles</span>
        </div>
      </div>
    </div>
    
    <div className="space-y-4 pt-2">
      <h4 className="font-medium text-gray-800">Remarques supplémentaires</h4>
      <p className="text-gray-700">
        Véhicule en excellent état général. Aucun bruit parasite ni vibration anormale détectés lors du test. 
        Tous les systèmes électroniques fonctionnent parfaitement. Le véhicule offre des performances et un confort remarquables.
      </p>
    </div>
  </div>
)

const MechanicalInspection = () => {
  const [activeSection, setActiveSection] = useState('pneumatiques')
  
  // Données des pneus
  const tireData = {
    avantGauche: {
      brand: "Michelin",
      dimensions: "235/45 R18",
      depth: "8,5mm (0% d'usure)",
      type: "Été"
    },
    avantDroit: {
      brand: "Michelin",
      dimensions: "235/45 R18",
      depth: "8,5mm (0% d'usure)",
      type: "Été"
    },
    arriereGauche: {
      brand: "Michelin",
      dimensions: "235/45 R18",
      depth: "8,5mm (0% d'usure)",
      type: "Été"
    },
    arriereDroit: {
      brand: "Michelin",
      dimensions: "235/45 R18",
      depth: "8,5mm (0% d'usure)",
      type: "Été"
    }
  }
  
  // Rendu du contenu en fonction de la section active
  const renderContent = () => {
    switch (activeSection) {
      case 'pneumatiques':
        return (
          <div className="grid sm:grid-cols-2 gap-8">
            <TireInfo position="Avant Gauche" data={tireData.avantGauche} />
            <TireInfo position="Avant Droit" data={tireData.avantDroit} />
            <TireInfo position="Arrière Gauche" data={tireData.arriereGauche} />
            <TireInfo position="Arrière Droit" data={tireData.arriereDroit} />
          </div>
        )
      case 'freinage':
        return <BrakingInfo />
      case 'distribution':
        return <DistributionInfo />
      case 'moteur':
        return <EngineInfo />
      case 'chassis':
        return <ChassisInfo />
      case 'test-conduite':
        return <DriveTestInfo />
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 md:mb-12">
      <h2 className="text-2xl font-bold mb-6">Contrôle mécanique</h2>
      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        <div className="space-y-3">
          <SidebarItem 
            icon={CircleDot}
            label="Pneumatiques"
            isActive={activeSection === 'pneumatiques'}
            onClick={() => setActiveSection('pneumatiques')}
          />
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
        
        <div className="bg-gray-50 rounded-xl p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default MechanicalInspection