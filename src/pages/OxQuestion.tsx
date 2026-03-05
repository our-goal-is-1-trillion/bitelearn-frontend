import { useNavigate } from "react-router-dom"
import OxQuestionComponent from "@/components/features/oxQuestion/OxQuestion"
import OxQuestionBottomSheet from "@/components/features/oxQuestion/OxQuestionBottomSheet"
import OxQuestionInlineScroll from "@/components/features/oxQuestion/OxQuestionInlineScroll"
import QuizLayoutWrapper from "@/components/layout/QuizLayoutWrapper"
import type { QuizVariant } from "@/components/layout/QuizLayoutWrapper"
import { useState } from "react"

type OxVariant = "oxQuestion" | "oxQuestionBottomSheet" | "oxQuestionInline"

export default function OxQuestion() {
  const navigate = useNavigate()
  const [variant, setVariant] = useState<OxVariant>("oxQuestion")

  const handleComplete = (total: number, correct: number) => {
    navigate("/quiz/result", { state: { total, correct, timeSpent: 125 } })
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
