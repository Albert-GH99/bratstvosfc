import { LanguageProvider } from './context/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import PageNotFound from './pages/PagesNotFound';
import { AuthProvider } from './context/AuthContext';
import { TenantProvider, useTenant } from '@/contexts/TenantContext';

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
import TenantLoading from './pages/TenantLoading';
import TenantNotFound from './pages/TenantNotFound';
import { TenantPublicSite, TenantWorkspacePage } from './pages/TenantPortal';
import AdminActivationGuide from './pages/AdminActivationGuide';

const adminLoginRedirect = <Navigate to="/admin/signin?next=/admin" replace />;

function PasswordChangeRoute({ next = '/admin' }) {
  return (
    <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to={`/login?next=${encodeURIComponent('/change-password')}`} replace />} />}>
      <Route path="/change-password" element={<UpdatePassword />} />
      <Route path="/update-password" element={<Navigate to={`/change-password?next=${encodeURIComponent(next)}`} replace />} />
    </Route>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin/signin" element={<Login />} />
      <Route path="/signin" element={<Navigate to="/admin/signin" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {PasswordChangeRoute({ next: '/admin' })}
      <Route element={<AdminRoute unauthenticatedElement={adminLoginRedirect} />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/clients" element={<Admin />} />
        <Route path="/admin/requests" element={<Admin />} />
        <Route path="/admin/revenue" element={<Admin />} />
        <Route path="/admin/analytics" element={<Admin />} />
        <Route path="/admin/staff" element={<Admin />} />
        <Route path="/admin/activation-guide" element={<AdminActivationGuide />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

function TenantRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TenantPublicSite />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/tracking/:id" element={<TenantPublicSite />} />
      <Route path="/order/:id" element={<TenantPublicSite />} />
      <Route path="/booking/:id" element={<TenantPublicSite />} />
      {PasswordChangeRoute({ next: '/dashboard' })}
      <Route element={<TenantRoute />}>
        <Route path="/dashboard" element={<TenantWorkspacePage page="dashboard" />} />
        <Route path="/orders" element={<TenantWorkspacePage page="orders" />} />
        <Route path="/products" element={<TenantWorkspacePage page="products" />} />
        <Route path="/customers" element={<TenantWorkspacePage page="customers" />} />
        <Route path="/media" element={<TenantWorkspacePage page="media" />} />
        <Route path="/dashboard/media" element={<TenantWorkspacePage page="media" />} />
        <Route path="/analytics" element={<TenantWorkspacePage page="analytics" />} />
        <Route path="/billing" element={<TenantWorkspacePage page="billing" />} />
        <Route path="/settings" element={<TenantWorkspacePage page="settings" />} />
        <Route path="/branding" element={<TenantWorkspacePage page="branding" />} />
        <Route path="/payments" element={<TenantWorkspacePage page="payments" />} />
      </Route>
      <Route path="*" element={<TenantNotFound />} />
    </Routes>
  );
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
        <Route path="/login" element={<Login />} />
        <Route path="/admin/signin" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {PasswordChangeRoute({ next: '/admin' })}
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/:invoiceId" element={<Payment />} />
        <Route element={<AdminRoute unauthenticatedElement={adminLoginRedirect} />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/clients" element={<Admin />} />
          <Route path="/admin/requests" element={<Admin />} />
          <Route path="/admin/revenue" element={<Admin />} />
          <Route path="/admin/analytics" element={<Admin />} />
          <Route path="/admin/staff" element={<Admin />} />
          <Route path="/admin/activation-guide" element={<AdminActivationGuide />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function AuthenticatedApp() {
  const tenantState = useTenant();

  if (tenantState.loading) return <TenantLoading />;

  if (tenantState.tenantNotFound) {
    return <TenantNotFound />;
  }

  if (tenantState.routeMode === 'admin') return <AdminRoutes />;
  if (tenantState.routeMode === 'tenant' || tenantState.routeMode === 'custom_domain') return <TenantRoutes />;
  return <MainRoutes />;
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <TenantProvider>
          <Router>
            <LanguageProvider>
              <AppBackground>
                <AuthenticatedApp />
              </AppBackground>
            </LanguageProvider>
          </Router>
        </TenantProvider>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
