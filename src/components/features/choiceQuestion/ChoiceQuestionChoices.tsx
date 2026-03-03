import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import ChoiceQuestionFooter from "./ChoiceQuestionFooter"

type ChoiceQuestionChoicesProps = {
  /** 문제 번호 (1-based) */
  questionNumber: number
  /** 객관식 질문 텍스트 */
  question: string
  /** 보기 목록 */
  choices: string[]
  /** 현재 선택된 보기 값 */
  selectedValue: string
  /** 보기 선택 핸들러 */
  onSelectChoice: (value: string) => void
  /** "정답 확인" 버튼 클릭 핸들러 */
  onCheckAnswer: () => void
  /** 정답 확인 중 상태 */
  isChecking?: boolean
  /** 정답 인덱스 */
  correctIndex?: number
  /** 뒤로가기 핸들러 */
  onBack?: () => void
}

/**
 * 객관식 보기 화면.
 * 문제 텍스트와 라디오 보기 목록을 표시하고,
 * 선택 후 "정답 확인" 버튼을 활성화한다.
 */
export default function ChoiceQuestionChoices({
  questionNumber,
  question,
  choices,
  selectedValue,
  onSelectChoice,
  onCheckAnswer,
  isChecking = false,
  correctIndex,
  onBack,
}: ChoiceQuestionChoicesProps) {
  const isCtaEnabled = selectedValue !== ""

  return (
    <>
      {/* 스크롤 가능한 콘텐츠 영역 */}
      <section className="flex-1 overflow-y-auto px-6">
        {/* 문제 텍스트 */}
        <h2 className="mb-4 text-base font-semibold text-slate-600">
          Q{questionNumber}. {question}
        </h2>

        {/* 객관식 보기 */}
        <RadioGroup
          value={selectedValue}
          onValueChange={onSelectChoice}
          className="flex flex-col gap-2"
          disabled={isChecking}
        >
          {choices.map((choice, index) => {
            const isSelected = selectedValue === String(index)
            const isAnswer = index === correctIndex

            let containerClass = "border-slate-300 bg-white text-slate-900"
            if (isChecking) {
              if (isAnswer) {
                // User correctly selected or showing the correct answer
                containerClass = `border-green-500 bg-green-50 text-green-700 font-semibold ${
                  isSelected ? "animate-pop" : ""
                }`
              } else if (isSelected && !isAnswer) {
                containerClass = "border-red-500 bg-red-50 text-red-700 font-medium animate-shake"
              } else {
                containerClass = "border-slate-200 bg-slate-50 text-slate-400"
              }
            } else if (isSelected) {
              containerClass = "border-slate-900 bg-white text-slate-900 font-medium"
            }

            return (
              <label
                key={index}
                className={`flex w-full items-center gap-3 rounded-md border px-4 py-3.5 text-sm transition-colors ${
                  isChecking ? "cursor-not-allowed" : "cursor-pointer"
                } ${containerClass}`}
              >
                <RadioGroupItem
                  value={String(index)}
                  id={`choice-${index}`}
                  className="shrink-0"
                />
                <span>{choice}</span>
              </label>
            )
          })}
        </RadioGroup>
      </section>

      {/* Footer — "정답 확인" CTA */}
      <ChoiceQuestionFooter 
        disabled={!isCtaEnabled || isChecking} 
        backDisabled={isChecking}
        onClick={onCheckAnswer}
        onBack={onBack}
      >
        정답 확인
      </ChoiceQuestionFooter>
    </>
  )
}
