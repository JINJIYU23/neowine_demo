import React from "react";
import DetectionInfoDetail from "./DetectionInfoDetail";

export default function DetectionInfo() {
  return (
    <div className="ml-5 rounded-[10px] bg-[var(--box-color)] h-[600px]">
      <h2 className="text-[24px] font-semibold text-center pt-[15px]">
        Detection Info
      </h2>
      <ul>
        <li>
          <DetectionInfoDetail />
        </li>
      </ul>
    </div>
  );
}
