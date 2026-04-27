import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

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
    } else {
      setUser(data.session?.user || null);
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
      setUser(session?.user || null);
      setAuthChecked(true);
      setIsLoadingAuth(false);
      setAuthError(null);
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
    checkUserAuth,
    navigateToLogin,
  }), [authChecked, authError, checkUserAuth, isLoadingAuth, navigateToLogin, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
