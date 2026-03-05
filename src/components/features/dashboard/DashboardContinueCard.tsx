import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DashboardContinueCardProps = {
  onContinue: () => void;
  headline?: string;
  category?: string;
  lessonTitle?: string;
  meta?: string;
};

export default function DashboardContinueCard({
  onContinue,
  headline = "이어서 학습해보세요! 🚩",
  category = "부동산 · 주거",
  lessonTitle = "전세사기 예방",
  meta = "완료율 68%",
}: DashboardContinueCardProps) {
  return (
    <article className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-4 shadow-sm">
      <p className="text-base font-semibold text-slate-900 py-2">{headline}</p>

      <div className="flex items-center justify-between px-3 py-3">
        <div className="space-y-1">
          <p className="mt-1 text-xs text-slate-500">{category}</p>
          <p className="text-sm font-semibold text-slate-900">{lessonTitle}</p>
          <p className="mt-1 text-xs text-slate-500">{meta}</p>
        </div>
        <Button
          size="icon"
          className="h-9 w-9 rounded-full"
          onClick={onContinue}
          aria-label="계속 학습하기"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}
