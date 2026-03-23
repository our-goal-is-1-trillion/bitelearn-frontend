import correctResultImage from '@/assets/character/correct_result.png';
import incorrectResultImage from '@/assets/character/incorrect_result.png';

type IncorrectSummaryProps = {
  pendingReviewCount: number;
  totalBytes: number;
  isLoading?: boolean;
};

export default function IncorrectSummary({
  pendingReviewCount,
  totalBytes,
  isLoading = false,
}: IncorrectSummaryProps) {
  const hasPendingIncorrect = pendingReviewCount > 0;
  const summaryTitle = isLoading
    ? '오답노트를\n불러오고 있어요'
    : hasPendingIncorrect
    ? '아직 회수하지 못한\n바이트가 남아있어요..'
    : '회수하지 못한\n바이트가 없어요!';
  const summaryDescription = isLoading
    ? '잠시만 기다리면\n정리된 내용을 보여드릴게요!'
    : hasPendingIncorrect
    ? '오답 문제를 복습해\n바이트를 되찾아보아요!'
    : '지금 흐름 아주 좋아요.\n이대로 학습을 이어가봐요!';
  const summaryImage = isLoading
    ? null
    : hasPendingIncorrect
    ? incorrectResultImage
    : correctResultImage;

  return (
    <section className="mb-3 px-5 pt-8">
      <div className="overflow-hidden rounded-3xl border-2 border-border bg-card p-0.5 shadow-bl-card">
        <div className="px-4 pb-4 pt-4">
          <div className="relative flex min-h-36 items-start overflow-hidden ps-2 pt-1">
            <div className="relative z-[1] max-w-[168px]">
              <h2 className="whitespace-pre-line text-base font-bold leading-6 text-foreground pb-4">
                {summaryTitle}
              </h2>
              <p className="mt-2 whitespace-pre-line text-sm font-medium leading-5 text-slate-600">
                {summaryDescription}
              </p>
            </div>

            {summaryImage ? (
              <img
                src={summaryImage}
                alt=""
                className="pointer-events-none absolute right-[-18px] top-1/2 z-0 h-[162px] w-[162px] -translate-y-1/2 object-contain"
              />
            ) : null}
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-50 px-2">
              <p className="pb-1 pt-2.5 text-center text-xs leading-4 text-slate-600">
                오답 수
              </p>
              <p className="pb-2 text-center text-base font-bold leading-6 text-foreground">
                {isLoading ? '-' : `${pendingReviewCount}개`}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-2">
              <p className="pb-1 pt-2.5 text-center text-xs leading-4 text-slate-600">
                현재 바이트
              </p>
              <p className="pb-2 text-center text-base font-bold leading-6 text-foreground">
                {isLoading ? '-' : `${totalBytes.toLocaleString()} B`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
