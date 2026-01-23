"use client";

import { Button } from "@/components/ui/Button";
import { useAuthContext } from "@/contexts/AuthContext";

export function Header() {
  const { user, isAuthenticated, logout } = useAuthContext();

  return (
    <header className="border-b bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold">Property Banana</div>
        <nav className="flex gap-8 items-center">
          <a href="#" className="text-sm hover:text-primary">
            Home
          </a>
          <a href="#" className="text-sm hover:text-primary ">
            Listings
          </a>
          <a
            href="#"
            className="text-sm text-yellow-500 font-semibold hover:text-yellow-500"
          >
            Dashboard
          </a>
          <a href="#" className="text-sm hover:text-primary">
            FAQs
          </a>
          <a href="#" className="text-sm hover:text-primary ">
            Contact
          </a>
        </nav>
        {isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium">{user.full_name}</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-sm"
            >
              Logout
            </Button>
            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
          </div>
        ) : (
          <Button variant="ghost" size="icon">
            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold">
              Z
            </div>
          </Button>
        )}
      </div>
    </header>
  );
}
