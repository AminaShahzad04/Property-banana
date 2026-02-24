"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/contexts/AuthContext";
import { userService } from "@/api/user.service";
import { useState, useEffect } from "react";

export function Header() {
  const { isAuthenticated, logout } = useAuthContext();
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!isAuthenticated) return;

      try {
        const roleStatus = await userService.getRoleStatus();
        if (roleStatus.role_assigned && roleStatus.roles.length > 0) {
          const primaryRole = roleStatus.roles[0];

          // Map role_id to dashboard URL
          switch (primaryRole.role_id) {
            case 1:
              setDashboardUrl("/Dash/landlord");
              break;
            case 2:
              setDashboardUrl("/Dash/tenant");
              break;
            case 3:
              setDashboardUrl("/Dash/agent");
              break;
            case 4:
              setDashboardUrl("/Dash/manager");
              break;
            case 5:
              setDashboardUrl("/Dash/owner");
              break;
            case 6:
              setDashboardUrl("/Dash/admin");
              break;
            default:
              setDashboardUrl("/");
          }
        } else {
          // No role assigned - redirect to home
          setDashboardUrl("/");
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
        setDashboardUrl("/");
      }
    };

    fetchUserRole();
  }, [isAuthenticated]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50">
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
            <Link
              href="/"
              className="text-sm font-medium text-black hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/listings"
              className="text-sm font-medium text-black hover:text-gray-900"
            >
              Listings
            </Link>
            {isAuthenticated && dashboardUrl && (
              <Link
                href={dashboardUrl}
                className="text-sm font-medium text-black hover:text-gray-900"
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/faqs"
              className="text-sm font-medium text-black hover:text-gray-900"
            >
              FAQs
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-black hover:text-gray-900"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Login/Logout Button */}
        {isAuthenticated ? (
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
        ) : (
          <Link
            href="/sign-in"
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
