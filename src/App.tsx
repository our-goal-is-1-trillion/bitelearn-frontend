import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import ChoiceQuestion from "./components/features/choiceQuestion/ChoiceQuestion"
import ChoiceQuestionBottomSheet from "./components/features/choiceQuestion/ChoiceQuestionBottomSheet"
import ChoiceQuestionInlineScroll from "./components/features/choiceQuestion/ChoiceQuestionInlineScroll"
import OxQuestion from "./components/features/oxQuestion/OxQuestion"
import OxQuestionBottomSheet from "./components/features/oxQuestion/OxQuestionBottomSheet"
import OxQuestionInlineScroll from "./components/features/oxQuestion/OxQuestionInlineScroll"
import ConversationQuestion from "./components/features/conversationQuestion/ConversationQuestion"
import Home from "./components/features/home/Home"
import Dashboard from "./components/features/dashboard/Dashboard"
import Result from "./components/features/result/Result"
import WordLearning from "./components/features/wordLearning/WordLearning"
import { MOCK_CHOICE_QUESTION_SET } from "./data/mock/choiceQuestion"
import QuizLayoutWrapper from "./components/layout/QuizLayoutWrapper"
import type { QuizVariant } from "./components/layout/QuizLayoutWrapper"

type Page = "home" | "choiceQuestion" | "choiceQuestionBottomSheet" | "choiceQuestionInline" | "oxQuestion" | "oxQuestionBottomSheet" | "oxQuestionInline" | "conversationQuestion" | "quiz" | "result" | "dashBoard" | "wordLearning"
type TransitionStage = "idle" | "out" | "in"

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [targetPage, setTargetPage] = useState<Page | null>(null)
  const [transitionStage, setTransitionStage] = useState<TransitionStage>("idle")

  useEffect(() => {
    if (transitionStage === "out" && targetPage) {
      const switchTimer = window.setTimeout(() => {
        setPage(targetPage)
        setTransitionStage("in")
      }, 180)

      return () => window.clearTimeout(switchTimer)
    }

    if (transitionStage === "in") {
      const settleTimer = window.setTimeout(() => {
        setTransitionStage("idle")
        setTargetPage(null)
      }, 260)

      return () => window.clearTimeout(settleTimer)
    }
  }, [transitionStage, targetPage])

  const handleNavigate = (next: Page) => {
    if (transitionStage !== "idle") return
    setTargetPage(next)
    setTransitionStage("out")
  }

  const transitionClass =
    transitionStage === "out" ? "page-transition-out" : transitionStage === "in" ? "page-transition-in" : ""

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home onNavigate={handleNavigate} />
      case "wordLearning":
        return <WordLearning wordSet={MOCK_CHOICE_QUESTION_SET} onBack={() => handleNavigate("home")} />
      case "choiceQuestion":
      case "choiceQuestionBottomSheet":
      case "choiceQuestionInline":
        return (
          <QuizLayoutWrapper
            currentVariant={page as QuizVariant}
            onVariantChange={(variant) => handleNavigate(variant)}
          >
            {page === "choiceQuestion" && <ChoiceQuestion onComplete={() => handleNavigate("result")} />}
            {page === "choiceQuestionBottomSheet" && <ChoiceQuestionBottomSheet onComplete={() => handleNavigate("result")} />}
            {page === "choiceQuestionInline" && <ChoiceQuestionInlineScroll onComplete={() => handleNavigate("result")} />}
          </QuizLayoutWrapper>
        )
      case "oxQuestion":
      case "oxQuestionBottomSheet":
      case "oxQuestionInline":
        return (
          <QuizLayoutWrapper
            currentVariant={page as QuizVariant}
            onVariantChange={(variant) => handleNavigate(variant)}
          >
            {page === "oxQuestion" && <OxQuestion onComplete={() => handleNavigate("result")} />}
            {page === "oxQuestionBottomSheet" && <OxQuestionBottomSheet onComplete={() => handleNavigate("result")} />}
            {page === "oxQuestionInline" && <OxQuestionInlineScroll onComplete={() => handleNavigate("result")} />}
          </QuizLayoutWrapper>
        )
      case "conversationQuestion":
        return <ConversationQuestion onComplete={() => handleNavigate("result")} />
      case "result":
        return <Result />
      case "dashBoard":
        return <Dashboard />
      default:
        return <Home onNavigate={handleNavigate} />
    }
  }

  const isIaHomeButtonVisible = page !== "home"

  return (
    <div className={transitionClass}>
      {isIaHomeButtonVisible ? (
        <Button
          variant="outline"
          size="sm"
          className="fixed left-4 top-4 z-30"
          onClick={() => handleNavigate("home")}
        >
          IA 홈으로
        </Button>
      ) : null}

      {renderPage()}
    </div>
  )
}
