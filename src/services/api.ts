import axios from "axios";
import {
  UserSubmission,
  RecommendationResponse,
  UserSubmissionWithId,
} from "../types/insurance";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const insuranceApi = {
  generateRecommendation: async (
    userData: UserSubmission
  ): Promise<RecommendationResponse> => {
    const response = await api.post("/recommendation", userData);
    return response.data;
  },

  getAllSubmissions: async (): Promise<UserSubmissionWithId[]> => {
    const response = await api.get("/recommendation");
    return response.data;
  },
};
