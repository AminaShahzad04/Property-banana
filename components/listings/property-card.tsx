"use client";

import Image from "next/image";
import Link from "next/link";

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
}: PropertyCardProps) {
  return (
    <Link href={`/listings/${id}`}>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        {/* Image Container */}
        <div className="relative h-64">
          <Image src={image} alt={title} fill className="object-cover" />
          {/* Property Type Badge */}
          <div
            className="absolute top-4 left-4 px-4 py-1.5 rounded-md font-semibold text-sm flex items-center gap-1"
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
          <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md">
            <p className="font-bold text-lg">
              AED {price}{" "}
              <span className="text-gray-600 text-sm font-normal">/ yr</span>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-xl mb-2">{title}</h3>
          <p className="text-gray-500 text-sm mb-4">{location}</p>

          {/* Features */}
          <div className="flex items-center gap-4 mb-4 text-gray-700">
            <div className="flex items-center gap-1.5">
              <svg
                className="w-5 h-5"
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
              <span className="text-sm">{beds} bed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
              <span className="text-sm">{baths} bath</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              <span className="text-sm">{sqft} sqft</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-gray-600 text-sm">For Rent</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
