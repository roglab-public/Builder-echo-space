import { useState, useRef, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSlotMachineById } from "@/data/slot-machines";
import { SlotMachine } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "@/components/charts/LineChart";
import { Badge } from "@/components/ui/badge";

// Default empty slot machine data for new entries
const emptySlotMachine: SlotMachine = {
  id: "",
  name: "",
  provider: "",
  updatedDate: new Date().toISOString().substring(0, 10) + "-00-00",
  overallScore: 50,
  profitScore: 50,
  volatility: 5000,
  volatilityScore: 50,
  hitFrequency: 25,
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
  title: {
    kr: "",
    en: "",
    jp: "",
  },
  dev: {
    kr: "",
    en: "",
    jp: "",
  },
  description: {
    kr: "",
    en: "",
    jp: "",
  },
  webUrls: [""],
  screenshots: [],
  thumbnail: "",
};

const SlotMachineEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize with existing data or empty template
  const initialData = id ? getSlotMachineById(id) : emptySlotMachine;
  const [formData, setFormData] = useState<SlotMachine>(
    initialData || emptySlotMachine,
  );
  const [csvData, setCsvData] = useState<number[]>([]);
  const [previewData, setPreviewData] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<string>("basic");

  // Handle form field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Handle nested fields
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof SlotMachine],
          [child]: value,
        },
      });
    } else {
      // Handle numeric conversions
      if (
        [
          "overallScore",
          "profitScore",
          "volatility",
          "volatilityScore",
          "hitFrequency",
          "hitFrequencyScore",
          "profithitRatio",
          "profithitRatioScore",
          "maxMultiplier",
          "maxMultiplierScore",
          "avgMultiplier",
          "avgMultiplierScore",
          "betAmount",
          "rtp",
        ].includes(name)
      ) {
        setFormData({
          ...formData,
          [name]: parseFloat(value) || 0,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };

  // Handle CSV file upload
  const handleCSVUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = text.split("\n");
      const balanceData: number[] = [];

      rows.forEach((row) => {
        const value = parseFloat(row.trim());
        if (!isNaN(value)) {
          balanceData.push(value);
        }
      });

      // Keep only 200 records if more provided
      const finalData = balanceData.slice(0, 200);
      setCsvData(finalData);
      setPreviewData(finalData);
    };
    reader.readAsText(file);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this would send data to an API
    console.log("Form data submitted:", formData);
    console.log("CSV data:", csvData);

    // Show success message and navigate
    alert("슬롯 머신 정보가 업데이트되었습니다.");
    navigate(`/slot-machine/${formData.id}`);
  };

  // Get badge color based on score
  const getBadgeVariant = (score: number) => {
    return score >= 50 ? "yellow" : "red";
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            {id ? "슬롯 머신 정보 수정" : "새 슬롯 머�� 추가"}
          </h1>
          <div className="flex space-x-2">
            <Badge
              variant={getBadgeVariant(formData.overallScore)}
              size="xl"
              className="flex items-center gap-1"
            >
              {formData.overallScore}
            </Badge>
            <Badge
              variant={getBadgeVariant(formData.profitScore)}
              size="xl"
              className="flex items-center gap-1"
            >
              {formData.profitScore}
            </Badge>
          </div>
        </div>

        <Tabs
          defaultValue="basic"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="basic">기본 정보</TabsTrigger>
            <TabsTrigger value="scores">점수 및 지표</TabsTrigger>
            <TabsTrigger value="multilingual">다국어 정보</TabsTrigger>
            <TabsTrigger value="data">플레이 데이터</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>기본 정보</CardTitle>
                  <CardDescription>
                    슬롯 머신의 기본 정보를 입력하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="id" className="text-sm font-medium">
                        ID
                      </label>
                      <Input
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="unique_id_name_date"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        이름 (영문)
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Fortune Dragon"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="provider" className="text-sm font-medium">
                        제공 업체
                      </label>
                      <Input
                        id="provider"
                        name="provider"
                        value={formData.provider}
                        onChange={handleChange}
                        placeholder="Lucky Games"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="updatedDate"
                        className="text-sm font-medium"
                      >
                        업데이트 날짜
                      </label>
                      <Input
                        id="updatedDate"
                        name="updatedDate"
                        value={formData.updatedDate.substring(0, 10)}
                        onChange={handleChange}
                        type="date"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="rtp" className="text-sm font-medium">
                        RTP (%)
                      </label>
                      <Input
                        id="rtp"
                        name="rtp"
                        value={formData.rtp}
                        onChange={handleChange}
                        type="number"
                        step="0.1"
                        min="80"
                        max="100"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="betAmount"
                        className="text-sm font-medium"
                      >
                        기본 베팅 금액
                      </label>
                      <Input
                        id="betAmount"
                        name="betAmount"
                        value={formData.betAmount}
                        onChange={handleChange}
                        type="number"
                        step="0.1"
                        min="0.1"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="imageUrl" className="text-sm font-medium">
                      이미지 URL
                    </label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-xs text-muted-foreground">
                      이미지 URL을 입력하거나 기본 이미지를 사용하세요
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scores" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>점수 및 지표</CardTitle>
                  <CardDescription>
                    슬롯 머신의 성능 지표를 입력하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">전체 평가</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="overallScore"
                          className="text-sm font-medium"
                        >
                          종합 점수 (0-100)
                        </label>
                        <Input
                          id="overallScore"
                          name="overallScore"
                          value={formData.overallScore}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          max="100"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="profitScore"
                          className="text-sm font-medium"
                        >
                          수익성 점수 (0-100)
                        </label>
                        <Input
                          id="profitScore"
                          name="profitScore"
                          value={formData.profitScore}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          max="100"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">변동성</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="volatility"
                          className="text-sm font-medium"
                        >
                          변동성 수치
                        </label>
                        <Input
                          id="volatility"
                          name="volatility"
                          value={formData.volatility}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="volatilityScore"
                          className="text-sm font-medium"
                        >
                          변동성 점수 (0-100)
                        </label>
                        <Input
                          id="volatilityScore"
                          name="volatilityScore"
                          value={formData.volatilityScore}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          max="100"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">히트율</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="hitFrequency"
                          className="text-sm font-medium"
                        >
                          히트 빈도 (%)
                        </label>
                        <Input
                          id="hitFrequency"
                          name="hitFrequency"
                          value={formData.hitFrequency}
                          onChange={handleChange}
                          type="number"
                          step="0.1"
                          min="0"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="hitFrequencyScore"
                          className="text-sm font-medium"
                        >
                          히트율 점수 (0-100)
                        </label>
                        <Input
                          id="hitFrequencyScore"
                          name="hitFrequencyScore"
                          value={formData.hitFrequencyScore}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          max="100"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">흑자 히트율</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="profithitRatio"
                          className="text-sm font-medium"
                        >
                          흑자 히트 비율 (%)
                        </label>
                        <Input
                          id="profithitRatio"
                          name="profithitRatio"
                          value={formData.profithitRatio}
                          onChange={handleChange}
                          type="number"
                          step="0.1"
                          min="0"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="profithitRatioScore"
                          className="text-sm font-medium"
                        >
                          흑자 히트율 점수 (0-100)
                        </label>
                        <Input
                          id="profithitRatioScore"
                          name="profithitRatioScore"
                          value={formData.profithitRatioScore}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          max="100"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">배수</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="maxMultiplier"
                          className="text-sm font-medium"
                        >
                          최고 배수
                        </label>
                        <Input
                          id="maxMultiplier"
                          name="maxMultiplier"
                          value={formData.maxMultiplier}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="maxMultiplierScore"
                          className="text-sm font-medium"
                        >
                          최고 배수 점수
                        </label>
                        <Input
                          id="maxMultiplierScore"
                          name="maxMultiplierScore"
                          value={formData.maxMultiplierScore}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="avgMultiplier"
                          className="text-sm font-medium"
                        >
                          평균 배수
                        </label>
                        <Input
                          id="avgMultiplier"
                          name="avgMultiplier"
                          value={formData.avgMultiplier}
                          onChange={handleChange}
                          type="number"
                          step="0.1"
                          min="0"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="avgMultiplierScore"
                          className="text-sm font-medium"
                        >
                          평균 배수 점수
                        </label>
                        <Input
                          id="avgMultiplierScore"
                          name="avgMultiplierScore"
                          value={formData.avgMultiplierScore}
                          onChange={handleChange}
                          type="number"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="multilingual" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>다국어 정보</CardTitle>
                  <CardDescription>
                    한국어, 영어, 일본어로 정보를 입력하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">제목</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="title.kr"
                          className="text-sm font-medium"
                        >
                          한국어 제목
                        </label>
                        <Input
                          id="title.kr"
                          name="title.kr"
                          value={formData.title.kr}
                          onChange={handleChange}
                          placeholder="포춘 드래곤"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="title.en"
                          className="text-sm font-medium"
                        >
                          영어 제목
                        </label>
                        <Input
                          id="title.en"
                          name="title.en"
                          value={formData.title.en}
                          onChange={handleChange}
                          placeholder="Fortune Dragon"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="title.jp"
                          className="text-sm font-medium"
                        >
                          일본어 제목
                        </label>
                        <Input
                          id="title.jp"
                          name="title.jp"
                          value={formData.title.jp}
                          onChange={handleChange}
                          placeholder="フォーチュン・ドラゴン"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">제공 업체</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="dev.kr" className="text-sm font-medium">
                          한국어 업체명
                        </label>
                        <Input
                          id="dev.kr"
                          name="dev.kr"
                          value={formData.dev.kr}
                          onChange={handleChange}
                          placeholder="럭키 게임즈"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="dev.en" className="text-sm font-medium">
                          영어 업체명
                        </label>
                        <Input
                          id="dev.en"
                          name="dev.en"
                          value={formData.dev.en}
                          onChange={handleChange}
                          placeholder="Lucky Games"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="dev.jp" className="text-sm font-medium">
                          일본어 업체명
                        </label>
                        <Input
                          id="dev.jp"
                          name="dev.jp"
                          value={formData.dev.jp}
                          onChange={handleChange}
                          placeholder="ラッキーゲームズ"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">설명</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="description.kr"
                          className="text-sm font-medium"
                        >
                          한국어 설명
                        </label>
                        <Textarea
                          id="description.kr"
                          name="description.kr"
                          value={formData.description.kr}
                          onChange={handleChange}
                          placeholder="행운의 드래곤 테마 슬롯"
                          rows={3}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="description.en"
                          className="text-sm font-medium"
                        >
                          영어 설명
                        </label>
                        <Textarea
                          id="description.en"
                          name="description.en"
                          value={formData.description.en}
                          onChange={handleChange}
                          placeholder="Lucky dragon themed slot"
                          rows={3}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="description.jp"
                          className="text-sm font-medium"
                        >
                          일본어 설명
                        </label>
                        <Textarea
                          id="description.jp"
                          name="description.jp"
                          value={formData.description.jp}
                          onChange={handleChange}
                          placeholder="幸運のドラゴンテーマスロット"
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>플레이 데이터</CardTitle>
                  <CardDescription>
                    200회 플레이 데이터를 CSV 파일로 업로드하세요.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleCSVUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        CSV 파일 선택
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        200회의 플레이 잔액 데이터가 포함된 CSV 파일을
                        업로드하세요
                      </p>
                      {csvData.length > 0 && (
                        <p className="text-sm text-green-500 font-medium">
                          {csvData.length}개의 데이터가 로드됨
                        </p>
                      )}
                    </div>

                    {previewData.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">
                          데이터 미리보기
                        </h3>
                        <div className="h-64">
                          <LineChart
                            startValue={previewData[0]}
                            endValue={previewData[previewData.length - 1]}
                            data={previewData}
                            description="플레이 데이터 그래프 미리보기입니다. 200회의 플레이 동안 잔액이 어떻게 변화하는지 보여줍니다."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="mt-8 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                취소
              </Button>
              <Button type="submit" className="bg-brand-yellow text-black">
                저장
              </Button>
            </div>
          </form>
        </Tabs>
      </div>
    </div>
  );
};

export default SlotMachineEdit;
