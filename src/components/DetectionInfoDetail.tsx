import React from "react";
import DetectionLevelButton from "./DetectionButton";

interface DetectionInfoDetailProps {
  className: string;
  confidence: number;
  coordinates: string;
  timestamp: string;
  riskLevel: 'LOW' | 'MEDI' | 'HIGH';
  riskColor: string;
}

export default function DetectionInfoDetail({
  className,
  confidence,
  coordinates,
  timestamp,
  riskLevel,
  riskColor
}: DetectionInfoDetailProps) {
  // 클래스명에 따른 제목 색상 결정
  const getTitleColor = (className: string) => {
    const lowerClass = String(className || '').toLowerCase();
    if (lowerClass.includes('enemy tank')) return 'text-[var(--red-color)]';
    if (lowerClass.includes('enemy')) return 'text-[#FFF200]';
    if (lowerClass.includes('ally')) return 'text-[#FFF200]';
    return 'text-[#FFF200]'; // 기본값
  };

  return (
    <div className="border-[var(--stroke-color)] bg-[var(--white-bg)] rounded-[10px] shadow-md m-[5px] w-min-full h-[100px] pt-2 px-1.5 pb-3">
      <div className="border rounded-[10px] py-1 px-2 bg-[var(--black-color)]">
        <h1 className={`text-[18px] font-semibold ${getTitleColor(className)}`}>
          {String(className || '').toUpperCase()} <span className="text-[var(--white-bg)]">DETECTED</span>
        </h1>
      </div>
      <div className="flex items-start gap-0 mt-2">
        <DetectionLevelButton level={riskLevel} color={riskColor} />
        <div className="p-1 ml-[5px] flex-1">
          <p className="mb-1 text-sm">좌표: {coordinates}</p>
          <p className="mb-0 text-sm">{timestamp}</p>
        </div>
      </div>
    </div>
  );
}
