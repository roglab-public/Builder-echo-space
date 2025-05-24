import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CLOUDINARY_CLOUD_NAME } from "@/config/cloudinary";
import { CloudinaryImage } from "@/components/ui/cloudinary-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Info } from "lucide-react";

// 간단한 테스트 이미지 URL
const TEST_IMAGE_URLS = [
  "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
  "https://drive.google.com/uc?export=view&id=1lQfNBmauUTP_W4ag46AwLYlbXNDPummD",
];

const CloudinarySettings = () => {
  const [cloudName, setCloudName] = useState(CLOUDINARY_CLOUD_NAME || "");
  const [testUrl, setTestUrl] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [testResult, setTestResult] = useState<null | {
    success: boolean;
    message: string;
  }>(null);

  // 로컬 스토리지에서 저장된 설정 불러오기
  useEffect(() => {
    const savedCloudName = localStorage.getItem("cloudinary_cloud_name");
    if (savedCloudName) {
      setCloudName(savedCloudName);
    }
  }, []);

  // 설정 저장
  const handleSave = () => {
    if (!cloudName.trim()) {
      alert("클라우드 이름을 입력해주세요.");
      return;
    }

    // 로컬 스토리지에 저장
    localStorage.setItem("cloudinary_cloud_name", cloudName);

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // 이미지 테스트
  const handleTestImage = () => {
    if (!testUrl.trim()) {
      setTestResult({
        success: false,
        message: "테스트할 이미지 URL을 입력해주세요.",
      });
      return;
    }

    // 테스트 이미지 로드 상태 초기화
    setTestResult(null);
  };

  // 이미지 로드 성공 처리
  const handleImageLoadSuccess = () => {
    setTestResult({
      success: true,
      message: "이미지 로드 성공! Cloudinary 설정이 올바르게 작동합니다.",
    });
  };

  // 이미지 로드 실패 처리
  const handleImageLoadError = () => {
    setTestResult({
      success: false,
      message:
        "이미지 로드 실패. URL이 올바른지 확인하거나 다른 Cloudinary URL을 시도해보세요.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cloudinary 설정</h1>
      </div>

      <Tabs defaultValue="settings">
        <TabsList>
          <TabsTrigger value="settings">설정</TabsTrigger>
          <TabsTrigger value="test">테스트</TabsTrigger>
        </TabsList>

        {/* 설정 탭 */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cloudinary 기본 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cloud-name">Cloudinary 클라우드 이름</Label>
                <Input
                  id="cloud-name"
                  placeholder="예: your-cloud-name"
                  value={cloudName}
                  onChange={(e) => setCloudName(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Cloudinary 대시보드에서 찾을 수 있는 클라우드 이름을
                  입력하세요.
                </p>
              </div>

              <div className="flex items-center pt-4">
                <Button onClick={handleSave}>설정 저장</Button>
                {isSaved && (
                  <span className="ml-4 text-green-500 flex items-center">
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    저장되었습니다!
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>적용 방법</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                위에서 Cloudinary 클라우드 이름을 설정한 후 다음 페이지에서 바로
                Cloudinary 이미지 URL을 사용할 수 있습니다:
              </p>
              <ul className="list-disc list-inside text-sm ml-4 space-y-2">
                <li>슬롯 머신 등록/수정 페이지</li>
                <li>스크린샷 추가 시</li>
              </ul>
              <Alert className="bg-muted border-primary">
                <Info className="h-4 w-4" />
                <AlertTitle>참고 사항</AlertTitle>
                <AlertDescription>
                  Cloudinary URL 형식:
                  https://res.cloudinary.com/[클라우드이름]/image/upload/[이미지ID]
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 테스트 탭 */}
        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cloudinary 이미지 테스트</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-url">테스트할 이미지 URL</Label>
                <Input
                  id="test-url"
                  placeholder="https://res.cloudinary.com/your-cloud-name/image/upload/your-image-id"
                  value={testUrl}
                  onChange={(e) => setTestUrl(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Cloudinary 이미지 URL을 입력하거나 아래 예제를 사용하세요.
                </p>
              </div>

              {/* 예제 URL 목록 */}
              <div className="space-y-2 pt-2">
                <Label>예제 URL</Label>
                <div className="space-y-2">
                  {TEST_IMAGE_URLS.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border p-2 rounded-md text-sm"
                    >
                      <code className="bg-muted p-1 rounded text-xs overflow-hidden overflow-ellipsis">
                        {url}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTestUrl(url)}
                      >
                        사용
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center pt-4">
                <Button onClick={handleTestImage}>이미지 테스트</Button>
              </div>

              {/* 테스트 결과 */}
              {testUrl && (
                <div className="pt-4 space-y-4">
                  <Label>미리보기</Label>
                  <div className="aspect-video w-full max-w-md overflow-hidden rounded-md border">
                    <CloudinaryImage
                      src={testUrl}
                      alt="테스트 이미지"
                      onLoad={handleImageLoadSuccess}
                      onError={handleImageLoadError}
                    />
                  </div>

                  {testResult && (
                    <Alert
                      className={
                        testResult.success
                          ? "bg-green-50 border-green-500"
                          : "bg-red-50 border-red-500"
                      }
                    >
                      {testResult.success ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <AlertTitle>
                        {testResult.success ? "성공" : "실패"}
                      </AlertTitle>
                      <AlertDescription>{testResult.message}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CloudinarySettings;
