// LLM 분석 결과 타입 정의
export interface LLMAnalysis {
  id: number;
  timestamp: string;
  situation_analysis: string;
  recommendations: string;
  expected_route: string;
  confidence: number;
  created_at: string;
}

export interface LLMAnalysisResponse {
  analyses: LLMAnalysis[];
}

export interface LLMWebSocketMessage {
  type: 'llm_analysis';
  data: {
    timestamp: string;
    situation_analysis: string;
    recommendations: string;
    expected_route: string;
    confidence: number;
  };
  analysis_id: number;
}

// LLM 채팅 관련 타입 정의
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  context?: string; // 현재 상황 분석 결과를 컨텍스트로 전달
}

export interface ChatResponse {
  success: boolean;
  message: string;
  chat_id?: string;
}

export interface ChatWebSocketMessage {
  type: 'chat_response';
  data: {
    message: string;
    timestamp: string;
  };
  chat_id: string;
}