"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { userService } from "@/api/user.service";
import { agentService } from "@/api/agent.service";

export function AgentDetails() {
  const [profile, setProfile] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, perfData] = await Promise.all([
          userService.getMyProfile(),
          agentService.getPerformance(),
        ]);
        setProfile(profileData);
        setPerformance(perfData);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col  w-full ">
      <h1 className="text-2xl font-bold mb-10 w-full max-w-4xl">
        Agent Details
      </h1>
      <div className="w-full bg-card p-12 max-w-4xl flex flex-col items-center">
        <div className="flex flex-col items-start w-full">
          {profile?.photo_url ? (
            <Image
              src={profile.photo_url}
              alt="Agent Profile"
              width={100}
              height={100}
              className="rounded-full object-cover mb-6"
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mb-6">
              No Photo
            </div>
          )}
          <div className="flex flex-row justify-start gap-16 w-full mb-10">
            <div className="flex flex-col gap-6">
              <div>
                <div className="font-semibold text-sm">Full Name</div>
                <div className="text-gray-700">
                  {profile?.full_name || "N/A"}
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm">Phone Number</div>
                <div className="text-gray-400">
                  {profile?.phone_no || "N/A"}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <div className="font-semibold text-sm">Email</div>
                <div className="text-gray-400">{profile?.email || "N/A"}</div>
              </div>
              <div>
                <div className="font-semibold text-sm">WhatsApp</div>
                <div className="text-gray-400">
                  {profile?.whatsapp_no || "N/A"}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <div className="font-semibold text-sm">Total Listings</div>
                <div className="text-gray-400">
                  {performance?.totalListings || 0} properties
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm">Conversion Rate</div>
                <div className="text-gray-400">
                  {performance?.conversionRate || "0%"}
                </div>
              </div>
            </div>
          </div>
          <Button className="bg-yellow-400 hover:bg-[#FBDE02] text-black font-semibold px-8 py-2 rounded-none mt-2">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
