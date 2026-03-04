import { useState } from "react"
import QuizFooter from "@/components/layout/QuizFooter"
import { cn } from "@/lib/utils"

type ChoiceQuestionOXChoicesProps = {
  questionNumber: number
  question: string
  /** 정답 인덱스: 0 = O, 1 = X */
  correctIndex: number
  onCheckAnswer: (selectedIndex: number) => void
  isChecking?: boolean
  onPrevious?: () => void
}

/**
 * OX 퀴즈 선택 화면.
 * 화면을 O / X 두 영역으로 나눠 직관적으로 선택 가능하며,
 * '정답 확인' 버튼을 누르면 선택 결과를 부모에 전달한다.
 */
export default function ChoiceQuestionOXChoices({
  questionNumber,
  question,
  correctIndex,
  onCheckAnswer,
  isChecking = false,
  onPrevious,
}: ChoiceQuestionOXChoicesProps) {
  const [selected, setSelected] = useState<0 | 1 | null>(null)
  const isCtaEnabled = selected !== null && !isChecking

  const handleSelect = (value: 0 | 1) => {
    if (isChecking) return
    setSelected(value)
  }

  const handleConfirm = () => {
    if (selected === null) return
    onCheckAnswer(selected)
  }

  // 정답 확인 중일 때 각 버튼의 상태 결정
  const getButtonState = (value: 0 | 1) => {
    if (!isChecking) {
      return selected === value ? "selected" : "idle"
    }
    const isSelected = selected === value
    const isAnswer = value === correctIndex
    
    // 사용자가 선택한 버튼만 정답/오답 피드백을 주고, 나머지는 모두 딤 처리하여 시각적 혼란을 없앰
    if (isSelected) {
      return isAnswer ? "correct" : "wrong"
    }
    
    return "dim"
  }

  const buttonConfig = {
    idle: {
      container: "bg-white border-slate-200 text-slate-400",
      text: "",
    },
    selected: {
      container: "border-slate-900 text-slate-900 bg-white scale-[1.02]",
      text: "",
    },
    correct: {
      container: "border-green-500 bg-green-50 text-green-600 scale-[1.05] shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 ease-out z-10",
      text: "",
    },
    wrong: {
      container: "border-red-500 bg-red-50 text-red-500 scale-[1.05] shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all duration-300 ease-out z-10",
      text: "",
    },
    dim: {
      container: "border-slate-100 bg-slate-50 text-slate-300",
      text: "",
    },
  } as const

  const renderButton = (value: 0 | 1, label: "O" | "X") => {
    const state = getButtonState(value)
    const cfg = buttonConfig[state]
    const isO = label === "O"

    return (
      <button
        key={value}
        disabled={isChecking}
        onClick={() => handleSelect(value)}
        className={cn(
          "flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none",
          cfg.container,
          isChecking && "cursor-not-allowed"
        )}
      >
        {/* 큰 O/X 심볼 */}
        <span
          className={cn(
            "text-7xl font-black leading-none",
            isO ? "text-emerald-400" : "text-red-400",
            // 선택 시 색상 강조
            state === "selected" && (isO ? "text-emerald-500" : "text-red-500"),
            state === "correct" && (isO ? "text-emerald-600" : "text-red-600"),
            state === "wrong" && "text-current",
            state === "dim" && "opacity-30"
          )}
        >
          {label}
        </span>
        {/* 보조 레이블 */}
        <span className="text-xs font-medium text-current opacity-70">
          {isO ? "맞다" : "아니다"}
        </span>
      </button>
    )
  }

  return (
    <>
      {/* 스크롤 가능한 콘텐츠 영역 */}
      <section className="flex flex-1 flex-col overflow-hidden px-6">
        {/* 문제 텍스트 */}
        <h2 className="mb-5 text-base font-semibold text-slate-700">
          Q{questionNumber}. {question}
        </h2>

        {/* O / X 버튼 영역 - 남은 공간 전체 사용 */}
        <div className="flex flex-1 gap-4 pb-4">
          {renderButton(0, "O")}
          {renderButton(1, "X")}
        </div>
      </section>

      <QuizFooter
        disabled={!isCtaEnabled}
        previousDisabled={isChecking}
        onClick={handleConfirm}
        onPrevious={onPrevious}
      >
        정답 확인
      </QuizFooter>
    </>
  )
}
