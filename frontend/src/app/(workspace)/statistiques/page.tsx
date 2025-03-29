// src/app/(workspace)/statistics/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the structure for sales data items
interface SalesDataItem {
  month: string;
  sales: number;
}

const StatisticsPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [stats, setStats] = useState({ totalCarsSold: 0, totalRevenue: 0, totalUsers: 0 });
  // Explicitly type the salesData state
  const [salesData, setSalesData] = useState<SalesDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verification of administrator access
  useEffect(() => {
    if (isLoaded && !user) {
      // If loading is done and there's no user, redirect to login/home
      router.push('/');
    } else if (isLoaded && user && user.publicMetadata.role !== 'admin') {
      // If loading is done, user exists but is not admin, redirect to home
      console.warn('Access denied: User is not an admin.');
      router.push('/');
    }
    // No changes needed in dependencies: [user, isLoaded, router]
  }, [user, isLoaded, router]);

  // Data retrieval
  useEffect(() => {
    // Only fetch data if the user is loaded and is an admin
    if (isLoaded && user?.publicMetadata.role === 'admin') {
      setLoading(true);
      setError(null);

      async function fetchStats() {
        try {
          // Fetch count of sold cars
          const { count: carsSoldCount, error: carsError } = await supabase
            .from('cars')
            .select('*', { count: 'exact', head: true }) // Use head:true for count only
            .eq('sold', true);

          if (carsError) throw new Error(`Error fetching sold cars count: ${carsError.message}`);

          // Fetch completed transactions data
          const { data: revenueData, error: revenueError } = await supabase
            .from('transactions')
            .select('amount')
            .eq('status', 'completed');

          if (revenueError) throw new Error(`Error fetching revenue: ${revenueError.message}`);

          // Calculate total revenue - use ?? 0 to handle null or empty array
          const totalRevenue = revenueData?.reduce((acc, curr) => acc + (curr.amount || 0), 0) ?? 0;

          // Fetch count of users
          // Assuming you have a 'users' table or similar managed elsewhere (Clerk handles users, maybe you sync them?)
          // If you don't have a separate 'users' table synced, this might not be the correct way.
          // Let's assume a 'profiles' table linked to auth.users.id
          // Replace 'users' with your actual table name if different (e.g., 'profiles')
          const { count: usersCount, error: usersError } = await supabase
            .from('profiles') // ADJUST 'profiles' TO YOUR ACTUAL USER TABLE NAME if needed
            .select('*', { count: 'exact', head: true }); // Fetch only count

          if (usersError) throw new Error(`Error fetching users count: ${usersError.message}`);


          setStats({
            totalCarsSold: carsSoldCount ?? 0, // Use nullish coalescing for safety
            totalRevenue: totalRevenue,
            totalUsers: usersCount ?? 0, // Use nullish coalescing for safety
          });

          // Dummy data for the chart (replace with your actual data fetching logic)
          // TODO: Replace with actual monthly sales data fetch from 'transactions' or 'cars' table
          setSalesData([
            { month: 'Jan', sales: 4000 },
            { month: 'Fév', sales: 3000 }, // Fév is a standard French abbreviation for Février
            { month: 'Mar', sales: 5000 },
            { month: 'Avr', sales: 2500 }, // Added more example data
            { month: 'Mai', sales: 6000 },
          ]);

        } catch (err) {
          console.error("Error fetching statistics:", err);
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      }
      fetchStats();
    } else if (isLoaded) {
      // If loaded but not admin (or no user), set loading to false
      setLoading(false);
    }
    // Fetch should re-run if the user or loading status changes.
  }, [isLoaded, user]);

  // Display loading or error state
  if (loading && isLoaded && user?.publicMetadata.role === 'admin') {
    return <div className="p-6 text-center">Chargement des statistiques...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Erreur: {error}</div>;
  }

  // Don't render anything sensitive if the user isn't confirmed as admin yet or isn't admin
  if (!isLoaded || !user || user.publicMetadata.role !== 'admin') {
      // Optionally show a loading or restricted access message,
      // but the redirect should handle it. Returning null avoids flicker.
      return null;
  }


  // Render the statistics page for admin
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Statistiques</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Voitures Vendues</h2>
          <p className="text-4xl font-bold text-gray-900">{stats.totalCarsSold}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Revenu Total</h2>
          <p className="text-4xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Utilisateurs Enregistrés</h2>
          <p className="text-4xl font-bold text-gray-900">{stats.totalUsers}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ventes Mensuelles (Exemple)</h2>
        {/* Make chart responsive */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
              formatter={(value: number) => [`${value.toLocaleString('fr-FR')} €`, 'Ventes']}
             />
            <Legend />
            <Bar dataKey="sales" fill="#82ca9d" name="Ventes" radius={[4, 4, 0, 0]} /> {/* Updated color and added radius */}
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-500 mt-4">Note: Les données du graphique sont actuellement des exemples.</p>
      </div>
    </div>
  );
};

export default StatisticsPage;