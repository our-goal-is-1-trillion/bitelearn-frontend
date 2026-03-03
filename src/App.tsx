import { useEffect, useState } from "react"
import Quiz from "./components/features/quiz/Quiz"
import Result from "./components/features/result/Result"
import ChoiceQuestion from "./components/features/choiceQuestion/ChoiceQuestion"

type Page = "choiceQuestion" | "quiz" | "result"

type TransitionStage = "idle" | "out" | "in"

export default function App() {
  // TODO: connect to router — 기본 페이지를 ChoiceQuestion으로 설정
  const [page, setPage] = useState<Page>("choiceQuestion")
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

  const handleMoveToResult = () => {
    if (transitionStage !== "idle") {
      return
    }

    setTargetPage("result")
    setTransitionStage("out")
  }

  const transitionClass =
    transitionStage === "out" ? "page-transition-out" : transitionStage === "in" ? "page-transition-in" : ""

  const renderPage = () => {
    switch (page) {
      case "choiceQuestion":
        return <ChoiceQuestion />
      case "result":
        return <Result />
      case "quiz":
      default:
        return <Quiz onResultPageMove={handleMoveToResult} />
    }
  }

  return <div className={transitionClass}>{renderPage()}</div>
}
