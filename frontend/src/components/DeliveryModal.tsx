"use client";

import React, { useState, FC } from 'react';
import { useUser } from "@clerk/nextjs";
import { MapPin, X, AlertCircle, Calendar, Clock } from 'lucide-react';

// Define interfaces for the data structures
interface DeliveryLocation {
  name: string;
  address: string;
  postalCode: string;
  distance: string;
}

interface DeliveryOptionData {
  price: number;
  date: Date;
}

interface PickupOptionData extends DeliveryOptionData {
  locations: DeliveryLocation[];
}

interface DeliveryOptionsData {
  pickup: PickupOptionData;
  delivery: DeliveryOptionData;
}

// Define props type for the component
interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onValidate?: (option: 'pickup' | 'delivery') => void; // Be specific with the option type
  carId?: string;
  carTitle?: string;
}

const DeliveryModal: FC<DeliveryModalProps> = ({ isOpen, onClose, onValidate, carId, carTitle }) => {
  const { user } = useUser();
  const [postalCode, setPostalCode] = useState<string>('');
  // Type the deliveryOptions state
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptionsData | null>(null);
  // Type the selectedOption state with possible values
  const [selectedOption, setSelectedOption] = useState<'pickup' | 'delivery' | null>(null);
  
  // Ajout d'une date par défaut pour éviter les problèmes de format
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);
  const defaultDate = tomorrow.toISOString().slice(0, 16);
  
  // Reservation states
  const [appointmentDate, setAppointmentDate] = useState<string>(defaultDate);
  const [duration, setDuration] = useState<number>(60); // Default: 1 hour
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<DeliveryLocation | null>(null);

  const handlePostalCodeSubmit = () => {
    // Simulate loading delivery options
    // In a real app, this would involve an API call
    // You might add loading and error states here
    setDeliveryOptions({
      pickup: {
        price: 0,
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Add 2 days
        locations: [
          {
            name: "Agence Paris Centre",
            address: "123 rue de Rivoli",
            postalCode: "75001",
            distance: "2km"
          },
          {
            name: "Agence Paris Sud",
            address: "45 avenue d'Italie",
            postalCode: "75013",
            distance: "5km"
          }
        ]
      },
      delivery: {
        price: 199,
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // Add 3 days
      }
    });
    setSelectedOption(null); // Reset selection when fetching new options
  };

  const formatDate = (date: Date): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return 'Date invalide'; // Handle cases where date might be invalid
    }
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short'
    });
  };

  // Handle validation click
  const handleValidate = () => {
    if (selectedOption && onValidate) {
      onValidate(selectedOption);
    }
  };

  // Handle reservation submission with simplified data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setError("Vous devez être connecté pour effectuer une réservation");
      setLoading(false);
      return;
    }

    if (!carId) {
      setError("Identifiant de voiture manquant");
      setLoading(false);
      return;
    }

    if (!selectedOption) {
      setError("Veuillez sélectionner une option de livraison");
      setLoading(false);
      return;
    }

    try {
      // Vérifier que la date est valide
      const parsedDate = new Date(appointmentDate);
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Date de rendez-vous invalide");
      }

      // Les données envoyées correspondent uniquement au schéma de la table
      // Nous n'envoyons plus les informations de livraison
      console.log('Envoi des données de réservation:', {
        carId,
        appointmentDate: parsedDate.toISOString(),
        duration: parseInt(String(duration), 10),
        message: message || null
      });

      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId,
          appointmentDate: parsedDate.toISOString(),
          duration: parseInt(String(duration), 10),
          message: message || null
          // Supprimé deliveryInfo car les champs correspondants n'existent pas dans la table
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Erreur ${response.status}: ${response.statusText}`);
      }

      // Réservation réussie
      alert("Réservation effectuée avec succès !");
      onClose();
    } catch (err) {
      console.error("Erreur lors de la réservation :", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-5 md:p-6 border-b border-gray-200 shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {carTitle ? `Réserver: ${carTitle}` : "Livraison et retrait"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fermer la modal"
            className="p-2 -m-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 overflow-y-auto flex-grow"> {/* Removed max-h, let flex handle sizing */}
          <div className="space-y-6">
            {/* Postal code input */}
            <div>
              <label htmlFor="postalCodeInput" className="block text-sm font-medium text-gray-700 mb-2">
                Entrez votre code postal
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="postalCodeInput"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, '').slice(0, 5))} // Allow only digits, max 5
                  placeholder="Ex: 75001"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C8EC66]/50 focus:border-[#C8EC66] outline-none transition"
                  maxLength={5}
                  pattern="\d{5}" // Add pattern for basic validation hint
                  inputMode="numeric" // Improve mobile UX
                />
                <button
                  onClick={handlePostalCodeSubmit}
                  disabled={postalCode.length !== 5} // Disable if length is not 5
                  className="px-6 py-3 bg-[#C8EC66] text-black font-medium rounded-xl hover:bg-[#b8d65c] focus:outline-none focus:ring-2 focus:ring-[#C8EC66]/50 focus:ring-offset-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Afficher les options
                </button>
              </div>
              <button className="mt-2 text-[#C8EC66] hover:underline text-sm flex items-center gap-1.5 group">
                <MapPin className="w-4 h-4 text-[#a8c64c] group-hover:text-[#C8EC66] transition-colors" />
                Utiliser ma position actuelle
              </button>
            </div>

            {/* Delivery options - Conditional rendering only after fetch */}
            {deliveryOptions && (
              <div className="space-y-4 animate-fade-in"> {/* Optional: add a fade-in animation */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Pickup option */}
                  <button
                    onClick={() => setSelectedOption('pickup')}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                      selectedOption === 'pickup'
                        ? 'border-[#C8EC66] bg-[#C8EC66]/10 ring-1 ring-[#C8EC66]'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-800">Retrait en agence</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {formatDate(deliveryOptions.pickup.date)} | Gratuit
                    </div>
                  </button>

                  {/* Delivery option */}
                  <button
                    onClick={() => setSelectedOption('delivery')}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                      selectedOption === 'delivery'
                        ? 'border-[#C8EC66] bg-[#C8EC66]/10 ring-1 ring-[#C8EC66]'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-800">Livraison à domicile</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {formatDate(deliveryOptions.delivery.date)} | {deliveryOptions.delivery.price}€
                    </div>
                  </button>
                </div>

                {/* Pickup locations - Conditionally render based on selection */}
                {selectedOption === 'pickup' && (
                  <div className="space-y-3 mt-4 animate-fade-in"> {/* Optional animation */}
                    <h3 className="text-sm font-medium text-gray-600">Choisissez une agence :</h3>
                    {deliveryOptions.pickup.locations.map((location: DeliveryLocation, index: number) => (
                      <button 
                        key={index}
                        className={`w-full p-4 rounded-xl border transition-colors text-left ${selectedLocation?.name === location.name ? 'border-[#C8EC66] bg-[#C8EC66]/10' : 'border-gray-200 hover:border-[#C8EC66] hover:bg-[#C8EC66]/5'}`}
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className="font-medium text-gray-800">{location.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {location.address}, {location.postalCode}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          À {location.distance} de votre position
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Info message */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl text-sm text-blue-800 border border-blue-200">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-blue-500" />
                  <p>
                    Les dates estimées sont calculées à partir du jour où la commande est vérifiée.
                    Les options de livraison prennent en compte des variables telles que l&apos;emplacement
                    de la voiture et vos préférences.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reservation form - Show after delivery option is selected */}
        {selectedOption && carId && (
          <div className="border-t border-gray-200 p-5 md:p-6">
            <h3 className="text-lg font-semibold mb-4">Finaliser votre réservation</h3>
            
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl text-sm text-red-800 border border-red-200 mb-4">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Date et heure
                </label>
                <input
                  id="appointment-date"
                  type="datetime-local"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C8EC66]/50 focus:border-[#C8EC66] outline-none transition"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Durée (minutes)
                </label>
                <select
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C8EC66]/50 focus:border-[#C8EC66] outline-none transition"
                  required
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 heure</option>
                  <option value="90">1 heure 30</option>
                  <option value="120">2 heures</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C8EC66]/50 focus:border-[#C8EC66] outline-none transition"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                disabled={loading || (selectedOption === 'pickup' && !selectedLocation)}
                className="w-full py-3.5 bg-[#C8EC66] text-black font-semibold rounded-xl hover:bg-[#b8d65c] focus:outline-none focus:ring-2 focus:ring-[#C8EC66]/50 focus:ring-offset-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Traitement en cours..." : "Confirmer la réservation"}
              </button>
            </form>
          </div>
        )}
        
        {/* Footer - Only show if not in reservation mode */}
        {(!selectedOption || !carId) && (
          <div className="border-t border-gray-200 p-5 md:p-6 shrink-0">
            <button
              onClick={handleValidate}
              disabled={!selectedOption || (selectedOption === 'pickup' && !selectedLocation)}
              className="w-full py-3.5 bg-[#C8EC66] text-black font-semibold rounded-xl hover:bg-[#b8d65c] focus:outline-none focus:ring-2 focus:ring-[#C8EC66]/50 focus:ring-offset-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Valider mon choix
            </button>
          </div>
        )}
      </div>
      {/* Optional: Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DeliveryModal;