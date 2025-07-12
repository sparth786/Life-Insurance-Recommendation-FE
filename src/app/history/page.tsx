"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { insuranceApi } from "../../services/api";
import Header from "../../components/Header";
import { UserSubmissionWithId } from "../../types/insurance";
import Link from "next/link";

export default function HistoryPage() {
  const { user, logout } = useAuth();
  const [history, setHistory] = useState<UserSubmissionWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await insuranceApi.getUserHistory();
        setHistory(data);
      } catch (err) {
        setError("Failed to load history. Please try again.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Recommendation History
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              View all your previous life insurance recommendations
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading your history...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && history.length === 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Recommendations Yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't generated any recommendations yet. Get started with
                your first recommendation!
              </p>
              <Link
                href="/recommendation"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Your First Recommendation
              </Link>
            </div>
          )}

          {!loading && !error && history.length > 0 && (
            <div className="space-y-6">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-xl p-4 md:p-8 hover:shadow-2xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 space-y-4 md:space-y-0">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {item.recommendation}
                      </h3>
                      <p className="text-gray-600">
                        Generated on {formatDate(item.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                          item.riskTolerance === "Low"
                            ? "bg-green-100 text-green-800"
                            : item.riskTolerance === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.riskTolerance} Risk
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">
                        Age
                      </h4>
                      <p className="text-lg font-semibold text-gray-900">
                        {item.age} years
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">
                        Monthly Income
                      </h4>
                      <p className="text-lg font-semibold text-gray-900">
                        ${item.income.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">
                        Dependents
                      </h4>
                      <p className="text-lg font-semibold text-gray-900">
                        {item.dependents}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-green-800 mb-3">
                      Explanation
                    </h4>
                    <p className="text-green-700 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
