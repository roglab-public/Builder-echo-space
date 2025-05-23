import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define language options
const languageOptions = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "jp", label: "日本語" },
];

const Settings = () => {
  const [adminLanguage, setAdminLanguage] = useState("ko");
  const [publicLanguage, setPublicLanguage] = useState("ko");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAdminLanguage = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("관리자 언어 설정이 저장되었습니다.");
    }, 800);
  };

  const handleSavePublicLanguage = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("퍼블릭 언어 설정이 저장되었습니다.");
    }, 800);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">어드민 설정</h1>

      <Tabs defaultValue="language" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="language">언어 설정</TabsTrigger>
          <TabsTrigger value="account">계정 관리</TabsTrigger>
          <TabsTrigger value="system">시스템 설정</TabsTrigger>
        </TabsList>

        <TabsContent value="language" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>관리자 언어 설정</CardTitle>
              <CardDescription>
                관리자 인터페이스에 표시될 기본 언어를 설정합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={adminLanguage}
                onValueChange={setAdminLanguage}
                className="space-y-3"
              >
                {languageOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`admin-${option.value}`}
                    />
                    <Label htmlFor={`admin-${option.value}`}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleSaveAdminLanguage}
                  disabled={isSaving}
                  className="bg-brand-yellow text-black hover:bg-brand-yellow/90"
                >
                  {isSaving ? "저장 중..." : "저장"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>퍼블릭 언어 설정</CardTitle>
              <CardDescription>
                사용자에게 표시될 기본 언어를 설정합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={publicLanguage}
                onValueChange={setPublicLanguage}
                className="space-y-3"
              >
                {languageOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`public-${option.value}`}
                    />
                    <Label htmlFor={`public-${option.value}`}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleSavePublicLanguage}
                  disabled={isSaving}
                  className="bg-brand-yellow text-black hover:bg-brand-yellow/90"
                >
                  {isSaving ? "저장 중..." : "저장"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm text-muted-foreground">
              참고: 퍼블릭 언어 설정은 관리자 모드에서만 작동하며, 실제 퍼블릭
              사이트에는 적용되지 않습니다.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="account" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>계정 관리</CardTitle>
              <CardDescription>관리자 계정 정보를 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                계정 설정 기능은 준비 중입니다.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>시스템 설정</CardTitle>
              <CardDescription>시스템 관련 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                시스템 설정 기능은 준비 중입니다.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
