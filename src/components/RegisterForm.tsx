"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authApi } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  })
  .required();

type RegisterFormData = yup.InferType<typeof schema>;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      login(response);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join us to get started</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
            aria-label="Registration form"
            noValidate
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                aria-describedby={errors.name ? "name-error" : undefined}
                aria-invalid={errors.name ? "true" : "false"}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.name
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your full name"
                disabled={loading}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={errors.email ? "true" : "false"}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.email
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your email"
                disabled={loading}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                aria-invalid={errors.password ? "true" : "false"}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.password
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Create a password"
                disabled={loading}
              />
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.confirmPassword
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Confirm your password"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p
                  id="confirm-password-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {error && (
              <div
                className="p-4 bg-red-50 border border-red-200 rounded-lg"
                role="alert"
                aria-live="polite"
              >
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              aria-describedby={loading ? "loading-description" : undefined}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-md hover:shadow-lg"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
            {loading && (
              <p id="loading-description" className="sr-only">
                Please wait while we create your account
              </p>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
