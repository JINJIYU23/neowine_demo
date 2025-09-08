"use client";

import React, { useState, useRef, useEffect } from "react";
import { useYOLOStream } from "@/hooks/useYOLOStream";

export default function CameraFeed() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [classCounts, setClassCounts] = useState<Record<string, number>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  
  // YOLO 스트림 연결 (Hailo 서버에서 직접 영상 수신)
  const { frameWithDetection, isConnected, error, status } = useYOLOStream({
    url: 'ws://localhost:8082/yolo-stream', // Hailo 서버 WebSocket URL
    autoConnect: true,
    reconnectInterval: 3000
  });

  // 컨테이너 크기 측정
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: 400 }); // 고정 높이 400px
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // 비디오 로드 핸들러
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  // 클래스별 객체 수 계산
  useEffect(() => {
    if (frameWithDetection?.detections) {
      const counts: Record<string, number> = {};
      frameWithDetection.detections.forEach(detection => {
        const className = detection.class;
        counts[className] = (counts[className] || 0) + 1;
      });
      setClassCounts(counts);
    }
  }, [frameWithDetection]);

  return (
    <div className="ml-5 rounded-[10px] bg-[var(--box-color)] h-[600px] flex flex-col">
      <h2 className="text-[24px] font-semibold text-center p-[15px]">
        Camera Feed
      </h2>
      
      {/* 비디오 컨테이너 (크기 축소) */}
      <div 
        ref={containerRef}
        className="relative mx-4 mb-2 bg-black rounded overflow-hidden flex justify-center"
      >
        {/* Hailo 서버에서 실시간 영상 수신 */}
        {frameWithDetection ? (
          <img
            src={`data:image/jpeg;base64,${frameWithDetection.frame}`}
            alt="Real-time camera feed"
            className="max-w-full max-h-[400px] object-contain"
            onLoad={handleVideoLoad}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📹</div>
              <div>Hailo 서버에 연결하세요</div>
            </div>
          </div>
        )}

        {/* Hailo 서버에서 Bounding Box가 그려진 완성된 이미지를 받으므로 별도 오버레이 불필요 */}

      </div>

      {/* 고정된 2x2 그리드 형식으로 객체 수 표시 */}
      <div className="mx-4 mb-4">
        <h3 className="text-lg font-semibold mb-2 text-center">감지된 객체</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Ally Tank */}
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 text-center">
            <div className="text-sm font-medium text-blue-800">
              Ally Tank
            </div>
            <div className="text-2xl font-bold text-blue-900">
              {classCounts['ally tank'] || 0}
            </div>
          </div>
          
          {/* Ally */}
          <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-center">
            <div className="text-sm font-medium text-green-800">
              Ally
            </div>
            <div className="text-2xl font-bold text-green-900">
              {classCounts['ally'] || 0}
            </div>
          </div>
          
          {/* Enemy Tank */}
          <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-center">
            <div className="text-sm font-medium text-red-800">
              Enemy Tank
            </div>
            <div className="text-2xl font-bold text-red-900">
              {classCounts['enemy tank'] || 0}
            </div>
          </div>
          
          {/* Enemy */}
          <div className="bg-orange-100 border border-orange-300 rounded-lg p-3 text-center">
            <div className="text-sm font-medium text-orange-800">
              Enemy
            </div>
            <div className="text-2xl font-bold text-orange-900">
              {classCounts['enemy'] || 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
