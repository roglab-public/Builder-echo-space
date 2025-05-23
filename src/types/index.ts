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
  screenshots: string[];
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
