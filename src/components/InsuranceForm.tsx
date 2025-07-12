"use client";

import { useState } from "react";
import { UserSubmission, RecommendationResponse } from "../types/insurance";
import { insuranceApi } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";

export default function InsuranceForm() {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState<UserSubmission>({
    age: 25,
    income: 5000,
    dependents: 0,
    riskTolerance: "Medium",
  });

  const [recommendation, setRecommendation] =
    useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof UserSubmission,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof value === "string" ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await insuranceApi.generateRecommendation(formData);
      setRecommendation(result);
    } catch (err) {
      setError("Failed to generate recommendation. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-blue-100">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Get Your Personalized Recommendation
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Answer a few questions to receive a tailored life insurance
              recommendation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age Field */}
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) =>
                  handleInputChange("age", Number(e.target.value))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Income Field */}
            <div>
              <label
                htmlFor="income"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Monthly Income ($)
              </label>
              <input
                type="number"
                id="income"
                min="0"
                step="100"
                value={formData.income}
                onChange={(e) =>
                  handleInputChange("income", Number(e.target.value))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Dependents Field */}
            <div>
              <label
                htmlFor="dependents"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Number of Dependents
              </label>
              <input
                type="number"
                id="dependents"
                min="0"
                max="10"
                value={formData.dependents}
                onChange={(e) =>
                  handleInputChange("dependents", Number(e.target.value))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Risk Tolerance Field */}
            <div>
              <label
                htmlFor="riskTolerance"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Risk Tolerance
              </label>
              <select
                id="riskTolerance"
                value={formData.riskTolerance}
                onChange={(e) =>
                  handleInputChange("riskTolerance", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? "Generating Recommendation..." : "Get Recommendation"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Recommendation Display */}
          {recommendation && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Your Personalized Recommendation
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-green-700 mb-2">
                    Recommended Policy:
                  </h3>
                  <p className="text-green-800 font-semibold text-lg">
                    {recommendation.recommendation}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-green-700 mb-2">
                    Explanation:
                  </h3>
                  <p className="text-green-800 leading-relaxed">
                    {recommendation.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
