'use client'

import { Car, Wrench, Flag } from 'lucide-react'
import { motion } from 'framer-motion'

interface MaintenanceEvent {
  date: string
  kilometers: number
  type: string
  location: string
}

const TimelineEvent = ({ event, index }: { event: MaintenanceEvent, index: number }) => (
  <motion.div 
    className="flex gap-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="relative flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-[#C8EC66] flex items-center justify-center">
        <Wrench className="w-5 h-5 text-black" />
      </div>
      {index !== 0 && (
        <div className="w-0.5 h-full bg-gray-200 absolute top-10" />
      )}
    </div>
    <div className="flex-1 pb-8">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-500">{event.date}</span>
          <Flag className="w-4 h-4 text-[#C8EC66]" />
          <span className="text-gray-500">{new Intl.NumberFormat('fr-FR').format(event.kilometers)} km</span>
        </div>
        <div className="font-medium">{event.type}</div>
        <div className="text-gray-600 text-sm">{event.location}</div>
      </div>
    </div>
  </motion.div>
)

export default function MaintenanceHistory() {
  const currentKilometers = 60668
  const maintenanceEvents: MaintenanceEvent[] = [
    {
      date: "27/07/2021",
      kilometers: 38056,
      type: "Révision",
      location: "Entretien réalisé chez Honda"
    },
    {
      date: "12/03/2021",
      kilometers: 37318,
      type: "Révision",
      location: "Entretien réalisé chez Honda"
    },
    {
      date: "24/06/2020",
      kilometers: 33031,
      type: "Révision",
      location: "Entretien réalisé chez Honda"
    },
    {
      date: "23/06/2019",
      kilometers: 23980,
      type: "Révision",
      location: "Entretien réalisé chez Honda"
    }
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Historique d'entretien</h2>
      <div className="text-gray-600 mb-8">
        <p>Dernier contrôle technique effectué le 03/10/2024</p>
        <p>Un contrôle technique de moins de 6 mois sera présenté à l'acheteur avant la transaction.</p>
      </div>

      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 mb-8">
        <Car className="w-6 h-6 text-[#C8EC66]" />
        <span className="font-medium">{new Intl.NumberFormat('fr-FR').format(currentKilometers)} km parcourus</span>
      </div>

      <div className="space-y-2">
        {maintenanceEvents.map((event, index) => (
          <TimelineEvent key={event.date} event={event} index={index} />
        ))}
      </div>
    </div>
  )
}
