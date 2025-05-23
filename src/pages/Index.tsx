import { slotMachines } from "@/data/slot-machines";
import { SlotMachineCard } from "@/components/slot-review/SlotMachineCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">슬롯 머신 리뷰</h1>
          <p className="text-xl text-muted-foreground">
            최고의 슬롯 머신을 찾기 위한 전문적인 리뷰 사이트
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slotMachines.map((slotMachine) => (
            <SlotMachineCard key={slotMachine.id} slotMachine={slotMachine} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
