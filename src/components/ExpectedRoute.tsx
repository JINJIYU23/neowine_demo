"use client";

import React, { useState, useEffect } from "react";
import { useLLM } from "../contexts/LLMContext";

export default function ExpectedRoute() {
  const { currentAnalysis, loading, error } = useLLM();
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentAnalysis?.expected_route) {
      const fullText = currentAnalysis.expected_route;
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
  }, [currentAnalysis?.expected_route]);

  return (
    <div className="rounded-[10px] bg-[#FF7F11]/20 h-min-full shadow-md p-2">
      <h1 className="font-semibold p-1 text-[20px] text-[var(--orange-color)]">
        예상 경로
      </h1>
      <hr className="border-[var(--orange-color)]" />
      <div className="py-[10px]">
        {loading ? (
          <p className="text-[var(--black-color)] text-center">
            AI 분석 중...
          </p>
        ) : error ? (
          <p className="text-red-500 text-center">
            분석 오류: {error}
          </p>
        ) : currentAnalysis ? (
          <p className="text-[var(--black-color)]">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        ) : (
          <p className="text-[var(--black-color)] text-center">
            분석 데이터가 없습니다
          </p>
        )}
      </div>
    </div>
  );
}
