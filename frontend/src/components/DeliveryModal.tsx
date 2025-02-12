import { useState } from 'react';
import { MapPin, X, AlertCircle } from 'lucide-react';

const DeliveryModal = ({ isOpen, onClose, onValidate }) => {
  const [postalCode, setPostalCode] = useState('');
  const [deliveryOptions, setDeliveryOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePostalCodeSubmit = () => {
    // Simuler le chargement des options de livraison
    setDeliveryOptions({
      pickup: {
        price: 0,
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
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
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      }
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit',
      month: 'short'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Livraison et retrait</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Code postal input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entrez votre code postal
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Ex: 75001"
                  className="flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#C8EC66] focus:border-transparent outline-none"
                  maxLength={5}
                />
                <button
                  onClick={handlePostalCodeSubmit}
                  className="px-6 py-3 bg-[#C8EC66] text-black font-medium rounded-xl hover:bg-[#C8EC66] transition-colors"
                >
                  Afficher les options
                </button>
              </div>
              <button className="mt-2 text-[#C8EC66] hover:underline text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Utiliser ma position actuelle
              </button>
            </div>

            {/* Delivery options */}
            {deliveryOptions && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Pickup option */}
                  <button
                    onClick={() => setSelectedOption('pickup')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedOption === 'pickup'
                        ? 'border-[#C8EC66] bg-[#C8EC66]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Retrait en agence</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {formatDate(deliveryOptions.pickup.date)} | Gratuit
                    </div>
                  </button>

                  {/* Delivery option */}
                  <button
                    onClick={() => setSelectedOption('delivery')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedOption === 'delivery'
                        ? 'border-[#C8EC66] bg-[#C8EC66]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">Livraison à domicile</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {formatDate(deliveryOptions.delivery.date)} | {deliveryOptions.delivery.price}€
                    </div>
                  </button>
                </div>

                {/* Pickup locations */}
                {selectedOption === 'pickup' && (
                  <div className="space-y-3 mt-4">
                    {deliveryOptions.pickup.locations.map((location, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl border border-gray-200 hover:border-[#C8EC66] transition-colors"
                      >
                        <div className="font-medium">{location.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {location.address} | {location.postalCode}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          À {location.distance} de votre position
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Info message */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>
                    Les dates estimées sont calculées à partir du jour où la commande est vérifiée. 
                    Les options de livraison prennent en compte des variables telles que l'emplacement 
                    de la voiture et vos préférences.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6">
          <button
            onClick={() => selectedOption && onValidate(selectedOption)}
            disabled={!selectedOption}
            className="w-full py-4 bg-[#C8EC66] text-black font-medium rounded-xl hover:bg-[#C8EC66] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Valider mon choix
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;