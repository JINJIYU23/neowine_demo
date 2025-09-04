import React from "react";
import LLMTextHistoryDetail from "./LLMTextHistoryDetail";

export default function LLMTextHistory() {
  // props로 위험도 데이터 패칭
  return (
    <div className="mb-5 mx-5 rounded-[10px] bg-[var(--box-color)] h-[600px] shadow-md">
      <h2 className="text-[24px] font-semibold text-center p-[15px]">
        LLM Text History
      </h2>

      <ul>
        <li>
          <LLMTextHistoryDetail />
        </li>
      </ul>
    </div>
  );
}
