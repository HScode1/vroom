'use client';

import React, { useState, ChangeEvent, FormEvent, ReactNode, ElementType, useRef } from 'react';
import { motion } from 'framer-motion';
import { Car, Wrench as Tool, FileText, Clock, X} from 'lucide-react';
// Assume these services exist and have the correct signatures
import { createCar } from '@/services/carService';
import { uploadCarImage } from '@/services/storageService';
import { useRouter } from 'next/navigation';
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from 'next/image';

// --- Interfaces ---

interface Photo {
  file: File;
  url: string;
}

interface PhotosSectionProps {
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
  carId: string;
}

// Type for individual maintenance event data (matching form state)
interface MaintenanceEventFormData {
  date: string;
  kilometers: string; // Keep as string for form input
  type: string;
  location: string;
}

// Type for Maintenance History items in CarData (matching database expectation)
interface MaintenanceHistoryItem {
  date: string; // ISO date string expected by DB? Verify.
  kilometers: number; // Expect number in DB
  type: string;
  location?: string;
}

// Type for the main CarData structure sent to the API
interface CarData {
  // Fields for 'cars' table
  seller_id?: string; // UUID - Should be set server-side or based on logged-in user
  title: string;
  brand: string;
  model: string;
  year: number; // Use number
  mileage: number; // Use number
  body_type?: string;
  doors?: number; // Use number
  seats?: number; // Use number
  exterior_color?: string;
  interior_color?: string;
  status?: 'new' | 'used' | 'demo'; // Use specific enum
  seller_type?: 'pro' | 'individual'; // Use specific enum
  city?: string;
  postal_code?: string;
  price: number; // Use number
  description?: string;
  photos?: Array<{ url: string }>;
  trim?: string; // Added from form
  price_note?: string; // Added from form
  availability?: string; // Added from form
  warranty?: string; // Added from form
  financing?: boolean; // Added from form
  trade_in?: boolean; // Added from form
  first_hand?: boolean; // Added from form

  // Fields for 'technical_details' table (Optional)
  technicalDetails?: {
    fuel_type?: string;
    fiscal_power?: number; // Use number
    din_power?: number; // Use number
    displacement?: number; // Use number
    transmission?: string;
    gears?: number; // Use number
    drive_type?: string;
    euro_standard?: string;
    fuel_consumption?: number; // Use number
    co2_emissions?: number; // Use number
  };

  // Fields for 'mechanical_inspection' table (Optional)
  mechanicalInspection?: {
    tires?: {
      frontLeftBrand?: string;
      frontLeftDimensions?: string;
      frontLeftType?: string;
      frontLeftDepth?: number; // Use number
      frontRightBrand?: string;
      frontRightDimensions?: string;
      frontRightType?: string;
      frontRightDepth?: number; // Use number
      rearLeftBrand?: string;
      rearLeftDimensions?: string;
      rearLeftType?: string;
      rearLeftDepth?: number; // Use number
      rearRightBrand?: string;
      rearRightDimensions?: string;
      rearRightType?: string;
      rearRightDepth?: number; // Use number
    };
    brakes?: {
      frontDiscsCondition?: string;
      frontPadsCondition?: string;
      frontCalipersCondition?: string;
      rearDiscsCondition?: string;
      rearPadsCondition?: string;
      rearCalipersCondition?: string;
      parkingCondition?: string;
      absFunctional?: string; // Or boolean?
      espFunctional?: string; // Or boolean?
    };
    distribution?: {
      type?: string;
      condition?: string;
      lastServiceKm?: number; // Use number
      nextServiceKm?: number | string; // Allow string for input like '120000 / 5 ans'
    };
    engine?: {
      type?: string;
      displacement?: number; // Use number
      power?: number; // Use number
      torque?: number; // Use number
      oilLevel?: string;
      coolantLevel?: string;
      beltCondition?: string;
      errorCodes?: string;
    };
    chassis?: {
      steeringType?: string;
      steeringCondition?: string;
      geometry?: string;
      frontSuspension?: string;
      rearSuspension?: string;
      springsCondition?: string;
      transmissionCondition?: string;
    };
    driveTest?: {
      acceleration?: string;
      braking?: string;
      handling?: string;
      comfort?: string;
      soundInsulation?: string;
      drivingAids?: string;
      notes?: string;
    };
  };

  // Fields for 'maintenance_history' table (Optional Array)
  maintenanceHistory?: MaintenanceHistoryItem[];
}

// --- Helper Functions ---

// Function to generate a valid UUID v4
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Helper to safely parse integer
const safeParseInt = (value: string | number | undefined | null): number | undefined => {
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = parseInt(String(value), 10);
  return isNaN(parsed) ? undefined : parsed;
};

// Helper to safely parse float
const safeParseFloat = (value: string | number | undefined | null): number | undefined => {
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? undefined : parsed;
};


// --- Constants ---

const carBrands: string[] = [
  "Audi", "BMW", "Citroën", "Dacia", "Fiat", "Ford", "Honda", "Hyundai", "Kia",
  "Mercedes", "Nissan", "Opel", "Peugeot", "Renault", "Seat", "Skoda", "Toyota",
  "Volkswagen", "Volvo"
];

const bodyTypes: string[] = [
  "Berline", "SUV", "Break", "Coupé", "Monospace", "Cabriolet", "Utilitaire"
];

// --- Component Types ---

interface SectionProps {
  title: string;
  children: ReactNode;
  icon?: ElementType; // Allow any component type, e.g., LucideIcon
  isLast?: boolean;
}

interface MaintenanceEventProps {
  event: MaintenanceEventFormData; // Use form data type here
  index: number;
  onRemove: (index: number) => void;
}

type FormInputOptions = Array<string | number | { value: string | number; label: string }>;

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string | number | undefined | null; // REQUIRED PROP
  // THIS IS THE CORRECT TYPE SIGNATURE NEEDED
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  options?: FormInputOptions;
  required?: boolean;
  className?: string;
  step?: string; // For number inputs
  rows?: number; // For textarea
  checked?: boolean; // For checkbox
  id?: string; // For label association
}

// --- Components ---

// Composant de section avec animation
const Section: React.FC<SectionProps> = ({ title, children, icon: IconComponent, isLast = false }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${!isLast ? 'mb-8' : ''}`}
  >
    <div className="flex items-center gap-3 mb-6">
      {IconComponent && (
        <div className="p-2 bg-[#C8EC66]/20 rounded-lg">
          <IconComponent className="w-6 h-6 text-[#C8EC66]" />
        </div>
      )}
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    {children}
  </motion.section>
);

// Composant d'événement d'entretien
const MaintenanceEvent: React.FC<MaintenanceEventProps> = ({ event, index, onRemove }) => (
  <div className="p-4 bg-gray-50 rounded-lg flex items-start justify-between gap-4 relative group">
    <div className="flex-1">
      <div className="flex flex-wrap gap-4 mb-2">
        <span className="inline-flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded">
          <Clock className="w-3 h-3" />
          {event.date || 'N/A'} {/* Handle potentially empty date */}
        </span>
        <span className="inline-flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded">
          {event.kilometers || 'N/A'} km {/* Handle potentially empty km */}
        </span>
      </div>
      <div className="font-medium">{event.type || 'N/A'}</div> {/* Handle potentially empty type */}
      <div className="text-gray-600 text-sm">{event.location || 'N/A'}</div> {/* Handle potentially empty location */}
    </div>
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      aria-label={`Supprimer l'événement ${index + 1}`}
    >
      <X className="w-5 h-5" />
    </button>
  </div>
);

// Champ d'entrée réutilisable
const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  value, // Now always present due to interface requirement
  onChange,
  options = [],
  required = false,
  className = "",
  step,
  rows,
  checked,
  id,
}) => {
  const inputId = id || name; // Use provided id or fallback to name

  if (type === "select") {
    return (
      <div className={`flex flex-col ${className}`}>
        <label htmlFor={inputId} className="mb-1 text-sm text-gray-600">{label} {required && <span className="text-red-500">*</span>}</label>
        <select
          id={inputId}
          name={name}
          value={value ?? ''} // Use nullish coalescing
          onChange={onChange} // Passed directly
          required={required}
          className="p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8EC66]"
        >
          <option value="">{placeholder || `Sélectionner ${label.toLowerCase()}`}</option>
          {options.map((option, index) => {
            const optionValue = typeof option === 'object' ? option.value : option;
            const optionLabel = typeof option === 'object' ? option.label : option;
            return (
              <option key={index} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className={`flex flex-col ${className}`}>
        <label htmlFor={inputId} className="mb-1 text-sm text-gray-600">{label} {required && <span className="text-red-500">*</span>}</label>
        <textarea
          id={inputId}
          name={name}
          value={value ?? ''} // Use nullish coalescing
          onChange={onChange} // Passed directly
          placeholder={placeholder}
          required={required}
          rows={rows || 5}
          className="p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8EC66]"
        />
      </div>
    );
  }

  if (type === "checkbox") {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
          <input
            type="checkbox"
            id={inputId}
            name={name}
            // `value` prop is required by the interface, but `checked` controls the state visually and functionally
            value={value ?? ''} // Pass value, though often unused for basic checkbox state
            checked={checked ?? false} // Use nullish coalescing for boolean
            onChange={onChange} // Passed directly
            required={required}
            className="w-4 h-4 accent-[#C8EC66] focus:ring-2 focus:ring-[#C8EC66]"
          />
          <label htmlFor={inputId} className="text-sm text-gray-700">{label}</label>
        </div>
      );
  }

  // Default to input type
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={inputId} className="mb-1 text-sm text-gray-600">{label} {required && <span className="text-red-500">*</span>}</label>
      <input
        id={inputId}
        type={type}
        name={name}
        value={value ?? ''} // Use nullish coalescing
        onChange={onChange} // Passed directly
        placeholder={placeholder}
        required={required}
        step={step} // Add step for number inputs
        className="p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8EC66]"
      />
    </div>
  );
};

// --- Section Component Interfaces ---

interface GeneralInfoData {
    title?: string;
    brand?: string;
    model?: string;
    year?: string | number; // Allow string from input
    mileage?: string | number; // Allow string from input
    trim?: string;
    bodyType?: string;
    doors?: string | number; // Allow string from input
    seats?: string | number; // Allow string from input
    exteriorColor?: string;
    interiorColor?: string;
    status?: string;
    sellerType?: string;
    city?: string;
    postalCode?: string;
}
interface GeneralInfoSectionProps {
  data: GeneralInfoData;
  onChange: (data: GeneralInfoData) => void;
}

interface TechnicalDetailsData {
    fuelType?: string;
    fiscalPower?: string | number; // Allow string from input
    dinPower?: string | number; // Allow string from input
    displacement?: string | number; // Allow string from input
    transmission?: string;
    gears?: string | number; // Allow string from input
    driveType?: string;
    euroStandard?: string;
    fuelConsumption?: string | number; // Allow string from input
    co2Emissions?: string | number; // Allow string from input
}
interface TechnicalDetailsSectionProps {
  data: TechnicalDetailsData;
  onChange: (data: TechnicalDetailsData) => void;
}

interface PriceData {
    price?: string | number; // Allow string from input
    priceNote?: string;
    availability?: string;
    warranty?: string;
    financing?: boolean;
    tradeIn?: boolean;
    firstHand?: boolean;
}
interface PriceSectionProps {
  data: PriceData;
  onChange: (data: PriceData) => void;
}

interface DescriptionSectionProps {
  data: string;
  onChange: (data: string) => void;
}

interface MechanicalInspectionData {
    tires?: {
      frontLeftBrand?: string;
      frontLeftDimensions?: string;
      frontLeftType?: string;
      frontLeftDepth?: string | number; // Allow string
      frontRightBrand?: string;
      frontRightDimensions?: string;
      frontRightType?: string;
      frontRightDepth?: string | number; // Allow string
      rearLeftBrand?: string;
      rearLeftDimensions?: string;
      rearLeftType?: string;
      rearLeftDepth?: string | number; // Allow string
      rearRightBrand?: string;
      rearRightDimensions?: string;
      rearRightType?: string;
      rearRightDepth?: string | number; // Allow string
    };
    brakes?: {
      frontDiscsCondition?: string;
      frontPadsCondition?: string;
      frontCalipersCondition?: string;
      rearDiscsCondition?: string;
      rearPadsCondition?: string;
      rearCalipersCondition?: string;
      parkingCondition?: string;
      absFunctional?: string;
      espFunctional?: string;
    };
    distribution?: {
      type?: string;
      condition?: string;
      lastServiceKm?: string | number; // Allow string
      nextServiceKm?: string | number; // Allow string
    };
    engine?: {
      type?: string;
      displacement?: string | number; // Allow string
      power?: string | number; // Allow string
      torque?: string | number; // Allow string
      oilLevel?: string;
      coolantLevel?: string;
      beltCondition?: string;
      errorCodes?: string;
    };
    chassis?: {
      steeringType?: string;
      steeringCondition?: string;
      geometry?: string;
      frontSuspension?: string;
      rearSuspension?: string;
      springsCondition?: string;
      transmissionCondition?: string;
    };
    driveTest?: {
      acceleration?: string;
      braking?: string;
      handling?: string;
      comfort?: string;
      soundInsulation?: string;
      drivingAids?: string;
      notes?: string;
    };
}
interface MechanicalInspectionSectionProps {
    data: MechanicalInspectionData;
    onChange: (data: MechanicalInspectionData) => void;
}

interface MaintenanceHistorySectionProps {
    history: MaintenanceEventFormData[];
    onChange: (history: MaintenanceEventFormData[]) => void;
}


// --- Section Components ---

// Section Informations générales
const GeneralInfoSection: React.FC<GeneralInfoSectionProps> = ({ data, onChange }) => {
  // This handler correctly matches the FormInputProps onChange signature
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const calculateYears = (): number[] => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let i = currentYear; i >= currentYear - 50; i--) { // Increased range to 50 years
      years.push(i);
    }
    return years;
  };

  return (
    <Section title="Informations générales" icon={Car}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Titre de l'annonce"
          name="title"
          placeholder="Ex: Peugeot 208 Active 2021 - Faible kilométrage"
          value={data.title ?? ''}
          onChange={handleInputChange}
          required
          className="md:col-span-2"
        />
        <FormInput
          label="Marque"
          type="select"
          name="brand"
          value={data.brand ?? ''}
          onChange={handleInputChange}
          options={carBrands}
          required
        />
        <FormInput
          label="Modèle"
          name="model"
          placeholder="Ex: 208, Golf, Clio..."
          value={data.model ?? ''}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Année de mise en circulation"
          type="select"
          name="year"
          value={data.year ?? ''}
          onChange={handleInputChange}
          options={calculateYears()}
          required
        />
        <FormInput
          label="Kilométrage"
          type="number"
          name="mileage"
          placeholder="Ex: 35000"
          value={data.mileage ?? ''}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Finition / Version"
          name="trim"
          placeholder="Ex: Allure, S-Line, Titanium"
          value={data.trim ?? ''}
          onChange={handleInputChange}
        />
        <FormInput
          label="Type de carrosserie"
          type="select"
          name="bodyType"
          value={data.bodyType ?? ''}
          onChange={handleInputChange}
          options={bodyTypes}
          required
        />
        <FormInput
          label="Nombre de portes"
          type="select"
          name="doors"
          value={data.doors ?? ''}
          onChange={handleInputChange}
          options={[2, 3, 4, 5, 6]}
          required
        />
        <FormInput
          label="Nombre de places"
          type="select"
          name="seats"
          value={data.seats ?? ''}
          onChange={handleInputChange}
          options={[2, 3, 4, 5, 6, 7, 8, 9]}
          required
        />
        <FormInput
          label="Couleur extérieure"
          name="exteriorColor"
          placeholder="Ex: Bleu Métallisé"
          value={data.exteriorColor ?? ''}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Couleur intérieure"
          name="interiorColor"
          placeholder="Ex: Noir"
          value={data.interiorColor ?? ''}
          onChange={handleInputChange}
        />
        <FormInput
          label="Statut du véhicule"
          type="select"
          name="status"
          value={data.status ?? ''}
          onChange={handleInputChange}
          options={["Neuf", "Occasion", "Véhicule de démonstration"]}
          required
        />
        <FormInput
          label="Type de vendeur"
          type="select"
          name="sellerType"
          value={data.sellerType ?? ''}
          onChange={handleInputChange}
          options={[{value: "Particulier", label: "Particulier"}, {value: "Professionnel", label: "Professionnel"}]}
          required
        />
        <FormInput
          label="Ville"
          name="city"
          placeholder="Ex: Lyon"
          value={data.city ?? ''}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Code postal"
          name="postalCode"
          placeholder="Ex: 69000"
          value={data.postalCode ?? ''}
          onChange={handleInputChange}
          required
        />
      </div>
    </Section>
  );
};

// Section Détails techniques
const TechnicalDetailsSection: React.FC<TechnicalDetailsSectionProps> = ({ data, onChange }) => {
  // This handler correctly matches the FormInputProps onChange signature
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <Section title="Détails techniques" icon={Tool}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Type de carburant"
          type="select"
          name="fuelType"
          value={data.fuelType ?? ''}
          onChange={handleInputChange}
          options={["Essence", "Diesel", "Hybride", "Électrique", "GPL"]}
          required
        />
        <FormInput
          label="Puissance fiscale (CV)"
          type="number"
          name="fiscalPower"
          placeholder="Ex: 5"
          value={data.fiscalPower ?? ''}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Puissance DIN (ch)"
          type="number"
          name="dinPower"
          placeholder="Ex: 110"
          value={data.dinPower ?? ''}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Cylindrée (cm³)"
          type="number"
          name="displacement"
          placeholder="Ex: 1598"
          value={data.displacement ?? ''}
          onChange={handleInputChange}
        />
        <FormInput
          label="Type de transmission"
          type="select"
          name="transmission"
          value={data.transmission ?? ''}
          onChange={handleInputChange}
          options={["Manuelle", "Automatique"]}
          required
        />
        <FormInput
          label="Nombre de rapports"
          type="select"
          name="gears"
          value={data.gears ?? ''}
          onChange={handleInputChange}
          options={[4, 5, 6, 7, 8, 9, 10]}
        />
        <FormInput
          label="Type de traction"
          type="select"
          name="driveType"
          value={data.driveType ?? ''}
          onChange={handleInputChange}
          options={["Avant", "Arrière", "Intégrale"]}
        />
        <FormInput
          label="Norme Euro"
          type="select"
          name="euroStandard"
          value={data.euroStandard ?? ''}
          onChange={handleInputChange}
          options={["Euro 4", "Euro 5", "Euro 5a", "Euro 5b", "Euro 6", "Euro 6b", "Euro 6c", "Euro 6d", "Euro 6d-TEMP"]}
        />
        <FormInput
          label="Consommation mixte (L/100km)"
          type="number"
          name="fuelConsumption"
          placeholder="Ex: 5.2"
          value={data.fuelConsumption ?? ''}
          onChange={handleInputChange}
          step="0.1"
        />
        <FormInput
          label="Émissions de CO2 (g/km)"
          type="number"
          name="co2Emissions"
          placeholder="Ex: 120"
          value={data.co2Emissions ?? ''}
          onChange={handleInputChange}
        />
      </div>
    </Section>
  );
};

// Section Prix et conditions
const PriceSection: React.FC<PriceSectionProps> = ({ data, onChange }) => {
  // This handler correctly matches the FormInputProps onChange signature
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // Use 'checked' property for checkboxes, otherwise use 'value'
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    onChange({ ...data, [name]: newValue });
  };

  return (
    <Section title="Prix et conditions de vente" icon={FileText}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Prix de vente TTC (€)"
          type="number"
          name="price"
          placeholder="Ex: 15000"
          value={data.price ?? ''}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Mention de prix"
          type="select"
          name="priceNote"
          value={data.priceNote ?? ''}
          onChange={handleInputChange}
          options={["Prix négociable", "Prix hors frais d'immatriculation"]}
        />
        <FormInput
          label="Disponibilité du véhicule"
          type="select"
          name="availability"
          value={data.availability ?? ''}
          onChange={handleInputChange}
          options={["Immédiate", "Sur commande"]}
        />
        <FormInput
          label="Garantie"
          type="select"
          name="warranty"
          value={data.warranty ?? ''}
          onChange={handleInputChange}
          options={["Aucune", "3 mois", "6 mois", "12 mois", "24 mois"]}
        />
        <FormInput
            type="checkbox"
            label="Possibilité de financement"
            id="financing"
            name="financing"
            value="" // Provide a value to satisfy the required prop
            checked={data.financing ?? false}
            onChange={handleInputChange}
            className="md:col-span-1" // Adjust layout as needed
        />
        <FormInput
            type="checkbox"
            label="Possibilité de reprise"
            id="tradeIn"
            name="tradeIn"
            value="" // Provide a value to satisfy the required prop
            checked={data.tradeIn ?? false}
            onChange={handleInputChange}
            className="md:col-span-1" // Adjust layout as needed
        />
        <FormInput
            type="checkbox"
            label="Première main"
            id="firstHand"
            name="firstHand"
            value="" // Provide a value to satisfy the required prop
            checked={data.firstHand ?? false}
            onChange={handleInputChange}
            className="md:col-span-1" // Adjust layout as needed
        />
      </div>
    </Section>
  );
};

// Section Description
const DescriptionSection: React.FC<DescriptionSectionProps> = ({ data, onChange }) => (
  <Section title="Description" icon={FileText}>
    <FormInput
      label="Description détaillée"
      type="textarea"
      name="description"
      placeholder="Décrivez la voiture (état, options, remarques particulières, etc.)"
      value={data ?? ''}
      // This inline handler correctly uses the broad event type
      onChange={(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => onChange(e.target.value)}
      required
      rows={6}
    />
  </Section>
);

// Section Photos
const PhotosSection: React.FC<PhotosSectionProps> = ({ photos, onChange, carId }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    const newPhotos: Photo[] = [];
    let uploadError = false;

    for (const file of files) {
      try {
        // Add a check for file size if needed
        // if (file.size > MAX_FILE_SIZE) { alert(...); continue; }
        const url = await uploadCarImage(file, carId);
        newPhotos.push({ file, url });
      } catch (error) {
        console.error("Erreur lors de l'upload d'une image:", error);
        uploadError = true;
      }
    }

    // Only update state if new photos were successfully processed
    if (newPhotos.length > 0) {
        onChange([...photos, ...newPhotos]);
    }

    if (uploadError) {
        alert("Une ou plusieurs images n'ont pas pu être téléchargées. Veuillez réessayer.");
    }

    // Reset file input to allow selecting the same file again if needed
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }

    setUploading(false);
  };

  const removePhoto = (index: number) => {
    // Optional: Add logic here to delete the photo from storage if needed
    const updatedPhotos = photos.filter((_, i) => i !== index);
    onChange(updatedPhotos);
  };

  return (
    <Section title="Photos" icon={Car}> {/* Using Section wrapper now */}
      <div className="mb-4">
        <label htmlFor="photo-upload" className={`inline-block px-4 py-2 bg-[#C8EC66] text-black rounded cursor-pointer hover:bg-opacity-90 transition-all ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {uploading ? 'Chargement...' : 'Ajouter des photos'}
        </label>
        <input
          ref={fileInputRef}
          id="photo-upload"
          type="file"
          multiple
          accept="image/jpeg, image/png, image/webp" // Be specific about accepted types
          onChange={handleFileChange}
          className="hidden" // Hide the default input
          disabled={uploading}
        />
        <p className="text-xs text-gray-500 mt-2">Ajoutez jusqu&apos;à 10 photos (JPG, PNG, WEBP). Taille max 5Mo par photo.</p>
      </div>

      {uploading && <p className="text-sm text-blue-600">Téléchargement en cours...</p>}

      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group aspect-video"> {/* Maintain aspect ratio */}
              <Image
                src={photo.url}
                alt={`Photo ${index + 1}`}
                fill // Use fill layout
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw" // Responsive sizes
                className="object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                aria-label={`Supprimer photo ${index + 1}`}
                disabled={uploading}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};


// Section Inspection mécanique
const MechanicalInspectionSection: React.FC<MechanicalInspectionSectionProps> = ({ data, onChange }) => {
    // Type-safe handler for nested state updates
    const handleInputChange = <S extends keyof MechanicalInspectionData, F extends keyof NonNullable<MechanicalInspectionData[S]>>(
        section: S,
        field: F,
        // The value comes directly from e.target.value which is string, or parsed later
        value: string | number | boolean | undefined | null // Added boolean for checkboxes/selects that might use it
      ) => {
        onChange({
          ...data,
          [section]: {
            ...(data[section] || {}), // Ensure section object exists
            [field]: value,
          },
        });
      };

    // Wrapper to ensure event type compatibility for FormInput's onChange
    const handleFormInputChange = <S extends keyof MechanicalInspectionData, F extends keyof NonNullable<MechanicalInspectionData[S]>>(
        section: S,
        field: F
    ) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
        handleInputChange(section, field, value);
    };


  return (
    <Section title="Inspection mécanique (Optionnel)" icon={Tool}>
      <div className="space-y-8">
        {/* --- Pneus --- */}
        <div>
          <h3 className="font-semibold mb-4 text-lg border-b pb-2">Pneus</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {/* Row Labels */}
             <div className="font-medium text-sm text-gray-500 hidden md:block"></div>
             <div className="font-medium text-sm text-gray-500 hidden md:block">Marque</div>
             <div className="font-medium text-sm text-gray-500 hidden md:block">Profondeur (mm)</div>
             <div className="font-medium text-sm text-gray-500 hidden md:block"></div> {/* Placeholder for spacing */}

             {/* Avant Gauche */}
             <div className="font-medium self-center">Avant Gauche</div>
             <FormInput label="Marque" name="frontLeftBrand" value={data.tires?.frontLeftBrand ?? ''} onChange={handleFormInputChange('tires', 'frontLeftBrand')} className="md:!mt-0"/>
             <FormInput label="Profondeur (mm)" type="number" name="frontLeftDepth" value={data.tires?.frontLeftDepth ?? ''} onChange={handleFormInputChange('tires', 'frontLeftDepth')} step="0.1" className="md:!mt-0"/>
             <div className="hidden md:block"></div> {/* Placeholder */}


             {/* Avant Droit */}
             <div className="font-medium self-center">Avant Droit</div>
             <FormInput label="Marque" name="frontRightBrand" value={data.tires?.frontRightBrand ?? ''} onChange={handleFormInputChange('tires', 'frontRightBrand')} />
             <FormInput label="Profondeur (mm)" type="number" name="frontRightDepth" value={data.tires?.frontRightDepth ?? ''} onChange={handleFormInputChange('tires', 'frontRightDepth')} step="0.1" />
             <div className="hidden md:block"></div> {/* Placeholder */}


             {/* Arrière Gauche */}
             <div className="font-medium self-center">Arrière Gauche</div>
             <FormInput label="Marque" name="rearLeftBrand" value={data.tires?.rearLeftBrand ?? ''} onChange={handleFormInputChange('tires', 'rearLeftBrand')} />
             <FormInput label="Profondeur (mm)" type="number" name="rearLeftDepth" value={data.tires?.rearLeftDepth ?? ''} onChange={handleFormInputChange('tires', 'rearLeftDepth')} step="0.1" />
             <div className="hidden md:block"></div> {/* Placeholder */}


             {/* Arrière Droit */}
             <div className="font-medium self-center">Arrière Droit</div>
             <FormInput label="Marque" name="rearRightBrand" value={data.tires?.rearRightBrand ?? ''} onChange={handleFormInputChange('tires', 'rearRightBrand')} />
             <FormInput label="Profondeur (mm)" type="number" name="rearRightDepth" value={data.tires?.rearRightDepth ?? ''} onChange={handleFormInputChange('tires', 'rearRightDepth')} step="0.1" />
             <div className="hidden md:block"></div> {/* Placeholder */}
          </div>
        </div>

        {/* --- Freins --- */}
        <div>
            <h3 className="font-semibold mb-4 text-lg border-b pb-2">Freins</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="État disques avant" name="brakesFrontDiscsCondition" value={data.brakes?.frontDiscsCondition ?? ''} onChange={handleFormInputChange("brakes", "frontDiscsCondition")} placeholder="Ex: Bon, Usure 50%, À changer"/>
                <FormInput label="État plaquettes avant" name="brakesFrontPadsCondition" value={data.brakes?.frontPadsCondition ?? ''} onChange={handleFormInputChange("brakes", "frontPadsCondition")} placeholder="Ex: Bon, Usure 70%, À changer"/>
                <FormInput label="État disques arrière" name="brakesRearDiscsCondition" value={data.brakes?.rearDiscsCondition ?? ''} onChange={handleFormInputChange("brakes", "rearDiscsCondition")} placeholder="Ex: Bon, Usure 20%"/>
                <FormInput label="État plaquettes arrière" name="brakesRearPadsCondition" value={data.brakes?.rearPadsCondition ?? ''} onChange={handleFormInputChange("brakes", "rearPadsCondition")} placeholder="Ex: Bon, Usure 40%"/>
                <FormInput label="Frein de stationnement" name="brakesParkingCondition" value={data.brakes?.parkingCondition ?? ''} onChange={handleFormInputChange("brakes", "parkingCondition")} placeholder="Ex: Fonctionnel, Réglage nécessaire"/>
                <FormInput label="ABS fonctionnel" type="select" name="brakesAbsFunctional" value={data.brakes?.absFunctional ?? ''} onChange={handleFormInputChange("brakes", "absFunctional")} options={["Oui", "Non", "Non testé"]} />
                <FormInput label="ESP/Contrôle de stabilité fonctionnel" type="select" name="brakesEspFunctional" value={data.brakes?.espFunctional ?? ''} onChange={handleFormInputChange("brakes", "espFunctional")} options={["Oui", "Non", "Non testé"]} />
            </div>
        </div>

        {/* --- Distribution --- */}
        <div>
            <h3 className="font-semibold mb-4 text-lg border-b pb-2">Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Type de distribution" name="distributionType" value={data.distribution?.type ?? ''} onChange={handleFormInputChange("distribution", "type")} placeholder="Ex: Courroie, Chaîne, Cascade de pignons"/>
                <FormInput label="État/Préconisation" name="distributionCondition" value={data.distribution?.condition ?? ''} onChange={handleFormInputChange("distribution", "condition")} placeholder="Ex: Remplacée, À prévoir, Vérifiée"/>
                <FormInput label="Dernier remplacement (km)" type="number" name="distributionLastServiceKm" value={data.distribution?.lastServiceKm ?? ''} onChange={handleFormInputChange("distribution", "lastServiceKm")} placeholder="Si applicable"/>
                <FormInput label="Préconisation prochain remplacement (km/année)" name="distributionNextServiceKm" value={data.distribution?.nextServiceKm ?? ''} onChange={handleFormInputChange("distribution", "nextServiceKm")} placeholder="Ex: 120000 km / 5 ans"/>
            </div>
        </div>

        {/* --- Moteur --- */}
        <div>
            <h3 className="font-semibold mb-4 text-lg border-b pb-2">Moteur</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Niveau d'huile" name="engineOilLevel" value={data.engine?.oilLevel ?? ''} onChange={handleFormInputChange("engine", "oilLevel")} placeholder="Ex: Correct, Proche du min"/>
                <FormInput label="Niveau liquide de refroidissement" name="engineCoolantLevel" value={data.engine?.coolantLevel ?? ''} onChange={handleFormInputChange("engine", "coolantLevel")} placeholder="Ex: Correct, Bas"/>
                <FormInput label="État courroie(s) accessoire(s)" name="engineBeltCondition" value={data.engine?.beltCondition ?? ''} onChange={handleFormInputChange("engine", "beltCondition")} placeholder="Ex: Bon état, Craquelée, À changer"/>
                <FormInput label="Codes d'erreur (OBD)" name="engineErrorCodes" value={data.engine?.errorCodes ?? ''} onChange={handleFormInputChange("engine", "errorCodes")} placeholder="Ex: Aucun, P0300, etc."/>
            </div>
        </div>

        {/* --- Châssis & Transmission --- */}
        <div>
            <h3 className="font-semibold mb-4 text-lg border-b pb-2">Châssis & Transmission</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="État direction (Jeu, Bruits)" name="chassisSteeringCondition" value={data.chassis?.steeringCondition ?? ''} onChange={handleFormInputChange("chassis", "steeringCondition")} placeholder="Ex: Aucun jeu, Léger bruit"/>
                <FormInput label="État suspension avant (Amortisseurs, Bruits)" name="chassisFrontSuspension" value={data.chassis?.frontSuspension ?? ''} onChange={handleFormInputChange("chassis", "frontSuspension")} placeholder="Ex: Bon état, Fuite amortisseur G"/>
                <FormInput label="État suspension arrière" name="chassisRearSuspension" value={data.chassis?.rearSuspension ?? ''} onChange={handleFormInputChange("chassis", "rearSuspension")} placeholder="Ex: Bon état"/>
                <FormInput label="État transmission / Boîte de vitesses" name="chassisTransmissionCondition" value={data.chassis?.transmissionCondition ?? ''} onChange={handleFormInputChange("chassis", "transmissionCondition")} placeholder="Ex: Passage fluide, Accroche 3ème"/>
            </div>
        </div>

        {/* --- Test de conduite --- */}
        <div>
            <h3 className="font-semibold mb-4 text-lg border-b pb-2">Test de conduite</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Accélération" name="driveTestAcceleration" value={data.driveTest?.acceleration ?? ''} onChange={handleFormInputChange("driveTest", "acceleration")} placeholder="Ex: Linéaire, Franche, Manque de puissance"/>
                <FormInput label="Freinage" name="driveTestBraking" value={data.driveTest?.braking ?? ''} onChange={handleFormInputChange("driveTest", "braking")} placeholder="Ex: Efficace, Vibration au freinage"/>
                <FormInput label="Tenue de route" name="driveTestHandling" value={data.driveTest?.handling ?? ''} onChange={handleFormInputChange("driveTest", "handling")} placeholder="Ex: Stable, Tire à droite"/>
                <FormInput label="Fonctionnement aides à la conduite" name="driveTestDrivingAids" value={data.driveTest?.drivingAids ?? ''} onChange={handleFormInputChange("driveTest", "drivingAids")} placeholder="Ex: Régulateur OK, Radar recul HS"/>
                <FormInput label="Notes / Observations générales" type="textarea" name="driveTestNotes" value={data.driveTest?.notes ?? ''} onChange={handleFormInputChange("driveTest", "notes")} placeholder="Bruits suspects, comportement particulier..." className="md:col-span-2" rows={3}/>
            </div>
        </div>
      </div>
    </Section>
  );
};

// Section Historique d'entretien
const MaintenanceHistorySection: React.FC<MaintenanceHistorySectionProps> = ({ history, onChange }) => {
  const [newEvent, setNewEvent] = useState<MaintenanceEventFormData>({ date: '', kilometers: '', type: '', location: '' });
  const [errors, setErrors] = useState<{ [key in keyof MaintenanceEventFormData]?: string }>({});

  // *** FIX: Corrected the event type signature ***
  // This handler now correctly matches the FormInputProps onChange signature
  const handleNewEventChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
    // Clear error on change
    if (errors[name as keyof MaintenanceEventFormData]) {
        setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateEvent = (): boolean => {
      const newErrors: { [key in keyof MaintenanceEventFormData]?: string } = {};
      if (!newEvent.date) newErrors.date = "Date requise";
      if (!newEvent.kilometers) newErrors.kilometers = "Kilométrage requis";
      else if (!/^\d+$/.test(newEvent.kilometers)) newErrors.kilometers = "Kilométrage invalide (chiffres uniquement)";
      if (!newEvent.type) newErrors.type = "Type d'entretien requis";
      // Location is optional
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const addEvent = () => {
    if (validateEvent()) {
      onChange([...history, newEvent]);
      // Reset form and errors
      setNewEvent({ date: '', kilometers: '', type: '', location: '' });
      setErrors({});
    }
  };

  const removeEvent = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    onChange(updatedHistory);
  };

  return (
    <Section title="Historique d'entretien (Optionnel)" icon={Clock}>
      <div className="space-y-4">
        {/* Form for adding new event */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="font-medium mb-3">Ajouter un événement d&apos;entretien</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    {/* Pass the corrected handleNewEventChange */}
                    <FormInput label="Date" type="date" name="date" value={newEvent.date} onChange={handleNewEventChange}  />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>
                <div>
                    {/* Pass the corrected handleNewEventChange */}
                    <FormInput label="Kilométrage" type="number" name="kilometers" value={newEvent.kilometers} onChange={handleNewEventChange}  placeholder="Ex: 45000" />
                    {errors.kilometers && <p className="text-red-500 text-xs mt-1">{errors.kilometers}</p>}
                </div>
                <div>
                    {/* Pass the corrected handleNewEventChange */}
                    <FormInput label="Type d'entretien" name="type" value={newEvent.type} onChange={handleNewEventChange}  placeholder="Ex: Révision annuelle, Pneus AV" />
                    {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                </div>
                <div>
                    {/* Pass the corrected handleNewEventChange */}
                    <FormInput label="Lieu (Garage)" name="location" value={newEvent.location} onChange={handleNewEventChange} placeholder="Ex: Garage Dupont" />
                    {/* No error display for optional field */}
                </div>
            </div>
            <button
                type="button"
                onClick={addEvent}
                className="mt-4 px-4 py-2 bg-[#C8EC66] text-black rounded hover:bg-opacity-90 transition-all"
            >
                + Ajouter
            </button>
        </div>

        {/* Display existing events */}
        {history.length > 0 && (
            <div className="space-y-3 mt-6">
                 <h3 className="font-medium mb-3 text-lg">Événements enregistrés</h3>
                {history.map((event, index) => (
                    <MaintenanceEvent key={index} event={event} index={index} onRemove={removeEvent} />
                ))}
            </div>
        )}
         {history.length === 0 && (
            <p className="text-gray-500 text-sm mt-4">Aucun événement d&apos;entretien ajouté pour le moment.</p>
         )}
      </div>
    </Section>
  );
};


// --- Main Form Component ---

interface FormDataState {
  carId: string;
  generalInfo: GeneralInfoData;
  technicalDetails: TechnicalDetailsData;
  priceSection: PriceData;
  description: string;
  photos: Photo[];
  mechanicalInspection: MechanicalInspectionData;
  maintenanceHistory: MaintenanceEventFormData[]; // Use form data type for state
}

const CarListingForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataState>({
    carId: uuidv4(),
    generalInfo: {
        status: "Occasion", // Default values
        sellerType: "Particulier",
        bodyType: "Berline",
        title: '',
        brand: '',
        model: '',
        year: '',
        mileage: '',
        trim: '',
        doors: '',
        seats: '',
        exteriorColor: '',
        interiorColor: '',
        city: '',
        postalCode: '',
    },
    technicalDetails: {
        fuelType: '',
        fiscalPower: '',
        dinPower: '',
        displacement: '',
        transmission: '',
        gears: '',
        driveType: '',
        euroStandard: '',
        fuelConsumption: '',
        co2Emissions: '',
    },
    priceSection: {
        price: '',
        priceNote: '',
        availability: '',
        warranty: 'Aucune', // Default value
        financing: false,
        tradeIn: false,
        firstHand: false,
    },
    description: "",
    photos: [],
    mechanicalInspection: { // Initialize all nested objects and fields
        tires: {
            frontLeftBrand: '', frontLeftDimensions: '', frontLeftType: '', frontLeftDepth: '',
            frontRightBrand: '', frontRightDimensions: '', frontRightType: '', frontRightDepth: '',
            rearLeftBrand: '', rearLeftDimensions: '', rearLeftType: '', rearLeftDepth: '',
            rearRightBrand: '', rearRightDimensions: '', rearRightType: '', rearRightDepth: '',
        },
        brakes: {
            frontDiscsCondition: '', frontPadsCondition: '', frontCalipersCondition: '',
            rearDiscsCondition: '', rearPadsCondition: '', rearCalipersCondition: '',
            parkingCondition: '', absFunctional: '', espFunctional: '',
        },
        distribution: { type: '', condition: '', lastServiceKm: '', nextServiceKm: '' },
        engine: {
            type: '', displacement: '', power: '', torque: '', oilLevel: '',
            coolantLevel: '', beltCondition: '', errorCodes: '',
        },
        chassis: {
            steeringType: '', steeringCondition: '', geometry: '', frontSuspension: '',
            rearSuspension: '', springsCondition: '', transmissionCondition: '',
        },
        driveTest: {
            acceleration: '', braking: '', handling: '', comfort: '',
            soundInsulation: '', drivingAids: '', notes: '',
        },
    },
    maintenanceHistory: [],
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // --- Handle Submit ---
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // --- Data Validation & Transformation ---
    try {
        // --- Basic Required Field Checks (Example) ---
        const { generalInfo, technicalDetails, priceSection } = formData;
        if (!generalInfo.title || !generalInfo.brand || !generalInfo.model || !generalInfo.year || !generalInfo.mileage || !generalInfo.bodyType || !generalInfo.doors || !generalInfo.seats || !generalInfo.exteriorColor || !generalInfo.status || !generalInfo.sellerType || !generalInfo.city || !generalInfo.postalCode) {
            throw new Error("Veuillez remplir tous les champs obligatoires dans 'Informations générales'.");
        }
        if (!technicalDetails.fuelType || !technicalDetails.fiscalPower || !technicalDetails.dinPower || !technicalDetails.transmission) {
            throw new Error("Veuillez remplir tous les champs obligatoires dans 'Détails techniques'.");
        }
        if (!priceSection.price) {
            throw new Error("Veuillez indiquer le prix de vente.");
        }
        if (!formData.description) {
            throw new Error("Veuillez ajouter une description détaillée.");
        }
        if (formData.photos.length === 0) {
            throw new Error("Veuillez ajouter au moins une photo.");
        }
        // Add more specific validation as needed (e.g., number ranges, formats)


        // --- Prepare CarData for API ---
        const carData: CarData = {
            // General Info (with parsing)
            title: generalInfo.title!, // Assert non-null after validation
            brand: generalInfo.brand!,
            model: generalInfo.model!,
            year: safeParseInt(generalInfo.year)!, // Assert non-null after validation
            mileage: safeParseInt(generalInfo.mileage)!, // Assert non-null after validation
            body_type: generalInfo.bodyType!,
            doors: safeParseInt(generalInfo.doors),
            seats: safeParseInt(generalInfo.seats),
            exterior_color: generalInfo.exteriorColor,
            interior_color: generalInfo.interiorColor || undefined,
            trim: generalInfo.trim || undefined,
            status: generalInfo.status === "Neuf" ? "new" : generalInfo.status === "Occasion" ? "used" : "demo",
            seller_type: generalInfo.sellerType === "Professionnel" ? "pro" : "individual",
            city: generalInfo.city!,
            postal_code: generalInfo.postalCode!,

            // Price Section (with parsing)
            price: safeParseFloat(priceSection.price)!, // Assert non-null after validation
            price_note: priceSection.priceNote || undefined,
            availability: priceSection.availability || undefined,
            warranty: priceSection.warranty === "Aucune" ? undefined : priceSection.warranty, // Send undefined if 'Aucune'
            financing: priceSection.financing ?? false,
            trade_in: priceSection.tradeIn ?? false,
            first_hand: priceSection.firstHand ?? false,

            // Description
            description: formData.description,

            // Photos
            photos: formData.photos.map(photo => ({ url: photo.url })),

            // Technical Details (with parsing)
            technicalDetails: {
                fuel_type: technicalDetails.fuelType,
                fiscal_power: safeParseInt(technicalDetails.fiscalPower),
                din_power: safeParseInt(technicalDetails.dinPower),
                displacement: safeParseInt(technicalDetails.displacement),
                transmission: technicalDetails.transmission,
                gears: safeParseInt(technicalDetails.gears),
                drive_type: technicalDetails.driveType || undefined,
                euro_standard: technicalDetails.euroStandard || undefined,
                fuel_consumption: safeParseFloat(technicalDetails.fuelConsumption),
                co2_emissions: safeParseInt(technicalDetails.co2Emissions),
            },

            // Mechanical Inspection (with parsing, only include if data exists)
             // Explicitly check if the section or its sub-properties have meaningful data
            mechanicalInspection: (
                formData.mechanicalInspection.tires || formData.mechanicalInspection.brakes ||
                formData.mechanicalInspection.distribution || formData.mechanicalInspection.engine ||
                formData.mechanicalInspection.chassis || formData.mechanicalInspection.driveTest
             ) ? { // Only include mechanicalInspection if any sub-section has data
                tires: formData.mechanicalInspection.tires && Object.values(formData.mechanicalInspection.tires).some(v => v !== '' && v != null) ? { // Check for non-empty values
                    frontLeftBrand: formData.mechanicalInspection.tires.frontLeftBrand || undefined,
                    frontLeftDepth: safeParseFloat(formData.mechanicalInspection.tires.frontLeftDepth),
                    frontRightBrand: formData.mechanicalInspection.tires.frontRightBrand || undefined,
                    frontRightDepth: safeParseFloat(formData.mechanicalInspection.tires.frontRightDepth),
                    rearLeftBrand: formData.mechanicalInspection.tires.rearLeftBrand || undefined,
                    rearLeftDepth: safeParseFloat(formData.mechanicalInspection.tires.rearLeftDepth),
                    rearRightBrand: formData.mechanicalInspection.tires.rearRightBrand || undefined,
                    rearRightDepth: safeParseFloat(formData.mechanicalInspection.tires.rearRightDepth),
                    // Include other tire fields if needed, parsing appropriately
                    frontLeftDimensions: formData.mechanicalInspection.tires.frontLeftDimensions || undefined,
                    frontLeftType: formData.mechanicalInspection.tires.frontLeftType || undefined,
                    frontRightDimensions: formData.mechanicalInspection.tires.frontRightDimensions || undefined,
                    frontRightType: formData.mechanicalInspection.tires.frontRightType || undefined,
                    rearLeftDimensions: formData.mechanicalInspection.tires.rearLeftDimensions || undefined,
                    rearLeftType: formData.mechanicalInspection.tires.rearLeftType || undefined,
                    rearRightDimensions: formData.mechanicalInspection.tires.rearRightDimensions || undefined,
                    rearRightType: formData.mechanicalInspection.tires.rearRightType || undefined,
                } : undefined,
                brakes: formData.mechanicalInspection.brakes && Object.values(formData.mechanicalInspection.brakes).some(v => v !== '' && v != null) ? { // Check for non-empty values
                   frontDiscsCondition: formData.mechanicalInspection.brakes.frontDiscsCondition || undefined,
                   frontPadsCondition: formData.mechanicalInspection.brakes.frontPadsCondition || undefined,
                   rearDiscsCondition: formData.mechanicalInspection.brakes.rearDiscsCondition || undefined,
                   rearPadsCondition: formData.mechanicalInspection.brakes.rearPadsCondition || undefined,
                   parkingCondition: formData.mechanicalInspection.brakes.parkingCondition || undefined,
                   absFunctional: formData.mechanicalInspection.brakes.absFunctional || undefined,
                   espFunctional: formData.mechanicalInspection.brakes.espFunctional || undefined,
                   // Include other brake fields if needed
                   frontCalipersCondition: formData.mechanicalInspection.brakes.frontCalipersCondition || undefined,
                   rearCalipersCondition: formData.mechanicalInspection.brakes.rearCalipersCondition || undefined,
                } : undefined,
                distribution: formData.mechanicalInspection.distribution && Object.values(formData.mechanicalInspection.distribution).some(v => v !== '' && v != null) ? { // Check for non-empty values
                    type: formData.mechanicalInspection.distribution.type || undefined,
                    condition: formData.mechanicalInspection.distribution.condition || undefined,
                    lastServiceKm: safeParseInt(formData.mechanicalInspection.distribution.lastServiceKm),
                    // Keep nextServiceKm as string if it contains non-numeric like ' / 5 ans'
                    nextServiceKm: typeof formData.mechanicalInspection.distribution.nextServiceKm === 'string' && formData.mechanicalInspection.distribution.nextServiceKm
                                    ? formData.mechanicalInspection.distribution.nextServiceKm
                                    : safeParseInt(formData.mechanicalInspection.distribution.nextServiceKm), // Try parsing if not a complex string
                } : undefined,
                engine: formData.mechanicalInspection.engine && Object.values(formData.mechanicalInspection.engine).some(v => v !== '' && v != null) ? { // Check for non-empty values
                    oilLevel: formData.mechanicalInspection.engine.oilLevel || undefined,
                    coolantLevel: formData.mechanicalInspection.engine.coolantLevel || undefined,
                    beltCondition: formData.mechanicalInspection.engine.beltCondition || undefined,
                    errorCodes: formData.mechanicalInspection.engine.errorCodes || undefined,
                    // Include other engine fields if needed, parsing appropriately
                    type: formData.mechanicalInspection.engine.type || undefined,
                    displacement: safeParseInt(formData.mechanicalInspection.engine.displacement),
                    power: safeParseInt(formData.mechanicalInspection.engine.power),
                    torque: safeParseInt(formData.mechanicalInspection.engine.torque),
                } : undefined,
                chassis: formData.mechanicalInspection.chassis && Object.values(formData.mechanicalInspection.chassis).some(v => v !== '' && v != null) ? { // Check for non-empty values
                    steeringCondition: formData.mechanicalInspection.chassis.steeringCondition || undefined,
                    frontSuspension: formData.mechanicalInspection.chassis.frontSuspension || undefined,
                    rearSuspension: formData.mechanicalInspection.chassis.rearSuspension || undefined,
                    transmissionCondition: formData.mechanicalInspection.chassis.transmissionCondition || undefined,
                    // Include other chassis fields if needed
                    steeringType: formData.mechanicalInspection.chassis.steeringType || undefined,
                    geometry: formData.mechanicalInspection.chassis.geometry || undefined,
                    springsCondition: formData.mechanicalInspection.chassis.springsCondition || undefined,
                } : undefined,
                driveTest: formData.mechanicalInspection.driveTest && Object.values(formData.mechanicalInspection.driveTest).some(v => v !== '' && v != null) ? { // Check for non-empty values
                   acceleration: formData.mechanicalInspection.driveTest.acceleration || undefined,
                   braking: formData.mechanicalInspection.driveTest.braking || undefined,
                   handling: formData.mechanicalInspection.driveTest.handling || undefined,
                   drivingAids: formData.mechanicalInspection.driveTest.drivingAids || undefined,
                   notes: formData.mechanicalInspection.driveTest.notes || undefined,
                   // Include other drive test fields if needed
                   comfort: formData.mechanicalInspection.driveTest.comfort || undefined,
                   soundInsulation: formData.mechanicalInspection.driveTest.soundInsulation || undefined,
                } : undefined,
             } : undefined, // Send undefined for the whole section if no data


            // Maintenance History (with parsing)
            maintenanceHistory: formData.maintenanceHistory.length > 0
                ? formData.maintenanceHistory.map(event => ({
                    date: event.date, // Assuming date is already in ISO format or DB accepts it
                    kilometers: safeParseInt(event.kilometers)!, // Assert non-null after form validation
                    type: event.type,
                    location: event.location || undefined,
                }))
                : undefined, // Send undefined if empty
        };

        // console.log("Data being sent to createCar:", JSON.stringify(carData, null, 2)); // Debugging: Check data before sending

        // --- API Call ---
        // Assuming createCar handles inserting into multiple tables or expects this nested structure
        const createdCarId = await createCar(carData); // Capture the returned ID

        setSuccess(true);
        // Redirect after a short delay
        setTimeout(() => {
            // Construct the URL carefully, ensure carId is valid
            const redirectUrl = createdCarId ? `/car-listing/${createdCarId}` : '/'; // Fallback to home if no ID
            console.log("Redirecting to:", redirectUrl);
            router.push(redirectUrl);
        }, 2000); // Adjust path as needed


    } catch (err: unknown) {
        console.error("Form submission error:", err);
        if (err instanceof Error) {
            setError(err.message || "Une erreur inconnue s'est produite lors de la soumission.");
        } else {
            setError("Une erreur inconnue s'est produite lors de la soumission.");
        }
        // Scroll to the top to show the error message
        window.scrollTo(0, 0);
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert"
        >
          <strong className="font-bold">Erreur ! </strong>
          <span className="block sm:inline">{error}</span>
          <button type="button" onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <X className="w-5 h-5"/>
          </button>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert"
        >
          <strong className="font-bold">Succès ! </strong>
          <span className="block sm:inline">Votre annonce a été créée avec succès. Redirection en cours...</span>
        </motion.div>
      )}

      {/* Use ScrollArea for content, not the entire form */}
      {/* Adjust height calculation as needed */}
      <ScrollArea className="h-[calc(100vh-250px)] w-full rounded-md border" >
        <div className="p-4 space-y-8"> {/* Add padding inside ScrollArea */}
          <GeneralInfoSection
            data={formData.generalInfo}
            onChange={(data) => setFormData(prev => ({ ...prev, generalInfo: data }))}
          />
          <TechnicalDetailsSection
            data={formData.technicalDetails}
            onChange={(data) => setFormData(prev => ({ ...prev, technicalDetails: data }))}
          />
          <PriceSection
            data={formData.priceSection}
            onChange={(data) => setFormData(prev => ({ ...prev, priceSection: data }))}
          />
          <DescriptionSection
            data={formData.description}
            onChange={(description) => setFormData(prev => ({ ...prev, description }))}
          />
           <PhotosSection
            photos={formData.photos}
            onChange={(photos) => setFormData(prev => ({ ...prev, photos }))}
            carId={formData.carId} // Pass the generated carId for upload path
          />
          <MechanicalInspectionSection
            data={formData.mechanicalInspection}
            onChange={(data) => setFormData(prev => ({ ...prev, mechanicalInspection: data }))}
          />
          <MaintenanceHistorySection
            history={formData.maintenanceHistory}
            onChange={(history) => setFormData(prev => ({ ...prev, maintenanceHistory: history }))}
          />
        </div>
      </ScrollArea>

      {/* Submit button outside ScrollArea */}
      <div className="mt-8 sticky bottom-0 bg-white py-4 border-t border-gray-200 z-10"> {/* Added z-index */}
          <button
            type="submit"
            disabled={isSubmitting || success} // Disable after success too
            className="w-full px-6 py-3 bg-[#C8EC66] text-black font-semibold rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publication en cours...
              </span>
            ) : success ? "Annonce publiée !" : "Publier l'annonce"}
          </button>
      </div>
    </form>
  );
};

// Page principale
const CarListingPage: React.FC = () => {
  return (
    // Use a background color for the page if needed
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Déposer une annonce</h1>
        <CarListingForm />
      </div>
    </div>
  );
};

export default CarListingPage;