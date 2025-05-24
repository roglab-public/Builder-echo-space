import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSlotMachineById, slotMachines } from "@/data/slot-machines";
import { SlotMachine, LocalizedText } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudinaryImage } from "@/components/ui/cloudinary-image";

const SlotMachineEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === undefined;

  // 초기 상태 설정
  const emptyLocalizedText: LocalizedText = {
    kr: "",
    en: "",
    jp: "",
  };

  const emptySlotMachine: SlotMachine = {
    id: "",
    name: "",
    provider: "",
    updatedDate: new Date().toISOString().split("T")[0] + "-00-00",
    overallScore: 50,
    profitScore: 50,
    volatility: 5000,
    volatilityScore: 50,
    hitFrequency: 20,
    hitFrequencyScore: 50,
    profithitRatio: 10,
    profithitRatioScore: 50,
    maxMultiplier: 500,
    maxMultiplierScore: 500,
    avgMultiplier: 50,
    avgMultiplierScore: 50,
    betAmount: 1,
    rtp: 95,
    imageUrl: "/placeholder.svg",
    title: { ...emptyLocalizedText },
    dev: { ...emptyLocalizedText },
    description: { ...emptyLocalizedText },
    webUrls: [""],
    screenshots: [], // 빈 스크린샷 배열
    thumbnail: "",
  };

  // 상태 관리
  const [formData, setFormData] = useState<SlotMachine>(emptySlotMachine);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [screenshotUrls, setScreenshotUrls] = useState<string[]>([""]);

  // 기존 데이터 불러오기
  useEffect(() => {
    if (!isNew && id) {
      const slotMachine = getSlotMachineById(id);
      if (slotMachine) {
        setFormData(slotMachine);
        // 스크린샷 URL이 있으면 그대로 사용, 없으면 빈 입력 필드 추가
        setScreenshotUrls(
          slotMachine.screenshots && slotMachine.screenshots.length > 0
            ? [...slotMachine.screenshots, ""]
            : [""],
        );
      } else {
        setErrorMessage("슬롯 머신을 찾을 수 없습니다.");
      }
    }
  }, [id, isNew]);

  // 폼 입력 처리
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 다국어 텍스트 입력 처리
  const handleLocalizedTextChange = (
    field: keyof SlotMachine,
    lang: keyof LocalizedText,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...(prev[field] as LocalizedText),
        [lang]: value,
      },
    }));
  };

  // 숫자 입력 처리
  const handleNumberChange = (name: keyof SlotMachine, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    }
  };

  // 스크린샷 URL 입력 처리
  const handleScreenshotChange = (index: number, value: string) => {
    const newUrls = [...screenshotUrls];
    newUrls[index] = value;

    // 만약 마지막 필드에 값을 입력하고 총 필드 수가 10개 미만이면 새 필드 추가
    if (index === newUrls.length - 1 && value && newUrls.length < 10) {
      newUrls.push("");
    }

    setScreenshotUrls(newUrls);

    // 실제 유효한 URL만 formData에 저장 (빈 문자열은 제외)
    const validUrls = newUrls.filter((url) => url.trim() !== "");
    setFormData((prev) => ({
      ...prev,
      screenshots: validUrls,
    }));
  };

  // 스크린샷 URL 필드 삭제
  const handleRemoveScreenshot = (index: number) => {
    if (screenshotUrls.length <= 1) return; // 최소 한 개의 필드는 유지

    const newUrls = [...screenshotUrls];
    newUrls.splice(index, 1);
    setScreenshotUrls(newUrls);

    // formData 업데이트
    const validUrls = newUrls.filter((url) => url.trim() !== "");
    setFormData((prev) => ({
      ...prev,
      screenshots: validUrls,
    }));
  };

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // formData에 유효한 스크린샷 URL만 포함시키기
      const validScreenshots = screenshotUrls.filter(
        (url) => url.trim() !== "",
      );
      const submissionData = {
        ...formData,
        screenshots: validScreenshots,
      };

      console.log("저장된 데이터:", submissionData);

      // 실제 데이터 저장 로직이 들어갈 자리 (API 호출 등)
      // 여기서는 데모 목적으로 로컬 스토리지에 저장
      const existingIndex = slotMachines.findIndex(
        (sm) => sm.id === submissionData.id,
      );

      if (existingIndex >= 0) {
        // 기존 데이터 업데이트
        slotMachines[existingIndex] = submissionData;
      } else {
        // 새 데이터 추가
        slotMachines.push(submissionData);
      }

      // 저장 성공 후 상세 페이지로 이동
      setTimeout(() => {
        navigate(`/slot-machine/${submissionData.id}`);
      }, 1000);
    } catch (error) {
      setErrorMessage("데이터 저장 중 오류가 발생했습니다.");
      console.error("Error saving data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        {isNew ? "새 슬롯 머신 등록" : "슬롯 머신 정보 수정"}
      </h1>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 기본 정보 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="id">ID</Label>
                <Input
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="unique_identifier"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  고유한 식별자를 입력하세요 (영문, 숫자, 언더스코어만 사용)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">이름 (영문)</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Fortune Dragon"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider">제공자</Label>
                <Input
                  id="provider"
                  name="provider"
                  value={formData.provider}
                  onChange={handleInputChange}
                  placeholder="Lucky Games"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rtp">RTP (%)</Label>
                <Input
                  id="rtp"
                  type="number"
                  step="0.1"
                  min="1"
                  max="100"
                  value={formData.rtp}
                  onChange={(e) => handleNumberChange("rtp", e.target.value)}
                  placeholder="96.5"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="betAmount">기본 베팅액</Label>
                <Input
                  id="betAmount"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.betAmount}
                  onChange={(e) =>
                    handleNumberChange("betAmount", e.target.value)
                  }
                  placeholder="1"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">메인 이미지 URL (Cloudinary)</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://res.cloudinary.com/your-cloud-name/image/upload/your-image-id"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Cloudinary URL을 입력하세요
                </p>
              </div>
            </div>

            {/* 이미지 미리보기 */}
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">이미지 미리보기</p>
              <div className="aspect-video w-full max-w-md overflow-hidden rounded-md border border-input">
                <CloudinaryImage
                  src={formData.imageUrl}
                  alt="메인 이미지 미리보기"
                />
              </div>
            </div>

            {/* 스크린샷 URL 입력 필드 (최대 10개) */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">스크린샷 (최대 10개)</p>
              {screenshotUrls.map((url, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={url}
                    onChange={(e) =>
                      handleScreenshotChange(index, e.target.value)
                    }
                    placeholder="https://res.cloudinary.com/your-cloud-name/image/upload/your-screenshot-id"
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleRemoveScreenshot(index)}
                      className="px-3"
                    >
                      삭제
                    </Button>
                  )}
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-1">
                최대 10개까지 스크린샷을 추가할 수 있습니다. 마지��� 필드에
                URL을 입력하면 새 필드가 자동으로 추가됩니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 다국어 제목 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>다국어 제목</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title-kr">한국어</Label>
                <Input
                  id="title-kr"
                  value={formData.title.kr}
                  onChange={(e) =>
                    handleLocalizedTextChange("title", "kr", e.target.value)
                  }
                  placeholder="포춘 드래곤"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title-en">영어</Label>
                <Input
                  id="title-en"
                  value={formData.title.en}
                  onChange={(e) =>
                    handleLocalizedTextChange("title", "en", e.target.value)
                  }
                  placeholder="Fortune Dragon"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title-jp">일본어</Label>
                <Input
                  id="title-jp"
                  value={formData.title.jp}
                  onChange={(e) =>
                    handleLocalizedTextChange("title", "jp", e.target.value)
                  }
                  placeholder="フォーチュン・ドラゴン"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 다국어 개발사 이름 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>다국어 개발사 이름</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dev-kr">한국어</Label>
                <Input
                  id="dev-kr"
                  value={formData.dev.kr}
                  onChange={(e) =>
                    handleLocalizedTextChange("dev", "kr", e.target.value)
                  }
                  placeholder="럭키 게임즈"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dev-en">영어</Label>
                <Input
                  id="dev-en"
                  value={formData.dev.en}
                  onChange={(e) =>
                    handleLocalizedTextChange("dev", "en", e.target.value)
                  }
                  placeholder="Lucky Games"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dev-jp">일본어</Label>
                <Input
                  id="dev-jp"
                  value={formData.dev.jp}
                  onChange={(e) =>
                    handleLocalizedTextChange("dev", "jp", e.target.value)
                  }
                  placeholder="ラッキーゲームズ"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 다국어 설명 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>다국어 설명</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="description-kr">한국어</Label>
                <Textarea
                  id="description-kr"
                  value={formData.description.kr}
                  onChange={(e) =>
                    handleLocalizedTextChange(
                      "description",
                      "kr",
                      e.target.value,
                    )
                  }
                  placeholder="행운의 드래곤 테마 슬롯"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description-en">영어</Label>
                <Textarea
                  id="description-en"
                  value={formData.description.en}
                  onChange={(e) =>
                    handleLocalizedTextChange(
                      "description",
                      "en",
                      e.target.value,
                    )
                  }
                  placeholder="Lucky dragon themed slot"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description-jp">일본어</Label>
                <Textarea
                  id="description-jp"
                  value={formData.description.jp}
                  onChange={(e) =>
                    handleLocalizedTextChange(
                      "description",
                      "jp",
                      e.target.value,
                    )
                  }
                  placeholder="幸運のドラゴンテーマスロット"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 점수 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>점수 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="overallScore">종합 점수 (0-100)</Label>
                <Input
                  id="overallScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.overallScore}
                  onChange={(e) =>
                    handleNumberChange("overallScore", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profitScore">수익 점수 (0-100)</Label>
                <Input
                  id="profitScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.profitScore}
                  onChange={(e) =>
                    handleNumberChange("profitScore", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volatility">변동성 실제값</Label>
                <Input
                  id="volatility"
                  type="number"
                  min="0"
                  max="10000"
                  value={formData.volatility}
                  onChange={(e) =>
                    handleNumberChange("volatility", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volatilityScore">변동성 점수 (0-100)</Label>
                <Input
                  id="volatilityScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.volatilityScore}
                  onChange={(e) =>
                    handleNumberChange("volatilityScore", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hitFrequency">히트 빈도 실제값</Label>
                <Input
                  id="hitFrequency"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.hitFrequency}
                  onChange={(e) =>
                    handleNumberChange("hitFrequency", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hitFrequencyScore">
                  히트 빈도 점수 (0-100)
                </Label>
                <Input
                  id="hitFrequencyScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.hitFrequencyScore}
                  onChange={(e) =>
                    handleNumberChange("hitFrequencyScore", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profithitRatio">흑자 히트 비율 실제값</Label>
                <Input
                  id="profithitRatio"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.profithitRatio}
                  onChange={(e) =>
                    handleNumberChange("profithitRatio", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profithitRatioScore">
                  흑자 히트 비율 점수 (0-100)
                </Label>
                <Input
                  id="profithitRatioScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.profithitRatioScore}
                  onChange={(e) =>
                    handleNumberChange("profithitRatioScore", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxMultiplier">최대 배수 실제값</Label>
                <Input
                  id="maxMultiplier"
                  type="number"
                  min="1"
                  max="10000"
                  value={formData.maxMultiplier}
                  onChange={(e) =>
                    handleNumberChange("maxMultiplier", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxMultiplierScore">최대 배수 점수</Label>
                <Input
                  id="maxMultiplierScore"
                  type="number"
                  min="1"
                  max="10000"
                  value={formData.maxMultiplierScore}
                  onChange={(e) =>
                    handleNumberChange("maxMultiplierScore", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avgMultiplier">평균 배수 실제값</Label>
                <Input
                  id="avgMultiplier"
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.avgMultiplier}
                  onChange={(e) =>
                    handleNumberChange("avgMultiplier", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avgMultiplierScore">평균 배수 점수</Label>
                <Input
                  id="avgMultiplierScore"
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.avgMultiplierScore}
                  onChange={(e) =>
                    handleNumberChange("avgMultiplierScore", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 웹사이트 URL 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>관련 웹사이트</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="webUrl">웹 URL</Label>
              <Input
                id="webUrl"
                value={formData.webUrls[0] || ""}
                onChange={(e) => {
                  const newUrls = [...formData.webUrls];
                  newUrls[0] = e.target.value;
                  setFormData({ ...formData, webUrls: newUrls });
                }}
                placeholder="https://example.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* 제출 버튼 */}
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="mr-2"
            disabled={isLoading}
          >
            취소
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "저장 중..." : isNew ? "등록하기" : "수정하기"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SlotMachineEdit;
