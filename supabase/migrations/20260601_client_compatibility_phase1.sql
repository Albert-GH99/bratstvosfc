OVERNIGHT SAFE BUILD — BRATSTVO DIGITAL PHASE 4 TO PHASE 7

IMPORTANT:
Work carefully in order.
Do NOT push Git.
Do NOT delete files unless clearly unused and listed first.
Do NOT delete Supabase tables.
Do NOT drop columns.
Do NOT rename Supabase tables yet.
Do NOT change final routes.
Do NOT reintroduce subdomain/hostname routing.
Run npm run build after each phase.
If build fails, STOP and report the error.

FINAL ROUTES:
Public Bratstvo website:
/ 

Bratstvo HQ:
/master

Client dashboard:
/core/:slug

Client public website:
/:slug

FINAL LANGUAGE:
Use “client”, “business”, “workspace” only where useful.
Do NOT show “tenant” in UI.

CURRENT STACK:
React + Vite + Tailwind + Supabase + Netlify.

CURRENT STATUS:
Phase 1 routing/auth completed.
Phase 2 system-specific client dashboard completed.
Phase 3 branding completed.
Scroll issue fixed.

====================================================
PHASE 4 — MASTER HQ ADMIN
====================================================

Goal:
Make /master become Bratstvo internal control center.

Do not redesign public site.

Master HQ should manage:
- setup requests
- clients
- payments
- plans
- revenue
- domains
- support
- staff
- system status

Create/clean sections:
1. Overview
2. Setup Requests
3. Clients
4. Payments
5. Plans
6. Revenue
7. Domains
8. Support
9. Staff
10. Settings

MASTER PERMISSION:
Owner can see everything.
Staff should have limited view.
Do not expose sensitive payment/client private data to staff unless owner role.

If full RBAC is not ready:
Add UI placeholders and clear role labels.
Do not fake security.

Setup Requests flow:
- pending
- reviewed
- payment pending
- paid
- approved
- rejected

Clients list:
- business name
- slug
- system type
- plan
- status
- created date
- public link /:slug
- dashboard link /core/:slug

Payment review:
- request id
- client
- amount
- status
- receipt preview placeholder
- approve payment button placeholder

Output phase summary, run build.

====================================================
PHASE 5 — CLIENT SETUP / ACTIVATION FLOW
====================================================

Goal:
Make setup-to-client flow clearer and more professional.

Client flow:
1. Submit setup request
2. See request received page
3. Payment instruction pending review
4. Bratstvo reviews
5. Payment confirmed
6. Approve
7. Client workspace generated
8. Client receives login/onboarding later

Do not integrate real payment gateway.

Setup page:
- industry
- system selection
- package
- add-ons
- domain option
- business details
- review

After submit:
Show professional request confirmation:
- Request ID
- selected system
- selected package
- estimated total
- payment status: Pending review
- message: Payment instruction will be sent after review

Domain:
Keep path-based client link:
bratstvosfc.com/:slug

Custom domain:
Show as future/Business yearly option.
Do not automate custom domain yet.

Output phase summary, run build.

====================================================
PHASE 6 — CLIENT DASHBOARD REAL FORMS (PLACEHOLDER SAFE)
====================================================

Goal:
Each system dashboard should have useful forms and tables, even if DB is not fully connected.

Do not touch Supabase schema unless absolutely necessary.
Use existing services where available.
If table missing, show clean placeholder instead of raw error.

For eCommerce:
- Add product form
- product image upload
- product list
- order table
- customer list

For Booking:
- Add trip/event form
- trip list
- participant list
- booking calendar placeholder

For Appointment:
- Add service form
- appointment table
- staff list
- calendar placeholder

For Food Order:
- Add menu item form
- kitchen queue
- table/QR placeholder
- pickup/delivery settings

For Delivery Dispatch:
- Add runner/staff form
- add job form
- assign runner
- live map placeholder
- status board
- proof upload placeholder

For Custom:
- project brief
- files/reference upload
- appointment/consultation notes
- quote status

Important:
Do not show Products for dispatch unless direct URL, and if direct URL show “not available for this system.”

Output phase summary, run build.

====================================================
PHASE 7 — PAYMENT + EMAIL READY STRUCTURE
====================================================

Goal:
Prepare professional manual payment and future Resend email flow.

Do not configure Resend secrets.
Do not change DNS.
Do not send real emails unless existing flow already does.

Payment:
- manual bank transfer
- DuitNow QR placeholder
- receipt upload using existing payment-receipts bucket if already available
- payment status:
  pending_review
  payment_pending
  paid
  failed
  refunded

Master HQ:
- can mark payment as paid
- can approve setup after payment

Client side:
- show payment status clearly
- no WhatsApp-first payment flow
- WhatsApp only secondary support

Email-ready:
Prepare template constants/components only:
- setup request received
- payment instruction
- payment confirmed
- setup approved
- onboarding/login

Do not integrate fully if Resend not ready.
Output what env variables will be needed later.

Run build.

====================================================
FINAL CLEANUP
====================================================

After all phases:
1. Search for old bad routes:
   /dashboard
   /orders
   /products
   /admin
   hostname
   subdomain

2. Make sure no dashboard links use:
   /orders
   /products
   /settings

They must use:
/core/:slug/...

3. Search visible UI for:
tenant
workspace not found
loading tenant

Replace with client/business-friendly text.

4. Do not delete DB compatibility code yet.

5. Run:
npm run build

6. Output final report:
- files changed
- phases completed
- skipped items
- errors
- build result
- testing checklist
- recommended next manual test order

TESTING CHECKLIST:
/
/systems
/pricing
/setup
/master
/core/matpiun
/core/matpiun/branding
/core/matpiun/jobs
/core/matpiun/live-map
/matpiun
mobile one-finger scroll
mouse wheel scroll
login with next param
Netlify build readiness