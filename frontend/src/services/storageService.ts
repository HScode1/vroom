import { supabase } from '../lib/supabase';

export async function uploadCarImage(file: File, carId: string, order = 0): Promise<string> {
  console.log('Uploading file:', file.name, 'for car:', carId);
  const fileExt = file.name.split('.').pop();
  const fileName = `${carId}_${Date.now()}_${order}.${fileExt}`;
  const filePath = `cars/${carId}/${fileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from('car-photos')
    .upload(filePath, file);
  
  if (uploadError) {
    console.error("Erreur d'upload dans Supabase:", uploadError);
    throw uploadError;
  }
  
  const { data } = supabase.storage.from('car-photos').getPublicUrl(filePath);
  console.log('URL retournée:', data.publicUrl);
  return data.publicUrl;
}
