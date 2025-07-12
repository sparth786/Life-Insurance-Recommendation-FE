"use client";
import { ReactNode } from "react";
import { ToastProvider } from "../contexts/ToastContext";
import { ErrorBoundary } from "./ErrorBoundary";
import { AuthProvider } from "../contexts/AuthContext";

export default function ClientRoot({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <ErrorBoundary>
        <AuthProvider>{children}</AuthProvider>
      </ErrorBoundary>
    </ToastProvider>
  );
}
