import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const defaultDashboardUrl = 'https://client.bratstvosfc.com';

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function htmlEscape(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function randomPassword() {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return `BD-${Array.from(bytes, byte => byte.toString(36).padStart(2, '0')).join('').slice(0, 18)}!`;
}

function invoiceId() {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
  return `INV-${Date.now().toString().slice(-8)}-${suffix}`;
}

function parseAmount(packageName = '') {
  const match = packageName.replaceAll(',', '').match(/RM\s*(\d+(\.\d+)?)/i);
  return match ? Number(match[1]) : 0;
}

function money(value: number) {
  return `RM${Number(value || 0).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function renewalDate(planName = '') {
  const date = new Date();
  const plan = planName.toLowerCase();
  if (plan.includes('year') || plan.includes('tahun')) date.setFullYear(date.getFullYear() + 1);
  else date.setMonth(date.getMonth() + 1);
  return date.toISOString().slice(0, 10);
}

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const resendKey = Deno.env.get('RESEND_API_KEY');
  if (!resendKey) throw new Error('Missing RESEND_API_KEY.');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Bratstvo Digital <onboarding@bratstvosfc.com>',
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend email failed: ${text}`);
  }
}

async function requireAdmin(request: Request, db: ReturnType<typeof createClient>) {
  const adminEmails = (Deno.env.get('ADMIN_EMAIL') || '')
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(Boolean);

  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) throw new Error('Admin login required.');

  const { data, error } = await db.auth.getUser(token);
  if (error || !data.user?.email) throw new Error('Invalid admin session.');

  const email = data.user.email.toLowerCase();
  if (!adminEmails.includes(email)) throw new Error('This account is not allowed to review setup requests.');

  return data.user;
}

async function findAuthUserByEmail(db: ReturnType<typeof createClient>, email: string) {
  let page = 1;

  while (page <= 20) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: 100 });
    if (error) throw error;

    const match = data.users.find(user => user.email?.toLowerCase() === email.toLowerCase());
    if (match) return match;
    if (data.users.length < 100) return null;

    page += 1;
  }

  return null;
}

async function createOrUpdateClientAccess(db: ReturnType<typeof createClient>, setupRequest: Record<string, string | null>) {
  if (!setupRequest.email) throw new Error('Setup request is missing client email.');

  const temporaryPassword = randomPassword();
  const username = setupRequest.email;
  const dashboardUrl = Deno.env.get('CLIENT_DASHBOARD_URL') || defaultDashboardUrl;
  const systemUrl = Deno.env.get('CLIENT_SYSTEM_URL') || dashboardUrl;
  const metadata = {
    request_id: setupRequest.request_id,
    full_name: setupRequest.owner_name,
    business_name: setupRequest.business_name,
    phone: setupRequest.whatsapp,
    whatsapp: setupRequest.whatsapp,
    industry: setupRequest.industry,
    selected_system: setupRequest.system_name,
    selected_package: setupRequest.package_name,
    maintenance_plan: setupRequest.plan_name,
    status: 'active',
  };

  const existingUser = await findAuthUserByEmail(db, setupRequest.email);
  const authUser = existingUser
    ? await db.auth.admin.updateUserById(existingUser.id, {
        password: temporaryPassword,
        user_metadata: metadata,
      })
    : await db.auth.admin.createUser({
        email: setupRequest.email,
        password: temporaryPassword,
        email_confirm: true,
        user_metadata: metadata,
      });

  if (authUser.error) throw authUser.error;
  const authUserId = authUser.data.user?.id || existingUser?.id;
  if (!authUserId) throw new Error('Unable to create client auth user.');

  const { data: client, error: clientError } = await db
    .from('clients')
    .upsert({
      request_id: setupRequest.request_id,
      business_name: setupRequest.business_name || 'Client',
      owner_name: setupRequest.owner_name,
      email: setupRequest.email,
      whatsapp: setupRequest.whatsapp,
      phone: setupRequest.whatsapp,
      industry: setupRequest.industry,
      selected_system: setupRequest.system_name,
      selected_package: setupRequest.package_name,
      maintenance_plan: setupRequest.plan_name,
      status: 'active',
    }, { onConflict: 'request_id' })
    .select()
    .single();

  if (clientError) throw clientError;

  const { error: userLinkError } = await db.from('users').upsert({
    id: authUserId,
    client_id: client.id,
    email: setupRequest.email,
    full_name: setupRequest.owner_name,
    role: 'owner',
    status: 'active',
  });

  if (userLinkError) throw userLinkError;

  const { error: systemError } = await db
    .from('client_systems')
    .upsert({
      client_id: client.id,
      system_name: setupRequest.system_name,
      package_name: setupRequest.package_name,
      plan_name: setupRequest.plan_name,
      system_url: systemUrl,
      dashboard_url: dashboardUrl,
      username,
      status: 'active',
      renewal_date: renewalDate(setupRequest.plan_name || ''),
    }, { onConflict: 'client_id' });

  if (systemError) throw systemError;

  return { username, temporaryPassword, dashboardUrl, systemUrl };
}

async function createInvoice(db: ReturnType<typeof createClient>, setupRequest: Record<string, string | null>, origin: string) {
  const amount = parseAmount(setupRequest.package_name || '');
  const depositRate = Number(Deno.env.get('DEPOSIT_RATE') || '0.5');
  const depositAmount = Number((amount * depositRate).toFixed(2));
  const balanceAmount = Number((amount - depositAmount).toFixed(2));
  const nextInvoiceId = invoiceId();
  const siteUrl = Deno.env.get('PUBLIC_SITE_URL') || origin || defaultDashboardUrl;
  const paymentLink = `${siteUrl.replace(/\/$/, '')}/payment/${nextInvoiceId}`;

  const { data: invoice, error } = await db
    .from('payment_invoices')
    .upsert({
      invoice_id: nextInvoiceId,
      request_id: setupRequest.request_id,
      client_name: setupRequest.business_name,
      email: setupRequest.email,
      whatsapp: setupRequest.whatsapp,
      package_name: setupRequest.package_name,
      plan_name: setupRequest.plan_name,
      amount,
      deposit_amount: depositAmount,
      balance_amount: balanceAmount,
      payment_status: 'awaiting_payment',
      reference_code: nextInvoiceId,
    }, { onConflict: 'request_id' })
    .select()
    .single();

  if (error) throw error;

  await sendEmail({
    to: setupRequest.email || '',
    subject: `Payment invoice ${invoice.invoice_id}`,
    html: `
      <h2>Your setup request is approved</h2>
      <p>Your request has been approved. Please submit your deposit payment to continue activation.</p>
      <p><strong>Invoice ID:</strong> ${htmlEscape(invoice.invoice_id)}</p>
      <p><strong>Request ID:</strong> ${htmlEscape(setupRequest.request_id || '')}</p>
      <p><strong>Package:</strong> ${htmlEscape(setupRequest.package_name || '-')}</p>
      <p><strong>Plan:</strong> ${htmlEscape(setupRequest.plan_name || '-')}</p>
      <p><strong>Total:</strong> ${money(invoice.amount)}</p>
      <p><strong>Deposit:</strong> ${money(invoice.deposit_amount)}</p>
      <p><a href="${htmlEscape(paymentLink)}">Open secure payment page</a></p>
    `,
  });

  return invoice;
}

async function listData(db: ReturnType<typeof createClient>) {
  const { data: requests, error: requestError } = await db
    .from('setup_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (requestError) throw requestError;

  const { data: invoices, error: invoiceError } = await db
    .from('payment_invoices')
    .select('*')
    .order('created_at', { ascending: false });

  if (invoiceError) throw invoiceError;

  const invoicesWithReceipts = await Promise.all((invoices || []).map(async invoice => {
    if (!invoice.receipt_path) return invoice;

    const { data } = await db.storage
      .from('payment-receipts')
      .createSignedUrl(invoice.receipt_path, 60 * 15);

    return {
      ...invoice,
      receipt_url: data?.signedUrl || '',
    };
  }));

  return { requests: requests || [], invoices: invoicesWithReceipts };
}

serve(async request => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceRoleKey) throw new Error('Missing Supabase server env vars.');

    const db = createClient(supabaseUrl, serviceRoleKey);
    const adminUser = await requireAdmin(request, db);
    const body = await request.json();
    const origin = request.headers.get('Origin') || '';

    if (body.action === 'list') {
      return jsonResponse(await listData(db));
    }

    if (!body.request_id && !body.invoice_id) return jsonResponse({ error: 'request_id or invoice_id is required.' }, 400);

    if (body.action === 'reject') {
      const { data: setupRequest, error: requestError } = await db
        .from('setup_requests')
        .select('*')
        .eq('request_id', body.request_id)
        .single();

      if (requestError) throw requestError;

      await db
        .from('setup_requests')
        .update({ status: 'rejected', reviewed_at: new Date().toISOString(), reviewed_by: adminUser.email })
        .eq('request_id', setupRequest.request_id);

      await sendEmail({
        to: setupRequest.email,
        subject: `Setup request ${setupRequest.request_id} update`,
        html: `
          <h2>Setup request update</h2>
          <p>Thank you for submitting your setup request.</p>
          <p>After review, we are unable to approve this request right now.</p>
          <p><strong>Request ID:</strong> ${htmlEscape(setupRequest.request_id)}</p>
        `,
      });

      await db.from('request_logs').insert({
        request_id: setupRequest.request_id,
        action: 'rejected',
        actor_email: adminUser.email,
        message: 'Request rejected and client email sent.',
      });

      return jsonResponse({ ok: true, status: 'rejected' });
    }

    if (body.action === 'approve') {
      const { data: setupRequest, error: requestError } = await db
        .from('setup_requests')
        .select('*')
        .eq('request_id', body.request_id)
        .single();

      if (requestError) throw requestError;
      if (setupRequest.status !== 'pending') throw new Error('This setup request has already been reviewed.');

      await db
        .from('setup_requests')
        .update({ status: 'approved', reviewed_at: new Date().toISOString(), reviewed_by: adminUser.email })
        .eq('request_id', setupRequest.request_id);

      const invoice = await createInvoice(db, setupRequest, origin);

      await db.from('request_logs').insert({
        request_id: setupRequest.request_id,
        action: 'invoice_created',
        actor_email: adminUser.email,
        message: `Invoice ${invoice.invoice_id} created. Client is not active until payment is verified.`,
      });

      return jsonResponse({ ok: true, status: 'invoice_created', invoice });
    }

    if (body.action === 'reject_payment') {
      const { data: invoice, error: invoiceError } = await db
        .from('payment_invoices')
        .select('*, setup_requests(*)')
        .eq('invoice_id', body.invoice_id)
        .single();

      if (invoiceError) throw invoiceError;

      await db
        .from('payment_invoices')
        .update({ payment_status: 'payment_rejected', reviewed_by: adminUser.email })
        .eq('invoice_id', invoice.invoice_id);

      await sendEmail({
        to: invoice.email,
        subject: `Receipt update for ${invoice.invoice_id}`,
        html: `
          <h2>Receipt needs to be re-uploaded</h2>
          <p>We reviewed your payment receipt, but could not verify it. Please re-upload the correct receipt using your payment page.</p>
          <p><strong>Invoice ID:</strong> ${htmlEscape(invoice.invoice_id)}</p>
          <p><strong>Payment reference:</strong> ${htmlEscape(invoice.reference_code)}</p>
        `,
      });

      await db.from('request_logs').insert({
        request_id: invoice.request_id,
        action: 'payment_rejected',
        actor_email: adminUser.email,
        message: `Payment receipt rejected for ${invoice.invoice_id}.`,
      });

      return jsonResponse({ ok: true, payment_status: 'payment_rejected' });
    }

    if (body.action === 'approve_payment') {
      const { data: invoice, error: invoiceError } = await db
        .from('payment_invoices')
        .select('*, setup_requests(*)')
        .eq('invoice_id', body.invoice_id)
        .single();

      if (invoiceError) throw invoiceError;
      if (invoice.payment_status !== 'payment_submitted') throw new Error('Payment must be submitted before it can be verified.');

      const setupRequest = invoice.setup_requests;
      const access = await createOrUpdateClientAccess(db, setupRequest);

      await db
        .from('payment_invoices')
        .update({ payment_status: 'verified', verified_at: new Date().toISOString(), reviewed_by: adminUser.email })
        .eq('invoice_id', invoice.invoice_id);

      await sendEmail({
        to: setupRequest.email,
        subject: `Your Bratstvo Digital access is active`,
        html: `
          <h2>Your payment is verified</h2>
          <p>Your client account and system access are now active.</p>
          <p><strong>Request ID:</strong> ${htmlEscape(setupRequest.request_id)}</p>
          <p><strong>System:</strong> ${htmlEscape(setupRequest.system_name || '-')}</p>
          <p><strong>Package:</strong> ${htmlEscape(setupRequest.package_name || '-')}</p>
          <p><strong>Plan:</strong> ${htmlEscape(setupRequest.plan_name || '-')}</p>
          <p><strong>Temporary username:</strong> ${htmlEscape(access.username)}</p>
          <p><strong>Temporary password:</strong> ${htmlEscape(access.temporaryPassword)}</p>
          <p><strong>Client dashboard:</strong> <a href="${htmlEscape(access.dashboardUrl)}">${htmlEscape(access.dashboardUrl)}</a></p>
          <p><strong>System link:</strong> <a href="${htmlEscape(access.systemUrl)}">${htmlEscape(access.systemUrl)}</a></p>
          <p>Please sign in and change your password after login.</p>
        `,
      });

      await db.from('request_logs').insert({
        request_id: setupRequest.request_id,
        action: 'payment_verified',
        actor_email: adminUser.email,
        message: `Payment verified for ${invoice.invoice_id}; client access activated.`,
      });

      return jsonResponse({ ok: true, payment_status: 'verified' });
    }

    return jsonResponse({ error: 'Unsupported action.' }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to review setup request.';
    return jsonResponse({ error: message }, 500);
  }
});
