import { useEffect, useState } from "react"
import Quiz from "./components/features/quiz/Quiz"
import Result from "./components/features/result/Result"
import ChoiceQuestion from "./components/features/choiceQuestion/ChoiceQuestion"
import Home from "./components/features/home/Home"

type Page = "home" | "choiceQuestion" | "quiz" | "result"

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

  /** 페이지 전환 (fade out → swap → fade in) */
  const handleNavigate = (next: Page) => {
    if (transitionStage !== "idle") return
    setTargetPage(next)
    setTransitionStage("out")
  }

  const handleMoveToResult = () => handleNavigate("result")

  const transitionClass =
    transitionStage === "out"
      ? "page-transition-out"
      : transitionStage === "in"
        ? "page-transition-in"
        : ""

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home onNavigate={handleNavigate} />
      case "choiceQuestion":
        return <ChoiceQuestion onBack={() => handleNavigate("home")} />
      case "result":
        return <Result />
      case "quiz":
      default:
        return <Quiz onResultPageMove={handleMoveToResult} />
    }
  }

  return <div className={transitionClass}>{renderPage()}</div>
}
