// src/app/(workspace)/cars/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Interface pour une voiture
interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  sold: boolean;
}

const CarManagementPage = () => {
  const { user, isLoaded } = useUser(); // Authentification avec Clerk
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]); // Liste des voitures
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs

  // Vérifier si l'utilisateur est un administrateur
  useEffect(() => {
    if (isLoaded && (!user || user.publicMetadata.role !== 'admin')) {
      router.push('/'); // Rediriger si pas admin
    }
  }, [user, isLoaded, router]);

  // Récupérer les voitures depuis Supabase
  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setCars(data || []);
      } catch (err) {
        setError('Erreur lors du chargement des voitures');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (isLoaded && user?.publicMetadata.role === 'admin') {
      fetchCars();
    }
  }, [isLoaded, user]);

  // Fonction pour marquer une voiture comme vendue
  const markAsSold = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cars')
        .update({ sold: true })
        .eq('id', id);
      if (error) throw error;
      setCars(prev =>
        prev.map(car => (car.id === id ? { ...car, sold: true } : car))
      );
    } catch (err) {
      setError('Erreur lors de la mise à jour du statut');
      console.error(err);
    }
  };

  // Affichage pendant le chargement
  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8EC66]" />
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  // Interface principale
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Voitures</h1>

      {/* Tableau des voitures */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modèle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Année
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cars.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {car.make}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {car.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {car.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        car.sold ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {car.sold ? 'Vendue' : 'Disponible'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {!car.sold && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => markAsSold(car.id)}
                        className="px-3 py-1 bg-[#C8EC66] text-black rounded-md font-medium"
                      >
                        Marquer comme vendue
                      </motion.button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {cars.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Aucune voiture trouvée.
          </div>
        )}
      </div>
    </div>
  );
};

export default CarManagementPage;