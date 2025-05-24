import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CloudinaryImage } from "@/components/ui/cloudinary-image";

// 도움말용 스크린샷 이미지 (실제로는 Cloudinary에 업로드된 이미지로 변경 필요)
const HELP_SCREENSHOTS = {
  dashboard: "/placeholder.svg",
  upload: "/placeholder.svg",
  copyUrl: "/placeholder.svg",
};

const CloudinaryHelp = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cloudinary 도움말</h1>
      </div>

      <Tabs defaultValue="intro">
        <TabsList>
          <TabsTrigger value="intro">소개</TabsTrigger>
          <TabsTrigger value="setup">계정 설정</TabsTrigger>
          <TabsTrigger value="upload">이미지 업로드</TabsTrigger>
          <TabsTrigger value="usage">사용 방법</TabsTrigger>
          <TabsTrigger value="faq">자주 묻는 질문</TabsTrigger>
        </TabsList>

        {/* 소개 �� */}
        <TabsContent value="intro" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cloudinary란?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Cloudinary는 이미지와 비디오를 저장, 최적화, 관리할 수 있는
                클라우드 기반 서비스입니다. 슬롯 머신 리뷰 웹사이트에서는
                Cloudinary를 사용하여 슬롯 머신 이미지와 스크린샷을
                호스팅합니다.
              </p>

              <h3 className="text-lg font-semibold mt-4">주요 특징</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>빠른 로딩 속도:</strong> 전 세계 CDN을 통한 빠른
                  이미지 로딩
                </li>
                <li>
                  <strong>자동 최적화:</strong> 이미지 크기, 품질, 포맷 자동
                  최적화
                </li>
                <li>
                  <strong>안정적인 서비스:</strong> Google Drive와 달리 이미지
                  임베딩 제한 없음
                </li>
                <li>
                  <strong>무료 플랜:</strong> 기본 사용에 충분한 무료 플랜 제공
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 계정 설정 탭 */}
        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cloudinary 계정 만들기</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-4 ml-4">
                <li>
                  <a
                    href="https://cloudinary.com/users/register/free"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Cloudinary 가입 페이지
                  </a>
                  에 접속합니다.
                </li>
                <li>필요한 정보를 입력하고 무료 계정을 만듭니다.</li>
                <li>
                  가입 후 대시보드에서 "Cloud name"을 확인합니다.
                  <div className="mt-2 aspect-video max-w-md rounded-md overflow-hidden border">
                    <CloudinaryImage
                      src={HELP_SCREENSHOTS.dashboard}
                      alt="Cloudinary 대시보드 스크린샷"
                    />
                  </div>
                </li>
                <li>
                  이 Cloud name을{" "}
                  <a
                    href="/admin/cloudinary-settings"
                    className="text-primary hover:underline"
                  >
                    Cloudinary 설정
                  </a>{" "}
                  페이지에 입력합니다.
                </li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 이미지 업로드 탭 */}
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>이미지 업로드하기</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-4 ml-4">
                <li>Cloudinary 대시보드에 로그인합니다.</li>
                <li>왼쪽 메뉴에서 "Media Library"를 클릭합니다.</li>
                <li>
                  (선택사항) "New folder" 버튼을 클릭하여 폴더를 생성하고
                  이미지를 체계적으로 관리할 수 있습니다.
                </li>
                <li>
                  "Upload" 버튼을 클릭하여 이미지 업로드 창을 엽니다.
                  <div className="mt-2 aspect-video max-w-md rounded-md overflow-hidden border">
                    <CloudinaryImage
                      src={HELP_SCREENSHOTS.upload}
                      alt="Cloudinary 업로드 스크린샷"
                    />
                  </div>
                </li>
                <li>파일을 선택하거나 드래그 앤 드롭하여 업로드합니다.</li>
                <li>
                  업로드 완료 후 이미지를 클릭하면 세부 정보와 URL을 확인할 수
                  있습니다.
                </li>
                <li>
                  "Copy URL" 버튼을 클릭하여 이미지 URL을 복사합니다.
                  <div className="mt-2 aspect-video max-w-md rounded-md overflow-hidden border">
                    <CloudinaryImage
                      src={HELP_SCREENSHOTS.copyUrl}
                      alt="Cloudinary URL 복사 스크린샷"
                    />
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>이미지 이름 지정 팁</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  폴더와 파일명을 의미있게 정리하세요 (예:
                  slot_machines/fortune_dragon).
                </li>
                <li>영문, 숫자, 언더스코어(_)만 사용하는 것이 좋습니다.</li>
                <li>
                  각 슬롯 머신에 대해 일관된 이름 규칙을 사용하세요 (예:
                  슬롯ID_main, 슬롯ID_screenshot1).
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 사용 방법 탭 */}
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>슬롯 머신에 이미지 적용하기</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">메인 이미지 설정</h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>슬롯 머신 추가/편집 페이지로 이동합니다.</li>
                <li>
                  "메인 이미지 URL" 필드에 복사한 Cloudinary URL을 붙여넣습니다.
                </li>
                <li>
                  URL 형식 예시:
                  https://res.cloudinary.com/[클라우드이름]/image/upload/[이미지ID]
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-4">스크린샷 추가</h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  "스크린샷" 섹션에서 각 스크린샷 URL 필드에 Cloudinary URL을
                  붙여넣습니다.
                </li>
                <li>
                  빈 필드에 URL을 입력하면 자동으로 새 필드가 추가됩니다(최대
                  10개).
                </li>
                <li>
                  불필요한 스크린샷 필드는 옆의 "삭제" 버튼을 클릭하여 제거할 수
                  있습니다.
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cloudinary URL 최적화</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Cloudinary URL에 변환 매개변수를 추가하여 이미지를 자동으로
                최적화할 수 있습니다:
              </p>

              <div className="space-y-4">
                <div className="bg-muted p-3 rounded">
                  <h4 className="font-semibold">기본 URL</h4>
                  <code className="text-xs">
                    https://res.cloudinary.com/demo/image/upload/sample.jpg
                  </code>
                </div>

                <div className="bg-muted p-3 rounded">
                  <h4 className="font-semibold">최적화된 URL</h4>
                  <code className="text-xs">
                    https://res.cloudinary.com/demo/image/upload/w_800,h_600,c_fill,q_auto,f_auto/sample.jpg
                  </code>
                  <p className="text-xs mt-2">
                    변환 매개변수 의미:
                    <br />
                    w_800,h_600: 너비 800px, 높이 600px
                    <br />
                    c_fill: 잘라내기 모드 (fill, crop, scale)
                    <br />
                    q_auto: 자동 품질 최적화
                    <br />
                    f_auto: 자동 포맷 변환
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 자주 묻는 질문 탭 */}
        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>자주 묻는 질문</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Q: Cloudinary 무료 계정의 제한은 무엇인가요?
                </h3>
                <p>
                  A: 무료 계정은 25GB의 스토리지와 월 25 크레딧의 사용량을
                  제공합니다. 일반적인 슬롯 머신 이미지와 스크린샷을 위한
                  용도로는 충분합니다.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Q: 이미지가 표시되지 않습니다. 어떻게 해야 하나요?
                </h3>
                <p>
                  A: Cloudinary URL이 올바른지 확인하세요. URL은
                  "https://res.cloudinary.com/"으로 시작해야 합니다. 문제가
                  지속되면 "Cloudinary 설정" 페이지에서 이미지 테스트를
                  실행해보세요.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Q: 이미지 크기를 조정하고 싶어요.
                </h3>
                <p>
                  A: Cloudinary URL에 "w_너비,h_높이,c_fill" 변환 매개변수를
                  추가하세요. 예: ".../upload/w_800,h_600,c_fill/이미지ID"
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Q: 이미지가 너무 느리게 로드됩니다.
                </h3>
                <p>
                  A: URL에 "q_auto,f_auto" 변환 옵션을 추가하여 자동 최적화를
                  사용하세요. 예: ".../upload/q_auto,f_auto/이미지ID"
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Q: 스크린샷 추가는 몇 개까지 가능한가요?
                </h3>
                <p>A: 최대 10개까지 스크린샷을 추가할 수 있습니다.</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Q: Cloudinary 관련 더 자세한 정보는 어디서 찾을 수 있나요?
                </h3>
                <p>
                  A:{" "}
                  <a
                    href="https://cloudinary.com/documentation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Cloudinary 공식 문서
                  </a>
                  에서 더 많은 정보를 얻을 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CloudinaryHelp;
