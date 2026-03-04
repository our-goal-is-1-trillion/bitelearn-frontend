import { useRef, useState } from "react"
import QuizHeader from "@/components/layout/QuizHeader"
import ChoiceQuestionProgressBar, { type StepIndicatorInfo } from "./ChoiceQuestionProgressBar"
import ChoiceQuestionImage from "./ChoiceQuestionImage"
import ChoiceQuestionPassage from "./ChoiceQuestionPassage"
import ChoiceQuestionChoices from "./ChoiceQuestionChoices"
import ChoiceQuestionResult from "./ChoiceQuestionResult"
import { MOCK_CHOICE_QUESTION_SET } from "@/data/mock/choiceQuestion"

/** 화면 단계: 지문 읽기 → 보기 선택 → 정답 확인 중 → 결과 확인 */
type Phase = "passage" | "choices" | "checking" | "result"

/**
 * ChoiceQuestion — 객관식 문제풀기 메인 컨테이너.
 * 지문(passage) → 보기(choices) → 결과(result) 화면을 전환 관리한다.
 */
type ChoiceQuestionProps = {
  /** 홈으로 돌아가는 핸들러 (IA 홈에서 넘어온 경우) */
  onBack?: () => void
}

export default function ChoiceQuestion({ onBack }: ChoiceQuestionProps) {
  const quizSet = MOCK_CHOICE_QUESTION_SET
  // TODO: connect to global state/API — 현재 문제 인덱스
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("passage")
  const [selectedChoice, setSelectedChoice] = useState("")
  const [metrics, setMetrics] = useState<("none" | "correct" | "incorrect")[]>(
    Array(quizSet.questions.length).fill("none")
  )
  const screenRef = useRef<HTMLElement | null>(null)

  const currentQuestion = quizSet.questions[currentIndex]
  const totalSteps = quizSet.questions.length
  const isLastQuestion = currentIndex >= totalSteps - 1

  const isCorrect =
    selectedChoice !== "" &&
    Number(selectedChoice) === currentQuestion.correctIndex

  /** 지문 → 보기 전환 */
  const handleSolve = () => {
    setPhase("choices")
  }

  /** 정답 확인 클릭 → 결과 화면으로 전환 */
  const handleCheckAnswer = () => {
    setPhase("checking")
    setMetrics((prev) => {
      const next = [...prev]
      next[currentIndex] = isCorrect ? "correct" : "incorrect"
      return next
    })
    setTimeout(() => {
      setPhase("result")
    }, 1400)
  }

  /** 다음 문제로 이동 */
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // TODO: connect to final result page or global state
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setPhase("passage")
    setSelectedChoice("")
  }

  /** 현재 단계에 따라 콘텐츠 렌더링 */
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
            onBack={() => setPhase("passage")}
          />
        )
      case "result":
        return (
          <ChoiceQuestionResult
            isCorrect={isCorrect}
            correctAnswerText={
              currentQuestion.choices[currentQuestion.correctIndex]
            }
            selectedAnswerText={
              selectedChoice !== ""
                ? currentQuestion.choices[Number(selectedChoice)]
                : ""
            }
            explanation={currentQuestion.explanation}
            characterImageUrl={
              isCorrect
                ? currentQuestion.characterCorrectImageUrl
                : currentQuestion.characterIncorrectImageUrl
            }
            isLastQuestion={isLastQuestion}
            onNext={handleNextQuestion}
          />
        )
    }
  }

  /** 뒤로 가기 처리 (구 로직 대체, 사용 안됨) */
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      window.history.back()
    }
  }

  const indicatorSteps: StepIndicatorInfo[] = quizSet.questions.map((q, idx) => ({
    type: q.type || "quiz",
    status: metrics[idx],
    isCurrent: idx === currentIndex,
  }))

  return (
    <main
      ref={screenRef}
      className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900"
    >
      <div className="relative flex h-full flex-col border border-slate-200 pb-20 pt-14">
        {/* 상단 고정 Header */}
        <div className="absolute inset-x-0 top-0 z-20 bg-white">
          <QuizHeader title={quizSet.title} showCloseButton onCloseClick={handleBack} />
        </div>

        {/* 결과 화면에서는 진행도 바와 이미지를 숨김 */}
        {phase !== "result" && (
          <>
            {/* 진행도 바 (닷 인디케이터) */}
            <ChoiceQuestionProgressBar steps={indicatorSteps} />

            {/* 문제 이미지 */}
            <ChoiceQuestionImage
              src={currentQuestion.imageUrl}
              alt={currentQuestion.imageAlt}
            />
          </>
        )}

        {/* 화면 분기: 지문 / 보기 / 결과 */}
        {renderPhaseContent()}
      </div>
    </main>
  )
}
