"use client";

import React, { useState, useEffect } from "react";
import { useLLM } from "../contexts/LLMContext";

export default function Report() {
  const { currentAnalysis, loading, error } = useLLM();
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentAnalysis?.situation_analysis) {
      const fullText = currentAnalysis.situation_analysis;
      setDisplayedText("");
      setIsTyping(true);

      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 30); // 30ms마다 한 글자씩 (빠른 속도)

      return () => clearInterval(typingInterval);
    }
  }, [currentAnalysis?.situation_analysis]);

  return (
    <div className="rounded-[10px] bg-[var(--box-color)] min-h-full shadow-md p-2">
      <h1 className="font-semibold text-[20px] p-1 text-gray-700">
        상황 분석 리포트
      </h1>
      <hr className="border-gray-700" />
      <div className="py-[10px]">
        {loading ? (
          <p className="text-gray-700 text-center">AI 분석 중...</p>
        ) : error ? (
          <p className="text-[var(--red-color)] text-center">
            분석 오류: {error}
          </p>
        ) : currentAnalysis ? (
          <p className="text-gray-700">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        ) : (
          <p className="text-gray-700 text-center">분석 데이터가 없습니다</p>
        )}
      </div>
    </div>
  );
}
