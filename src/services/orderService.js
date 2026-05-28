import { requireSupabase } from '../lib/supabase';

function assertTenantId(tenantId) {
  if (!tenantId) throw new Error('tenant_id is required.');
}

export async function createOrder(tenantId, order) {
  assertTenantId(tenantId);
  const db = requireSupabase();

  const { data, error } = await db
    .from('orders')
    .insert({
      tenant_id: tenantId,
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

export async function listOrders(tenantId) {
  assertTenantId(tenantId);
  const db = requireSupabase();

  const { data, error } = await db
    .from('orders')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
