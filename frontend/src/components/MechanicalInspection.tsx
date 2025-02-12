'use client'

import { CircleDot, Disc, Cog, FuelIcon as Engine, CarIcon, ShipWheelIcon as SteeringWheel } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'

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

export default function MechanicalInspection() {
  const [activeSection, setActiveSection] = React.useState('pneumatiques')
  
  const tireData = {
    avantGauche: {
      brand: "Autre",
      dimensions: "235/45 R18",
      depth: "8,5mm (0% d'usure)",
      type: "Été"
    },
    avantDroit: {
      brand: "Autre",
      dimensions: "235/45 R18",
      depth: "8,5mm (0% d'usure)",
      type: "Été"
    },
    arriereGauche: {
      brand: "Autre",
      dimensions: "235/45 R18",
      depth: "8,5mm (0% d'usure)",
      type: "Été"
    },
    arriereDroit: {
      brand: "Autre",
      dimensions: "235/45 R18",
      depth: "8,5mm (0% d'usure)",
      type: "Été"
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
            icon={Engine} 
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
            icon={SteeringWheel} 
            label="Test de conduite" 
            isActive={activeSection === 'test-conduite'}
            onClick={() => setActiveSection('test-conduite')}
          />
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid sm:grid-cols-2 gap-8">
            <TireInfo position="Avant Gauche" data={tireData.avantGauche} />
            <TireInfo position="Avant Droit" data={tireData.avantDroit} />
            <TireInfo position="Arrière Gauche" data={tireData.arriereGauche} />
            <TireInfo position="Arrière Droit" data={tireData.arriereDroit} />
          </div>
        </div>
      </div>
    </div>
  )
}
