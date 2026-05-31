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
  return hasMustChangeFlag(user);
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
