import { supabase } from '../lib/supabase';
import { Database } from '../types/database.types'; // Ajustez le chemin selon votre projet

// Assurez-vous que ce type correspond bien à votre vue Supabase
type Car = Database['public']['Views']['car_details']['Row'];

/**
 * Interface définissant la structure des données d'une voiture pour l'insertion dans la base de données.
 */
interface CarData {
  // Champs pour la table 'cars'
  seller_id?: string; // UUID
  title: string;
  brand: string;
  model: string;
  year: number | string;
  mileage: number | string;
  body_type?: string;
  doors?: number | string;
  seats?: number | string;
  exterior_color?: string;
  interior_color?: string;
  status?: string; // 'new', 'used', 'demo'
  seller_type?: string; // 'pro', 'individual'
  city?: string;
  postal_code?: string;
  price: number | string;
  description?: string;

  // Champs pour la table 'technical_details'
  technicalDetails?: {
    fuel_type?: string;
    fiscal_power?: number | string;
    din_power?: number | string;
    displacement?: number | string;
    transmission?: string; // 'manual', 'automatic'
    gears?: number | string;
    drive_type?: string;
    euro_standard?: string;
    fuel_consumption?: number | string;
    co2_emissions?: number | string;
  };

  // Champs pour la table 'mechanical_inspection'
  mechanicalInspection?: {
    tires?: {
      frontLeftBrand?: string;
      frontLeftDimensions?: string;
      frontLeftType?: string;
      frontLeftDepth?: number | string;
      frontRightBrand?: string;
      frontRightDimensions?: string;
      frontRightType?: string;
      frontRightDepth?: number | string;
      rearLeftBrand?: string;
      rearLeftDimensions?: string;
      rearLeftType?: string;
      rearLeftDepth?: number | string;
      rearRightBrand?: string;
      rearRightDimensions?: string;
      rearRightType?: string;
      rearRightDepth?: number | string;
    };
    brakes?: {
      frontDiscsCondition?: string;
      frontPadsCondition?: string;
      frontCalipersCondition?: string;
      rearDiscsCondition?: string;
      rearPadsCondition?: string;
      rearCalipersCondition?: string;
      parkingCondition?: string;
      absFunctional?: string; // "Oui" ou "Non"
      espFunctional?: string; // "Oui" ou "Non"
    };
    distribution?: {
      type?: string;
      condition?: string;
      lastServiceKm?: number | string;
      nextServiceKm?: number | string;
    };
    engine?: {
      type?: string;
      displacement?: number | string;
      power?: number | string;
      torque?: number | string;
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

  // Champs pour la table 'maintenance_history'
  maintenanceHistory?: Array<{
    date: string; // Chaîne de date ISO (ex. "2023-10-15")
    kilometers: number | string;
    type: string;
    location?: string;
  }>;

  // Champs pour la table 'photos'
  photos?: Array<{ url: string }>;
}

/**
 * Crée une nouvelle entrée de voiture dans la base de données Supabase.
 * @param carData Les données de la voiture à insérer.
 * @returns L'ID de la voiture créée.
 * @throws Error si une insertion échoue.
 */
export async function createCar(carData: CarData): Promise<string> {
  console.log('Données reçues pour création:', carData);
  try {
    // Étape 1 : Préparer les données pour la table 'cars'

    // Utilisation de l'opérateur nullish coalescing (??) pour fournir une chaîne vide
    // si status ou seller_type est undefined, avant d'appeler toLowerCase().
    const lowerStatus = carData.status?.toLowerCase() ?? '';
    const lowerSellerType = carData.seller_type?.toLowerCase() ?? '';

    const carInsertData = {
      seller_id: carData.seller_id || 'ed3a7a39-3df0-4b2f-8d52-0d37e1f050a8', // ATTENTION: Hardcoded ID. Remplacez par une valeur dynamique en production
      title: carData.title,
      brand: carData.brand,
      model: carData.model,
      year: parseInt(String(carData.year), 10),
      mileage: parseInt(String(carData.mileage), 10),
      body_type: carData.body_type || null,
      doors: carData.doors ? parseInt(String(carData.doors), 10) : null,
      seats: carData.seats ? parseInt(String(carData.seats), 10) : null,
      exterior_color: carData.exterior_color || null,
      interior_color: carData.interior_color || null,
      status: ['new', 'used', 'demo'].includes(lowerStatus)
        ? lowerStatus
        : 'used', // Par défaut 'used' si invalide ou undefined
      seller_type: ['pro', 'individual'].includes(lowerSellerType)
        ? lowerSellerType
        : 'pro', // Par défaut 'pro' si invalide ou undefined
      city: carData.city || null,
      postal_code: carData.postal_code || null,
      price: parseFloat(String(carData.price)),
      description: carData.description || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Valider les champs requis pour 'cars'
    if (
      !carInsertData.title ||
      !carInsertData.brand ||
      !carInsertData.model ||
      isNaN(carInsertData.year) ||
      isNaN(carInsertData.mileage) ||
      isNaN(carInsertData.price)
    ) {
      throw new Error('Champs requis manquants ou invalides pour la table cars');
    }

    console.log('Données à insérer dans cars:', carInsertData);
    // Insérer dans la table 'cars'
    const { data: car, error: carError } = await supabase
      .from('cars')
      .insert([carInsertData])
      .select('id')
      .single();

    if (carError) {
      console.error("Erreur d'insertion dans cars:", carError);
      throw new Error(`Échec de l'insertion de la voiture: ${carError.message}`);
    }
    if (!car) {
       throw new Error("Aucun ID retourné après l'insertion de la voiture.");
    }
    const carId = car.id;
    console.log('Voiture insérée avec ID:', carId);

    // Étape 2 : Préparer et insérer les données pour 'technical_details' si fournies
    if (carData.technicalDetails) {
      // Utilisation de l'opérateur nullish coalescing (??) pour transmission
      const lowerTransmission = carData.technicalDetails.transmission?.toLowerCase() ?? '';

      const technicalDetails = {
        car_id: carId,
        fuel_type: carData.technicalDetails.fuel_type || null,
        fiscal_power: carData.technicalDetails.fiscal_power
          ? parseInt(String(carData.technicalDetails.fiscal_power), 10)
          : null,
        din_power: carData.technicalDetails.din_power
          ? parseInt(String(carData.technicalDetails.din_power), 10)
          : null,
        displacement: carData.technicalDetails.displacement
          ? parseInt(String(carData.technicalDetails.displacement), 10)
          : null,
        transmission: ['manual', 'automatic'].includes(lowerTransmission)
          ? lowerTransmission
          : null, // Par défaut null si invalide ou undefined
        gears: carData.technicalDetails.gears
          ? parseInt(String(carData.technicalDetails.gears), 10)
          : null,
        drive_type: carData.technicalDetails.drive_type || null,
        euro_standard: carData.technicalDetails.euro_standard || null,
        fuel_consumption: carData.technicalDetails.fuel_consumption
          ? parseFloat(String(carData.technicalDetails.fuel_consumption))
          : null,
        co2_emissions: carData.technicalDetails.co2_emissions
          ? parseInt(String(carData.technicalDetails.co2_emissions), 10)
          : null,
      };

      console.log('Données à insérer dans technical_details:', technicalDetails);
      // Insérer dans 'technical_details'
      const { error: techError } = await supabase
        .from('technical_details')
        .insert([technicalDetails]);

      if (techError) {
        console.error("Erreur d'insertion dans technical_details:", techError);
        throw new Error(`Échec de l'insertion des détails techniques: ${techError.message}`);
      }
      console.log('Détails techniques insérés.');
    } else {
        console.log('Pas de détails techniques à insérer.');
    }

    // Étape 3 : Préparer et insérer les données pour 'mechanical_inspection' si fournies
    if (carData.mechanicalInspection) {
      // Utilisation de l'opérateur optional chaining (?.) pour accéder aux sous-propriétés
      const mechanicalInspection = {
        car_id: carId,
        // Pneus
        tires_front_left_brand: carData.mechanicalInspection.tires?.frontLeftBrand || null,
        tires_front_left_dimensions: carData.mechanicalInspection.tires?.frontLeftDimensions || null,
        tires_front_left_type: carData.mechanicalInspection.tires?.frontLeftType || null,
        tires_front_left_depth: carData.mechanicalInspection.tires?.frontLeftDepth
          ? parseFloat(String(carData.mechanicalInspection.tires.frontLeftDepth))
          : null,
        tires_front_right_brand: carData.mechanicalInspection.tires?.frontRightBrand || null,
        tires_front_right_dimensions: carData.mechanicalInspection.tires?.frontRightDimensions || null,
        tires_front_right_type: carData.mechanicalInspection.tires?.frontRightType || null,
        tires_front_right_depth: carData.mechanicalInspection.tires?.frontRightDepth
          ? parseFloat(String(carData.mechanicalInspection.tires.frontRightDepth))
          : null,
        tires_rear_left_brand: carData.mechanicalInspection.tires?.rearLeftBrand || null,
        tires_rear_left_dimensions: carData.mechanicalInspection.tires?.rearLeftDimensions || null,
        tires_rear_left_type: carData.mechanicalInspection.tires?.rearLeftType || null,
        tires_rear_left_depth: carData.mechanicalInspection.tires?.rearLeftDepth
          ? parseFloat(String(carData.mechanicalInspection.tires.rearLeftDepth))
          : null,
        tires_rear_right_brand: carData.mechanicalInspection.tires?.rearRightBrand || null,
        tires_rear_right_dimensions: carData.mechanicalInspection.tires?.rearRightDimensions || null,
        tires_rear_right_type: carData.mechanicalInspection.tires?.rearRightType || null,
        tires_rear_right_depth: carData.mechanicalInspection.tires?.rearRightDepth
          ? parseFloat(String(carData.mechanicalInspection.tires.rearRightDepth))
          : null,
        // Freins
        brakes_front_discs_condition: carData.mechanicalInspection.brakes?.frontDiscsCondition || null,
        brakes_front_pads_condition: carData.mechanicalInspection.brakes?.frontPadsCondition || null,
        brakes_front_calipers_condition: carData.mechanicalInspection.brakes?.frontCalipersCondition || null,
        brakes_rear_discs_condition: carData.mechanicalInspection.brakes?.rearDiscsCondition || null,
        brakes_rear_pads_condition: carData.mechanicalInspection.brakes?.rearPadsCondition || null,
        brakes_rear_calipers_condition: carData.mechanicalInspection.brakes?.rearCalipersCondition || null,
        brakes_parking_condition: carData.mechanicalInspection.brakes?.parkingCondition || null,
        brakes_abs_functional:
          carData.mechanicalInspection.brakes?.absFunctional === 'Oui'
            ? true
            : carData.mechanicalInspection.brakes?.absFunctional === 'Non'
            ? false
            : null,
        brakes_esp_functional:
          carData.mechanicalInspection.brakes?.espFunctional === 'Oui'
            ? true
            : carData.mechanicalInspection.brakes?.espFunctional === 'Non'
            ? false
            : null,
        // Distribution
        distribution_type: carData.mechanicalInspection.distribution?.type || null,
        distribution_condition: carData.mechanicalInspection.distribution?.condition || null,
        distribution_last_service_km: carData.mechanicalInspection.distribution?.lastServiceKm
          ? parseInt(String(carData.mechanicalInspection.distribution.lastServiceKm), 10)
          : null,
        distribution_next_service_km: carData.mechanicalInspection.distribution?.nextServiceKm
          ? parseInt(String(carData.mechanicalInspection.distribution.nextServiceKm), 10)
          : null,
        // Moteur
        engine_type: carData.mechanicalInspection.engine?.type || null,
        engine_displacement: carData.mechanicalInspection.engine?.displacement
          ? parseInt(String(carData.mechanicalInspection.engine.displacement), 10)
          : null,
        engine_power: carData.mechanicalInspection.engine?.power
          ? parseInt(String(carData.mechanicalInspection.engine.power), 10)
          : null,
        engine_torque: carData.mechanicalInspection.engine?.torque
          ? parseInt(String(carData.mechanicalInspection.engine.torque), 10)
          : null,
        engine_oil_level: carData.mechanicalInspection.engine?.oilLevel || null,
        engine_coolant_level: carData.mechanicalInspection.engine?.coolantLevel || null,
        engine_belt_condition: carData.mechanicalInspection.engine?.beltCondition || null,
        engine_error_codes: carData.mechanicalInspection.engine?.errorCodes || null,
        // Châssis
        chassis_steering_type: carData.mechanicalInspection.chassis?.steeringType || null,
        chassis_steering_condition: carData.mechanicalInspection.chassis?.steeringCondition || null,
        chassis_geometry: carData.mechanicalInspection.chassis?.geometry || null,
        chassis_front_suspension: carData.mechanicalInspection.chassis?.frontSuspension || null,
        chassis_rear_suspension: carData.mechanicalInspection.chassis?.rearSuspension || null,
        chassis_springs_condition: carData.mechanicalInspection.chassis?.springsCondition || null,
        chassis_transmission_condition: carData.mechanicalInspection.chassis?.transmissionCondition || null,
        // Test de conduite
        drive_test_acceleration: carData.mechanicalInspection.driveTest?.acceleration || null,
        drive_test_braking: carData.mechanicalInspection.driveTest?.braking || null,
        drive_test_handling: carData.mechanicalInspection.driveTest?.handling || null,
        drive_test_comfort: carData.mechanicalInspection.driveTest?.comfort || null,
        drive_test_sound_insulation: carData.mechanicalInspection.driveTest?.soundInsulation || null,
        drive_test_driving_aids: carData.mechanicalInspection.driveTest?.drivingAids || null,
        drive_test_notes: carData.mechanicalInspection.driveTest?.notes || null,
        updated_at: new Date().toISOString(), // Mise à jour de la date lors de l'insertion/modification de l'inspection
      };

      console.log("Données à insérer dans mechanical_inspection:", mechanicalInspection);
      const { error: mechError } = await supabase
        .from('mechanical_inspection')
        .insert([mechanicalInspection]);

      if (mechError) {
        console.error("Erreur d'insertion dans mechanical_inspection:", mechError);
        throw new Error(`Échec de l'insertion de l'inspection mécanique: ${mechError.message}`);
      }
      console.log('Inspection mécanique insérée.');
    } else {
        console.log("Pas d'inspection mécanique à insérer.");
    }

    // Étape 4 : Préparer et insérer les données pour 'maintenance_history' si fournies
    if (carData.maintenanceHistory && carData.maintenanceHistory.length > 0) {
      const maintenanceHistory = carData.maintenanceHistory.map((event) => {
         // Valider les champs requis pour chaque événement AVANT de créer l'objet
        if (!event.date || event.kilometers === undefined || event.kilometers === null || !event.type) {
          console.error("Événement d'historique invalide:", event);
          throw new Error("Champs requis manquants ou invalides dans un événement de l'historique de maintenance");
        }
         const kilometers = parseInt(String(event.kilometers), 10);
         if (isNaN(kilometers)) {
             console.error("Kilométrage invalide dans l'historique:", event.kilometers);
             throw new Error(`Kilométrage invalide '${event.kilometers}' dans l'historique de maintenance`);
         }

        return {
            car_id: carId,
            date: event.date, // Assurez-vous que c'est un format de date valide (ex: ISO string)
            kilometers: kilometers,
            type: event.type,
            location: event.location || null,
            created_at: new Date().toISOString(),
          };
      });


      console.log("Données à insérer dans maintenance_history:", maintenanceHistory);
      const { error: maintError } = await supabase
        .from('maintenance_history')
        .insert(maintenanceHistory);

      if (maintError) {
        console.error("Erreur d'insertion dans maintenance_history:", maintError);
        throw new Error(`Échec de l'insertion de l'historique de maintenance: ${maintError.message}`);
      }
      console.log('Historique de maintenance inséré.');
    } else {
        console.log("Pas d'historique de maintenance à insérer.");
    }

    // Étape 5 : Enregistrer les photos dans la base de données si fournies
    if (carData.photos && carData.photos.length > 0) {
      const photoInserts = carData.photos.map((photo, index) => {
        if (!photo.url) {
            console.error("URL de photo manquante:", photo, "à l'index", index);
            throw new Error(`URL manquante pour la photo à l'index ${index}`);
        }
        return {
            car_id: carId,
            url: photo.url,
            order: index, // Utiliser l'index comme ordre par défaut
            created_at: new Date().toISOString(),
        };
      });

      console.log("Données à insérer dans photos:", photoInserts);
      const { error: photoError } = await supabase.from('photos').insert(photoInserts);

      if (photoError) {
        console.error("Erreur d'insertion dans photos:", photoError);
        throw new Error(`Échec de l'insertion des photos: ${photoError.message}`);
      }
      console.log('Photos insérées.');
    } else {
        console.log('Pas de photos à insérer.');
    }

    console.log('Création de la voiture terminée avec succès. ID:', carId);
    return carId;
  } catch (error) {
    console.error('Erreur globale lors de la création de la voiture:', error);
    // Il est important de rejeter l'erreur pour que l'appelant sache que l'opération a échoué.
    throw error;
  }
}

/**
 * Récupère toutes les voitures depuis la vue 'car_details'.
 * @returns Liste des voitures.
 * @throws Error si la requête échoue.
 */
export async function getAllCars(): Promise<Car[]> {
  console.log("Récupération de toutes les voitures depuis 'car_details'...");
  const { data, error } = await supabase.from('car_details').select('*');

  if (error) {
    console.error("Erreur lors de la récupération de toutes les voitures:", error);
    throw error;
  }
  console.log(`Récupéré ${data?.length ?? 0} voitures.`);
  return data || [];
}

/**
 * Récupère une voiture spécifique par son ID avec les détails associés.
 * @param id L'ID de la voiture.
 * @returns La voiture avec ses détails ou null si non trouvée.
 * @throws Error si la requête échoue ou si l'ID n'est pas trouvé (avec .single()).
 */
export async function getCarById(id: string): Promise<Car | null> {
  console.log(`Récupération de la voiture ID: ${id} depuis 'car_details'...`);
  const { data, error } = await supabase
    .from('car_details') // Assurez-vous que 'car_details' inclut bien les colonnes des autres tables via JOINs ou qu'elles sont requêtées séparément si besoin.
    .select(`
      *,
      photos(*),
      maintenance_history(*),
      mechanical_inspection(*)
    `) // Si 'car_details' est une VUE qui contient déjà TOUT, le select '*' suffit peut-être. Sinon, cette syntaxe charge les relations.
    .eq('id', id)
    .maybeSingle(); // Utiliser maybeSingle() pour retourner null si non trouvé, au lieu de lever une erreur.

  if (error) {
    console.error(`Erreur lors de la récupération de la voiture ID ${id}:`, error);
    throw error; // Ou gérez l'erreur différemment si nécessaire
  }

  if (!data) {
    console.log(`Voiture ID ${id} non trouvée.`);
  } else {
    console.log(`Voiture ID ${id} trouvée.`);
  }

  return data; // Retourne les données de la voiture ou null
}

// Exemple d'utilisation (à placer dans un fichier de test ou un composant)
/*
async function testCreateCar() {
  const newCarData: CarData = {
    title: 'Superbe Voiture Test',
    brand: 'MarqueTest',
    model: 'ModeleTest',
    year: 2022,
    mileage: 15000,
    price: 25000,
    // seller_id: '...', // Laissez Supabase RLS ou une fonction d'auth le définir si possible
    status: 'used',
    seller_type: 'pro',
    city: 'Testville',
    postal_code: '12345',
    description: 'Une voiture de test pour vérifier la fonction createCar.',
    technicalDetails: {
      fuel_type: 'essence',
      fiscal_power: 7,
      din_power: 130,
      transmission: 'manual',
      gears: 6,
      co2_emissions: 120
    },
    mechanicalInspection: {
        tires: { frontLeftBrand: "Michelin" },
        brakes: { absFunctional: "Oui", espFunctional: "Oui" }
    },
    maintenanceHistory: [
      { date: '2023-01-15', kilometers: 10000, type: 'Vidange', location: 'GarageTest' }
    ],
    photos: [
      { url: 'https://example.com/photo1.jpg' },
      { url: 'https://example.com/photo2.jpg' }
    ]
  };

  try {
    const carId = await createCar(newCarData);
    console.log(`Voiture créée avec succès, ID: ${carId}`);

    const fetchedCar = await getCarById(carId);
    console.log('Voiture récupérée:', fetchedCar);

  } catch (error) {
    console.error('Échec du test:', error);
  }
}

// testCreateCar(); // Décommentez pour tester
*/