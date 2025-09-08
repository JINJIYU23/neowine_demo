// YOLO 추론 결과 타입 정의
export interface BoundingBox {
  x: number;        // x 좌표 (0-1 정규화)
  y: number;        // y 좌표 (0-1 정규화)
  width: number;    // 너비 (0-1 정규화)
  height: number;   // 높이 (0-1 정규화)
  confidence: number; // 신뢰도 (0-1)
  class: string;    // 클래스 이름
  classId: number;  // 클래스 ID
}

export interface YOLODetection {
  frameId: string;  // 프레임 ID
  timestamp: number; // 타임스탬프
  imageWidth: number; // 원본 이미지 너비
  imageHeight: number; // 원본 이미지 높이
  detections: BoundingBox[]; // 감지된 객체들
}

export interface YOLOFrameWithDetection {
  frameId: string;  // 프레임 ID
  timestamp: number; // 타임스탬프
  imageWidth: number; // 원본 이미지 너비
  imageHeight: number; // 원본 이미지 높이
  frame: string;    // base64 인코딩된 이미지
  detections: BoundingBox[]; // 감지된 객체들
  inferenceTime: number; // 추론 시간 (ms)
  fps: number;      // FPS
}

export interface YOLOStreamData {
  type: 'detection' | 'frame_with_detection' | 'status' | 'error';
  data: YOLODetection | YOLOFrameWithDetection | { status: string } | { error: string };
}
