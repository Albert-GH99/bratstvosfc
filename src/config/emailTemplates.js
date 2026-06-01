export const emailEnvironmentVariables = [
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'SITE_URL',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
];

export const emailTemplates = {
  setupRequestReceived: {
    key: 'setup_request_received',
    subject: 'Your Bratstvo Digital setup request was received',
    preview: 'Request ID, selected system, selected package, estimated total and pending review status.',
  },
  paymentInstruction: {
    key: 'payment_instruction',
    subject: 'Payment instruction for your Bratstvo Digital setup',
    preview: 'Manual bank transfer, DuitNow QR or official payment link details after review.',
  },
  paymentConfirmed: {
    key: 'payment_confirmed',
    subject: 'Payment confirmed for your Bratstvo Digital setup',
    preview: 'Payment status, confirmed amount and next setup approval step.',
  },
  setupApproved: {
    key: 'setup_approved',
    subject: 'Your Bratstvo Digital setup has been approved',
    preview: 'Approval status, workspace generation status and public path-based link.',
  },
  onboardingLogin: {
    key: 'onboarding_login',
    subject: 'Your Bratstvo Digital workspace login',
    preview: 'Login URL, onboarding notes and first-password-change reminder.',
  },
};

export const emailTemplateList = Object.values(emailTemplates);
