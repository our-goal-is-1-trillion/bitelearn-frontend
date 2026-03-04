import QuizHeader from "@/components/layout/QuizHeader"
import { Button } from "@/components/ui/button"

type DashboardChapterProps = {
  onChapterBack: () => void
  onBack: () => void
}

export default function DashboardChapter({ onChapterBack }: DashboardChapterProps) {
  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 pb-20 pt-14">
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader title="챕터 설명" showCloseButton onCloseClick={onChapterBack} />
        </div>

        <section className="hide-scrollbar flex-1 overflow-y-auto px-6 pb-6 pt-6">
          <article className="mt-3 rounded-md border border-slate-300 bg-white px-4 py-4">
            <p className="text-xs text-slate-500">부동산 · Lesson 12</p>
            <h2 className="mt-1 text-base font-semibold text-slate-900">우선순위 금지행위란?</h2>
            <img
              src="/vite.svg"
              alt="챕터 대표 이미지"
              className="mt-4 h-40 w-full rounded-md border border-slate-300 object-cover"
            />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
                <p className="text-xs text-slate-500">예상 시간</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">약 9분</p>
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
                <p className="text-xs text-slate-500">난이도</p>
                <p className="mt-1 inline-flex rounded-full bg-slate-800 px-2 py-0.5 text-xs text-white">중급</p>
              </div>
            </div>
          </article>
        </section>

        <footer className="absolute inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white p-4">
          <Button className="h-12 w-full rounded-md">학습 시작하기</Button>
        </footer>
      </div>
    </main>
  )
}
