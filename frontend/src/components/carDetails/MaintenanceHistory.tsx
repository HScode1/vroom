'use client'

import { Car, Wrench, Flag } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'; // Import React for type definitions like React.FC

// Define the shape of a single maintenance event
interface MaintenanceEvent {
  date: string
  kilometers: number
  type: string
  location: string
}

// Define the props for the TimelineEvent component
interface TimelineEventProps {
  event: MaintenanceEvent;
  index: number;
  isLast: boolean;
}

// TimelineEvent Component
const TimelineEvent: React.FC<TimelineEventProps> = ({ event, index, isLast }) => (
  <motion.div
    className="relative flex gap-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {/* Vertical line and icon */}
    <div className="relative flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-[#C8EC66] flex items-center justify-center z-10">
        <Wrench className="w-5 h-5 text-black" />
      </div>
      {/* Line connecting events, hidden for the last one */}
      {!isLast && (
        <div className="w-0.5 bg-gray-200 absolute top-10 bottom-0 z-0" />
      )}
    </div>
    {/* Event details card */}
    <div className="flex-1 pb-8">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-[#C8EC66] transition-colors duration-200">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {/* Date */}
          <span className="text-gray-500 font-medium">{event.date}</span>
          {/* Kilometers */}
          <div className="flex items-center gap-1">
            <Flag className="w-4 h-4 text-[#C8EC66]" />
            <span className="text-gray-500">{new Intl.NumberFormat('fr-FR').format(event.kilometers)} km</span>
          </div>
        </div>
        {/* Event Type */}
        <div className="font-medium text-gray-800">{event.type}</div>
        {/* Event Location */}
        <div className="text-gray-600 text-sm mt-1">{event.location}</div>
      </div>
    </div>
  </motion.div>
)

// Define the props for the MaintenanceHistory component
interface MaintenanceHistoryProps {
  currentKilometers?: number; // Optional prop, type number
  maintenanceEvents?: MaintenanceEvent[]; // Optional prop, type array of MaintenanceEvent
}

// Main MaintenanceHistory Component
const MaintenanceHistory: React.FC<MaintenanceHistoryProps> = ({ currentKilometers, maintenanceEvents }) => {
  // Use provided data or default values
  // Use nullish coalescing (??) for potentially undefined/null props, or || if 0/false should also trigger default
  const kilometers = currentKilometers ?? 60668;
  const events: MaintenanceEvent[] = (maintenanceEvents && maintenanceEvents.length > 0)
    ? maintenanceEvents
    : [ // Default events if none provided or empty array
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
      ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Historique d&apos;entretien</h2>

      {/* Technical Control Info */}
      <div className="text-gray-600 mb-8">
        <div className="flex flex-col gap-2">
          <p>Dernier contrôle technique effectué le <span className="font-medium">03/10/2024</span></p>
          <p>Un contrôle technique de moins de 6 mois sera présenté à l&apos;acheteur avant la transaction.</p>
        </div>
      </div>

      {/* Current Kilometers Display */}
      <motion.div
        className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 mb-8 border-l-4 border-[#C8EC66]"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Car className="w-6 h-6 text-[#C8EC66]" />
        <span className="font-medium">{new Intl.NumberFormat('fr-FR').format(kilometers)} km parcourus</span>
      </motion.div>

      {/* Timeline of Maintenance Events */}
      <div className="mt-10">
        {events.map((event, index) => (
          <TimelineEvent
            key={`${event.date}-${index}`} // Using date and index for a more robust key
            event={event}
            index={index}
            isLast={index === events.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

export default MaintenanceHistory;