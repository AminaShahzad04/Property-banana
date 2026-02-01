"use client";

import Image from "next/image";
import { useAuthContext } from "@/contexts/AuthContext";

export function Header() {
  const { isAuthenticated, logout } = useAuthContext();

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-6 py-2">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-6 ml-32">
          {/* Logo */}
          <Image
            src="/PB_logo.png"
            alt="Property Banana"
            width={60}
            height={60}
            className="object-contain"
          />

          {/* Navigation */}
          <nav className="flex gap-8 items-center">
            <a
              href="/"
              className="text-sm font-medium text-black hover:text-gray-900"
            >
              Home
            </a>
            <a
              href="/listings"
              className="text-sm font-medium text-black hover:text-gray-900"
            >
              Listings
            </a>
            <a
              href="/Dash/dashboard"
              className="text-sm font-medium text-black hover:text-gray-900"
            >
              Dashboard
            </a>
            <a
              href="/faqs"
              className="text-sm font-medium text-black hover:text-gray-900"
            >
              FAQs
            </a>
            <a
              href="/contact"
              className="text-sm font-medium text-black hover:text-gray-900"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 mr-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
}
