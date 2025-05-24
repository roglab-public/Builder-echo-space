import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Settings as SettingsIcon,
  CloudCog,
  CloudLightning,
  BookOpen,
} from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">관리자 설정</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Cloudinary 설정 카드 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <CloudCog className="h-5 w-5 text-brand-yellow" />
              <CardTitle>Cloudinary 설정</CardTitle>
            </div>
            <CardDescription>
              이미지 호스팅을 위한 Cloudinary 설정을 관리합니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Cloudinary는 웹사이트의 이미지를 관리하고 최적화하는 데
              사용됩니다. 여기에서 Cloudinary 클라우드 이름 등 관련 설정을
              구성할 수 있습니다.
            </p>
            <Link to="/admin/cloudinary-settings">
              <Button>
                <CloudCog className="mr-2 h-4 w-4" />
                Cloudinary 설정으로 이동
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Cloudinary 도움말 카드 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-brand-yellow" />
              <CardTitle>Cloudinary 도움말</CardTitle>
            </div>
            <CardDescription>
              Cloudinary 사용 방법과 팁을 확인할 수 있습니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Cloudinary 계정 설정, 이미지 업로드, URL 복사, 최적화 방법 등
              상세한 가이드를 제공합니다.
            </p>
            <Link to="/admin/cloudinary-help">
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                도움말 보기
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* 시스템 설정 카드 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <SettingsIcon className="h-5 w-5 text-brand-yellow" />
              <CardTitle>시스템 설정</CardTitle>
            </div>
            <CardDescription>웹사이트 시스템 설정을 관리합니다</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              사이트 언어, 테마, 공개 여부 등의 시스템 설정을 관리할 수
              있습니다.
            </p>
            <Button variant="outline">
              <SettingsIcon className="mr-2 h-4 w-4" />
              시스템 설정
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
