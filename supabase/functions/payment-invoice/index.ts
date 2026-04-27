import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function publicInvoice(invoice: Record<string, unknown>) {
  return {
    invoice_id: invoice.invoice_id,
    request_id: invoice.request_id,
    client_name: invoice.client_name,
    package_name: invoice.package_name,
    plan_name: invoice.plan_name,
    amount: invoice.amount,
    deposit_amount: invoice.deposit_amount,
    balance_amount: invoice.balance_amount,
    payment_status: invoice.payment_status,
    reference_code: invoice.reference_code,
    receipt_file_name: invoice.receipt_file_name,
    receipt_uploaded_at: invoice.receipt_uploaded_at,
    created_at: invoice.created_at,
  };
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
    const body = await request.json();
    if (!body.invoice_id) return jsonResponse({ error: 'invoice_id is required.' }, 400);

    const { data: invoice, error } = await db
      .from('payment_invoices')
      .select('*')
      .eq('invoice_id', body.invoice_id)
      .single();

    if (error) throw error;

    if (body.action === 'get') {
      return jsonResponse({
        invoice: publicInvoice(invoice),
        bank: {
          account_name: Deno.env.get('PAYMENT_BANK_ACCOUNT_NAME') || 'Bratstvo Digital',
          bank_name: Deno.env.get('PAYMENT_BANK_NAME') || 'Bank account',
          account_number: Deno.env.get('PAYMENT_BANK_ACCOUNT_NUMBER') || '',
          duitnow_qr_url: Deno.env.get('DUITNOW_QR_IMAGE_URL') || '',
        },
      });
    }

    if (body.action === 'submit_receipt') {
      if (!body.receipt_path || !body.receipt_file_name) {
        return jsonResponse({ error: 'receipt_path and receipt_file_name are required.' }, 400);
      }
      if (!['awaiting_payment', 'payment_rejected'].includes(String(invoice.payment_status))) {
        return jsonResponse({ error: 'This invoice is not accepting receipt uploads right now.' }, 400);
      }
      if (!String(body.receipt_path).startsWith(`${body.invoice_id}/`)) {
        return jsonResponse({ error: 'Receipt path does not match this invoice.' }, 400);
      }

      // Keep updates server-side so clients cannot directly edit invoice status.
      const { data: updatedInvoice, error: updateError } = await db
        .from('payment_invoices')
        .update({
          payment_status: 'payment_submitted',
          receipt_path: body.receipt_path,
          receipt_file_name: body.receipt_file_name,
          receipt_uploaded_at: new Date().toISOString(),
        })
        .eq('invoice_id', body.invoice_id)
        .select()
        .single();

      if (updateError) throw updateError;

      await db.from('request_logs').insert({
        request_id: updatedInvoice.request_id,
        action: 'payment_submitted',
        message: `Receipt uploaded for invoice ${updatedInvoice.invoice_id}.`,
      });

      return jsonResponse({ invoice: publicInvoice(updatedInvoice) });
    }

    return jsonResponse({ error: 'Unsupported action.' }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load payment invoice.';
    return jsonResponse({ error: message }, 500);
  }
});
