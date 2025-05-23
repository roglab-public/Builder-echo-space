import { useParams, useNavigate } from "react-router-dom";
import { SlotMachineDetails } from "@/components/slot-review/SlotMachineDetails";
import { getSlotMachineById } from "@/data/slot-machines";

const SlotMachineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const slotMachine = id ? getSlotMachineById(id) : undefined;

  if (!slotMachine) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            슬롯 머신을 찾을 수 없습니다
          </h1>
          <p className="text-muted-foreground mb-6">
            요청하신 슬롯 머신 정보를 찾을 수 없습니다.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center text-muted-foreground hover:text-primary transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        모든 슬롯 머신 보기
      </button>

      <SlotMachineDetails slotMachine={slotMachine} />
    </div>
  );
};

export default SlotMachineDetail;
