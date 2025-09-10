"use client";

import Image from "next/image";
import CameraFeed from "@/components/CameraFeed";
import DetectionInfo from "@/components/DetectionInfo";
import LLMText from "@/components/LLMText";
import LLMChat from "@/components/LLMChat";
import LLMTextHistory from "@/components/LLMTextHistory";
import Weather from "@/components/Weather";
import { LLMProvider } from "@/contexts/LLMContext";
import Logo from "../asset/image/logog.svg";

export default function ClientDashboard() {
  return (
    <LLMProvider>
      <div className="min-h-screen">
        <header className="flex items-center">
          <Image
            src={Logo}
            alt="logo"
            width={50}
            height={50}
            className="m-5 flex flex-row"
          />
          <h1 className="mt-[10px] text-[36px] font-semibold">
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

          <div className="col-span-3 flex flex-col">
            <Weather />
            <LLMTextHistory />
          </div>

          <div className="col-span-3">
            <LLMChat />
          </div>

          <div className="col-span-12">
            <LLMText />
          </div>
        </main>
      </div>
    </LLMProvider>
  );
}
