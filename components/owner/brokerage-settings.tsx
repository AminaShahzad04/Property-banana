"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Upload } from "lucide-react";
import { brokerageService } from "@/api/brokerage.service";

export function BrokerageSettings() {
  const [brokerageName, setBrokerageName] = useState("");
  const [tradeLicenseNumber, setTradeLicenseNumber] = useState("");
  const [tradeLicenseExpiry, setTradeLicenseExpiry] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [propertyLocation1, setPropertyLocation1] = useState("");

  const [officeEmail, setOfficeEmail] = useState("");
  const [hoursOfOperation, setHoursOfOperation] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleSaveChanges = async () => {
    if (!logoFile) {
      alert("Please upload a logo file.");
      return;
    }
    
    try {
      setLoading(true);
      await brokerageService.createBrokerage({
        name: brokerageName,
        tradeLicenseNo: tradeLicenseNumber,
        email: officeEmail,
        phoneNo: officePhone,
        officeRegistrationNo: propertyLocation1,
        tradeLicenseDocument: logoFile, // Using logo file as placeholder - update if separate trade license file exists
        logo: logoFile,
      });
      alert("Brokerage settings saved successfully!");
    } catch (error) {
      console.error("Failed to save brokerage settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <h1 className="text-2xl font-bold mb-2">Brokerage Settings</h1>
      <p className="text-sm text-gray-500 mb-8">
        Manage your brokerage information and branding
      </p>
      <div className=" max-w-4xl">
        <div className="w-full bg-card p-8 max-w-4xl">
          <div className="space-y-6 pl-6">
            {/* Brokerage Name */}
            <div>
              <Label
                htmlFor="brokerageName"
                className="text-sm  pl-4 font-semibold"
              >
                Brokerage Name<span className="text-red-600">*</span>
              </Label>
              <Input
                id="brokerageName"
                placeholder="Enter brokerage name"
                value={brokerageName}
                onChange={(e) => setBrokerageName(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Trade License Number */}
            <div>
              <Label
                htmlFor="tradeLicenseNumber"
                className="text-sm  pl-4 font-semibold"
              >
                Trade License Number<span className="text-red-600">*</span>
              </Label>
              <Input
                id="tradeLicenseNumber"
                placeholder="Enter number"
                value={tradeLicenseNumber}
                onChange={(e) => setTradeLicenseNumber(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Trade License Expiry */}
            <div>
              <Label
                htmlFor="tradeLicenseExpiry"
                className="text-sm  pl-4 font-semibold"
              >
                Trade License Expiry<span className="text-red-600">*</span>
              </Label>
              <Input
                id="tradeLicenseExpiry"
                placeholder="Enter Date"
                type="date"
                value={tradeLicenseExpiry}
                onChange={(e) => setTradeLicenseExpiry(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Office Phone */}
            <div>
              <Label
                htmlFor="officePhone"
                className="text-sm  pl-4 font-semibold"
              >
                Office Phone<span className="text-red-600">*</span>
              </Label>
              <Input
                id="officePhone"
                placeholder="Enter Phone Number"
                value={officePhone}
                onChange={(e) => setOfficePhone(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Property Location 1 */}
            <div>
              <Label
                htmlFor="propertyLocation1"
                className="text-sm  pl-4 font-semibold"
              >
                Property Location<span className="text-red-600">*</span>
              </Label>
              <Input
                id="propertyLocation1"
                placeholder="Enter Property Location"
                value={propertyLocation1}
                onChange={(e) => setPropertyLocation1(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Office Contact Email */}
            <div>
              <Label
                htmlFor="officeEmail"
                className="text-sm  pl-4 font-semibold"
              >
                Office Contact Email<span className="text-red-600">*</span>
              </Label>
              <Input
                id="officeEmail"
                placeholder="Enter Email"
                type="email"
                value={officeEmail}
                onChange={(e) => setOfficeEmail(e.target.value)}
                className="mt-2 "
              />
            </div>

            {/* Hours of Operation */}
            <div>
              <Label
                htmlFor="hoursOfOperation"
                className="text-sm  pl-4 font-semibold"
              >
                Hours of Operation<span className="text-red-600">*</span>
              </Label>
              <Input
                id="hoursOfOperation"
                placeholder="Enter time"
                value={hoursOfOperation}
                onChange={(e) => setHoursOfOperation(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Office Address */}
            <div>
              <Label
                htmlFor="officeAddress"
                className="text-sm  pl-4 font-semibold"
              >
                Office Address<span className="text-red-600">*</span>
              </Label>
              <Input
                id="officeAddress"
                placeholder="Enter Office Address"
                value={officeAddress}
                onChange={(e) => setOfficeAddress(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Brokerage Logo */}
            <div>
              <Label className="text-sm pl-4 font-normal">Brokerage logo</Label>
              <div className="mt-2 flex items-center gap-2 pl-4">
                <Upload className="w-5 h-5 text-gray-700" />
                <label className="text-sm text-gray-700 underline hover:text-gray-900 cursor-pointer">
                  {logoFile ? logoFile.name : "upload new logo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Save Changes Button */}
        <div className="pt-4 justify-end flex mt-8">
          <Button
            onClick={handleSaveChanges}
            disabled={loading}
            className="bg-[#FBDE02] hover:bg-yellow-500 text-black font-semibold px-12 py-2 rounded-none disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
