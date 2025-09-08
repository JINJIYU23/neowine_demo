"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { YOLOStreamData, YOLODetection, YOLOFrameWithDetection } from '@/types/yoloType';

interface UseYOLOStreamOptions {
  url?: string;
  autoConnect?: boolean;
  reconnectInterval?: number;
}

interface UseYOLOStreamReturn {
  detection: YOLODetection | null;
  frameWithDetection: YOLOFrameWithDetection | null;
  isConnected: boolean;
  error: string | null;
  connect: () => void;
  disconnect: () => void;
  status: string;
}

export function useYOLOStream(options: UseYOLOStreamOptions = {}): UseYOLOStreamReturn {
  const {
    url = 'ws://localhost:8082/yolo-stream', // 기본 WebSocket URL
    autoConnect = true,
    reconnectInterval = 3000
  } = options;

  const [detection, setDetection] = useState<YOLODetection | null>(null);
  const [frameWithDetection, setFrameWithDetection] = useState<YOLOFrameWithDetection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('disconnected');

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      setError(null);
      setStatus('connecting');
      
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('YOLO WebSocket 연결됨');
        setIsConnected(true);
        setStatus('connected');
        setError(null);
        reconnectAttempts.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const streamData: YOLOStreamData = JSON.parse(event.data);
          
          switch (streamData.type) {
            case 'detection':
              setDetection(streamData.data as YOLODetection);
              break;
            case 'frame_with_detection':
              setFrameWithDetection(streamData.data as YOLOFrameWithDetection);
              break;
            case 'status':
              setStatus((streamData.data as { status: string }).status);
              break;
            case 'error':
              setError((streamData.data as { error: string }).error);
              break;
          }
        } catch (err) {
          console.error('WebSocket 메시지 파싱 오류:', err);
          setError('데이터 파싱 오류');
        }
      };

      ws.onclose = (event) => {
        console.log('YOLO WebSocket 연결 종료:', event.code, event.reason);
        setIsConnected(false);
        setStatus('disconnected');
        
        // 자동 재연결 시도
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++;
          setStatus(`재연결 시도 중... (${reconnectAttempts.current}/${maxReconnectAttempts})`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        } else {
          setError('최대 재연결 시도 횟수 초과');
        }
      };

      ws.onerror = (err: Event) => {
        console.error('YOLO WebSocket 오류:', err);
        setError('WebSocket 연결 오류');
        setStatus('error');
      };

    } catch (err) {
      console.error('WebSocket 연결 실패:', err);
      setError('WebSocket 연결 실패');
      setStatus('error');
    }
  }, [url, reconnectInterval, maxReconnectAttempts]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    setIsConnected(false);
    setStatus('disconnected');
    reconnectAttempts.current = 0;
  }, []);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    detection,
    frameWithDetection,
    isConnected,
    error,
    connect,
    disconnect,
    status
  };
}
