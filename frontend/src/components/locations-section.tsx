"use client"

import { motion } from "framer-motion"
import { LocationCard } from "./location-card"

const locations = [
  {
    title: "Paris Centre",
    description: "Notre agence principale au cœur de Paris. Location de scooters électriques et thermiques avec service premium.",
    hours: "Lun-Dim • 08h-20h",
    image: "/placeholder.svg?height=600&width=400",
    href: "/locations/paris-centre"
  },
  {
    title: "La Défense",
    description: "Point de location idéal pour les professionnels. Flotte de scooters adaptée aux déplacements urbains.",
    hours: "Lun-Sam • 07h-19h",
    image: "/placeholder.svg?height=600&width=400",
    href: "/locations/la-defense"
  },
  {
    title: "Montmartre",
    description: "Découvrez Paris autrement depuis les hauteurs de Montmartre. Scooters parfaits pour l'exploration urbaine.",
    hours: "Lun-Dim • 09h-21h",
    image: "/placeholder.svg?height=600&width=400",
    href: "/locations/montmartre"
  }
]

export function LocationsSection() {
  return (
    <section className="py-24 px-4 bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Du Centre aux Quartiers,
            <br />
            Votre Liberté.
          </h2>
          <p className="text-gray-400 text-lg">
            Trois points de location stratégiques pour une expérience unique de la capitale.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <LocationCard
              key={location.title}
              {...location}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

