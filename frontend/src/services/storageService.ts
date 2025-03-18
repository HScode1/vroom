import { supabase } from '../lib/supabase';

export async function uploadCarImage(file: File, carId: string, order = 0): Promise<string> {
  if (!file) {
    throw new Error("Aucun fichier fourni pour l'upload");
  }
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${carId}_${Date.now()}_${order}.${fileExt}`;
  const filePath = `cars/${carId}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('photos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) {
    console.error("Erreur d'upload :", uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('photos')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

