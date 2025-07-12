"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/recommendation", label: "Get Recommendation" },
    { href: "/history", label: "History" },
  ];

  return (
    <header
      className="bg-white shadow-sm border-b border-blue-100"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
              aria-label="Go to dashboard"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                LifeShield
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex space-x-6"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* User Info and Mobile Nav */}
          <div className="flex items-center space-x-4">
            {/* Desktop User Info */}
            {user && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-sm text-gray-700">
                  Welcome,{" "}
                  <span className="font-medium text-blue-600">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 transition-colors"
                  aria-label="Sign out of your account"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Navigation */}
            <MobileNav currentPath={pathname} />
          </div>
        </div>
      </div>
    </header>
  );
}
