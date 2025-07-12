"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Toast } from "../components/Toast";

interface ToastContextType {
  showToast: (message: string, type?: "error" | "success" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success" | "info";
    visible: boolean;
  }>({ message: "", type: "info", visible: false });

  const showToast = useCallback(
    (message: string, type: "error" | "success" | "info" = "info") => {
      setToast({ message, type, visible: true });
      setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000);
    },
    []
  );

  const handleClose = () => setToast((t) => ({ ...t, visible: false }));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};
