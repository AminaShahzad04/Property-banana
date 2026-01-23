import { PropertyManagersLogo } from "@/components/layout/Logo";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  backgroundImage?: string;
}

export function AuthLayout({ children, backgroundImage = "/Building.png" }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Background Image - Hidden on mobile */}
      <div
        className="hidden lg:block relative"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-8 lg:px-12 bg-white lg:bg-gray-50">
        <div className="w-full max-w-md mx-auto">
          <PropertyManagersLogo />
          {children}
        </div>
      </div>
    </div>
  );
}
