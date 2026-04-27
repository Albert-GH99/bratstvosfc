import { requireSupabase } from '../lib/supabase';

export async function notifyAdminSetupRequest(requestId) {
  const db = requireSupabase();

  const { data, error } = await db.functions.invoke('notify-admin-setup-request', {
    body: { request_id: requestId },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);
}

export async function listSetupRequests() {
  const db = requireSupabase();

  const { data, error } = await db.functions.invoke('review-setup-request', {
    body: { action: 'list' },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return {
    requests: data?.requests || [],
    invoices: data?.invoices || [],
  };
}

export async function reviewSetupRequest({ requestId, action }) {
  const db = requireSupabase();

  const { data, error } = await db.functions.invoke('review-setup-request', {
    body: {
      request_id: requestId,
      action,
    },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data;
}

export async function reviewPayment({ invoiceId, action }) {
  const db = requireSupabase();

  const { data, error } = await db.functions.invoke('review-setup-request', {
    body: {
      invoice_id: invoiceId,
      action,
    },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data;
}
