"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<number | null>(null);

  const handleNextImage = () => {
    if (fullScreenImage !== null && fullScreenImage < images.length - 1) {
      setFullScreenImage(fullScreenImage + 1);
    }
  };

  const handlePrevImage = () => {
    if (fullScreenImage !== null && fullScreenImage > 0) {
      setFullScreenImage(fullScreenImage - 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] rounded-lg overflow-hidden relative">
        {/* Main large image - takes up left 2 columns and 2 rows */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group"
          onClick={() => setFullScreenImage(0)}
        >
          <Image
            src={images[0] || "/placeholder.jpg"}
            alt="Property main view"
            fill
            className="object-cover group-hover:brightness-90 transition-all"
          />
        </div>

        {/* Four smaller images on the right */}
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer group"
            onClick={() => setFullScreenImage(index + 1)}
          >
            <Image
              src={image || "/placeholder.jpg"}
              alt={`Property view ${index + 2}`}
              fill
              className="object-cover group-hover:brightness-90 transition-all"
            />
          </div>
        ))}

        {/* Show all photos button - only show if more than 5 images */}
        {images.length > 5 && (
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-md hover:shadow-lg transition-shadow flex items-center gap-2 font-medium text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Show all photos
          </button>
        )}
      </div>

      {/* All Photos Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
          <div className="min-h-screen p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 text-white">
              <h2 className="text-2xl font-semibold">All Photos</h2>
              <button
                onClick={() => setShowAllPhotos(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Grid of all images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-64 cursor-pointer overflow-hidden rounded-lg group"
                  onClick={() => setFullScreenImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Property view ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Viewer */}
      {fullScreenImage !== null && (
        <div className="fixed inset-0 bg-black z-[60] flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={() => setFullScreenImage(null)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
          >
            <X size={32} />
          </button>

          {/* Previous button */}
          {fullScreenImage > 0 && (
            <button
              onClick={handlePrevImage}
              className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <ChevronLeft size={40} />
            </button>
          )}

          {/* Image */}
          <div className="relative w-full h-full flex items-center justify-center p-16">
            <Image
              src={images[fullScreenImage]}
              alt={`Property view ${fullScreenImage + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Next button */}
          {fullScreenImage < images.length - 1 && (
            <button
              onClick={handleNextImage}
              className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <ChevronRight size={40} />
            </button>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
            {fullScreenImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
