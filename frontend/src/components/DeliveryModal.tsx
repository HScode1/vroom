"use client"; // Assuming this is for Next.js App Router

import React, { useState, FC } from 'react'; // Added FC for component typing
import { MapPin, X, AlertCircle } from 'lucide-react';

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
  onValidate: (option: 'pickup' | 'delivery') => void; // Be specific with the option type
}

const DeliveryModal: FC<DeliveryModalProps> = ({ isOpen, onClose, onValidate }) => {
  const [postalCode, setPostalCode] = useState<string>('');
  // Type the deliveryOptions state
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptionsData | null>(null);
  // Type the selectedOption state with possible values
  const [selectedOption, setSelectedOption] = useState<'pickup' | 'delivery' | null>(null);

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
    if (!date || !(date instanceof Date)) {
        return 'Date invalide'; // Handle cases where date might be invalid
    }
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short'
    });
  };

  // Handle validation click
  const handleValidate = () => {
    if (selectedOption) {
      onValidate(selectedOption);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-5 md:p-6 border-b border-gray-200 shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Livraison et retrait</h2>
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
                      <button // Changed to button for better semantics if clickable
                        key={index} // Consider using a unique ID if available (e.g., location.id)
                        className="w-full p-4 rounded-xl border border-gray-200 hover:border-[#C8EC66] hover:bg-[#C8EC66]/5 transition-colors text-left"
                        // Add onClick handler here if these are selectable
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

        {/* Footer */}
        <div className="border-t border-gray-200 p-5 md:p-6 shrink-0">
          <button
            onClick={handleValidate}
            disabled={!selectedOption}
            className="w-full py-3.5 bg-[#C8EC66] text-black font-semibold rounded-xl hover:bg-[#b8d65c] focus:outline-none focus:ring-2 focus:ring-[#C8EC66]/50 focus:ring-offset-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Valider mon choix
          </button>
        </div>
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