import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const AuthContext = createContext();

function hasMustChangeFlag(user) {
  return Boolean(
    user?.user_metadata?.must_change_password ||
    user?.app_metadata?.must_change_password
  );
}

async function loadMustChangePassword(user) {
  if (!user || !supabase) return false;
  if (hasMustChangeFlag(user)) return true;

  const email = String(user.email || '').trim().toLowerCase();
  const filters = [
    `auth_user_id.eq.${user.id}`,
    `user_id.eq.${user.id}`,
    email ? `email.eq.${email}` : '',
  ].filter(Boolean).join(',');

  try {
    const { data, error } = await supabase
      .from('client_users')
      .select('must_change_password')
      .or(filters)
      .limit(1)
      .maybeSingle();

    if (!error && data?.must_change_password) return true;
  } catch {
    // Projects without the latest client_users shape can still rely on auth metadata.
  }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('must_change_password')
      .eq('email', email)
      .maybeSingle();

    if (!error && data?.must_change_password) return true;
  } catch {
    // The profile flag is optional for older databases.
  }

  return false;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [mustChangePassword, setMustChangePassword] = useState(false);

  const checkUserAuth = useCallback(async () => {
    setIsLoadingAuth(true);
    setAuthError(null);

    if (!isSupabaseConfigured) {
      setUser(null);
      setAuthChecked(true);
      setIsLoadingAuth(false);
      return;
    }

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      setAuthError(error);
      setUser(null);
      setMustChangePassword(false);
    } else {
      const sessionUser = data.session?.user || null;
      setUser(sessionUser);
      setMustChangePassword(await loadMustChangePassword(sessionUser));
    }

    setAuthChecked(true);
    setIsLoadingAuth(false);
  }, []);

  const navigateToLogin = useCallback(() => {
    setAuthError(null);
  }, []);

  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user || null;
      setUser(sessionUser);
      setAuthChecked(true);
      setAuthError(null);
      setIsLoadingAuth(Boolean(sessionUser));

      loadMustChangePassword(sessionUser).then(flag => {
        setMustChangePassword(flag);
        setIsLoadingAuth(false);
      });
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const value = useMemo(() => ({
    user,
    setUser,
    isAuthenticated: Boolean(user),
    isLoadingAuth,
    isLoadingPublicSettings: false,
    authChecked,
    authError,
    mustChangePassword,
    setMustChangePassword,
    checkUserAuth,
    navigateToLogin,
  }), [authChecked, authError, checkUserAuth, isLoadingAuth, mustChangePassword, navigateToLogin, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
