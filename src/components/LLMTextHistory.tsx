import React from "react";
import LLMTextHistoryDetail from "./LLMTextHistoryDetail";

export default function LLMTextHistory() {
  return (
    <div className="ml-5 rounded-[10px] bg-[var(--box-color)] h-[290px] shadow-md">
      <h2 className="text-[24px] text-gray-700 font-semibold text-center p-[15px]">
        LLM TEXT HISTORY
      </h2>
      <LLMTextHistoryDetail />
    </div>
  );
}
