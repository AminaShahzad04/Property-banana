"use client";
import { useState } from "react";
import Image from "next/image";

export default function RoughBidDemo() {
  const minBid = 100000;
  const maxBid = 700000;
  const [bidAmount, setBidAmount] = useState(612000);
  const [bidInput, setBidInput] = useState("612000");
  const [installments, setInstallments] = useState(2);
  const [bidLoading, setBidLoading] = useState(false);
  const [bidError, setBidError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[350px]">
        <h3 className="text-2xl font-bold text-center mb-6">Place a bid</h3>
        <div className="flex items-center gap-4 px-2">
          {/* Left - Hand with Money */}
          <div className="flex-shrink-0">
            <Image
              src="/bid.png"
              alt="Bid"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          {/* Middle - Slider and Input */}
          <div className="flex-1">
            <div className="relative w-full" style={{ height: "48px" }}>
              {/* Thin slider track */}
              <div
                className="absolute left-0 right-0 top-1/2"
                style={{ height: "8px", transform: "translateY(-50%)" }}
              >
                {/* Uncovered track */}
                <div className="w-full h-full rounded-full bg-yellow-100" />
                {/* Covered track */}
                <div
                  className="absolute left-0 top-0 h-full bg-yellow-400 rounded-full"
                  style={{
                    width: `${((bidAmount - minBid) / (maxBid - minBid)) * 100}%`,
                  }}
                ></div>
              </div>
              {/* Slider input (transparent, overlays the track) */}
              <input
                type="range"
                min={minBid}
                max={maxBid}
                step={1000}
                value={bidAmount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setBidAmount(val);
                  setBidInput(val.toString());
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                style={{ WebkitAppearance: "none", appearance: "none" }}
              />
              {/* Thumb above the track, outside */}
              <div
                className="absolute z-30"
                style={{
                  left: `calc(${((bidAmount - minBid) / (maxBid - minBid)) * 100}% )`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-6 h-6 rounded-full border-3 border-yellow-200 bg-gradient-to-br from-yellow-200 via-yellow-300 to-green-400 shadow-lg" />
              </div>
            </div>
            {/* Min/Max Labels */}
            <div className="flex justify-between text-xs text-gray-600 font-medium">
              <span>100,000 AED</span>
              <span>700,000 AED</span>
            </div>
            {/* Input field */}
            <input
              type="number"
              min={minBid}
              max={maxBid}
              step={1000}
              value={bidInput}
              onChange={(e) => {
                let val = e.target.value.replace(/[^0-9]/g, "");
                if (val === "") val = minBid.toString();
                let num = Math.max(minBid, Math.min(maxBid, Number(val)));
                setBidInput(num.toString());
                setBidAmount(num);
              }}
              className="mt-4 w-full border border-gray-300 rounded px-3 py-2 text-lg font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="AED"
            />
          </div>
        </div>
        {/* Installments selection */}
        <div className="mt-6">
          <div className="font-semibold text-center">
            Select number of installments
          </div>
          <div className="text-center text-gray-500 text-sm mb-2">
            In how many installments do you want to pay?
          </div>
          <div className="grid grid-cols-3 gap-4 justify-items-center max-w-xs mx-auto mb-2">
            {[2, 4, 6, 8, 10, 12].map((num, idx) => (
              <button
                key={num}
                type="button"
                onClick={() => setInstallments(num)}
                className={`w-16 h-16 rounded-full border flex items-center justify-center text-lg font-bold transition-all duration-150 ${installments === num ? "bg-yellow-300 border-yellow-400 text-black shadow-md" : "bg-white border-gray-300 text-gray-700"}`}
                style={{ marginBottom: idx < 3 ? "0.5rem" : undefined }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        {/* Submit button */}
        <button
          className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded transition-all disabled:opacity-60"
          disabled={bidLoading}
          onClick={async () => {
            setBidLoading(true);
            setBidError("");
            setTimeout(() => {
              setBidLoading(false);
              alert(`Bid: ${bidAmount} AED, Installments: ${installments}`);
            }, 800);
          }}
        >
          {bidLoading ? "Submitting..." : "Submit bid"}
        </button>
        {bidError && (
          <div className="text-red-600 text-center mt-2">{bidError}</div>
        )}
      </div>
    </div>
  );
}
