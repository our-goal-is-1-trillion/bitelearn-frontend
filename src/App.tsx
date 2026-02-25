import { useEffect, useState } from "react"
import Quiz from "./Quiz"
import Result from "./Result"

type Page = "quiz" | "result"

type TransitionStage = "idle" | "out" | "in"

export default function App() {
  const [page, setPage] = useState<Page>("quiz")
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

  return <div className={transitionClass}>{page === "result" ? <Result /> : <Quiz onResultPageMove={handleMoveToResult} />}</div>
}
