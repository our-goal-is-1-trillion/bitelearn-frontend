import { useState } from "react"
import OxQuestionComponent from "@/components/features/oxQuestion/OxQuestion"
import OxQuestionBottomSheet from "@/components/features/oxQuestion/OxQuestionBottomSheet"
import OxQuestionInlineScroll from "@/components/features/oxQuestion/OxQuestionInlineScroll"
import QuizLayoutWrapper from "@/components/layout/QuizLayoutWrapper"
import type { QuizVariant } from "@/components/layout/QuizLayoutWrapper"

type OxVariant = "oxQuestion" | "oxQuestionBottomSheet" | "oxQuestionInline"

type OxQuestionPageProps = {
  onComplete?: (total: number, correct: number) => void
}

export default function OxQuestion({ onComplete }: OxQuestionPageProps) {
  const [variant, setVariant] = useState<OxVariant>("oxQuestion")

  const handleComplete = (total: number, correct: number) => {
    onComplete?.(total, correct)
  }

  return (
    <QuizLayoutWrapper
      currentVariant={variant as QuizVariant}
      onVariantChange={(v) => setVariant(v as OxVariant)}
    >
      {variant === "oxQuestion" && <OxQuestionComponent onComplete={handleComplete} />}
      {variant === "oxQuestionBottomSheet" && <OxQuestionBottomSheet onComplete={handleComplete} />}
      {variant === "oxQuestionInline" && <OxQuestionInlineScroll onComplete={handleComplete} />}
    </QuizLayoutWrapper>
  )
}
