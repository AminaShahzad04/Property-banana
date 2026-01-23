"use client";

import Image from "next/image";

interface PropertyGalleryProps {
  images: string[];
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] rounded-lg overflow-hidden">
      {/* Main large image - takes up left 2 columns and 2 rows */}
      <div className="col-span-2 row-span-2 relative">
        <Image
          src={images[0] || "/placeholder.jpg"}
          alt="Property main view"
          fill
          className="object-cover"
        />
      </div>

      {/* Four smaller images on the right */}
      {images.slice(1, 5).map((image, index) => (
        <div key={index} className="relative">
          <Image
            src={image || "/placeholder.jpg"}
            alt={`Property view ${index + 2}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
