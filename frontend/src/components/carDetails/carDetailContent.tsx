'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { MapPin, Share2, Heart, Shield, Calendar, Gauge,Droplet, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import PhotoViewer from './PhotoViewer'; // Assuming this component exists and accepts props as used
import DeliveryModal from '@/components/DeliveryModal'; // Assuming this component exists
import MaintenanceHistory from './MaintenanceHistory'; // Assuming this component exists
import MechanicalInspection from './MechanicalInspection'; // Assuming this component exists
import { SimilarCarsSection } from '@/components/SimilarCarSection'; // Assuming this component exists

// --- Interfaces defining data structures ---

interface PhotoRecord {
  url: string;
  order: number;
}

interface MaintenanceEventRecord {
  date: string; // Expecting 'YYYY-MM-DD' format from DB
  kilometers: number;
  type: string;
  location: string;
  // Add other relevant fields if they exist
}

// Interface for the main car data fetched from Supabase 'car_details' view/table
// Includes ALL fields potentially used, mark optional ones with '?' or allow null
interface Car {
  id: string | number;
  brand: string;
  model: string;
  year: number;
  mileage: number | null;
  price: number | null;
  city: string | null;
  fuel_type: string | null;
  fiscal_power: number | null;
  din_power: number | null;
  displacement: number | null; // Or string? e.g., '1500' vs '1.5L'
  transmission: string | null;
  gears: number | null;
  drive_type: string | null;
  euro_standard: string | null;
  fuel_consumption: number | null; // Or string?
  co2_emissions: number | null;
  exterior_color: string | null;
  interior_color: string | null;
  sold: boolean; // Assuming this field exists

  // Fields for Mechanical Inspection (example - adjust based on actual schema)
  tires_front_left_brand?: string | null;
  tires_front_left_dimensions?: string | null;
  tires_front_left_depth?: number | null; // Assuming number for mm
  tires_front_left_type?: string | null;
  tires_front_right_brand?: string | null;
  tires_front_right_dimensions?: string | null;
  tires_front_right_depth?: number | null;
  tires_front_right_type?: string | null;
  tires_rear_left_brand?: string | null;
  tires_rear_left_dimensions?: string | null;
  tires_rear_left_depth?: number | null;
  tires_rear_left_type?: string | null;
  tires_rear_right_brand?: string | null;
  tires_rear_right_dimensions?: string | null;
  tires_rear_right_depth?: number | null;
  tires_rear_right_type?: string | null;

  brakes_front_discs_condition?: string | null;
  brakes_front_pads_condition?: string | null;
  brakes_front_calipers_condition?: string | null;
  brakes_rear_discs_condition?: string | null;
  brakes_rear_pads_condition?: string | null;
  brakes_rear_calipers_condition?: string | null;
  brakes_parking_condition?: string | null;
  brakes_abs_functional?: boolean | null;
  brakes_esp_functional?: boolean | null;

  distribution_type?: string | null;
  distribution_condition?: string | null;
  distribution_last_service_km?: number | null;
  distribution_next_service_km?: number | null;

  engine_type?: string | null;
  engine_displacement?: string | null; // Could be different from numeric 'displacement' field
  engine_power?: number | null; // Could be different from 'din_power'
  engine_torque?: number | null;
  engine_oil_level?: string | null;
  engine_coolant_level?: string | null;
  engine_belt_condition?: string | null;
  engine_error_codes?: string | null; // 'Aucun' or error codes

  chassis_steering_type?: string | null;
  chassis_steering_condition?: string | null;
  chassis_geometry?: string | null;
  chassis_front_suspension?: string | null;
  chassis_rear_suspension?: string | null;
  chassis_springs_condition?: string | null;
  chassis_transmission_condition?: string | null;

  drive_test_acceleration?: string | null;
  drive_test_braking?: string | null;
  drive_test_handling?: string | null;
  drive_test_comfort?: string | null;
  drive_test_sound_insulation?: string | null;
  drive_test_driving_aids?: string | null;
  drive_test_notes?: string | null;

  // Relations (initially fetched, then processed)
  photos: PhotoRecord[]; // Initially fetched from Supabase relation
  maintenance_history: MaintenanceEventRecord[] | null; // Relation for maintenance events
}

// Interface for the state, where photos are processed into signed URLs
interface ProcessedCarData extends Omit<Car, 'photos'> {
  photos: string[]; // Replaces the PhotoRecord[] with an array of signed URLs
}

// --- Prop Types ---

interface CarDetailContentProps {
  carId: string; // Assuming ID is always a string passed from the URL/parent
}

interface PriceTagProps {
  price: number | null | undefined;
}

interface KeyMetricProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number | undefined | null;
}

interface AdvantageProps {
  text: string;
  delay: number;
}

// --- Helper Functions ---

// Safely format price or return a default string
const formatPrice = (price: number | null | undefined): string => {
  return price != null ? price.toLocaleString('fr-FR') : 'N/A';
};

// Safely format mileage or return a default string
const formatMileage = (mileage: number | null | undefined): string => {
  return mileage != null ? mileage.toLocaleString('fr-FR') : 'N/A';
};

// --- Component ---

export default function CarDetailContent({ carId }: CarDetailContentProps) {
  const [carData, setCarData] = useState<ProcessedCarData | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (carId) {
      fetchCarData(carId);
    } else {
      setError("Identifiant de voiture manquant.");
      setLoading(false);
    }
    // Intentionally not depending on fetchCarData to avoid potential loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);

  async function fetchCarData(id: string) {
    setLoading(true);
    setError(null);
    setCarData(null); // Reset previous data
    console.log('Fetching data for car ID:', id);

    try {
      // Fetch car data including related photos and maintenance history
      const { data, error: fetchError } = await supabase
        .from('car_details') // Assuming 'car_details' is your view or table
        .select(`
          *,
          photos ( url, order ),
          maintenance_history ( date, kilometers, type, location )
        `)
        .eq('id', id)
        .single<Car>(); // Expect a single result

      console.log('API Response:', { data, fetchError });

      if (fetchError) {
        // Handle potential errors like PostgREST error (e.g., multiple rows found with .single())
        if (fetchError.code === 'PGRST116') {
          console.error(`Error fetching car ${id}: No single row found. Check if ID exists or if multiple entries exist.`);
          setError(`Voiture non trouvée (ID: ${id}).`);
        } else {
          throw fetchError; // Rethrow other Supabase errors
        }
        setCarData(null);
        return;
      }

      if (!data) {
        console.error(`No car found for ID: ${id}`);
        setError(`Aucune voiture trouvée pour l\'identifiant: ${id}`);
        setCarData(null);
        return;
      }

      // --- Process Photos: Generate Signed URLs ---
      const photosList = data.photos || [];
      const sortedPhotos = [...photosList].sort((a, b) => a.order - b.order);
      const photoUrls: string[] = [];

      if (sortedPhotos.length > 0) {
        console.log(`Processing ${sortedPhotos.length} photos...`);
        for (const photo of sortedPhotos) {
          try {
             // Extract the path relative to the bucket from the potentially full URL stored.
             let path = photo.url;
             const storageBasePath = '/storage/v1/object/public/';
             const bucketName = 'car-photos'; // Your bucket name

             if (path.includes(storageBasePath)) {
                 const parts = path.split(`${storageBasePath}${bucketName}/`);
                 if (parts.length > 1) {
                     path = parts[1];
                 } else {
                      console.warn(`Could not extract relative path from full URL: ${photo.url}`);
                      continue;
                 }
             } else if (path.startsWith(`${bucketName}/`)) {
                 path = path.substring(bucketName.length + 1);
             }

             console.log(`Generating signed URL for path: ${path}`);

             const { data: signedUrlData, error: signedUrlError } = await supabase
               .storage
               .from(bucketName)
               .createSignedUrl(path, 3600); // 1 hour validity

             if (signedUrlError) {
               console.error(`Error creating signed URL for path ${path}:`, signedUrlError.message);
               continue;
             }

             if (signedUrlData?.signedUrl) {
               photoUrls.push(signedUrlData.signedUrl);
             } else {
                console.warn(`No signed URL generated for path: ${path}`);
             }

          } catch (photoError) {
              console.error(`Unexpected error processing photo ${photo.url}:`, photoError);
          }
        }
      }

      // Use a placeholder if no valid photos were processed
      if (photoUrls.length === 0) {
        console.log('No valid photos found, using placeholder.');
        photoUrls.push('/placeholder-car.jpg'); // Ensure this placeholder exists in your public folder
      }

      console.log('Signed image URLs:', photoUrls);

      // Set the final state with processed data
      setCarData({
        ...data,
        photos: photoUrls, // Use the array of signed URLs
        maintenance_history: data.maintenance_history || [], // Ensure it's an array
      });

    } catch (err) {
      console.error('Error loading car data:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inattendue est survenue.');
      setCarData(null);
    } finally {
      setLoading(false);
    }
  }

  // --- Sub-Components (memoized for performance) ---

  // Fix for 288:34
  const PriceTag = useMemo(() => {
    const InnerPriceTag = ({ price }: PriceTagProps) => (
      <motion.div
        className="flex items-end gap-1 mb-3 md:mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      >
        <span className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">{formatPrice(price)}</span>
        <span className="text-xl md:text-2xl mb-1 text-gray-900">€</span>
        <span className="text-gray-500 mb-1 ml-2 text-base md:text-lg">TTC</span>
      </motion.div>
    );
    InnerPriceTag.displayName = 'PriceTag'; // Add display name
    return React.memo(InnerPriceTag);
  }, []);

  // Fix for 301:35
  const KeyMetric = useMemo(() => {
    const InnerKeyMetric = ({ icon: Icon, label, value }: KeyMetricProps) => (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex flex-col items-center p-3 md:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100" // Added border
      >
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#A3E635] mb-1 md:mb-2" /> {/* Adjusted color slightly */}
        <span className="text-xs md:text-sm text-gray-500 text-center">{label}</span>
        <span className="text-sm md:text-base font-semibold text-gray-900 text-center">{value ?? 'N/A'}</span>
      </motion.div>
    );
    InnerKeyMetric.displayName = 'KeyMetric'; // Add display name
    return React.memo(InnerKeyMetric);
  }, []);

  // Fix for 312:35
  const Advantage = useMemo(() => {
    const InnerAdvantage = ({ text, delay }: AdvantageProps) => (
      <motion.div
        initial={{ opacity: 0, x: -20 }} // Changed animation slightly
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay }}
        className="flex items-center gap-2"
      >
        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" /> {/* Changed icon */}
        <span className="text-sm md:text-base text-gray-700">{text}</span>
      </motion.div>
    );
    InnerAdvantage.displayName = 'Advantage'; // Add display name
    return React.memo(InnerAdvantage);
  }, []);

  // --- Render Logic ---

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A3E635]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <p className="text-red-600 text-lg text-center">Erreur: {error}</p>
      </div>
    );
  }

  if (!carData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <p className="text-gray-600 text-lg text-center">Aucune donnée de voiture à afficher.</p>
      </div>
    );
  }

  const advantagesList = [
    "Garantie 12 mois incluse",
    "Contrôle technique à jour",
    "Historique d\'entretien vérifié",
    "Reprise possible de votre ancien véhicule",
    "Véhicule non-fumeur",
    "Nettoyage professionnel complet"
  ];

  // Prepare data for sub-components, handling potential nulls
   const maintenanceEventsForChild = carData.maintenance_history?.map(event => ({
      ...event, // Spread existing fields
      // Format date here if needed, or let the child component do it
      date: event.date ? new Date(event.date).toLocaleDateString('fr-FR') : 'Date inconnue',
    })) ?? [];

   const tireDataForChild = {
       avantGauche: {
         brand: carData.tires_front_left_brand ?? "N/A",
         dimensions: carData.tires_front_left_dimensions ?? "N/A",
         depth: carData.tires_front_left_depth != null ? `${carData.tires_front_left_depth}mm` : "N/A",
         type: carData.tires_front_left_type ?? "N/A"
       },
       avantDroit: {
         brand: carData.tires_front_right_brand ?? "N/A",
         dimensions: carData.tires_front_right_dimensions ?? "N/A",
         depth: carData.tires_front_right_depth != null ? `${carData.tires_front_right_depth}mm` : "N/A",
         type: carData.tires_front_right_type ?? "N/A"
       },
       arriereGauche: {
         brand: carData.tires_rear_left_brand ?? "N/A",
         dimensions: carData.tires_rear_left_dimensions ?? "N/A",
         depth: carData.tires_rear_left_depth != null ? `${carData.tires_rear_left_depth}mm` : "N/A",
         type: carData.tires_rear_left_type ?? "N/A"
       },
       arriereDroit: {
         brand: carData.tires_rear_right_brand ?? "N/A",
         dimensions: carData.tires_rear_right_dimensions ?? "N/A",
         depth: carData.tires_rear_right_depth != null ? `${carData.tires_rear_right_depth}mm` : "N/A",
         type: carData.tires_rear_right_type ?? "N/A"
       }
   };

   // Define placeholders for potentially missing data - adjust defaults as needed
   const naString = "N/A";
   const defaultCondition = "Non spécifié";

   const brakingDataForChild = {
     front: {
       discs: carData.brakes_front_discs_condition ?? defaultCondition,
       pads: carData.brakes_front_pads_condition ?? defaultCondition,
       calipers: carData.brakes_front_calipers_condition ?? defaultCondition
     },
     rear: {
       discs: carData.brakes_rear_discs_condition ?? defaultCondition,
       pads: carData.brakes_rear_pads_condition ?? defaultCondition,
       calipers: carData.brakes_rear_calipers_condition ?? defaultCondition
     },
     parkingBrake: carData.brakes_parking_condition ?? defaultCondition,
     abs: carData.brakes_abs_functional == null ? defaultCondition : (carData.brakes_abs_functional ? "Fonctionnel" : "Non fonctionnel"),
     esp: carData.brakes_esp_functional == null ? defaultCondition : (carData.brakes_esp_functional ? "Fonctionnel" : "Non fonctionnel")
   };

   const distributionDataForChild = {
     type: carData.distribution_type ?? defaultCondition,
     condition: carData.distribution_condition ?? defaultCondition,
     currentKm: formatMileage(carData.mileage), // Use formatted string here
     lastService: formatMileage(carData.distribution_last_service_km) ?? naString, // Format or use N/A
     nextService: formatMileage(carData.distribution_next_service_km) ?? naString // Format or use N/A
   };

   const engineDataForChild = {
     type: carData.engine_type ?? defaultCondition,
     displacement: carData.engine_displacement ?? naString, // String expected?
     power: carData.engine_power != null ? `${carData.engine_power} ch` : naString,
     torque: carData.engine_torque != null ? `${carData.engine_torque} Nm` : naString,
     oilLevel: carData.engine_oil_level ?? defaultCondition,
     coolantLevel: carData.engine_coolant_level ?? defaultCondition,
     beltCondition: carData.engine_belt_condition ?? defaultCondition,
     errorCodes: carData.engine_error_codes ?? "Aucun"
   };

   const chassisDataForChild = {
     steeringType: carData.chassis_steering_type ?? defaultCondition,
     steeringCondition: carData.chassis_steering_condition ?? defaultCondition,
     geometry: carData.chassis_geometry ?? defaultCondition,
     frontSuspension: carData.chassis_front_suspension ?? defaultCondition,
     rearSuspension: carData.chassis_rear_suspension ?? defaultCondition,
     springs: carData.chassis_springs_condition ?? defaultCondition,
     transmission: carData.chassis_transmission_condition ?? defaultCondition
   };

   const driveTestDataForChild = {
     acceleration: carData.drive_test_acceleration ?? defaultCondition,
     braking: carData.drive_test_braking ?? defaultCondition,
     handling: carData.drive_test_handling ?? defaultCondition,
     comfort: carData.drive_test_comfort ?? defaultCondition,
     soundInsulation: carData.drive_test_sound_insulation ?? defaultCondition,
     drivingAids: carData.drive_test_driving_aids ?? defaultCondition,
     notes: carData.drive_test_notes ?? "Aucune note additionnelle."
   };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white"> {/* Subtle gradient */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Car Title and Location */}
         <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="mb-4 md:mb-6"
         >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {carData.brand ?? ''} {carData.model ?? 'Modèle Inconnu'}
                <span className="block text-lg md:text-xl text-gray-600 font-normal mt-1">{carData.year ?? ''}</span>
            </h1>
            <div className="flex items-center gap-2 text-gray-600 mt-2">
                <MapPin className="w-4 h-4 text-[#A3E635]" />
                <span className="text-sm md:text-base">{carData.city ?? 'Localisation inconnue'}, France</span>
            </div>
         </motion.div>

        {/* Photo Viewer Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 md:mb-12"
        >
          <PhotoViewer
            photos={carData.photos}
            carName={`${carData.brand ?? ''} ${carData.model ?? ''}`}
            carPrice={formatPrice(carData.price)}
            carYear={carData.year ?? 'N/A'}
            carMileage={carData.mileage ?? 0}
          />
        </motion.section>

        {/* Main Details Grid */}
        <section className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-12">
          {/* Left Column: Main Info & Description */}
          <motion.div
            className="md:col-span-2 bg-white rounded-xl p-5 md:p-8 shadow-md border border-gray-100" // Enhanced styling
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {/* Share/Favorite Buttons */}
            <div className="flex justify-end items-center mb-4 -mt-2 -mr-2">
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all"
                title="Partager"
                // Add share functionality here
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all ${
                  isFavorite ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => setIsFavorite(!isFavorite)}
                title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
              </motion.button>
            </div>

            {/* Vehicle Specs Table */}
            <h2 className="text-xl md:text-2xl font-semibold mb-5 text-gray-800">Fiche technique</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm md:text-base text-gray-700">
              {/* Use helper functions and nullish coalescing */}
              <div className="flex justify-between border-b border-gray-100 py-1"><span className="font-medium text-gray-500">Marque</span> {carData.brand ?? 'N/A'}</div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span className="font-medium text-gray-500">Modèle</span> {carData.model ?? 'N/A'}</div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span className="font-medium text-gray-500">Année</span> {carData.year ?? 'N/A'}</div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span className="font-medium text-gray-500">Kilométrage</span> {formatMileage(carData.mileage)} km</div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span className="font-medium text-gray-500">Carburant</span> {carData.fuel_type ?? 'N/A'}</div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span className="font-medium text-gray-500">Boîte</span> {carData.transmission ?? 'N/A'}</div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span className="font-medium text-gray-500">Puiss. fiscale</span> {carData.fiscal_power ?? 'N/A'} CV</div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span className="font-medium text-gray-500">Puiss. DIN</span> {carData.din_power ?? 'N/A'} ch</div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span className="font-medium text-gray-500">Couleur ext.</span> {carData.exterior_color ?? 'N/A'}</div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span className="font-medium text-gray-500">Couleur int.</span> {carData.interior_color ?? 'N/A'}</div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span className="font-medium text-gray-500">Émissions CO²</span> {carData.co2_emissions ?? 'N/A'} g/km</div>
              <div className="flex justify-between border-b border-gray-100 py-1"><span className="font-medium text-gray-500">Norme Euro</span> {carData.euro_standard ?? 'N/A'}</div>
              {/* Add more fields as needed */}
            </div>

          </motion.div>

          {/* Right Column: Price, Actions, Key Metrics */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Price & Booking */}
            <motion.div
              className="bg-white rounded-xl p-5 md:p-6 shadow-md border border-gray-100"
              whileHover={{ scale: 1.01, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} // Enhanced hover
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <PriceTag price={carData.price} />
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDeliveryModalOpen(true)}
                className={`w-full mt-3 md:mt-4 bg-[#A3E635] px-4 md:px-6 py-3 md:py-4 rounded-lg font-semibold text-gray-900 transition-all shadow-sm hover:shadow-md text-base md:text-lg ${carData.sold ? 'opacity-50 cursor-not-allowed hover:bg-opacity-100' : 'hover:bg-opacity-90'}`}
                disabled={carData.sold} // Disable if sold
              >
                {carData.sold ? 'Véhicule Vendu' : 'Demander un essai / Réserver'}
              </motion.button>
               {carData.sold && <p className="text-center text-red-600 font-medium mt-3 text-sm">Ce véhicule n&apos;est plus disponible.</p>}
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100"
            >
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Points clés</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <KeyMetric icon={Gauge} label="Kilométrage" value={`${formatMileage(carData.mileage)} km`} />
                <KeyMetric icon={Calendar} label="Année" value={carData.year ?? 'N/A'} />
                <KeyMetric icon={Shield} label="Garantie" value="12 mois" />
                <KeyMetric icon={Droplet} label="Carburant" value={carData.fuel_type ?? 'N/A'} />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Advantages Section */}
        <motion.section
          className="mb-6 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="bg-white rounded-xl p-5 md:p-8 shadow-md border border-gray-100">
            <h3 className="text-xl md:text-2xl font-semibold mb-5 text-gray-800">Nos engagements Vroom</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              {advantagesList.map((text, index) => (
                <Advantage key={text} text={text} delay={0.3 + index * 0.05} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Mechanical Inspection Section */}
         <MechanicalInspection
             tireData={tireDataForChild}
             brakingData={brakingDataForChild}
             distributionData={distributionDataForChild}
             engineData={engineDataForChild}
             chassisData={chassisDataForChild}
             driveTestData={driveTestDataForChild}
         />

        {/* Maintenance History Section */}
         <MaintenanceHistory
           currentKilometers={carData.mileage ?? 0} // Provide a default number
           maintenanceEvents={maintenanceEventsForChild}
         />

        {/* Similar Cars Section */}
        <SimilarCarsSection /> {/* Assuming this component fetches its own data or accepts relevant props */}

      </main>

      {/* Delivery Modal */}
      <DeliveryModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        carId={carId}
        carTitle={`${carData?.brand || ''} ${carData?.model || ''}`}
      />
    </div>
  );
}

// Add displayName to the main component as well (good practice)
CarDetailContent.displayName = 'CarDetailContent';