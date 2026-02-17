"use client";

import Image from "next/image";
import Link from "next/link";
import { BedSingle, Bath, Maximize2 } from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  image: string;
  layout?: "grid" | "list";
}

export function PropertyCard({
  id,
  title,
  location,
  price,
  beds,
  baths,
  sqft,
  type,
  image,
  layout = "grid",
}: PropertyCardProps) {
  if (layout === "list") {
    return (
      <Link href={`/book-tour/${id}`}>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer flex group">
          {/* Image Container - Left Side */}
          <div className="relative w-[360px] h-[220px] flex-shrink-0 overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            {/* Property Type Badge */}
            <div
              className="absolute top-4 left-4 px-4 py-1.5 rounded-md font-bold text-white text-sm flex items-center gap-1 transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0"
              style={{ backgroundColor: "#FBDE02" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {type}
            </div>
            {/* Price Badge */}
            <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
              <p className="font-bold text-sm">
                AED {price} <span className="text-black">/ yr</span>
              </p>
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="p-6 flex-1 flex flex-col ">
            <div>
              <h3 className="font-semibold text-md mb-2">{title}</h3>
              <p className="text-gray-500 text-sm mb-4">{location}</p>

              {/* Features */}
              <div className="flex items-center gap-6 text-gray-700">
                <div className="flex items-center gap-2 group-hover:text-yellow-400 transition-colors">
                  <BedSingle className="w-5 h-5" />
                  <span className="text-sm">{beds} bed</span>
                </div>
                <div className="flex items-center gap-2 group-hover:text-yellow-400 transition-colors">
                  <Bath className="w-5 h-5" />
                  <span className="text-sm">{baths} bath</span>
                </div>
                <div className="flex items-center gap-2 group-hover:text-yellow-400 transition-colors">
                  <Maximize2 className="w-5 h-5" />
                  <span className="text-sm">{sqft} sqft</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-400 group-hover:border-yellow-400 transition-colors mt-4 ">
              <p className="text-gray-600 text-sm mt-4">For Rent</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/book-tour/${id}`}>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {/* Property Type Badge */}
          <div
            className="absolute top-4 left-4 px-4 py-1.5 rounded-md font-semibold text-sm flex items-center gap-1 transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0"
            style={{ backgroundColor: "#FBDE02" }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {type}
          </div>
          {/* Price Badge */}
          <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded-lg shadow-md">
            <p className="font-bold text-sm">
              AED {price} <span className="text-gray-600 ">/ yr</span>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-xl mb-2">{title}</h3>
          <p className="text-gray-500 text-sm mb-4">{location}</p>

          {/* Features */}
          <div className="flex items-center gap-4 mb-4 text-gray-700">
            <div className="flex items-center gap-1.5 group-hover:text-yellow-400 transition-colors">
              <BedSingle className="w-5 h-5" />
              <span className="text-sm">{beds} bed</span>
            </div>
            <div className="flex items-center gap-1.5 group-hover:text-yellow-400 transition-colors">
              <Bath className="w-5 h-5" />
              <span className="text-sm">{baths} bath</span>
            </div>
            <div className="flex items-center gap-1.5 group-hover:text-yellow-400 transition-colors">
              <Maximize2 className="w-5 h-5" />
              <span className="text-sm">{sqft} sqft</span>
            </div>
          </div>

          <div className="border-t border-gray-200 group-hover:border-yellow-400 transition-colors pt-4 mt-4">
            <p className="text-gray-600 text-sm">For Rent</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
