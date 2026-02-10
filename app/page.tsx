"use client";

import Image from "next/image";
import { Header } from "@/components/layout/header";

import { SearchForm } from "@/components/general-dashboard/search-form";
import { WhatsAppButton } from "@/components/general-dashboard/whatsapp-button";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-start min-h-screen pl-46">
        {/* Background Image */}
        <Image
          src="/hero_background2.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover -z-10"
          quality={100}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 -z-10"></div>

        <div className="max-w-4xl">
          <div className="flex flex-col items-start text-left">
            {/* Hero Text */}
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-12"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              View Freely, Rent Smartly
            </h1>

            {/* Search Section */}
            <div className="w-full max-w-3xl">
              <SearchForm />
            </div>
          </div>
        </div>

        {/* Mascot */}
        <div
          className="absolute right-75 z-10 hidden lg:block"
          style={{
            top: "54%",
            transform: "translateY(-50%)",
            animation: "slideDown 1.5s ease-out",
          }}
        >
          <img
            src="/banana.png"
            alt="Property Banana Mascot"
            style={{
              width: "210px",
              height: "auto",
            }}
          />
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
