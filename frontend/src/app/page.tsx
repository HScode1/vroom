"use client"

import { motion } from "framer-motion"
import { LocationsSection } from "@/components/locations-section"
import { FeaturesGrid } from "@/components/features-grid"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/Footer"
import DriverSections from "@/components/DriverSection"
import VehiculesSection from "@/components/vehiculesection"
import HeroBanner from "@/components/herosection"

export default function Home() {
  return (
    <>
      <main className="min-h-screen relative ] text-white overflow-hidden">
        {/* Suppression de l'ancienne navigation */}
        
        {/* Hero Banner avec la navigation intégrée */}
        <HeroBanner />

        {/* Features Grid avec ajustement des couleurs */}
        <section className="bg-white">
          <FeaturesGrid />
        </section>

        {/* Driver Sections avec le thème vert */}
        <section className="">
          <DriverSections />
        </section>

        {/* Vehicules Section */}
        <section className="bg-white">
          <VehiculesSection />
        </section>

        {/* Locations Section déjà en dark */}
        <LocationsSection />
      </main>

      {/* FAQ Section avec fond blanc */}
      <section className="bg-white">
        <FaqSection />
      </section>

      {/* Footer déjà en dark */}
      <Footer />
    </>
  )
}



{/* <FadeIn delay={1.4} className="absolute bottom-6 right-6 z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
            <Image
              src="/placeholder.svg?height=20&width=20"
              alt="French flag"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-sm">Made in France</span>
          </div>
        </FadeIn> */}


      //   <FadeIn delay={1.2} className="absolute bottom-0 left-0 z-10 p-6">
      //   <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg p-6 max-w-sm">
      //     <h3 className="text-2xl font-bold mb-2">24/7 Disponible</h3>
      //     <p className="text-gray-600">
      //       Profitez de nos services de location à toute heure, tous les jours de la semaine.
      //     </p>
      //   </div>
      // </FadeIn>