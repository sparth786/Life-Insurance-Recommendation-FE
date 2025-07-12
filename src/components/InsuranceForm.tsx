"use client";

import { useState } from "react";
import { UserSubmission, RecommendationResponse } from "../types/insurance";
import { insuranceApi } from "../services/api";
import { useToast } from "../contexts/ToastContext";

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

  const { showToast } = useToast();

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
      showToast(
        "Failed to generate recommendation. Please try again.",
        "error"
      );
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Get Your Personalized Recommendation
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Answer a few questions to receive a tailored life insurance
              recommendation
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Insurance recommendation form"
          >
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
                name="age"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) =>
                  handleInputChange("age", Number(e.target.value))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                disabled={loading}
                aria-describedby="age-help"
              />
              <p id="age-help" className="mt-1 text-sm text-gray-500">
                Must be between 18 and 100 years old
              </p>
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
                name="income"
                min="0"
                step="100"
                value={formData.income}
                onChange={(e) =>
                  handleInputChange("income", Number(e.target.value))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                disabled={loading}
                aria-describedby="income-help"
              />
              <p id="income-help" className="mt-1 text-sm text-gray-500">
                Your monthly income before taxes
              </p>
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
                name="dependents"
                min="0"
                max="10"
                value={formData.dependents}
                onChange={(e) =>
                  handleInputChange("dependents", Number(e.target.value))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                disabled={loading}
                aria-describedby="dependents-help"
              />
              <p id="dependents-help" className="mt-1 text-sm text-gray-500">
                People who depend on your income (spouse, children, etc.)
              </p>
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
                name="riskTolerance"
                value={formData.riskTolerance}
                onChange={(e) =>
                  handleInputChange("riskTolerance", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                disabled={loading}
                aria-describedby="risk-help"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <p id="risk-help" className="mt-1 text-sm text-gray-500">
                Your comfort level with investment risk
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              aria-describedby={loading ? "loading-description" : undefined}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? "Generating Recommendation..." : "Get Recommendation"}
            </button>
            {loading && (
              <p id="loading-description" className="sr-only">
                Please wait while we generate your recommendation
              </p>
            )}
          </form>

          {/* Error Message */}
          {error && (
            <div
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              role="alert"
              aria-live="polite"
            >
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Recommendation Display */}
          {recommendation && (
            <div
              className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
              role="region"
              aria-label="Recommendation results"
            >
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
