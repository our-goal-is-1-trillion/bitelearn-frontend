import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import QuizHeader from "@/components/layout/QuizHeader"
import type { QuizResultData } from "@/App"

interface ResultProps {
  resultData: QuizResultData | null
  onFinish?: () => void
}

export default function Result({ resultData, onFinish }: ResultProps) {
  const [progress, setProgress] = useState(45) // Mock initial progress

  const total = resultData?.total ?? 0
  const correct = resultData?.correct ?? 0
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
  const timeSpent = resultData?.timeSpent ?? 125 // fallback
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    // Animate progress bar simulating "learning progress update"
    const timer = setTimeout(() => {
      if (accuracy > 0) {
        setProgress((prev) => Math.min(100, prev + Math.max(5, Math.round(accuracy * 0.2))))
      }
    }, 600)
    return () => clearTimeout(timer)
  }, [accuracy])

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900 shadow-sm">
      <div className="relative flex h-full flex-col pb-20 pt-14">
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader title="학습 결과" showCloseButton={false} />
        </div>

        <section className="relative flex flex-1 flex-col p-6 text-center overflow-y-auto">
          <div className="flex flex-col items-center justify-center pt-8 pb-10">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">학습 완료!</h2>
            <p className="mt-2 text-slate-500">
              총 {total}문제 중 {correct}문제를 맞혔습니다.
            </p>
          </div>

          <div className="mb-8 rounded-2xl bg-slate-50 p-6 shadow-sm border border-slate-100">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">단원 학습 달성률</span>
              <span className="text-sm font-bold text-indigo-600">{progress}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
              <div 
                className="h-full rounded-full bg-indigo-600 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {accuracy > 0 && (
              <p className="mt-3 text-xs text-slate-500 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-1000 fill-mode-both">
                방금 퀴즈로 달성률이 올랐어요! 🎉
              </p>
            )}
          </div>

          <div className="mt-auto grid w-full grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-slate-500">정답률</p>
              <p className="mt-1 text-xl font-bold text-slate-800">{accuracy}%</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-slate-500">소요 시간</p>
              <p className="mt-1 text-xl font-bold text-slate-800">{formatTime(timeSpent)}</p>
            </div>
          </div>
        </section>

        <footer className="absolute inset-x-0 bottom-0 z-20 bg-white px-4 pb-8 pt-4">
          <Button onClick={onFinish} className="h-14 w-full rounded-xl bg-indigo-600 text-lg font-semibold hover:bg-indigo-700">
            홈으로 돌아가기
          </Button>
        </footer>
      </div>
    </main>
  )
}
