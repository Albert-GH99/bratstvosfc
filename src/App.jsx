import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom';

import PageNotFound from './pages/PagesNotFound';
import { AuthProvider } from './context/AuthContext';
import { ClientProvider, RESERVED_CLIENT_SLUGS } from '@/contexts/ClientContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import Systems from './pages/Systems';
import Demo from './pages/Demo';
import Pricing from './pages/Pricing';
import Setup from './pages/Setup';
import SetupProcessing from './pages/SetupProcessing';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';
import Payment from './pages/Payment';
import About from './pages/About';
import Admin from './pages/Admin';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import ClientRoute from './components/ClientRoute';
import AppBackground from './components/layout/AppBackground';
import ClientPublicSite from './pages/ClientPublicSite';
import { ClientWorkspacePage } from './pages/ClientPortal';
import AdminActivationGuide from './pages/AdminActivationGuide';

const masterLoginRedirect = <Navigate to={`/login?next=${encodeURIComponent('/master')}`} replace />;

function PasswordChangeRoute({ next = '/master' }) {
  return (
    <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to={`/login?next=${encodeURIComponent('/change-password')}`} replace />} />}>
      <Route path="/change-password" element={<UpdatePassword />} />
      <Route path="/update-password" element={<Navigate to={`/change-password?next=${encodeURIComponent(next)}`} replace />} />
    </Route>
  );
}

function ClientPublicRoute() {
  const { slug } = useParams();
  if (RESERVED_CLIENT_SLUGS.has(String(slug || '').toLowerCase())) {
    return <PageNotFound />;
  }

  return <ClientPublicSite />;
}

function MainRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/setup-processing" element={<SetupProcessing />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/:invoiceId" element={<Payment />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/master/signin" element={<Login />} />
      <Route path="/admin/signin" element={<Navigate to={`/login?next=${encodeURIComponent('/master')}`} replace />} />
      <Route path="/signin" element={<Navigate to={`/login?next=${encodeURIComponent('/master')}`} replace />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {PasswordChangeRoute({ next: '/master' })}

      <Route path="/admin" element={<Navigate to="/master" replace />} />
      <Route path="/admin/clients" element={<Navigate to="/master/clients" replace />} />
      <Route path="/admin/requests" element={<Navigate to="/master/requests" replace />} />
      <Route path="/admin/revenue" element={<Navigate to="/master/revenue" replace />} />
      <Route path="/admin/analytics" element={<Navigate to="/master/analytics" replace />} />
      <Route path="/admin/staff" element={<Navigate to="/master/staff" replace />} />
      <Route path="/admin/activation-guide" element={<Navigate to="/master/activation-guide" replace />} />

      <Route element={<AdminRoute unauthenticatedElement={masterLoginRedirect} />}>
        <Route path="/master" element={<Admin />} />
        <Route path="/master/clients" element={<Admin />} />
        <Route path="/master/requests" element={<Admin />} />
        <Route path="/master/revenue" element={<Admin />} />
        <Route path="/master/analytics" element={<Admin />} />
        <Route path="/master/staff" element={<Admin />} />
        <Route path="/master/activation-guide" element={<AdminActivationGuide />} />
      </Route>

      <Route path="/core/:slug" element={<ClientRoute />}>
        <Route index element={<ClientWorkspacePage page="dashboard" />} />
        <Route path="dashboard" element={<Navigate to="." replace />} />
        <Route path="orders" element={<ClientWorkspacePage page="orders" />} />
        <Route path="products" element={<ClientWorkspacePage page="products" />} />
        <Route path="customers" element={<ClientWorkspacePage page="customers" />} />
        <Route path="payments" element={<ClientWorkspacePage page="payments" />} />
        <Route path="vouchers" element={<ClientWorkspacePage page="vouchers" />} />
        <Route path="shipping" element={<ClientWorkspacePage page="shipping" />} />
        <Route path="trips-events" element={<ClientWorkspacePage page="trips-events" />} />
        <Route path="bookings" element={<ClientWorkspacePage page="bookings" />} />
        <Route path="participants" element={<ClientWorkspacePage page="participants" />} />
        <Route path="calendar" element={<ClientWorkspacePage page="calendar" />} />
        <Route path="gallery" element={<ClientWorkspacePage page="gallery" />} />
        <Route path="reminders" element={<ClientWorkspacePage page="reminders" />} />
        <Route path="appointments" element={<ClientWorkspacePage page="appointments" />} />
        <Route path="services" element={<ClientWorkspacePage page="services" />} />
        <Route path="staff" element={<ClientWorkspacePage page="staff" />} />
        <Route path="kitchen-queue" element={<ClientWorkspacePage page="kitchen-queue" />} />
        <Route path="menu" element={<ClientWorkspacePage page="menu" />} />
        <Route path="categories" element={<ClientWorkspacePage page="categories" />} />
        <Route path="tables-qr" element={<ClientWorkspacePage page="tables-qr" />} />
        <Route path="pickup-delivery" element={<ClientWorkspacePage page="pickup-delivery" />} />
        <Route path="jobs" element={<ClientWorkspacePage page="jobs" />} />
        <Route path="assign-runner" element={<ClientWorkspacePage page="assign-runner" />} />
        <Route path="live-map" element={<ClientWorkspacePage page="live-map" />} />
        <Route path="runners" element={<ClientWorkspacePage page="runners" />} />
        <Route path="job-status" element={<ClientWorkspacePage page="job-status" />} />
        <Route path="proof-uploads" element={<ClientWorkspacePage page="proof-uploads" />} />
        <Route path="reports" element={<ClientWorkspacePage page="reports" />} />
        <Route path="project-brief" element={<ClientWorkspacePage page="project-brief" />} />
        <Route path="requests" element={<ClientWorkspacePage page="requests" />} />
        <Route path="files" element={<ClientWorkspacePage page="files" />} />
        <Route path="appointment" element={<ClientWorkspacePage page="appointment" />} />
        <Route path="quote" element={<ClientWorkspacePage page="quote" />} />
        <Route path="media" element={<ClientWorkspacePage page="media" />} />
        <Route path="analytics" element={<ClientWorkspacePage page="analytics" />} />
        <Route path="billing" element={<ClientWorkspacePage page="billing" />} />
        <Route path="settings" element={<ClientWorkspacePage page="settings" />} />
        <Route path="branding" element={<ClientWorkspacePage page="branding" />} />
      </Route>

      <Route path="/:slug" element={<ClientPublicRoute />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    if (!import.meta.env.DEV || typeof window === 'undefined') return;

    window.requestAnimationFrame(() => {
      console.log(
        'elementsFromPoint(center)',
        document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2),
      );
    });
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ClientProvider>
            <LanguageProvider>
              <AppBackground>
                <MainRoutes />
              </AppBackground>
            </LanguageProvider>
          </ClientProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
