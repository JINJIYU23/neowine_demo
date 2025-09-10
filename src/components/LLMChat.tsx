"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLLM } from "../contexts/LLMContext";
import type { ChatMessage } from "../types/llmType";

export default function LLMChat() {
  const { currentAnalysis, chatMessages, addChatMessage } = useLLM();
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 메시지 목록 자동 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // 메시지 전송
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    addChatMessage(userMessage);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/llm/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          context: currentAnalysis
            ? `현재 상황: ${currentAnalysis.situation_analysis}\n권고사항: ${currentAnalysis.recommendations}\n예상경로: ${currentAnalysis.expected_route}`
            : undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: ChatMessage = {
          id: `assistant_${Date.now()}`,
          role: "assistant",
          content: data.message,
          timestamp: new Date().toISOString(),
        };
        addChatMessage(assistantMessage);
      } else {
        throw new Error("응답 생성 실패");
      }
    } catch (error) {
      console.error("채팅 오류:", error);
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: "assistant",
        content:
          "죄송합니다. 응답을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        timestamp: new Date().toISOString(),
      };
      addChatMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Enter 키로 메시지 전송
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 메시지 포맷팅
  const formatMessage = (content: string) => {
    return content.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="mb-5 mx-5 rounded-[10px] bg-[var(--box-color)] h-[600px] shadow-md flex flex-col">
      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p>LLM과 대화를 시작해보세요!</p>
            <p className="text-sm mt-2">
              현재 전장 상황에 대해 질문하거나 조언을 구할 수 있습니다.
            </p>
          </div>
        )}

        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-[10px] ${
                message.role === "user"
                  ? "bg-[var(--blue-color)] text-[var(--white-bg)]"
                  : "bg-gray-100 text-[var(--black-color)]"
              }`}
            >
              <div className="text-[14px]">
                {formatMessage(message.content)}
              </div>
              <div
                className={`text-[12px] mt-1 ${
                  message.role === "user"
                    ? "text-[var(--white-bg)]"
                    : "text-gray-500"
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span className="text-sm">응답 생성 중...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="p-4">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="LLM에게 질문하세요."
            className="flex-1 p-3 border border-gray-400 rounded-[10px] resize-none focus:outline-none focus:border-[var(--blue-color)]"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-3 bg-[var(--blue-color)] text-white rounded-[10px] hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
