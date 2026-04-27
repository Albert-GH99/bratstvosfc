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

serve(async request => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const adminEmail = Deno.env.get('ADMIN_EMAIL');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!adminEmail) throw new Error('Missing ADMIN_EMAIL.');
    if (!supabaseUrl || !serviceRoleKey) throw new Error('Missing Supabase server env vars.');

    const { request_id } = await request.json();
    if (!request_id) return jsonResponse({ error: 'request_id is required.' }, 400);

    const db = createClient(supabaseUrl, serviceRoleKey);
    const { data: setupRequest, error } = await db
      .from('setup_requests')
      .select('*')
      .eq('request_id', request_id)
      .single();

    if (error) throw error;

    await sendEmail({
      to: adminEmail,
      subject: `New setup request ${setupRequest.request_id}`,
      html: `
        <h2>New setup request received</h2>
        <p><strong>Request ID:</strong> ${setupRequest.request_id}</p>
        <p><strong>Business:</strong> ${setupRequest.business_name || '-'}</p>
        <p><strong>Owner:</strong> ${setupRequest.owner_name || '-'}</p>
        <p><strong>Email:</strong> ${setupRequest.email || '-'}</p>
        <p><strong>WhatsApp:</strong> ${setupRequest.whatsapp || '-'}</p>
        <p><strong>System:</strong> ${setupRequest.system_name || '-'}</p>
        <p><strong>Package:</strong> ${setupRequest.package_name || '-'}</p>
        <p><strong>Plan:</strong> ${setupRequest.plan_name || '-'}</p>
        <p><strong>Notes:</strong> ${setupRequest.notes || '-'}</p>
      `,
    });

    await db.from('request_logs').insert({
      request_id,
      action: 'admin_notified',
      actor_email: adminEmail,
      message: 'Admin notification email sent.',
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to notify admin.';
    return jsonResponse({ error: message }, 500);
  }
});
