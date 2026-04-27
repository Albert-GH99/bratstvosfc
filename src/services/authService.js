import { requireSupabase } from '../lib/supabase';
import { createClientProfile, getClientByUser, linkClientUser } from './clientService';
import { createStarterProducts } from './productService';

export async function signupClientAccount(payload) {
  const db = requireSupabase();

  const { data: authData, error: authError } = await db.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        full_name: payload.ownerName,
        business_name: payload.businessName,
        phone: payload.phone,
        industry: payload.industry,
        selected_system: payload.selectedSystem,
        selected_package: payload.selectedPackage,
        maintenance_plan: payload.maintenancePlan || 'none',
      },
    },
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('Account was not created. Please try again.');

  if (!authData.session) {
    return {
      user: authData.user,
      session: authData.session,
      client: null,
      clientUser: null,
      products: [],
      needsEmailConfirmation: true,
    };
  }

  try {
    const existing = await getClientByUser(authData.user.id);
    return {
      user: authData.user,
      session: authData.session,
      client: existing.clients,
      clientUser: existing,
      products: [],
      needsEmailConfirmation: false,
    };
  } catch {
    // Fallback for projects that have not installed the auth trigger yet.
  }

  const client = await createClientProfile(payload);
  const clientUser = await linkClientUser({
    userId: authData.user.id,
    clientId: client.id,
    email: payload.email,
    ownerName: payload.ownerName,
  });
  const products = await createStarterProducts(client.id, payload.selectedSystem);

  return {
    user: authData.user,
    session: authData.session,
    client,
    clientUser,
    products,
    needsEmailConfirmation: !authData.session,
  };
}

export async function signInClient(email, password) {
  const db = requireSupabase();
  const { data, error } = await db.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOutClient() {
  const db = requireSupabase();
  const { error } = await db.auth.signOut();
  if (error) throw error;
}
