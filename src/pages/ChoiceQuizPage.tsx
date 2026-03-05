import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ChoiceQuestion from "@/pages/ChoiceQuestion"
import ChoiceQuestionBottomSheet from "@/components/features/choiceQuestion/ChoiceQuestionBottomSheet"
import ChoiceQuestionInlineScroll from "@/components/features/choiceQuestion/ChoiceQuestionInlineScroll"
import QuizLayoutWrapper from "@/components/layout/QuizLayoutWrapper"
import type { QuizVariant } from "@/components/layout/QuizLayoutWrapper"

type ChoiceVariant = "choiceQuestion" | "choiceQuestionBottomSheet" | "choiceQuestionInline"

/**
 * 지문형 객관식 퀴즈 A/B/C 라우터 페이지.
 * QuizLayoutWrapper로 변형(A/B/C)을 전환할 수 있는 UX 테스터 UI를 포함합니다.
 */
export default function ChoiceQuizPage() {
  const navigate = useNavigate()
  const [variant, setVariant] = useState<ChoiceVariant>("choiceQuestion")

  const handleComplete = (total: number, correct: number) => {
    navigate("/quiz/result", { state: { total, correct, timeSpent: 125 } })
  }

  return (
    <QuizLayoutWrapper
      currentVariant={variant as QuizVariant}
      onVariantChange={(v) => setVariant(v as ChoiceVariant)}
    >
      {variant === "choiceQuestion" && <ChoiceQuestion onComplete={handleComplete} />}
      {variant === "choiceQuestionBottomSheet" && <ChoiceQuestionBottomSheet onComplete={handleComplete} />}
      {variant === "choiceQuestionInline" && <ChoiceQuestionInlineScroll onComplete={handleComplete} />}
    </QuizLayoutWrapper>
  )
}
