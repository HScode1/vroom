// src/app/(workspace)/transactions/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface Transaction {
  id: string;
  car_id: string | null;
  buyer_id: string | null;
  seller_id: string | null;
  amount: number;
  stripe_payment_id: string | null;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

const TransactionManagementPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Authorization check
  useEffect(() => {
    if (isLoaded && (!user || user.publicMetadata.role !== 'admin')) {
      router.push('/'); // Redirect non-admins
    }
  }, [user, isLoaded, router]);

  // Fetch transactions
  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      try {
        let query = supabase.from('transactions').select('*');
        if (activeFilter !== 'all') {
          query = query.eq('status', activeFilter);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        setTransactions(data || []);
      } catch (err) {
        setError('Erreur lors du chargement des transactions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (isLoaded && user?.publicMetadata.role === 'admin') {
      fetchTransactions();
    }
  }, [activeFilter, isLoaded, user]);

  // Update transaction status
  const updateStatus = async (id: string, newStatus: 'pending' | 'completed' | 'failed') => {
    try {
      const { error } = await supabase
        .from('transactions')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;
      setTransactions(prev =>
        prev.map(t => (t.id === id ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      setError('Erreur lors de la mise à jour du statut');
      console.error(err);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#C8EC66]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">{error}</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Transactions</h1>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'pending', 'completed', 'failed'].map(status => (
          <motion.button
            key={status}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(status)}
            className={`px-4 py-2 rounded-full font-medium ${
              activeFilter === status ? 'bg-[#C8EC66] text-black' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'Toutes' : status.charAt(0).toUpperCase() + status.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voiture</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acheteur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendeur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.id.slice(0, 8)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.car_id?.slice(0, 8) || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.buyer_id?.slice(0, 8) || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.seller_id?.slice(0, 8) || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount.toLocaleString('fr-FR')} €</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status === 'pending' ? 'En attente' : 
                       transaction.status === 'completed' ? 'Complété' : 'Échoué'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={transaction.status}
                      onChange={(e) => updateStatus(transaction.id, e.target.value as 'pending' | 'completed' | 'failed')}
                      className="border rounded-md px-2 py-1 focus:ring-2 focus:ring-[#C8EC66] focus:border-transparent"
                    >
                      <option value="pending">En attente</option>
                      <option value="completed">Complété</option>
                      <option value="failed">Échoué</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {transactions.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Aucune transaction trouvée pour ce statut.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionManagementPage;