"use client";

export function VideoBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/video2.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
