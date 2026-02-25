import { Button } from "@/components/ui/button"
import QuizHeader from "./component/QuizHeader"

export default function Result() {
  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="flex h-full flex-col border border-slate-200">
        <QuizHeader title="퀴즈 제목" showBackButton={false} />

        <section className="flex flex-1 items-center justify-center p-6 text-center">
          <div className="flex w-full max-w-[280px] flex-col items-center gap-6">
            <img src="/vite.svg" alt="Vite logo" className="h-20 w-20" />

            <h2 className="text-2xl font-bold">퀴즈 완료!</h2>

            <div className="grid w-full grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">정답률</p>
                <p className="mt-1 text-lg font-semibold">n%</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">시간</p>
                <p className="mt-1 text-lg font-semibold">nn:nn</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-200 p-4">
          <Button className="h-12 w-full rounded-md">퀴즈 종료</Button>
        </footer>
      </div>
    </main>
  )
}
