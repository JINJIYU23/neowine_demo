"use client";

import CameraFeed from "@/components/CameraFeed";
import DetectionInfo from "@/components/DetectionInfo";
import LLMText from "@/components/LLMText";
import LLMTextHistory from "@/components/LLMTextHistory";
import Map from "@/components/Map";
import Weather from "@/components/Weather";
import { LLMProvider } from "@/contexts/LLMContext";

export default function ClientDashboard() {
  return (
    <LLMProvider>
      <div className="min-h-screen">
        <header>
          <h1 className="m-5 text-[36px] font-semibold">
            지능형 전장감시 유무인복합체계
          </h1>
        </header>
        {/* 레이아웃 */}
        <main className="grid grid-cols-12">
          <div className="col-span-2">
            <DetectionInfo />
          </div>

          <div className="col-span-4">
            <CameraFeed />
          </div>

          <div className="col-span-4 flex flex-col">
            <Weather />
            <Map />
          </div>

          <div className="col-span-2">
            <LLMTextHistory />
          </div>

          <div className="col-span-12">
            <LLMText />
          </div>
        </main>
      </div>
    </LLMProvider>
  );
}
