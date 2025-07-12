export interface UserSubmission {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: "Low" | "Medium" | "High";
}

export interface RecommendationResponse {
  recommendation: string;
  explanation: string;
}

export interface UserSubmissionWithId extends UserSubmission {
  id: string;
  recommendation: string;
  explanation: string;
  createdAt: string;
  updatedAt: string;
}
