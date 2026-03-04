import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DashboardContinueCardProps = {
  onContinue: () => void;
};

export default function DashboardContinueCard({
  onContinue,
}: DashboardContinueCardProps) {
  return (
    <article className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-4 shadow-sm">
      <p className="text-base font-semibold text-slate-900 py-2">이어하기</p>

      <div className="flex items-center justify-between px-3 py-3">
        <div className="space-y-1">
          <p className="mt-1 text-xs text-slate-500">부동산 · 중급</p>
          <p className="text-sm font-semibold text-slate-900">전세사기 예방</p>
          <p className="mt-1 text-xs text-slate-500">완료율 68%</p>
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
