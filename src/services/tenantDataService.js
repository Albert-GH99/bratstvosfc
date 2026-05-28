import { requireSupabase } from '@/lib/supabase';

function requireTenantId(tenantId) {
  if (!tenantId) {
    throw new Error('tenant_id is required for tenant data access.');
  }
}

export async function listTenantProducts(tenantId) {
  requireTenantId(tenantId);
  const db = requireSupabase();

  const { data, error } = await db
    .from('products')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateTenantProductImage(tenantId, productId, image) {
  requireTenantId(tenantId);
  if (!productId) throw new Error('product id is required.');
  const db = requireSupabase();

  const { data, error } = await db
    .from('products')
    .update({
      image_url: image?.publicUrl || image?.url || '',
      image_path: image?.path || '',
    })
    .eq('tenant_id', tenantId)
    .eq('id', productId)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function listTenantOrders(tenantId) {
  requireTenantId(tenantId);
  const db = requireSupabase();

  const { data, error } = await db
    .from('orders')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function listTenantCustomers(tenantId) {
  requireTenantId(tenantId);
  const db = requireSupabase();

  const { data, error } = await db
    .from('customers')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getTenantSettings(tenantId) {
  requireTenantId(tenantId);
  const db = requireSupabase();

  const { data, error } = await db
    .from('tenants')
    .select('id,branding,settings,plan,system_type')
    .eq('id', tenantId)
    .maybeSingle();

  if (error) throw error;
  return data || null;
}

export async function updateTenantBrandingAsset(tenantId, image, type = 'logo') {
  requireTenantId(tenantId);
  const db = requireSupabase();
  const urlKey = type === 'banner' ? 'banner_url' : 'logo_url';
  const pathKey = type === 'banner' ? 'banner_path' : 'logo_path';

  const { data: current, error: currentError } = await db
    .from('tenants')
    .select('branding,settings')
    .eq('id', tenantId)
    .maybeSingle();

  if (currentError) throw currentError;

  const branding = {
    ...(current?.branding || {}),
    [urlKey]: image?.publicUrl || image?.url || '',
    [pathKey]: image?.path || '',
  };
  const settings = {
    ...(current?.settings || {}),
    [urlKey]: image?.publicUrl || image?.url || '',
    [pathKey]: image?.path || '',
  };

  const { data, error } = await db
    .from('tenants')
    .update({
      branding,
      settings,
      [urlKey]: image?.publicUrl || image?.url || '',
      [pathKey]: image?.path || '',
    })
    .eq('id', tenantId)
    .select('id,business_name,subdomain,custom_domain,status,plan,system_type,branding,settings,logo_url,logo_path,banner_url,banner_path,created_at')
    .single();

  if (error) throw error;
  return data;
}

export async function listTenantMedia(tenantId, category = 'all') {
  requireTenantId(tenantId);
  const db = requireSupabase();
  let query = db
    .from('tenant_media')
    .select('*')
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false });

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createTenantMediaRecord(tenantId, image, category = 'misc') {
  requireTenantId(tenantId);
  const db = requireSupabase();

  const { data, error } = await db
    .from('tenant_media')
    .insert({
      tenant_id: tenantId,
      category,
      file_name: image.fileName || '',
      file_path: image.path,
      file_url: image.publicUrl || image.url,
      mime_type: image.mimeType,
      size: image.size,
      metadata: {},
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTenantMediaRecord(tenantId, mediaId) {
  requireTenantId(tenantId);
  if (!mediaId) throw new Error('media id is required.');
  const db = requireSupabase();

  const { error } = await db
    .from('tenant_media')
    .delete()
    .eq('tenant_id', tenantId)
    .eq('id', mediaId);

  if (error) throw error;
  return { success: true };
}
