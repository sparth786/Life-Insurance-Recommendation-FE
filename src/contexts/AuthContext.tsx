"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User, AuthResponse } from "../types/auth";

interface AuthContextType {
  user: User | null;
  login: (authResponse: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for stored auth data on app load
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const authData: AuthResponse = JSON.parse(storedAuth);
        setUser(authData.user);
      } catch (error) {
        console.error("Failed to parse stored auth data:", error);
        localStorage.removeItem("auth");
      }
    }
  }, []);

  const login = (authResponse: AuthResponse) => {
    setUser(authResponse.user);
    localStorage.setItem("auth", JSON.stringify(authResponse));
    // Also store token in cookie for middleware
    const isSecure = window.location.protocol === "https:";
    const secureFlag = isSecure ? "; Secure" : "";
    document.cookie = `auth=${authResponse.accessToken}; path=/; max-age=86400; SameSite=Lax${secureFlag}`;
    console.log("🔐 Auth token stored in cookie:", authResponse.accessToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    // Remove cookie
    document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Navigate to root page after logout
    router.push("/");
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
