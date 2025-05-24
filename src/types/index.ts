// Types for slot machine reviews
export interface LocalizedText {
  kr: string;
  en: string;
  jp: string;
}

export interface SlotMachine {
  id: string;
  name: string;
  provider: string;
  updatedDate: string;
  overallScore: number;
  profitScore: number;
  volatility: number;
  volatilityScore: number;
  hitFrequency: number;
  hitFrequencyScore: number;
  profithitRatio: number;
  profithitRatioScore: number;
  maxMultiplier: number;
  maxMultiplierScore: number;
  avgMultiplier: number;
  avgMultiplierScore: number;
  betAmount: number;
  rtp: number;
  imageUrl: string;
  title: LocalizedText;
  dev: LocalizedText;
  description: LocalizedText;
  webUrls: string[];
  screenshots: string[]; // 최대 10개의 스크린샷 URL을 저장할 배열
  thumbnail: string;
}

export interface ScoreMetric {
  title: string;
  score: number;
  value?: number;
  description?: string;
}

export interface ScoreCategory {
  title: string;
  metrics: ScoreMetric[];
}

// Cloudinary 관련 타입 추가
export interface CloudinaryConfig {
  cloudName: string; // Cloudinary 클라우드 이름
  apiKey?: string; // API 키 (선택 사항)
}
