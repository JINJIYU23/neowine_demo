"use client";

import React, { useState, useEffect } from "react";
import DetectionInfoDetail from "./DetectionInfoDetail";

interface DetectionData {
  id: string; // 고유한 문자열 ID로 변경
  frame_id: string;
  class_name: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  timestamp: string;
  image_width: number;
  image_height: number;
}

interface APIResponse {
  detections: Array<{
    id: number;
    timestamp: string;
    frame_id: string;
    objects: Array<{
      object_id: number;
      class_id: number;
      confidence: number;
      bounding_box: { x: number; y: number; width: number; height: number };
      center_point: { x: number; y: number };
    }>;
  }>;
}

export default function DetectionInfo() {
  const [detections, setDetections] = useState<DetectionData[]>([]);
  const [loading, setLoading] = useState(true);

  // 클래스 ID를 클래스명으로 변환
  const getClassName = (classId: number): string => {
    const classMap: Record<number, string> = {
      0: "person",
      1: "bicycle",
      2: "enemy tank",
      3: "enemy tank",
      4: "enemy tank",
      5: "ally tank",
      6: "ally tank",
    };
    return classMap[classId] || `class_${classId}`;
  };

  // API에서 최신 감지 데이터 가져오기
  const fetchDetections = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/detections/latest?limit=10"
      );
      if (response.ok) {
        const data: APIResponse = await response.json();

        // API 응답을 DetectionData 형식으로 변환
        const transformedDetections: DetectionData[] = [];

        data.detections.forEach((detection) => {
          detection.objects.forEach((obj, objIndex) => {
            // 고유한 ID 생성: frame_id + object_id + 인덱스 조합
            const uniqueId = `${detection.frame_id}_${obj.object_id}_${objIndex}`;

            transformedDetections.push({
              id: uniqueId,
              frame_id: detection.frame_id,
              class_name: getClassName(obj.class_id),
              confidence: obj.confidence,
              x: obj.center_point.x,
              y: obj.center_point.y,
              width: obj.bounding_box.width,
              height: obj.bounding_box.height,
              timestamp: detection.timestamp,
              image_width: 640, // API에서 제공하지 않으므로 기본값
              image_height: 480,
            });
          });
        });

        setDetections(transformedDetections);
      }
    } catch (error) {
      console.error("감지 데이터 가져오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchDetections();

    // 5초마다 데이터 업데이트
    const interval = setInterval(fetchDetections, 5000);

    return () => clearInterval(interval);
  }, []);

  // 위험도 레벨 매핑
  const getRiskLevel = (
    className: string
  ): { level: "LOW" | "MEDI" | "HIGH"; color: string } => {
    const lowerClass = String(className || "").toLowerCase();
    if (lowerClass.includes("ally tank"))
      return { level: "LOW", color: "var(--blue-color)" };
    if (lowerClass.includes("ally"))
      return { level: "LOW", color: "var(--blue-color)" };
    if (lowerClass.includes("enemy tank"))
      return { level: "HIGH", color: "var(--red-color)" };
    if (lowerClass.includes("enemy"))
      return { level: "MEDI", color: "var(--orange-color)" };
    return { level: "LOW", color: "var(--blue-color)" }; // 기본값
  };

  // 시간 포맷팅
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp || new Date());
      return date.toLocaleString("ko-KR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch (error) {
      return "시간 정보 없음";
    }
  };

  return (
    <div className="ml-5 rounded-[10px] bg-[var(--box-color)] h-[600px] shadow-md">
      <h2 className="text-[24px] text-gray-700 font-semibold text-center pt-[15px]">
        DETECTION INFO
      </h2>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">데이터 로딩 중...</div>
        </div>
      ) : detections.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">감지된 객체가 없습니다.</div>
        </div>
      ) : (
        <ul className="max-h-[500px] overflow-y-auto hide-scrollbar">
          {detections.map((detection) => {
            const riskInfo = getRiskLevel(detection.class_name);
            return (
              <li key={detection.id}>
                <DetectionInfoDetail
                  className={detection.class_name}
                  confidence={detection.confidence}
                  coordinates={`${(detection.x || 0).toFixed(4)}, ${(
                    detection.y || 0
                  ).toFixed(4)}`}
                  timestamp={formatTimestamp(detection.timestamp)}
                  riskLevel={riskInfo.level}
                  riskColor={riskInfo.color}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
