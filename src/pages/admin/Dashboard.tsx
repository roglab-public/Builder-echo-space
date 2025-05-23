import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { slotMachines } from "@/data/slot-machines";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

const Dashboard = () => {
  // Calculate statistics
  const totalSlots = slotMachines.length;
  const avgOverallScore = Math.round(
    slotMachines.reduce((sum, slot) => sum + slot.overallScore, 0) / totalSlots,
  );
  const avgProfitScore = Math.round(
    slotMachines.reduce((sum, slot) => sum + slot.profitScore, 0) / totalSlots,
  );
  const topRatedSlot = [...slotMachines].sort(
    (a, b) => b.overallScore - a.overallScore,
  )[0];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">총 슬롯 머신</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalSlots}</div>
            <p className="text-sm text-muted-foreground mt-2">
              등록된 슬롯 머신 수
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              평균 종합 점수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgOverallScore}</div>
            <p className="text-sm text-muted-foreground mt-2">
              등록된 모든 슬롯 머신의 평균
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              평균 수익 점수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{avgProfitScore}</div>
            <p className="text-sm text-muted-foreground mt-2">
              등록된 모든 슬롯 머신의 평균
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최고 평점 슬롯 머신</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-md overflow-hidden bg-muted">
              <ImageWithFallback
                src={topRatedSlot.imageUrl}
                alt={topRatedSlot.title.kr}
                fallbackSrc="/placeholder.svg"
              />
            </div>
            <div>
              <h3 className="font-bold">{topRatedSlot.title.kr}</h3>
              <p className="text-sm text-muted-foreground">
                {topRatedSlot.dev.kr}
              </p>
            </div>
            <div className="ml-auto">
              <div className="text-lg font-bold">
                {topRatedSlot.overallScore}
              </div>
              <p className="text-xs text-muted-foreground">종합 점수</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <p className="text-sm">
                새 슬롯 머신 "{topRatedSlot.title.kr}" 추가됨
              </p>
              <span className="ml-auto text-xs text-muted-foreground">
                방금 전
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <p className="text-sm">
                슬롯 머신 "{slotMachines[1]?.title.kr}" 업데이트됨
              </p>
              <span className="ml-auto text-xs text-muted-foreground">
                1시간 전
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
              <p className="text-sm">시스템 언어 설정 변경됨</p>
              <span className="ml-auto text-xs text-muted-foreground">
                2시간 전
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
