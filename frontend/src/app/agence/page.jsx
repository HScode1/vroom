"use client"

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from '@/components/Footer';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function AgencyPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    consultationType: null,
    carType: "",
    budget: "",
    fuelType: ""
  });

  const consultationTypes = {
    discover: {
      title: "VROOM DISCOVER",
      duration: "30 MIN",
      features: [
        "Définition du projet d'achat",
        "Définition du budget",
        "Conseil sur la motorisation et la finition",
        "Analyse des prix du marché",
        "Conseil sur la partie administrative"
      ]
    },
    partner: {
      title: "VROOM PARTNER",
      duration: "60 MIN",
      features: [
        "Définition du projet d'achat",
        "Définition du budget",
        "Conseil sur la motorisation et la finition",
        "Analyse des prix du marché",
        "Conseil sur la partie administrative",
        "Recherche personnalisée et proposition de véhicules",
        "Négociation du véhicule pour le client",
        "Suivi pré-post achat"
      ]
    }
  };

  const handleOpenPopup = (type) => {
    setFormData(prev => ({ ...prev, consultationType: type }));
    setIsPopupOpen(true);
    setCurrentStep(1);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentStep(1);
    setFormData({
      consultationType: null,
      carType: "",
      budget: "",
      fuelType: ""
    });
  };

  const handleSubmit = () => {
    console.log("Réservation soumise:", formData);
    handleClosePopup();
  };

  const ConsultationCard = ({ type, data }) => (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-[#C8EC66] text-black p-4 rounded-xl text-center">
        <h3 className="font-bold">{data.title} :</h3>
        <p>CONSULTATION DE {data.duration}</p>
      </div>
      <ul className="space-y-2 list-disc pl-6">
        {data.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Button 
        className="w-full bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
        onClick={() => handleOpenPopup(type)}
      >
        Réserver ({data.duration.toLowerCase()})
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <Navbar />
      <div className="mt-8 container mx-auto px-4">
        <main className="flex-1 flex relative min-h-screen">
          {/* Left Column - Scrollable */}
          <div className="w-full lg:w-1/2 min-h-[calc(100vh-80px)] overflow-y-auto pb-20">
            <div className="p-4 md:p-8">
              <div className="max-w-2xl mx-auto space-y-8">
                <nav>
                  <Link 
                    href="#booking" 
                    className="text-xl font-medium text-[#C8EC66] hover:text-[#B7E34F] transition-colors flex items-center gap-2 border-b border-gray-200 pb-2"
                  >
                    Réserver un créneau
                  </Link>
                </nav>

                <div className="grid gap-6">
                  <ConsultationCard type="discover" data={consultationTypes.discover} />
                  <ConsultationCard type="partner" data={consultationTypes.partner} />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">Agence VROOM Paris</h2>
                  <div className="space-y-4">
                    <a href="mailto:vroomparis@gmail.com" className="block text-lg text-gray-700 hover:text-[#C8EC66] transition-colors">
                      vroomparis@gmail.com
                    </a>
                    <a href="tel:0145252645" className="block text-lg font-medium text-gray-700 hover:text-[#C8EC66] transition-colors">
                      01 45 25 26 45
                    </a>
                    <div className="space-y-4">
                      <a 
                        href="https://goo.gl/maps/YourGoogleMapsLink" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-lg text-gray-700 hover:text-[#C8EC66] transition-colors"
                      >
                        12 Rue des Bergamotes<br />95110 Sannois
                      </a>
                      <div className="aspect-video rounded-xl overflow-hidden shadow-sm">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.694501787281!2d2.2558!3d48.9697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6658b7b757777%3A0x1c0b82c6e1d88d2a!2s12%20Rue%20des%20Bergamotes%2C%2095110%20Sannois%2C%20France!5e0!3m2!1sen!2sfr!4v1708716638974!5m2!1sen!2sfr"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col text-sm text-gray-600">
                      <span>Du Lundi au Samedi</span>
                      <span className="font-medium">8h00 - 18h00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Fixed Image */}
          <div className="hidden lg:block w-1/2 sticky top-[80px] h-[calc(100vh-80px)]">
            <div className="relative h-full">
              <div className="h-full p-8">
                <div className="relative h-full">
                  <Image
                    src="/showroom.png"
                    alt="VROOM Paris Showroom"
                    fill
                    className="object-cover object-center rounded-2xl"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent rounded-2xl" />
                  <div className="absolute bottom-12 left-12">
                    <p className="text-xl font-medium bg-black/50 backdrop-blur-sm px-6 py-3 rounded-xl text-white">
                      Découvrez l'excellence automobile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <AnimatePresence>
          {isPopupOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-xl p-6 max-w-md w-full space-y-4"
              >
                <h2 className="text-2xl font-bold">Réservation</h2>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <p>Vous avez choisi : {formData.consultationType === "discover" ? "30 minutes" : "60 minutes"}</p>
                    <Button onClick={() => setCurrentStep(2)}>Suivant</Button>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Type de voiture souhaité
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#C8EC66] focus:ring-[#C8EC66]"
                        value={formData.carType}
                        onChange={(e) => setFormData(prev => ({ ...prev, carType: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Budget approximatif
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#C8EC66] focus:ring-[#C8EC66]"
                        value={formData.budget}
                        onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Type de carburant préféré
                      </label>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#C8EC66] focus:ring-[#C8EC66]"
                        value={formData.fuelType}
                        onChange={(e) => setFormData(prev => ({ ...prev, fuelType: e.target.value }))}
                      >
                        <option value="">Sélectionnez</option>
                        <option value="essence">Essence</option>
                        <option value="diesel">Diesel</option>
                        <option value="electrique">Électrique</option>
                        <option value="hybride">Hybride</option>
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>Retour</Button>
                      <Button onClick={() => setCurrentStep(3)}>Suivant</Button>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <p>Consultation : {formData.consultationType === "discover" ? "30 minutes" : "60 minutes"}</p>
                    <p>Type de voiture : {formData.carType || "Non spécifié"}</p>
                    <p>Budget : {formData.budget || "Non spécifié"}</p>
                    <p>Carburant : {formData.fuelType || "Non spécifié"}</p>
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep(2)}>Retour</Button>
                      <Button onClick={handleSubmit}>Confirmer</Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer className="relative z-10" />
      </div>
    </div>
  );
}