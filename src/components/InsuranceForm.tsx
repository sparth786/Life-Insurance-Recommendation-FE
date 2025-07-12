"use client";

import { useState } from "react";
import { UserSubmission, RecommendationResponse } from "../types/insurance";
import { insuranceApi } from "../services/api";

export default function InsuranceForm() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Life Insurance Recommendation
            </h1>
            <p className="text-gray-600">
              Get a personalized life insurance recommendation based on your
              profile
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Generating Recommendation..." : "Get Recommendation"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Recommendation Display */}
          {recommendation && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Your Personalized Recommendation
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-green-700 mb-2">
                    Recommended Policy:
                  </h3>
                  <p className="text-green-800 font-semibold">
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
