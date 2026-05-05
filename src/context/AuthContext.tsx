import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { AuthUser, AuthTokens } from '../types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (tokens: AuthTokens, user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const ACCESS_KEY = 'sgct_access';
const REFRESH_KEY = 'sgct_refresh';

function getStoredUser(): AuthUser | null {
  const token = localStorage.getItem(ACCESS_KEY);
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as {
      username?: string;
    };
    return payload.username ? { username: payload.username } : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser);
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem(ACCESS_KEY)
  );

  const login = useCallback((tokens: AuthTokens, authUser: AuthUser) => {
    localStorage.setItem(ACCESS_KEY, tokens.access);
    localStorage.setItem(REFRESH_KEY, tokens.refresh);
    setToken(tokens.access);
    setUser(authUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
