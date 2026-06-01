import { requireSupabase } from '../lib/supabase';

export async function createClientProfile(payload) {
  const db = requireSupabase();

  const { data, error } = await db
    .from('clients')
    .insert({
      business_name: payload.businessName,
      owner_name: payload.ownerName,
      email: payload.email,
      whatsapp: payload.whatsapp || payload.phone,
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

export async function linkClientUser({ userId, clientId, email, ownerName, tenantId }) {
  const db = requireSupabase();

  const { data, error } = await db
    .from('client_users')
    .upsert({
      user_id: userId,
      client_id: clientId,
      tenant_id: tenantId || null,
      email,
      full_name: ownerName,
      role: 'owner',
      status: 'active',
    }, { onConflict: 'user_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getClientByUser(user, tenantId) {
  const db = requireSupabase();
  const userId = typeof user === 'string' ? user : user?.id;
  const email = typeof user === 'string' ? '' : user?.email;

  if (!userId && !email) return null;

  const filters = [
    userId ? `auth_user_id.eq.${userId}` : '',
    userId ? `user_id.eq.${userId}` : '',
    email ? `email.eq.${email}` : '',
  ].filter(Boolean).join(',');

  let query = db
    .from('client_users')
    .select('*, clients(*)')
    .or(filters)
    .limit(1);

  if (tenantId) query = query.eq('tenant_id', tenantId);

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error('Dashboard user lookup failed', error);
    throw error;
  }

  return data;
}

export async function getClientPortalData(user, tenantId) {
  const db = requireSupabase();
  const profile = await getClientByUser(user, tenantId);

  if (!profile) {
    const slug = setupRequest?.client_slug || setupRequest?.subdomain || profile.client_slug || profile.subdomain || 'client';

    return {
      profile: null,
      client: null,
      systems: [],
      noAccess: true,
    };
  }

  if (!profile.client_id) {
    let setupQuery = db
      .from('setup_requests')
      .select('*')
      .or(`client_user_id.eq.${user.id},email.eq.${user.email}`)
      .order('created_at', { ascending: false })
      .limit(1);

    if (tenantId) setupQuery = setupQuery.eq('tenant_id', tenantId);

    const { data: setupRequest, error: setupError } = await setupQuery.maybeSingle();

    if (setupError) throw setupError;

    return {
      profile,
      client: {
        business_name: setupRequest?.business_name || profile.business_name,
        owner_name: setupRequest?.owner_name || profile.owner_name || profile.full_name,
        email: setupRequest?.email || profile.email,
        whatsapp: setupRequest?.whatsapp,
        selected_system: setupRequest?.selected_system,
        selected_package: setupRequest?.selected_package,
        billing_plan: setupRequest?.billing_plan,
        payment_status: setupRequest?.payment_status,
        status: setupRequest?.status || profile.status,
      },
      setupRequest,
      systems: profile.client_website ? [{
        system_name: setupRequest?.selected_system || 'Bratstvo Digital System',
        package_name: setupRequest?.selected_package || 'Assigned package',
        plan_name: setupRequest?.billing_plan || 'Assigned plan',
        status: setupRequest?.client_website_status || 'pending_setup',
        system_url: `https://${profile.client_website}`,
        dashboard_url: `/core/${slug}`,
      }] : [],
      noAccess: false,
    };
  }

  let systemsQuery = db
    .from('client_projects')
    .select('*')
    .eq('client_id', profile.client_id)
    .order('created_at', { ascending: false });

  if (tenantId) systemsQuery = systemsQuery.eq('tenant_id', tenantId);

  const { data: systems, error } = await systemsQuery;

  if (error) throw error;

  return {
    profile,
    client: profile.clients,
    setupRequest: null,
    systems: (systems || []).map(project => ({
      ...project,
      status: project.access_status,
      system_url: project.live_url,
    })),
    noAccess: false,
  };
}
