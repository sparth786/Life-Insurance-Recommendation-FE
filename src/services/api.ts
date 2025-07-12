import axios from "axios";
import {
  UserSubmission,
  RecommendationResponse,
  UserSubmissionWithId,
} from "../types/insurance";
import { LoginData, RegisterData, AuthResponse } from "../types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include JWT token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const { accessToken } = JSON.parse(auth);
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
  }
  return config;
});

export const insuranceApi = {
  generateRecommendation: async (
    userData: UserSubmission
  ): Promise<RecommendationResponse> => {
    const response = await api.post("/recommendation", userData);
    return response.data as RecommendationResponse;
  },

  getAllSubmissions: async (): Promise<UserSubmissionWithId[]> => {
    const response = await api.get("/recommendation");
    return response.data as UserSubmissionWithId[];
  },

  getUserHistory: async (): Promise<UserSubmissionWithId[]> => {
    const response = await api.get("/recommendation/history");
    return response.data as UserSubmissionWithId[];
  },
};

export const authApi = {
  login: async (loginData: LoginData): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", loginData);
    return response.data as AuthResponse;
  },

  register: async (registerData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", registerData);
    return response.data as AuthResponse;
  },
};
