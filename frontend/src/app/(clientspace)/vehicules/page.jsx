'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Heart, MapPin, Star, Shield, CheckCircle, AlertCircle, Filter } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Cache pour les URL signées
const signedUrlCache = {};

async function getSignedUrl(photoUrl) {
  if (signedUrlCache[photoUrl]) {
    return signedUrlCache[photoUrl];
  }

  try {
    let path = photoUrl;
    if (path.includes('/storage/v1/object/public/')) {
      path = path.split('/storage/v1/object/public/')[1];
    }
    if (path.startsWith('car-photos/')) {
      path = path.replace('car-photos/', '');
    }

    const { data: signedUrlData, error: urlError } = await supabase
      .storage
      .from('car-photos')
      .createSignedUrl(path, 3600); // URL valide pendant 1 heure

    if (urlError) {
      console.error('Erreur création URL signée:', path, urlError);
      return '/placeholder-car.jpg';
    }

    const signedUrl = signedUrlData?.signedUrl || '/placeholder-car.jpg';
    signedUrlCache[photoUrl] = signedUrl;
    return signedUrl;
  } catch (error) {
    console.error('Exception création URL signée:', error);
    return '/placeholder-car.jpg';
  }
}

export default function CarListingPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    bodyType: '',
    fuelType: '',
  });
  const [sortBy, setSortBy] = useState('newest');
  const [showFiltersOnMobile, setShowFiltersOnMobile] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Fonction pour récupérer une voiture spécifique
  const fetchSpecificCar = useCallback(async (carId) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('car_details')
        .select('*, photos(url, order)')
        .eq('id', carId)
        .single();

      if (error) throw error;

      if (data && data.photos && data.photos.length > 0) {
        const sortedPhotos = [...data.photos].sort((a, b) => a.order - b.order);
        const mainPhotoUrl = await getSignedUrl(sortedPhotos[0].url);

        setCars([{ ...data, mainPhoto: mainPhotoUrl, photos: sortedPhotos }]);
      } else {
        setCars([{ ...data, mainPhoto: '/placeholder-car.jpg', photos: [] }]);
      }
    } catch (error) {
      console.error('Erreur chargement voiture spécifique:', error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fonction pour récupérer toutes les voitures avec pagination
  const fetchCars = useCallback(
    async (currentPage = 1) => {
      setLoading(true);
      try {
        let query = supabase
          .from('car_details')
          .select('*, photos(url, order)')
          .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

        // Appliquer les filtres
        if (filters.brand) query = query.ilike('brand', `%${filters.brand}%`);
        if (filters.minPrice) query = query.gte('price', parseInt(filters.minPrice, 10));
        if (filters.maxPrice) query = query.lte('price', parseInt(filters.maxPrice, 10));
        if (filters.minYear) query = query.gte('year', parseInt(filters.minYear, 10));
        if (filters.maxYear) query = query.lte('year', parseInt(filters.maxYear, 10));
        if (filters.bodyType) query = query.eq('body_type', filters.bodyType);
        if (filters.fuelType) query = query.eq('fuel_type', filters.fuelType);

        // Appliquer le tri
        if (sortBy === 'price-asc') query = query.order('price', { ascending: true });
        else if (sortBy === 'price-desc') query = query.order('price', { ascending: false });
        else if (sortBy === 'mileage') query = query.order('mileage', { ascending: true });
        else if (sortBy === 'year') query = query.order('year', { ascending: false });
        else query = query.order('created_at', { ascending: false });

        const { data, error } = await query;
        if (error) throw error;

        const carsWithSignedPhotos = await Promise.all(
          (data || []).map(async (car) => {
            const sortedPhotos = car.photos ? [...car.photos].sort((a, b) => a.order - b.order) : [];
            let mainPhoto = '/placeholder-car.jpg';
            if (sortedPhotos.length > 0) {
              mainPhoto = await getSignedUrl(sortedPhotos[0].url);
            }
            return { ...car, mainPhoto, photos: sortedPhotos };
          })
        );

        setCars(carsWithSignedPhotos);
      } catch (error) {
        console.error('Erreur chargement voitures:', error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    },
    [filters, sortBy]
  );

  // Chargement initial et gestion des changements
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const carId = queryParams.get('carId');

    if (carId && cars.length === 0) {
      fetchSpecificCar(carId);
    } else {
      fetchCars(page);
    }
  }, [fetchCars, fetchSpecificCar, page, cars.length]);

  // Gestion des filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); // Réinitialiser à la première page lors du changement de filtres
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      bodyType: '',
      fuelType: '',
    });
    setSortBy('newest');
    setPage(1);
  };

  const toggleFiltersOnMobile = () => {
    setShowFiltersOnMobile(!showFiltersOnMobile);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header modernisé */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-10"
      >
        <div className="h-16 container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#C8EC66] rounded-full mr-3 flex items-center justify-center">
              <span className="text-gray-800 font-bold">A</span>
            </div>
            <h1 className="text-xl font-bold">Auto Market</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="font-medium hover:text-[#C8EC66] transition-colors">
              Accueil
            </a>
            <a href="#" className="font-medium hover:text-[#C8EC66] transition-colors">
              Véhicules
            </a>
            <a href="#" className="font-medium hover:text-[#C8EC66] transition-colors">
              Services
            </a>
            <a href="#" className="font-medium hover:text-[#C8EC66] transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </motion.header>

      {/* Padding pour compenser le header fixe */}
      <div className="pt-16">
        {/* Barre de recherche */}
        <div className="bg-white py-6 border-b border-gray-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Rechercher une voiture par marque, modèle..."
                className="w-full py-3 px-4 pr-12 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#C8EC66] focus:border-[#C8EC66] text-gray-800"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Bouton filtre mobile */}
          <div className="md:hidden mb-4">
            <button
              onClick={toggleFiltersOnMobile}
              className="w-full flex items-center justify-center space-x-2 bg-[#C8EC66] text-gray-800 font-medium py-3 px-4 rounded-xl shadow-sm"
            >
              <Filter className="w-5 h-5" />
              <span>{showFiltersOnMobile ? 'Masquer les filtres' : 'Afficher les filtres'}</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filtres */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`md:w-1/4 ${showFiltersOnMobile ? 'block' : 'hidden md:block'}`}
            >
              <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 sticky top-20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <span className="w-1 h-6 bg-[#C8EC66] rounded mr-2"></span>
                    Filtres
                  </h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm font-medium text-[#C8EC66] hover:underline transition-colors"
                  >
                    Effacer tout
                  </button>
                </div>
                <div className="space-y-6">
                  {/* Marque */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
                    <input
                      type="text"
                      name="brand"
                      placeholder="Ex: Peugeot"
                      value={filters.brand || ''}
                      onChange={handleFilterChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C8EC66] focus:border-[#C8EC66] bg-white shadow-sm"
                    />
                  </div>

                  {/* Prix */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        name="minPrice"
                        placeholder="Min €"
                        value={filters.minPrice || ''}
                        onChange={handleFilterChange}
                        className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C8EC66] focus:border-[#C8EC66] shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max €"
                        value={filters.maxPrice || ''}
                        onChange={handleFilterChange}
                        className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C8EC66] focus:border-[#C8EC66] shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>

                  {/* Année */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        name="minYear"
                        placeholder="Min"
                        value={filters.minYear || ''}
                        onChange={handleFilterChange}
                        className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C8EC66] focus:border-[#C8EC66] shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <input
                        type="number"
                        name="maxYear"
                        placeholder="Max"
                        value={filters.maxYear || ''}
                        onChange={handleFilterChange}
                        className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C8EC66] focus:border-[#C8EC66] shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>

                  {/* Type de véhicule */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de véhicule</label>
                    <select
                      name="bodyType"
                      value={filters.bodyType || ''}
                      onChange={handleFilterChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C8EC66] focus:border-[#C8EC66] bg-white shadow-sm"
                    >
                      <option value="">Tous les types</option>
                      <option value="Berline">Berline</option>
                      <option value="SUV">SUV</option>
                      <option value="Break">Break</option>
                      <option value="Citadine">Citadine</option>
                      <option value="4x4">4x4</option>
                      <option value="Utilitaire">Utilitaire</option>
                      <option value="Coupé">Coupé</option>
                      <option value="Cabriolet">Cabriolet</option>
                    </select>
                  </div>

                  {/* Carburant */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Carburant</label>
                    <select
                      name="fuelType"
                      value={filters.fuelType || ''}
                      onChange={handleFilterChange}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C8EC66] focus:border-[#C8EC66] bg-white shadow-sm"
                    >
                      <option value="">Tous les carburants</option>
                      <option value="Essence">Essence</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybride">Hybride</option>
                      <option value="Électrique">Électrique</option>
                      <option value="GPL">GPL</option>
                    </select>
                  </div>

                  {/* Bouton d'application des filtres (mobile) */}
                  <button
                    className="md:hidden w-full bg-[#C8EC66] hover:bg-[#b8dc56] text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors shadow-sm mt-4"
                    onClick={() => fetchCars(1)}
                  >
                    Appliquer les filtres
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Liste des voitures */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-3/4"
            >
              <div className="bg-white p-6 rounded-2xl shadow-md mb-6 border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                      <span className="w-2 h-8 bg-[#C8EC66] rounded mr-2"></span>
                      Nos voitures d'occasion
                    </h1>
                    <p className="text-gray-600 mt-1">
                      {loading ? 'Chargement...' : `${cars.length} résultat${cars.length !== 1 ? 's' : ''}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <label className="text-sm font-medium text-gray-700">Trier par:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex-grow md:flex-grow-0 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C8EC66] focus:border-[#C8EC66] bg-white shadow-sm"
                    >
                      <option value="newest">Les plus récentes</option>
                      <option value="price-asc">Prix croissant</option>
                      <option value="price-desc">Prix décroissant</option>
                      <option value="mileage">Kilométrage croissant</option>
                      <option value="year">Année (du plus récent)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Indicateurs de qualité */}
              <div className="flex flex-wrap gap-4 mb-6">
                {[
                  { icon: CheckCircle, text: 'Voitures contrôlées' },
                  { icon: Shield, text: 'Garantie incluse' },
                  { icon: AlertCircle, text: 'Paiement sécurisé' },
                  { icon: Star, text: 'Meilleur prix garanti' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-md border border-gray-200 hover:border-[#C8EC66] transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-[#C8EC66]" />
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C8EC66]"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {cars.map((car, idx) => (
                      <CarCard key={car.id} car={car} index={idx} />
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {!loading && cars.length === 0 && (
                <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-8 border border-gray-200 mt-6">
                  <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun résultat trouvé</h3>
                  <p className="text-gray-600 text-center">
                    Aucune voiture ne correspond à vos critères de recherche. Essayez d'élargir vos filtres.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 bg-[#C8EC66] hover:bg-[#b8dc56] text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}

              {/* Bouton Charger plus */}
              {!loading && cars.length > 0 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setPage(page + 1)}
                    className="bg-[#C8EC66] text-gray-800 font-medium py-3 px-6 rounded-xl shadow-md hover:bg-[#b8dc56] transition-colors"
                  >
                    Charger plus
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant CarCard optimisé avec React.memo
const CarCard = React.memo(({ car, index }) => {
  const formatPrice = (price) => new Intl.NumberFormat('fr-FR').format(price);

  if (!car) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#C8EC66] w-full max-w-[400px] flex flex-col h-full transform hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {car.status === 'reserved' && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md z-10">
            RÉSERVÉE
          </div>
        )}
        <img
          src={car.mainPhoto || '/placeholder-car.jpg'}
          alt={`${car.brand || 'Voiture'} ${car.model || ''}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading={index < 6 ? 'eager' : 'lazy'} // Chargement eager pour les 6 premières, lazy pour les autres
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white z-10 shadow-sm"
          aria-label="Ajouter aux favoris"
        >
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
        </motion.button>

        {/* Badge prix */}
        <div className="absolute bottom-3 right-3 bg-[#C8EC66] text-gray-800 font-bold py-1 px-3 rounded-lg shadow-md">
          {formatPrice(car.price)} €
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-3">
          <Link href={`/cardetails/${car.id}`} className="hover:text-[#C8EC66] transition-colors group">
            <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:underline">
              {car.brand} {car.model}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mt-1 line-clamp-1">{car.title || car.version || ''}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-[#C8EC66] rounded-full mr-2"></span>
            <span className="text-gray-700">{car.year || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-[#C8EC66] rounded-full mr-2"></span>
            <span className="text-gray-700 capitalize">{car.transmission || 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-[#C8EC66] rounded-full mr-2"></span>
            <span className="text-gray-700">
              {car.mileage ? `${new Intl.NumberFormat('fr-FR').format(car.mileage)} km` : 'N/A'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-[#C8EC66] rounded-full mr-2"></span>
            <span className="text-gray-700 capitalize">{car.fuel_type || 'N/A'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1 text-[#C8EC66]" />
            <span>{car.city || 'N/A'}</span>
          </div>
          <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-lg capitalize">
            {car.seller_type || 'Professionnel'}
          </span>
        </div>
      </div>
    </motion.div>
  );
});