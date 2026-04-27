import { requireSupabase } from '../lib/supabase';

const starterProductsBySystem = {
  'Food Preorder': [
    { name: 'Nasi Lemak Set', price: 8.9, stock: 50, status: 'active' },
    { name: 'Kuih Box', price: 18, stock: 30, status: 'active' },
    { name: 'Ayam Penyet', price: 14.9, stock: 40, status: 'active' },
  ],
  'Product Order': [
    { name: 'Starter Product', price: 49, stock: 20, status: 'active' },
    { name: 'Premium Product', price: 129, stock: 10, status: 'active' },
  ],
  POS: [
    { name: 'Counter Item', price: 6.9, stock: 100, status: 'active' },
    { name: 'Add-on Item', price: 2, stock: 100, status: 'active' },
  ],
};

export function getStarterProducts(systemName) {
  return starterProductsBySystem[systemName] || [
    { name: 'Sample Service', price: 150, stock: 1, status: 'active' },
    { name: 'Priority Add-on', price: 50, stock: 1, status: 'active' },
  ];
}

export async function createStarterProducts(clientId, systemName) {
  const db = requireSupabase();
  const rows = getStarterProducts(systemName).map(product => ({
    ...product,
    client_id: clientId,
  }));

  const { data, error } = await db.from('products').insert(rows).select();
  if (error) throw error;
  return data;
}

export async function listProducts(clientId) {
  const db = requireSupabase();
  const { data, error } = await db
    .from('products')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
