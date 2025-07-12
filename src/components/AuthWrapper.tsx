"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthWrapper() {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return showLogin ? (
    <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
  ) : (
    <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
  );
}
