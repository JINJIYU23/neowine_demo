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
