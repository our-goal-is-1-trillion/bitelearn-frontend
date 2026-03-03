import { Button } from "@/components/ui/button"

type DashboardContinueCardProps = {
  onContinue: () => void
}

export default function DashboardContinueCard({ onContinue }: DashboardContinueCardProps) {
  return (
    <article className="rounded-md border border-slate-300 bg-white px-4 py-4">
      <p className="text-base font-semibold text-slate-900">이어하기</p>
      <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
        <p className="text-xs text-slate-500">부동산</p>
        <p className="mt-1 text-sm font-semibold text-slate-900">Chapter 12. 선순위 근저당이란?</p>
        <p className="mt-1 text-xs text-slate-500">완료율 68% · 예상 9분</p>
      </div>
      <Button className="mt-3 h-12 w-full rounded-md" onClick={onContinue}>
        계속 학습하기
      </Button>
    </article>
  )
}
