import { requireSupabase } from '../lib/supabase';

export async function createClientProfile(payload) {
  const db = requireSupabase();

  const { data, error } = await db
    .from('clients')
    .insert({
      business_name: payload.businessName,
      owner_name: payload.ownerName,
      email: payload.email,
      phone: payload.phone,
      industry: payload.industry,
      selected_system: payload.selectedSystem,
      selected_package: payload.selectedPackage,
      maintenance_plan: payload.maintenancePlan || 'none',
      status: 'onboarding',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function linkClientUser({ userId, clientId, email, ownerName }) {
  const db = requireSupabase();

  const { data, error } = await db
    .from('users')
    .upsert({
      id: userId,
      client_id: clientId,
      email,
      full_name: ownerName,
      role: 'owner',
      status: 'active',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getClientByUser(userId) {
  const db = requireSupabase();

  const { data, error } = await db
    .from('users')
    .select('client_id, role, clients(*)')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}
