import React from "react";
import LLMTextHistoryDetail from "./LLMTextHistoryDetail";

export default function LLMTextHistory() {
  return (
    <div className="ml-5 rounded-[10px] bg-[var(--box-color)] h-[290px]">
      <h2 className="text-[24px] font-semibold text-center p-[15px]">Map</h2>
      <LLMTextHistoryDetail />
    </div>
  );
}
