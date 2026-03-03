type ChoiceQuestionProgressBarProps = {
  /** 현재 문제 번호 (1-based) */
  currentStep: number
  /** 전체 문제 수 */
  totalSteps: number
}

/** 퀴즈 진행도를 표시하는 프로그레스 바 */
export default function ChoiceQuestionProgressBar({
  currentStep,
  totalSteps,
}: ChoiceQuestionProgressBarProps) {
  const progressPercent = (currentStep / totalSteps) * 100

  return (
    <div className="flex items-center gap-2.5 px-6 pt-6">
      <span className="shrink-0 text-xs text-slate-500">
        {currentStep}/{totalSteps}
      </span>

      {/* 프로그레스 바 배경 */}
      <div className="h-2 w-full rounded-full bg-slate-200">
        {/* 프로그레스 바 채움 */}
        <div
          className="h-full rounded-full bg-slate-800 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  )
}
