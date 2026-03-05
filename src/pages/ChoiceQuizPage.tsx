import { useState } from "react"
import ChoiceQuestion from "@/pages/ChoiceQuestion"
import ChoiceQuestionBottomSheet from "@/components/features/choiceQuestion/ChoiceQuestionBottomSheet"
import ChoiceQuestionInlineScroll from "@/components/features/choiceQuestion/ChoiceQuestionInlineScroll"
import QuizLayoutWrapper from "@/components/layout/QuizLayoutWrapper"
import type { QuizVariant } from "@/components/layout/QuizLayoutWrapper"

type ChoiceVariant = "choiceQuestion" | "choiceQuestionBottomSheet" | "choiceQuestionInline"

type ChoiceQuizPageProps = {
  onComplete?: (total: number, correct: number) => void
}

export default function ChoiceQuizPage({ onComplete }: ChoiceQuizPageProps) {
  const [variant, setVariant] = useState<ChoiceVariant>("choiceQuestion")

  const handleComplete = (total: number, correct: number) => {
    onComplete?.(total, correct)
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
