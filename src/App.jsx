import { LanguageProvider } from './context/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from 'react-router-dom';

import PageNotFound from './pages/PagesNotFound';
import { AuthProvider } from './context/AuthContext';
import { RESERVED_CLIENT_SLUGS, TenantProvider } from '@/contexts/TenantContext';

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
import TenantRoute from './components/TenantRoute';
import AppBackground from './components/layout/AppBackground';
import TenantPublicSite from './pages/TenantPublicSite';
import { TenantWorkspacePage } from './pages/TenantPortal';
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

  return <TenantPublicSite />;
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

      <Route path="/core/:slug" element={<TenantRoute />}>
        <Route index element={<TenantWorkspacePage page="dashboard" />} />
        <Route path="dashboard" element={<Navigate to="." replace />} />
        <Route path="orders" element={<TenantWorkspacePage page="orders" />} />
        <Route path="products" element={<TenantWorkspacePage page="products" />} />
        <Route path="customers" element={<TenantWorkspacePage page="customers" />} />
        <Route path="media" element={<TenantWorkspacePage page="media" />} />
        <Route path="analytics" element={<TenantWorkspacePage page="analytics" />} />
        <Route path="billing" element={<TenantWorkspacePage page="billing" />} />
        <Route path="settings" element={<TenantWorkspacePage page="settings" />} />
        <Route path="branding" element={<TenantWorkspacePage page="branding" />} />
        <Route path="payments" element={<TenantWorkspacePage page="payments" />} />
      </Route>

      <Route path="/:slug" element={<ClientPublicRoute />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <TenantProvider>
            <LanguageProvider>
              <AppBackground>
                <MainRoutes />
              </AppBackground>
            </LanguageProvider>
          </TenantProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
