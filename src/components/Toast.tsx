import React from "react";

interface ToastProps {
  message: string;
  type?: "error" | "success" | "info";
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  onClose,
}) => {
  return (
    <div
      className={`fixed top-6 right-6 z-50 min-w-[240px] max-w-xs px-4 py-3 rounded-lg shadow-lg flex items-center gap-3
        ${
          type === "error"
            ? "bg-red-600 text-white"
            : type === "success"
            ? "bg-green-600 text-white"
            : "bg-blue-600 text-white"
        }
      `}
      role="alert"
      aria-live="assertive"
      tabIndex={0}
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-white focus:outline-none focus:ring-2 focus:ring-white rounded"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};
