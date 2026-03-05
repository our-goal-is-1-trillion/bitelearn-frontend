import { cn } from "@/lib/utils"

export type StepIndicatorInfo = {
  type: "learning" | "quiz"
  status: "none" | "correct" | "incorrect"
  isCurrent: boolean
}

type ChoiceQuestionIndicatorProps = {
  steps: StepIndicatorInfo[]
}

/** 퀴즈 진행도를 표시하는 Dot 인디케이터 */
export default function ChoiceQuestionIndicator({
  steps,
}: ChoiceQuestionIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 px-6 pt-6">
      {steps.map((step, index) => {
        let bgColor = "bg-slate-300" // 퀴즈 미해결 (기본 옅은 회색)

        if (step.type === "learning") {
          bgColor = "bg-blue-500" // 학습: 파란색
        } else if (step.type === "quiz") {
          if (step.status === "correct") {
            bgColor = "bg-green-500" // 정답: 녹색
          } else if (step.status === "incorrect") {
            bgColor = "bg-red-500" // 오답: 빨간색
          }
        }

        const sizeClass = step.isCurrent ? "w-2.5 h-2.5" : "w-1.5 h-1.5"

        return (
          <div
            key={index}
            className={cn(
              "rounded-full transition-all duration-300",
              bgColor,
              sizeClass
            )}
          />
        )
      })}
    </div>
  )
}
