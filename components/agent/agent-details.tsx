"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function AgentDetails() {
  return (
    <div className="min-h-[80vh] flex flex-col  w-full ">
      <h1 className="text-2xl font-bold mb-10 w-full max-w-4xl">
        Agent Details
      </h1>
      <div className="w-full bg-card p-12 max-w-4xl flex flex-col items-center">
        <div className="flex flex-col items-start w-full">
          <Image
            src="/avatar.png"
            alt="Agent Profile"
            width={100}
            height={100}
            className="rounded-full object-cover mb-6"
          />
          <div className="flex flex-row justify-start gap-16 w-full mb-10">
            <div className="flex flex-col gap-6">
              <div>
                <div className="font-semibold text-sm">First Name</div>
                <div className="text-gray-700">John</div>
              </div>
              <div>
                <div className="font-semibold text-sm">Phone Number</div>
                <div className="text-gray-400">0545-45646-5465</div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <div className="font-semibold text-sm">Last Name</div>
                <div className="text-gray-700">Albert</div>
              </div>
              <div>
                <div className="font-semibold text-sm">BRN Number</div>
                <div className="text-gray-400">BRN-1234555</div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <div className="font-semibold text-sm">Email</div>
                <div className="text-gray-400">abc@gmail.com</div>
              </div>
              <div>
                <div className="font-semibold text-sm">No of property</div>
                <div className="text-gray-400">35 properties</div>
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
