import { supabase } from '../lib/supabase';
import { Database } from '../types/database.types'; // Adjust path as needed

type Car = Database['public']['Views']['car_details']['Row'];
type CarBase = Database['public']['Tables']['cars']['Insert'];
type TechnicalDetails = Database['public']['Tables']['technical_details']['Insert'];

// Create a comprehensive interface for car creation that includes all needed properties
interface InsertCar extends CarBase {
  // Technical details properties
  fuel_type?: string | null;
  fiscal_power?: string | number | null;
  din_power?: string | number | null;
  displacement?: string | number | null;
  transmission?: string | null;
  gears?: string | number | null;
  drive_type?: string | null;
  euro_standard?: string | null;
  fuel_consumption?: string | number | null;
  co2_emissions?: string | number | null;
  // Additional properties for UI handling
  car_updated_at?: string | null;
}

export async function createCar(carData: InsertCar): Promise<string> {
  try {
    // Ensure all numeric fields are properly parsed
    // Data for the 'cars' table
    const car_data = {
      seller_id: 'ed3a7a39-3df0-4b2f-8d52-0d37e1f050a8',
      title: carData.title,
      brand: carData.brand,
      model: carData.model,
      year: typeof carData.year === 'number' ? carData.year : parseInt(String(carData.year), 10),
      mileage: typeof carData.mileage === 'number' ? carData.mileage : parseInt(String(carData.mileage), 10),
      body_type: carData.body_type,
      doors: carData.doors ? (typeof carData.doors === 'number' ? carData.doors : parseInt(String(carData.doors), 10)) : null,
      seats: carData.seats ? (typeof carData.seats === 'number' ? carData.seats : parseInt(String(carData.seats), 10)) : null,
      exterior_color: carData.exterior_color,
      interior_color: carData.interior_color,
      status: carData.status === 'Occasion' ? 'used' : (carData.status || 'used'),
      seller_type: carData.seller_type === 'Professional' ? 'pro' : 'individual',
      city: carData.city,
      postal_code: carData.postal_code,
      price: typeof carData.price === 'number' ? carData.price : parseFloat(String(carData.price)),
      description: carData.description,
      created_at: carData.created_at || new Date().toISOString(),
      updated_at: carData.updated_at || new Date().toISOString(),
    };

    console.log('Données envoyées à Supabase (car):', car_data);

    // First, insert the car data directly
    const { data: carInsertData, error: carInsertError } = await supabase
      .from('cars')
      .insert([car_data])
      .select('id')
      .single();

    if (carInsertError) {
      console.error('Supabase Car Insert Error:', JSON.stringify(carInsertError, null, 2));
      throw new Error(`Erreur lors de l'ajout de la voiture: ${carInsertError.message}`);
    }

    if (!carInsertData || !carInsertData.id) {
      throw new Error('Aucun ID de voiture retourné après insertion');
    }

    const carId = carInsertData.id;

    // Data for the 'technical_details' table
    const technical_data = {
      car_id: carId, // Link to the newly created car
      fuel_type: carData.fuel_type,
      fiscal_power: carData.fiscal_power ? (typeof carData.fiscal_power === 'number' ? carData.fiscal_power : parseInt(String(carData.fiscal_power), 10)) : null,
      din_power: carData.din_power ? (typeof carData.din_power === 'number' ? carData.din_power : parseInt(String(carData.din_power), 10)) : null,
      displacement: carData.displacement ? (typeof carData.displacement === 'number' ? carData.displacement : parseInt(String(carData.displacement), 10)) : null,
      transmission: carData.transmission,
      gears: carData.gears ? (typeof carData.gears === 'number' ? carData.gears : parseInt(String(carData.gears), 10)) : null,
      drive_type: carData.drive_type,
      euro_standard: carData.euro_standard,
      fuel_consumption: carData.fuel_consumption ? (typeof carData.fuel_consumption === 'number' ? carData.fuel_consumption : parseFloat(String(carData.fuel_consumption))) : null,
      co2_emissions: carData.co2_emissions ? (typeof carData.co2_emissions === 'number' ? carData.co2_emissions : parseFloat(String(carData.co2_emissions))) : null,
    };
    
    console.log('Données envoyées à Supabase (technical):', technical_data);

    // Then, insert the technical details
    const { error: techInsertError } = await supabase
      .from('technical_details')
      .insert([technical_data]);

    if (techInsertError) {
      // Log the full error object for debugging
      console.error('Supabase Technical Details Insert Error:', JSON.stringify(techInsertError, null, 2));
      
      // We've already inserted the car, so we'll return the car ID even if technical details fail
      console.warn('Technical details insertion failed, but car was created with ID:', carId);
    }

    return carId; // Return the car ID
  } catch (error) {
    console.error('Error in createCar:', error);
    throw error;
  }
}

// Other functions remain unchanged
export async function getAllCars(): Promise<Car[]> {
  const { data, error } = await supabase
    .from('car_details')
    .select('*');
  
  if (error) throw error;
  return data || [];
}

export async function getCarById(id: string): Promise<Car | null> {
  const { data, error } = await supabase
    .from('car_details')
    .select(`
      *,
      photos(*),
      maintenance_history(*),
      mechanical_inspection(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}