'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  ChevronDown, Search, Heart, MapPin, Star, Shield, 
  Filter, ArrowUpDown, CheckCircle, AlertCircle 
} from 'lucide-react';
import Link from 'next/link';

// Composant principal pour la page de listings
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
    fuelType: ''
  });
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Check if there's a carId in the URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const carId = queryParams.get('carId');
    
    if (carId) {
      // If we have a carId, fetch just that specific car
      fetchSpecificCar(carId);
    } else {
      // Otherwise fetch all cars with filters
      fetchCars();
    }
  }, [filters, sortBy]);

  async function fetchSpecificCar(carId) {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('car_details')
        .select('*, photos(url, order)')
        .eq('id', carId)
        .single();
      
      if (error) {
        console.error('Error fetching specific car:', error);
        setCars([]);
      } else if (data) {
        setCars([data]);
      }
    } catch (error) {
      console.error('Error:', error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCars() {
    setLoading(true);
    
    try {
      let query = supabase
        .from('car_details')
        .select('*, photos(url, order)')
        .order('created_at', { ascending: false });
      
      // Appliquer les filtres
      if (filters.brand) {
        query = query.eq('brand', filters.brand);
      }
      
      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }
      
      if (filters.minYear) {
        query = query.gte('year', filters.minYear);
      }
      
      if (filters.maxYear) {
        query = query.lte('year', filters.maxYear);
      }
      
      if (filters.bodyType) {
        query = query.eq('body_type', filters.bodyType);
      }
      
      if (filters.fuelType) {
        query = query.eq('fuel_type', filters.fuelType);
      }
      
      // Appliquer le tri
      if (sortBy === 'price-asc') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'price-desc') {
        query = query.order('price', { ascending: false });
      } else if (sortBy === 'mileage') {
        query = query.order('mileage', { ascending: true });
      } else if (sortBy === 'year') {
        query = query.order('year', { ascending: false });
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Organiser les données des photos pour chaque voiture
      const carsWithPhotos = data.map(car => {
        const sortedPhotos = car.photos || [];
        sortedPhotos.sort((a, b) => a.order - b.order);
        
        return {
          ...car,
          mainPhoto: sortedPhotos.length > 0 ? sortedPhotos[0].url : '/placeholder-car.jpg'
        };
      });
      
      setCars(carsWithPhotos);
    } catch (error) {
      console.error('Erreur lors du chargement des voitures:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      bodyType: '',
      fuelType: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-2xl font-bold">CapCar</Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/acheter" className="hover:text-blue-200">
                Acheter une voiture
              </Link>
              <Link href="/vendre" className="hover:text-blue-200">
                Vendre ma voiture
              </Link>
              <Link href="/comment-ca-marche" className="hover:text-blue-200">
                Comment ça marche
              </Link>
              <Link href="/agents" className="hover:text-blue-200">
                Nos agents
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/favoris" className="hover:text-blue-200">
                <Heart className="w-5 h-5" />
              </Link>
              <Link href="/mon-compte" className="hover:text-blue-200">
                Mon compte
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Barre de recherche principale */}
      <div className="bg-blue-600 text-white pb-6">
        <div className="container mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une voiture par marque, modèle..."
              className="w-full py-3 px-4 pr-12 rounded-lg text-gray-800 focus:outline-none"
            />
            <Search className="absolute right-4 top-3 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtres */}
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Filtres</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Effacer tout
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Marque */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marque
                  </label>
                  <select
                    name="brand"
                    value={filters.brand}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Toutes les marques</option>
                    <option value="Peugeot">Peugeot</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="Renault">Renault</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Audi">Audi</option>
                    <option value="BMW">BMW</option>
                    <option value="Citroen">Citroen</option>
                  </select>
                </div>
                
                {/* Prix */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                {/* Année */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Année
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      name="minYear"
                      placeholder="Min"
                      value={filters.minYear}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="number"
                      name="maxYear"
                      placeholder="Max"
                      value={filters.maxYear}
                      onChange={handleFilterChange}
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                {/* Type de carrosserie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de véhicule
                  </label>
                  <select
                    name="bodyType"
                    value={filters.bodyType}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les types</option>
                    <option value="Berline">Berline</option>
                    <option value="SUV">SUV</option>
                    <option value="Break">Break</option>
                    <option value="Citadine">Citadine</option>
                    <option value="4x4">4x4</option>
                  </select>
                </div>
                
                {/* Type de carburant */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Carburant
                  </label>
                  <select
                    name="fuelType"
                    value={filters.fuelType}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les carburants</option>
                    <option value="Essence">Essence</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybride">Hybride</option>
                    <option value="Électrique">Électrique</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Liste des voitures */}
          <div className="md:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Nos voitures d'occasion</h1>
                  <p className="text-gray-600">
                    {cars.length} résultats
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium text-gray-700">Trier par:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="newest">Les plus récentes</option>
                      <option value="price-asc">Prix croissant</option>
                      <option value="price-desc">Prix décroissant</option>
                      <option value="mileage">Kilométrage</option>
                      <option value="year">Année</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Indicateurs de qualité */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-sm">Voitures contrôlées</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <Shield className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-sm">Garantie incluse</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-sm">Paiement sécurisé</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-sm">Meilleur prix garanti</span>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
            
            {!loading && cars.length === 0 && (
              <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun résultat trouvé</h3>
                <p className="text-gray-600 text-center">
                  Aucune voiture ne correspond à vos critères de recherche. Essayez d'élargir vos filtres.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant pour afficher une carte de voiture
function CarCard({ car }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {/* Badge réservé le cas échéant */}
      {car.status === 'reserved' && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          VOITURE RÉSERVÉE
        </div>
      )}
      
      {/* Image principale */}
      <div className="relative aspect-[4/3]">
        <img 
          src={car.mainPhoto} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {/* Contenu */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link href={`/voitures/${car.id}`} className="hover:underline">
              <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
            </Link>
            <p className="text-sm text-gray-600">{car.title}</p>
          </div>
          <div className="text-xl font-bold text-blue-600">{formatPrice(car.price)} €</div>
        </div>
        
        {/* Caractéristiques */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <span>{car.year}</span>
          </div>
          <div className="flex items-center">
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center">
            <span>{new Intl.NumberFormat('fr-FR').format(car.mileage)} km</span>
          </div>
          <div className="flex items-center">
            <span>{car.fuel_type}</span>
          </div>
        </div>
        
        {/* Localisation et type de vendeur */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{car.city || 'N/A'}</span>
          </div>
          <span className="text-sm font-medium">{car.seller_type || 'Professionnel'}</span>
        </div>
      </div>
    </div>
  );
}