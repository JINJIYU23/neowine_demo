"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { LLMAnalysis, LLMWebSocketMessage } from '../types/llmType';

interface LLMContextType {
  currentAnalysis: LLMAnalysis | null;
  loading: boolean;
  error: string | null;
  isConnected: boolean;
}

const LLMContext = createContext<LLMContextType | undefined>(undefined);

interface LLMProviderProps {
  children: ReactNode;
}

export function LLMProvider({ children }: LLMProviderProps) {
  const [currentAnalysis, setCurrentAnalysis] = useState<LLMAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // 최신 LLM 분석 결과 가져오기
  const fetchLatestAnalysis = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/llm/analysis/latest?limit=1');
      if (response.ok) {
        const data = await response.json();
        if (data.analyses && data.analyses.length > 0) {
          setCurrentAnalysis(data.analyses[0]);
        }
      }
    } catch (error) {
      console.error('LLM 분석 데이터 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // WebSocket 연결
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    
    ws.onopen = () => {
      console.log('LLM WebSocket 연결됨');
      setIsConnected(true);
      setError(null);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.type === 'llm_analysis') {
          const llmMessage = message as LLMWebSocketMessage;
          
          // 새로운 분석 결과로 업데이트
          const newAnalysis: LLMAnalysis = {
            id: llmMessage.analysis_id,
            timestamp: llmMessage.data.timestamp,
            situation_analysis: llmMessage.data.situation_analysis,
            recommendations: llmMessage.data.recommendations,
            expected_route: llmMessage.data.expected_route,
            confidence: llmMessage.data.confidence,
            created_at: new Date().toISOString()
          };
          
          setCurrentAnalysis(newAnalysis);
          setLoading(false);
        }
      } catch (error) {
        console.error('WebSocket 메시지 파싱 오류:', error);
      }
    };

    ws.onclose = () => {
      console.log('LLM WebSocket 연결 종료');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('LLM WebSocket 오류:', error);
      setError('WebSocket 연결 오류');
      setIsConnected(false);
    };

    // 초기 데이터 로드
    fetchLatestAnalysis();

    return () => {
      ws.close();
    };
  }, []);

  return (
    <LLMContext.Provider value={{
      currentAnalysis,
      loading,
      error,
      isConnected
    }}>
      {children}
    </LLMContext.Provider>
  );
}

export function useLLM() {
  const context = useContext(LLMContext);
  if (context === undefined) {
    throw new Error('useLLM must be used within a LLMProvider');
  }
  return context;
}
