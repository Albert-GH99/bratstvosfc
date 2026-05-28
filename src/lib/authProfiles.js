import { BRATSTVO_ADMIN_EMAIL } from './appConfig';
import { supabase } from './supabase';

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function isOwnerEmail(email) {
  return normalizeEmail(email) === BRATSTVO_ADMIN_EMAIL;
}

export function isApprovedAdminProfile(profile) {
  return ['owner', 'admin'].includes(normalizeEmail(profile?.role)) && normalizeEmail(profile?.status) === 'approved';
}

export function isApprovedStaffProfile(profile) {
  return ['owner', 'admin', 'staff', 'sales', 'support'].includes(normalizeEmail(profile?.role)) && normalizeEmail(profile?.status) === 'approved';
}

export function roleCapabilities(role) {
  const normalizedRole = normalizeEmail(role);
  const fullAccess = normalizedRole === 'owner' || normalizedRole === 'admin';

  return {
    role: normalizedRole || 'client',
    fullAccess,
    canViewRequests: fullAccess || normalizedRole === 'sales' || normalizedRole === 'staff',
    canApprove: fullAccess,
    canReject: fullAccess,
    canEditFinance: fullAccess,
    canEditFollowUp: fullAccess || normalizedRole === 'sales' || normalizedRole === 'staff',
    canViewClients: fullAccess || normalizedRole === 'support' || normalizedRole === 'staff',
    canViewRevenue: fullAccess,
    canManageStaff: fullAccess,
    canManageSettings: fullAccess,
  };
}

export async function getProfileByEmail(email) {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', normalizeEmail(email))
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function hasAdminAccess(userOrEmail) {
  const email = typeof userOrEmail === 'string' ? userOrEmail : userOrEmail?.email;
  if (isOwnerEmail(email)) return true;

  const profile = await getProfileByEmail(email);
  return isApprovedAdminProfile(profile);
}

export async function getAccessProfile(userOrEmail) {
  const email = typeof userOrEmail === 'string' ? userOrEmail : userOrEmail?.email;
  if (isOwnerEmail(email)) {
    return {
      email: normalizeEmail(email),
      role: 'owner',
      status: 'approved',
      capabilities: roleCapabilities('owner'),
    };
  }

  const profile = await getProfileByEmail(email);
  return {
    ...(profile || {}),
    role: normalizeEmail(profile?.role || 'client'),
    status: normalizeEmail(profile?.status || 'pending'),
    capabilities: roleCapabilities(profile?.role),
  };
}

export async function hasStaffAccess(userOrEmail) {
  const email = typeof userOrEmail === 'string' ? userOrEmail : userOrEmail?.email;
  if (isOwnerEmail(email)) return true;

  const profile = await getProfileByEmail(email);
  return isApprovedStaffProfile(profile);
}
