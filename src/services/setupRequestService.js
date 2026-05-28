import { requireSupabase } from '../lib/supabase';

const SETUP_REQUEST_COLUMNS = 'id, request_id, business_name, owner_name, phone, whatsapp, email, industry, system_name, package_name, plan_name, selected_system, selected_package, domain_type, custom_domain, requested_domain_name, requested_domain_extension, requested_full_domain, domain_status, selected_domain, selected_domain_extension, domain_yearly_price, domain_check_status, domain_provider_preference, domain_requires_manual_confirmation, notes, admin_notes, status, payment_status, payment_method, payment_instruction_status, payment_instruction_sent_at, receipt_url, payment_notes, invoice_status, created_at, reviewed_at';
const LEGACY_SETUP_REQUEST_COLUMNS = 'id, request_id, business_name, owner_name, phone, whatsapp, email, industry, system_name, package_name, plan_name, notes, admin_notes, status, payment_status, invoice_status, created_at, reviewed_at';

function isColumnError(error) {
  return /column|schema cache|requested_domain|selected_domain|domain_yearly_price|domain_check_status|domain_provider_preference|domain_requires_manual_confirmation|payment_instruction|payment_method|receipt_url|payment_notes/i.test(error?.message || '');
}

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

  let { data, error } = await db
    .from('setup_requests')
    .select(SETUP_REQUEST_COLUMNS)
    .order('created_at', { ascending: false });

  if (error && isColumnError(error)) {
    const retry = await db
      .from('setup_requests')
      .select(LEGACY_SETUP_REQUEST_COLUMNS)
      .order('created_at', { ascending: false });

    data = retry.data;
    error = retry.error;
  }

  if (error) throw error;

  return {
    requests: data || [],
    invoices: [],
  };
}

export async function reviewSetupRequest({ requestId, action }) {
  const db = requireSupabase();
  const status = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : action;

  let { data, error } = await db
    .from('setup_requests')
    .update({ status, reviewed_at: new Date().toISOString() })
    .eq('request_id', requestId)
    .select(SETUP_REQUEST_COLUMNS)
    .single();

  if (error && isColumnError(error)) {
    const retry = await db
      .from('setup_requests')
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq('request_id', requestId)
      .select(LEGACY_SETUP_REQUEST_COLUMNS)
      .single();

    data = retry.data;
    error = retry.error;
  }

  if (error) throw error;
  return data;
}

export async function reviewPayment({ invoiceId, action }) {
  const db = requireSupabase();
  const statusByAction = {
    approve_payment: 'verified',
    mark_paid: 'paid',
    mark_pending: 'payment_pending',
    mark_failed: 'failed',
    mark_refunded: 'refunded',
    reject_payment: 'failed',
  };
  const paymentStatus = statusByAction[action] || 'pending';

  const { data, error } = await db
    .from('payment_invoices')
    .update({ payment_status: paymentStatus, reviewed_by: null })
    .eq('invoice_id', invoiceId)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
