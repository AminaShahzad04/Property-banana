"use client";

import Image from "next/image";
import { Header } from "@/components/layout/header";

import { SearchForm } from "@/components/general-dashboard/search-form";
import { WhatsAppButton } from "@/components/general-dashboard/whatsapp-button";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full  ">
      {/* Header */}

      <Header />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-start min-h-screen pl-6">
        {/* Background Image */}
        <Image
          src="/landingimage.png"
          alt="Hero Background"
          fill
          priority
          className="-z-10"
          quality={100}
          style={{
            objectFit: "cover",
            objectPosition: "right center",
          }}
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(223, 207, 173, 0.8) 0%, rgba(223, 207, 173, 0) 50%)",
          }}
        ></div>

        <div className="max-w-4xl">
          <div className="flex flex-col items-start text-left">
            {/* Hero Text */}
            <h1
              className="text-5xl md:text-6xl font-bold mb-12 pl-28"
              style={{
                color: "#000000",
              }}
            >
              Rent your
              <br />
              perfect home
            </h1>

            {/* Search Section */}
            <div className="w-full max-w-3xl pl-28">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
