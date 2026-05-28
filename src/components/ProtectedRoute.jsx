import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center" style={{ background: 'var(--c-page-bg)' }}>
    <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: 'var(--c-border)', borderTopColor: 'var(--c-accent)' }}></div>
  </div>
);

export default function ProtectedRoute({ fallback = <DefaultFallback />, unauthenticatedElement }) {
  const location = useLocation();
  const { isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth, mustChangePassword } = useAuth();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth && checkUserAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) {
    return fallback;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    return unauthenticatedElement;
  }

  if (!isAuthenticated) {
    return unauthenticatedElement;
  }

  if (mustChangePassword && location.pathname !== '/change-password') {
    return <Navigate to={`/change-password?next=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return <Outlet />;
}
