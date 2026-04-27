import { requireSupabase } from '../lib/supabase';

export async function createOrder(clientId, order) {
  const db = requireSupabase();

  const { data, error } = await db
    .from('orders')
    .insert({
      client_id: clientId,
      customer_name: order.customerName,
      customer_phone: order.customerPhone,
      items: order.items || [],
      total_amount: order.totalAmount || 0,
      status: order.status || 'new',
      source: order.source || 'website',
      notes: order.notes || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function listOrders(clientId) {
  const db = requireSupabase();

  const { data, error } = await db
    .from('orders')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
