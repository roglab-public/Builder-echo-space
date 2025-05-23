import { SlotMachine } from "@/types";

// Mock data for slot machines
export const slotMachines: SlotMachine[] = [
  {
    id: "fortune_dragon_lucky_games_2022-03-15",
    name: "Fortune Dragon",
    provider: "Lucky Games",
    updatedDate: "2022-03-15-00-00",
    overallScore: 85,
    profitScore: 95,
    volatility: 8500,
    volatilityScore: 85,
    hitFrequency: 24.8,
    hitFrequencyScore: 12.6,
    profithitRatio: 10.2,
    profithitRatioScore: 65,
    maxMultiplier: 1000,
    maxMultiplierScore: 1000,
    avgMultiplier: 118,
    avgMultiplierScore: 118,
    betAmount: 1,
    rtp: 96.5,
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1lQfNBmauUTP_W4ag46AwLYlbXNDPummD",
    title: {
      kr: "포춘 드래곤",
      en: "Fortune Dragon",
      jp: "フォーチュン・ドラゴン",
    },
    dev: {
      kr: "럭키 게임즈",
      en: "Lucky Games",
      jp: "ラッキーゲームズ",
    },
    description: {
      kr: "행운의 드래곤 테마 슬롯",
      en: "Lucky dragon themed slot",
      jp: "幸運のドラゴンテーマスロット",
    },
    webUrls: ["https://example.com/1"],
    screenshots: ["screenshot1.jpg"],
    thumbnail: "thumbnail1.jpg",
  },
  {
    id: "golden_phoenix_star_casino_2022-04-20",
    name: "Golden Phoenix",
    provider: "Star Casino",
    updatedDate: "2022-04-20-00-00",
    overallScore: 78,
    profitScore: 82,
    volatility: 6500,
    volatilityScore: 65,
    hitFrequency: 32.5,
    hitFrequencyScore: 65.3,
    profithitRatio: 8.7,
    profithitRatioScore: 42,
    maxMultiplier: 750,
    maxMultiplierScore: 750,
    avgMultiplier: 95,
    avgMultiplierScore: 95,
    betAmount: 1,
    rtp: 95.8,
    imageUrl: "/placeholder.svg",
    title: {
      kr: "골든 피닉스",
      en: "Golden Phoenix",
      jp: "ゴールデン・フェニックス",
    },
    dev: {
      kr: "스타 카지노",
      en: "Star Casino",
      jp: "スター・カジノ",
    },
    description: {
      kr: "환상적인 피닉스 테마 슬롯",
      en: "Fantastic phoenix themed slot",
      jp: "幻想的なフェニックステーマのスロット",
    },
    webUrls: ["https://example.com/2"],
    screenshots: ["screenshot2.jpg"],
    thumbnail: "thumbnail2.jpg",
  },
  {
    id: "mystic_treasures_epic_games_2022-05-10",
    name: "Mystic Treasures",
    provider: "Epic Games",
    updatedDate: "2022-05-10-00-00",
    overallScore: 92,
    profitScore: 90,
    volatility: 9000,
    volatilityScore: 90,
    hitFrequency: 18.2,
    hitFrequencyScore: 36.4,
    profithitRatio: 12.5,
    profithitRatioScore: 75,
    maxMultiplier: 1500,
    maxMultiplierScore: 1500,
    avgMultiplier: 135,
    avgMultiplierScore: 135,
    betAmount: 1,
    rtp: 97.2,
    imageUrl: "/placeholder.svg",
    title: {
      kr: "미스틱 트레져스",
      en: "Mystic Treasures",
      jp: "ミスティック・トレジャーズ",
    },
    dev: {
      kr: "에픽 게임즈",
      en: "Epic Games",
      jp: "エピック・ゲームズ",
    },
    description: {
      kr: "신비로운 보물 테마 슬롯",
      en: "Mysterious treasure themed slot",
      jp: "神秘的な宝物テーマのスロット",
    },
    webUrls: ["https://example.com/3"],
    screenshots: ["screenshot3.jpg"],
    thumbnail: "thumbnail3.jpg",
  },
];

// Get slot machine by ID
export const getSlotMachineById = (id: string): SlotMachine | undefined => {
  return slotMachines.find((machine) => machine.id === id);
};

// Get score categories for a slot machine
export const getScoreCategories = (slotMachine: SlotMachine) => {
  return [
    {
      title: "전체 평가",
      metrics: [
        { title: "종합 점수", score: slotMachine.overallScore },
        { title: "수익성 점수", score: slotMachine.profitScore },
      ],
    },
    {
      title: "변동성 평가",
      metrics: [
        {
          title: "변동성",
          score: slotMachine.volatilityScore,
          value: slotMachine.volatility,
        },
      ],
    },
    {
      title: "히트율 평가",
      metrics: [
        {
          title: "히트 빈도",
          score: slotMachine.hitFrequencyScore,
          value: slotMachine.hitFrequency,
        },
      ],
    },
    {
      title: "흑자 히트율 평가",
      metrics: [
        {
          title: "흑자 히트 비율",
          score: slotMachine.profithitRatioScore,
          value: slotMachine.profithitRatio,
        },
      ],
    },
    {
      title: "최고 배수 평가",
      metrics: [
        {
          title: "최대 배수",
          score: slotMachine.maxMultiplierScore,
          value: slotMachine.maxMultiplier,
        },
      ],
    },
    {
      title: "평균 배수 평가",
      metrics: [
        {
          title: "평균 배수",
          score: slotMachine.avgMultiplierScore,
          value: slotMachine.avgMultiplier,
        },
      ],
    },
  ];
};
