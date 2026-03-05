import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import QuizHeader from "@/components/layout/QuizHeader"
import ChoiceQuestionIndicator, {
  type StepIndicatorInfo,
} from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import ChoiceQuestionImage from "@/components/features/choiceQuestion/ChoiceQuestionImage"
import ChoiceQuestionPassage from "@/components/features/choiceQuestion/ChoiceQuestionPassage"
import ChoiceQuestionChoices from "@/components/features/choiceQuestion/ChoiceQuestionChoices"
import ChoiceQuestionResult from "@/components/features/choiceQuestion/ChoiceQuestionResult"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type Phase = "passage" | "choices" | "checking" | "result"

type ChoiceQuestionProps = {
  onComplete?: () => void
}

export default function ChoiceQuestion({ onComplete }: ChoiceQuestionProps) {
  const navigate = useNavigate()
  const quizSet = MOCK_CHOICE_QUESTION_SET
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("passage")
  const [selectedChoice, setSelectedChoice] = useState("")
  const [metrics, setMetrics] = useState<("none" | "correct" | "incorrect")[]>(
    Array(quizSet.questions.length).fill("none")
  )
  const screenRef = useRef<HTMLElement | null>(null)

  const currentQuestion = quizSet.questions[currentIndex]
  const isLastQuestion = currentIndex >= quizSet.questions.length - 1
  const isCorrect = selectedChoice !== "" && Number(selectedChoice) === currentQuestion.correctIndex

  const handleSolve = () => setPhase("choices")

  const handleCheckAnswer = () => {
    setPhase("checking")
    setMetrics((prev) => {
      const next = [...prev]
      next[currentIndex] = isCorrect ? "correct" : "incorrect"
      return next
    })
    setTimeout(() => setPhase("result"), 1400)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      if (onComplete) {
        onComplete()
      } else {
        navigate("/quiz/result")
      }
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setPhase("passage")
    setSelectedChoice("")
  }

  const indicatorSteps: StepIndicatorInfo[] = quizSet.questions.map((q, idx) => ({
    type: q.type || "quiz",
    status: metrics[idx],
    isCurrent: idx === currentIndex,
  }))

  const renderPhaseContent = () => {
    switch (phase) {
      case "passage":
        return (
          <ChoiceQuestionPassage
            passage={currentQuestion.passage}
            flavorText={currentQuestion.flavorText}
            onSolve={handleSolve}
          />
        )
      case "choices":
      case "checking":
        return (
          <ChoiceQuestionChoices
            questionNumber={currentQuestion.questionNumber}
            question={currentQuestion.question}
            choices={currentQuestion.choices}
            selectedValue={selectedChoice}
            onSelectChoice={setSelectedChoice}
            onCheckAnswer={handleCheckAnswer}
            isChecking={phase === "checking"}
            correctIndex={currentQuestion.correctIndex}
            onPrevious={() => setPhase("passage")}
          />
        )
      case "result":
        return (
          <ChoiceQuestionResult
            isCorrect={isCorrect}
            correctAnswerText={currentQuestion.choices[currentQuestion.correctIndex]}
            selectedAnswerText={selectedChoice !== "" ? currentQuestion.choices[Number(selectedChoice)] : ""}
            explanation={currentQuestion.explanation}
            characterImageUrl={isCorrect ? currentQuestion.characterCorrectImageUrl : currentQuestion.characterIncorrectImageUrl}
            isLastQuestion={isLastQuestion}
            onNext={handleNextQuestion}
          />
        )
    }
  }

  return (
    <main ref={screenRef} className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="relative flex h-full flex-col border border-slate-200 pt-14">
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader title={quizSet.title} showCloseButton onCloseClick={() => window.history.back()} />
        </div>

        {phase !== "result" && (
          <>
            {/* 진행도 바 (닷 인디케이터) */}
            <ChoiceQuestionIndicator steps={indicatorSteps} />

            {/* 문제 이미지 */}<ChoiceQuestionImage src={currentQuestion.imageUrl} alt={currentQuestion.imageAlt} />
          </>
        )}

        {renderPhaseContent()}
      </div>
    </main>
  )
}
