import { useRef, useState } from "react"
import QuizHeader from "@/components/layout/QuizHeader"
import ChoiceQuestionIndicator, {
  type StepIndicatorInfo,
} from "@/components/features/choiceQuestion/ChoiceQuestionIndicator"
import ChoiceQuestionImage from "@/components/features/choiceQuestion/ChoiceQuestionImage"
import ChoiceQuestionPassage from "@/components/features/choiceQuestion/ChoiceQuestionPassage"
import ChoiceQuestionChoices from "@/components/features/choiceQuestion/ChoiceQuestionChoices"
import ChoiceQuestionOXChoices from "@/components/features/choiceQuestion/ChoiceQuestionOXChoices"
import ChoiceQuestionResult from "@/components/features/choiceQuestion/ChoiceQuestionResult"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

type Phase = "passage" | "choices" | "checking" | "result"

type ChoiceQuestionProps = {
  onComplete?: (total: number, correctCount: number) => void
}

/**
 * passageMode × choiceMode 조합으로 퀴즈 유형 레이블을 생성합니다.
 * 추후 "story"나 "ox" 모드가 추가될 때 이 함수만 확장하면 됩니다.
 */
function getQuizTypeLabel(
  passageMode: "text" | "story" | "conversation" | "document" | undefined,
  choiceMode: "multiple" | "ox" | "document_select" | undefined
): string {
  const passageLabel =
    passageMode === "story" ? "상황 지문형" : "지문형"
  const choiceLabel =
    choiceMode === "ox" ? "OX 퀴즈" : "객관식 퀴즈"
  return `${choiceLabel} (${passageLabel})`
}

export default function ChoiceQuestion({ onComplete }: ChoiceQuestionProps) {
  // quiz 타입 문제 전체를 사용합니다.
  const quizQuestions = MOCK_CHOICE_QUESTION_SET.questions.filter((q) => q.type === "quiz" && q.choiceMode === "multiple")
  const quizSet = {
    ...MOCK_CHOICE_QUESTION_SET,
    questions: quizQuestions
  }

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

  // 현재 문제의 모드를 읽어 기본값을 적용합니다.
  const passageMode = currentQuestion.passageMode ?? "text"
  const choiceMode = currentQuestion.choiceMode ?? "multiple"
  const quizTypeLabel = getQuizTypeLabel(passageMode, choiceMode)

  const handleSolve = () => setPhase("choices")

  /**
   * 정답 확인 핸들러.
   * - multiple 모드: 선택된 value(문자열)를 이미 state에서 읽음
   * - ox 모드: OXChoices 컴포넌트가 선택 인덱스를 직접 전달
   */
  const handleCheckAnswer = (selectedIndex?: number | React.MouseEvent) => {
    // OX 모드에서 선택된 인덱스를 직접 받아 state에 반영
    const isEvent = selectedIndex && typeof selectedIndex !== "number";
    const resolvedChoice =
      !isEvent && selectedIndex !== undefined ? String(selectedIndex) : selectedChoice
    if (resolvedChoice === "") return

    const correct = Number(resolvedChoice) === currentQuestion.correctIndex
    setSelectedChoice(resolvedChoice)
    setPhase("checking")
    setMetrics((prev) => {
      const next = [...prev]
      next[currentIndex] = correct ? "correct" : "incorrect"
      return next
    })
    setTimeout(() => setPhase("result"), 1400)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const correctCount = metrics.filter((m) => m === "correct").length
      if (onComplete) {
        onComplete(quizSet.questions.length, correctCount)
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
            passageMode={passageMode as "text" | "story"}
            onSolve={handleSolve}
          />
        )
      case "choices":
      case "checking":
        if (choiceMode === "ox") {
          return (
            <ChoiceQuestionOXChoices
              questionNumber={currentIndex + 1}
              question={currentQuestion.question}
              correctIndex={currentQuestion.correctIndex}
              onCheckAnswer={handleCheckAnswer}
              isChecking={phase === "checking"}
              onPrevious={() => setPhase("passage")}
            />
          )
        }
        return (
          <ChoiceQuestionChoices
            questionNumber={currentIndex + 1}
            question={currentQuestion.question}
            choices={currentQuestion.choices}
            choiceMode={choiceMode as "multiple" | "document_select"}
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
          <QuizHeader title={quizTypeLabel} showCloseButton={false} />
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


