import { SlotMachine } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface ScreenshotsContentProps {
  slotMachine: SlotMachine;
}

export const ScreenshotsContent = ({
  slotMachine,
}: ScreenshotsContentProps) => {
  const { title } = slotMachine;

  return (
    <div className="border border-[#707070] p-4 rounded-lg bg-card">
      <h3 className="text-xl font-bold mb-4 text-brand-yellow" lang="ko">
        스크린샷
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slotMachine.screenshots && slotMachine.screenshots.length > 0 ? (
          slotMachine.screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="aspect-video overflow-hidden rounded-lg border border-[#707070]"
            >
              <ImageWithFallback
                src={screenshot} // Use actual screenshot URL if available
                fallbackSrc="/placeholder.svg"
                alt={`${title.kr} 스크린샷 ${index + 1}`}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            스크린샷이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
