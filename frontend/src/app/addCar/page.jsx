'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Camera, Car, Wrench as Tool, FileText, Clock, ChevronRight, Plus, X } from 'lucide-react';
import { createCar } from '@/services/carService';
import { uploadCarImage } from '@/services/storageService';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Function to generate a valid UUID v4
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, 
          v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


// Liste des marques populaires
const carBrands = [
  "Audi", "BMW", "Citroën", "Dacia", "Fiat", "Ford", "Honda", "Hyundai", "Kia", 
  "Mercedes", "Nissan", "Opel", "Peugeot", "Renault", "Seat", "Skoda", "Toyota", 
  "Volkswagen", "Volvo"
];

// Types de carrosserie
const bodyTypes = [
  "Berline", "SUV", "Break", "Coupé", "Monospace", "Cabriolet", "Utilitaire"
];

// Composant de section avec animation
const Section = ({ title, icon: Icon, children, isLast = false }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${!isLast ? 'mb-8' : ''}`}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-[#C8EC66]/20 rounded-lg">
        {/* <Icon className="w-6 h-6 text-[#C8EC66]" /> */}
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    {children}
  </motion.section>
);

// Composant pour prévisualiser les photos
const PhotoPreview = ({ photos, onRemove }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
    {photos.map((photo, index) => (
      <div key={index} className="relative group">
        <img
          src={photo.url}
          alt={`Photo ${index + 1}`}
          className="w-full h-36 object-cover rounded-lg border border-gray-200"
        />
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ))}
  </div>
);

// Composant d'événement d'entretien
const MaintenanceEvent = ({ event, index, onRemove }) => (
  <div className="p-4 bg-gray-50 rounded-lg flex items-start justify-between gap-4 relative group">
    <div className="flex-1">
      <div className="flex flex-wrap gap-4 mb-2">
        <span className="inline-flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded">
          <Clock className="w-3 h-3" />
          {event.date}
        </span>
        <span className="inline-flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded">
          {event.kilometers} km
        </span>
      </div>
      <div className="font-medium">{event.type}</div>
      <div className="text-gray-600 text-sm">{event.location}</div>
    </div>
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <X className="w-5 h-5" />
    </button>
  </div>
);

// Champ d'entrée réutilisable
const FormInput = ({ label, type = "text", name, placeholder, value, onChange, options = [], required = false, className = "" }) => {
  if (type === "select") {
    return (
      <div className={`flex flex-col ${className}`}>
        <label className="mb-1 text-sm text-gray-600">{label} {required && <span className="text-red-500">*</span>}</label>
        <select
          name={name}
          value={value || ''}
          onChange={onChange}
          required={required}
          className="p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8EC66]"
        >
          <option value="">{placeholder || `Sélectionner ${label.toLowerCase()}`}</option>
          {options.map((option, index) => (
            <option key={index} value={typeof option === 'object' ? option.value : option}>
              {typeof option === 'object' ? option.label : option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className={`flex flex-col ${className}`}>
        <label className="mb-1 text-sm text-gray-600">{label} {required && <span className="text-red-500">*</span>}</label>
        <textarea
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={5}
          className="p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8EC66]"
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-1 text-sm text-gray-600">{label} {required && <span className="text-red-500">*</span>}</label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8EC66]"
      />
    </div>
  );
};

// Section Informations générales
const GeneralInfoSection = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const calculateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 30; i--) {
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
          value={data.title}
          onChange={handleInputChange}
          required
          className="md:col-span-2"
        />
        <FormInput
          label="Marque"
          type="select"
          name="brand"
          value={data.brand}
          onChange={handleInputChange}
          options={carBrands}
          required
        />
        <FormInput
          label="Modèle"
          name="model"
          placeholder="Ex: 208, Golf, Clio..."
          value={data.model}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Année de mise en circulation"
          type="select"
          name="year"
          value={data.year}
          onChange={handleInputChange}
          options={calculateYears()}
          required
        />
        <FormInput
          label="Kilométrage"
          type="number"
          name="mileage"
          placeholder="Ex: 35000"
          value={data.mileage}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Finition / Version"
          name="trim"
          placeholder="Ex: Allure, S-Line, Titanium"
          value={data.trim}
          onChange={handleInputChange}
        />
        <FormInput
          label="Type de carrosserie"
          type="select"
          name="bodyType"
          value={data.bodyType}
          onChange={handleInputChange}
          options={bodyTypes}
          required
        />
        <FormInput
          label="Nombre de portes"
          type="select"
          name="doors"
          value={data.doors}
          onChange={handleInputChange}
          options={[2, 3, 4, 5, 6]}
          required
        />
        <FormInput
          label="Nombre de places"
          type="select"
          name="seats"
          value={data.seats}
          onChange={handleInputChange}
          options={[2, 3, 4, 5, 6, 7, 8, 9]}
          required
        />
        <FormInput
          label="Couleur extérieure"
          name="exteriorColor"
          placeholder="Ex: Bleu Métallisé"
          value={data.exteriorColor}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Couleur intérieure"
          name="interiorColor"
          placeholder="Ex: Noir"
          value={data.interiorColor}
          onChange={handleInputChange}
        />
        <FormInput
          label="Statut du véhicule"
          type="select"
          name="status"
          value={data.status}
          onChange={handleInputChange}
          options={["Neuf", "Occasion", "Véhicule de démonstration"]}
          required
        />
        <FormInput
          label="Type de vendeur"
          type="select"
          name="sellerType"
          value={data.sellerType}
          onChange={handleInputChange}
          options={[{value: "Particulier", label: "Particulier"}, {value: "Professionnel", label: "Professionnel"}]}
          required
        />
        <FormInput
          label="Ville"
          name="city"
          placeholder="Ex: Lyon"
          value={data.city}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Code postal"
          name="postalCode"
          placeholder="Ex: 69000"
          value={data.postalCode}
          onChange={handleInputChange}
          required
        />
      </div>
    </Section>
  );
};

// Section Détails techniques
const TechnicalDetailsSection = ({ data, onChange }) => {
  const handleInputChange = (e) => {
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
          value={data.fuelType}
          onChange={handleInputChange}
          options={["Essence", "Diesel", "Hybride", "Électrique", "GPL"]}
          required
        />
        <FormInput
          label="Puissance fiscale (CV)"
          type="number"
          name="fiscalPower"
          placeholder="Ex: 5"
          value={data.fiscalPower}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Puissance DIN (ch)"
          type="number"
          name="dinPower"
          placeholder="Ex: 110"
          value={data.dinPower}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Cylindrée (cm³)"
          type="number"
          name="displacement"
          placeholder="Ex: 1598"
          value={data.displacement}
          onChange={handleInputChange}
        />
        <FormInput
          label="Type de transmission"
          type="select"
          name="transmission"
          value={data.transmission}
          onChange={handleInputChange}
          options={["Manuelle", "Automatique"]}
          required
        />
        <FormInput
          label="Nombre de rapports"
          type="select"
          name="gears"
          value={data.gears}
          onChange={handleInputChange}
          options={[4, 5, 6, 7, 8, 9, 10]}
        />
        <FormInput
          label="Type de traction"
          type="select"
          name="driveType"
          value={data.driveType}
          onChange={handleInputChange}
          options={["Avant", "Arrière", "Intégrale"]}
        />
        <FormInput
          label="Norme Euro"
          type="select"
          name="euroStandard"
          value={data.euroStandard}
          onChange={handleInputChange}
          options={["Euro 4", "Euro 5", "Euro 5a", "Euro 5b", "Euro 6", "Euro 6b", "Euro 6c", "Euro 6d", "Euro 6d-TEMP"]}
        />
        <FormInput
          label="Consommation mixte (L/100km)"
          type="number"
          name="fuelConsumption"
          placeholder="Ex: 5.2"
          value={data.fuelConsumption}
          onChange={handleInputChange}
          step="0.1"
        />
        <FormInput
          label="Émissions de CO2 (g/km)"
          type="number"
          name="co2Emissions"
          placeholder="Ex: 120"
          value={data.co2Emissions}
          onChange={handleInputChange}
        />
      </div>
    </Section>
  );
};

// Section Prix et conditions
const PriceSection = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({ ...data, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <Section title="Prix et conditions de vente" icon={FileText}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Prix de vente TTC (€)"
          type="number"
          name="price"
          placeholder="Ex: 15000"
          value={data.price}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Mention de prix"
          type="select"
          name="priceNote"
          value={data.priceNote}
          onChange={handleInputChange}
          options={["Prix négociable", "Prix hors frais d'immatriculation"]}
        />
        <FormInput
          label="Disponibilité du véhicule"
          type="select"
          name="availability"
          value={data.availability}
          onChange={handleInputChange}
          options={["Immédiate", "Sur commande"]}
        />
        <FormInput
          label="Garantie"
          type="select"
          name="warranty"
          value={data.warranty}
          onChange={handleInputChange}
          options={["6 mois", "12 mois", "24 mois", "Aucune"]}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="financing"
            name="financing"
            checked={data.financing || false}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <label htmlFor="financing">Possibilité de financement</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="tradeIn"
            name="tradeIn"
            checked={data.tradeIn || false}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <label htmlFor="tradeIn">Possibilité de reprise</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="firstHand"
            name="firstHand"
            checked={data.firstHand || false}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <label htmlFor="firstHand">Première main</label>
        </div>
      </div>
    </Section>
  );
};

// Section Description
const DescriptionSection = ({ data, onChange }) => (
  <Section title="Description" icon={FileText}>
    <FormInput
      label="Description détaillée"
      type="textarea"
      name="description"
      placeholder="Décrivez la voiture (état, options, remarques particulières, etc.)"
      value={data}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  </Section>
);

// Section Photos
const PhotosSection = ({ photos, onChange }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    onChange([...photos, ...newPhotos]);
  };

  const removePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    onChange(updatedPhotos);
  };

  return (
    <Section title="Photos" icon={Camera}>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {photos.length > 0 && <PhotoPreview photos={photos} onRemove={removePhoto} />}
    </Section>
  );
};

// Section Inspection mécanique
const MechanicalInspectionSection = ({ data, onChange }) => {
  const handleInputChange = (section, field, value) => {
    onChange({
      ...data,
      [section]: {
        ...data[section],
        [field]: value
      }
    });
  };

  return (
    <Section title="Inspection mécanique" icon={Tool}>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Pneus</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <FormInput
              label="Avant gauche - Marque"
              name="frontLeftBrand"
              value={data.tires?.frontLeftBrand}
              onChange={(e) => handleInputChange('tires', 'frontLeftBrand', e.target.value)}
            />
            <FormInput
              label="Avant gauche - Profondeur (mm)"
              type="number"
              name="frontLeftDepth"
              value={data.tires?.frontLeftDepth}
              onChange={(e) => handleInputChange('tires', 'frontLeftDepth', e.target.value)}
            />
            <FormInput
              label="Avant droit - Marque"
              name="frontRightBrand"
              value={data.tires?.frontRightBrand}
              onChange={(e) => handleInputChange('tires', 'frontRightBrand', e.target.value)}
            />
            <FormInput
              label="Avant droit - Profondeur (mm)"
              type="number"
              name="frontRightDepth"
              value={data.tires?.frontRightDepth}
              onChange={(e) => handleInputChange('tires', 'frontRightDepth', e.target.value)}
            />
            <FormInput
              label="Arrière gauche - Marque"
              name="rearLeftBrand"
              value={data.tires?.rearLeftBrand}
              onChange={(e) => handleInputChange('tires', 'rearLeftBrand', e.target.value)}
            />
            <FormInput
              label="Arrière gauche - Profondeur (mm)"
              type="number"
              name="rearLeftDepth"
              value={data.tires?.rearLeftDepth}
              onChange={(e) => handleInputChange('tires', 'rearLeftDepth', e.target.value)}
            />
            <FormInput
              label="Arrière droit - Marque"
              name="rearRightBrand"
              value={data.tires?.rearRightBrand}
              onChange={(e) => handleInputChange('tires', 'rearRightBrand', e.target.value)}
            />
            <FormInput
              label="Arrière droit - Profondeur (mm)"
              type="number"
              name="rearRightDepth"
              value={data.tires?.rearRightDepth}
              onChange={(e) => handleInputChange('tires', 'rearRightDepth', e.target.value)}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

// Section Historique d'entretien
const MaintenanceHistorySection = ({ history, onChange }) => {
  const [newEvent, setNewEvent] = useState({ date: '', kilometers: '', type: '', location: '' });

  const addEvent = () => {
    if (newEvent.date && newEvent.kilometers && newEvent.type && newEvent.location) {
      onChange([...history, newEvent]);
      setNewEvent({ date: '', kilometers: '', type: '', location: '' });
    }
  };

  const removeEvent = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    onChange(updatedHistory);
  };

  return (
    <Section title="Historique d'entretien" icon={Clock}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Date"
            type="date"
            name="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <FormInput
            label="Kilométrage"
            type="number"
            name="kilometers"
            value={newEvent.kilometers}
            onChange={(e) => setNewEvent({ ...newEvent, kilometers: e.target.value })}
          />
          <FormInput
            label="Type d'entretien"
            name="type"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
          />
          <FormInput
            label="Lieu"
            name="location"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          />
        </div>
        <button
          type="button"
          onClick={addEvent}
          className="px-4 py-2 bg-[#C8EC66] text-black rounded"
        >
          Ajouter un événement
        </button>
        <div className="space-y-2">
          {history.map((event, index) => (
            <MaintenanceEvent key={index} event={event} index={index} onRemove={removeEvent} />
          ))}
        </div>
      </div>
    </Section>
  );
};


///////

const CarListingForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    generalInfo: {
      // Default values for required select fields to match database constraints
      status: 'Occasion',
      sellerType: 'Particulier',
      bodyType: 'Berline'
    },
    technicalDetails: {},
    priceSection: {},
    description: '',
    photos: [],
    mechanicalInspection: {},
    maintenanceHistory: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Helper function to convert camelCase to snake_case
  const camelToSnakeCase = (str) => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  };

  // Helper function to convert object keys from camelCase to snake_case
  const convertKeysToSnakeCase = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    
    const result = {};
    Object.entries(obj).forEach(([key, value]) => {
      // Skip empty values
      if (value === '' || value === undefined || value === null) return;
      
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      result[snakeKey] = value;
    });
    
    return result;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Extract and convert data from generalInfo section
      const generalInfoData = {
        title: formData.generalInfo.title,
        brand: formData.generalInfo.brand,
        model: formData.generalInfo.model,
        year: parseInt(formData.generalInfo.year, 10) || new Date().getFullYear(),
        mileage: parseInt(formData.generalInfo.mileage, 10) || 0,
        body_type: formData.generalInfo.bodyType,
        doors: parseInt(formData.generalInfo.doors, 10) || null,
        seats: parseInt(formData.generalInfo.seats, 10) || null,
        exterior_color: formData.generalInfo.exteriorColor,
        interior_color: formData.generalInfo.interiorColor,
        status: formData.generalInfo.status,
        // seller_type is hardcoded in the service to avoid constraint issues
        city: formData.generalInfo.city,
        postal_code: formData.generalInfo.postalCode,
        trim: formData.generalInfo.trim
      };
      
      // Extract and convert data from technicalDetails section
      const technicalDetailsData = {
        fuel_type: formData.technicalDetails.fuelType,
        fiscal_power: parseInt(formData.technicalDetails.fiscalPower, 10) || null,
        din_power: parseInt(formData.technicalDetails.dinPower, 10) || null,
        displacement: parseInt(formData.technicalDetails.displacement, 10) || null,
        transmission: formData.technicalDetails.transmission,
        gears: parseInt(formData.technicalDetails.gears, 10) || null,
        drive_type: formData.technicalDetails.driveType,
        euro_standard: formData.technicalDetails.euroStandard,
        fuel_consumption: parseFloat(formData.technicalDetails.fuelConsumption) || null,
        co2_emissions: parseInt(formData.technicalDetails.co2Emissions, 10) || null
      };
      
      // Extract and convert data from priceSection
      const price = parseInt(formData.priceSection.price, 10) || 0;
      
      // Merge all data into a single object with snake_case keys
      const formDataFormatted = {
        // Basic information
        seller_id: uuidv4(), // Generate a valid UUID for testing
        description: formData.description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        
        // Merge converted data
        ...generalInfoData,
        ...technicalDetailsData,
        price
      };
      
      // Process mechanical inspection data if available
      if (formData.mechanicalInspection && Object.keys(formData.mechanicalInspection).length > 0) {
        const inspectionData = processMechanicalInspection(formData.mechanicalInspection);
        Object.assign(formDataFormatted, inspectionData);
      }
      
      console.log('Formatted data being sent to API:', formDataFormatted);
      
      const carId = await createCar(formDataFormatted);
      console.log("Car created with ID:", carId);
      setSuccess(true);
      
      // Redirect to car details page after a short delay
      setTimeout(() => {
        router.push(`/CarListingPage?carId=${carId}`);
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      setError(error.message || "Une erreur s'est produite lors de la création de l'annonce.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Helper pour transformer les données d'inspection mécanique dans le bon format
  const processMechanicalInspection = (inspectionData) => {
    const result = {};
    
    // Traitement des données des pneus
    if (inspectionData.tires) {
      // Map all tire properties using camelCase to snake_case conversion
      const tireProperties = {
        // Front left tire
        frontLeftBrand: 'tires_front_left_brand',
        frontLeftDepth: 'tires_front_left_depth',
        frontLeftDimensions: 'tires_front_left_dimensions',
        frontLeftType: 'tires_front_left_type',
        
        // Front right tire
        frontRightBrand: 'tires_front_right_brand',
        frontRightDepth: 'tires_front_right_depth',
        frontRightDimensions: 'tires_front_right_dimensions',
        frontRightType: 'tires_front_right_type',
        
        // Rear left tire
        rearLeftBrand: 'tires_rear_left_brand',
        rearLeftDepth: 'tires_rear_left_depth',
        rearLeftDimensions: 'tires_rear_left_dimensions',
        rearLeftType: 'tires_rear_left_type',
        
        // Rear right tire
        rearRightBrand: 'tires_rear_right_brand',
        rearRightDepth: 'tires_rear_right_depth',
        rearRightDimensions: 'tires_rear_right_dimensions',
        rearRightType: 'tires_rear_right_type'
      };
      
      // Process each tire property
      Object.entries(tireProperties).forEach(([camelKey, snakeKey]) => {
        const value = inspectionData.tires[camelKey];
        if (value !== undefined && value !== null && value !== '') {
          // Convert numeric values where appropriate
          if (camelKey.includes('Depth')) {
            result[snakeKey] = parseFloat(value) || null;
          } else {
            result[snakeKey] = value;
          }
        }
      });
    }
    
    // Process other mechanical inspection properties
    // Convert camelCase keys to snake_case and add to result
    Object.entries(inspectionData).forEach(([key, value]) => {
      // Skip the tires object as we've already processed it
      if (key === 'tires' || value === undefined || value === null || value === '') return;
      
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      
      // Convert numeric values appropriately
      if (typeof value === 'string' && !isNaN(value) && key.toLowerCase().includes('depth')) {
        result[snakeKey] = parseFloat(value) || null;
      } else if (typeof value === 'string' && !isNaN(value) && 
                (key.toLowerCase().includes('km') || key.toLowerCase().includes('power'))) {
        result[snakeKey] = parseInt(value, 10) || null;
      } else {
        result[snakeKey] = value;
      }
    });
    
    return result;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Succès!</strong>
          <span className="block sm:inline"> Votre annonce a été créée avec succès. Redirection en cours...</span>
        </div>
      )}
      
      <GeneralInfoSection
        data={formData.generalInfo}
        onChange={(data) => setFormData({ ...formData, generalInfo: data })}
      />
      <TechnicalDetailsSection
        data={formData.technicalDetails}
        onChange={(data) => setFormData({ ...formData, technicalDetails: data })}
      />
      <PriceSection
        data={formData.priceSection}
        onChange={(data) => setFormData({ ...formData, priceSection: data })}
      />
      <DescriptionSection
        data={formData.description}
        onChange={(description) => setFormData({ ...formData, description })}
      />
      <PhotosSection
        photos={formData.photos}
        onChange={(photos) => setFormData({ ...formData, photos })}
      />
      <MechanicalInspectionSection
        data={formData.mechanicalInspection}
        onChange={(data) => setFormData({ ...formData, mechanicalInspection: data })}
      />
      <MaintenanceHistorySection
        history={formData.maintenanceHistory}
        onChange={(history) => setFormData({ ...formData, maintenanceHistory: history })}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-3 bg-[#C8EC66] text-black font-medium rounded hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Traitement en cours...
          </span>
        ) : "Lister la voiture"}
      </button>
    </form>
  );
};

// Page principale
const CarListingPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Lister une voiture</h1>
      <CarListingForm />
    </div>
  );
};

export default CarListingPage;



















