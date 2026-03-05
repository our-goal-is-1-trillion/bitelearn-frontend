import ChoiceQuestionFooter from "./ChoiceQuestionFooter"

type ChoiceQuestionResultProps = {
  /** 정답 여부 */
  isCorrect: boolean
  /** 정답 텍스트 */
  correctAnswerText: string
  /** 사용자가 선택한 답 텍스트 (오답 시 표시) */
  selectedAnswerText: string
  /** 해설 텍스트 */
  explanation: string
  /** 결과 캐릭터 이미지 URL */
  characterImageUrl?: string
  /** 마지막 문제 여부 */
  isLastQuestion: boolean
  /** "다음 문제" 버튼 클릭 핸들러 */
  onNext: () => void
}

/**
 * 문제 하나에 대한 정답/오답 결과 화면.
 *
 * - 정답: 캐릭터(중앙) → "맞았습니다!" → 정답 카드(녹색) → 해설 카드
 * - 오답: "틀렸습니다." + 캐릭터(우측) → 내가 선택한 답(빨간) → 정답(녹색) → 해설
 */
export default function ChoiceQuestionResult({
  isCorrect,
  correctAnswerText,
  selectedAnswerText,
  explanation,
  characterImageUrl = "/vite.svg",
  isLastQuestion,
  onNext,
}: ChoiceQuestionResultProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col animate-in fade-in slide-in-from-right-8 duration-500">
      {/* 스크롤 가능한 콘텐츠 영역 */}
      <section className="flex-1 overflow-y-auto px-6 pb-4">
        {/* ── 정답/오답 헤더 영역 ── */}
        {isCorrect ? (
          /* 정답 레이아웃: 캐릭터 중앙 + "맞았습니다!" */
          <div className="flex flex-col items-center gap-2 pb-6">
            <img
              src={characterImageUrl}
              alt="정답 캐릭터"
              className="h-[120px] w-[120px] object-contain"
            />
            <h2 className="text-base font-semibold text-slate-600">
              맞았습니다!
            </h2>
          </div>
        ) : (
          /* 오답 레이아웃: "틀렸습니다."(좌) + 캐릭터(우) */
          <div className="flex items-center justify-between pb-6">
            <h2 className="text-base font-semibold text-slate-600">
              틀렸습니다.
            </h2>
            <img
              src={characterImageUrl}
              alt="오답 캐릭터"
              className="h-[120px] w-[120px] object-contain"
            />
          </div>
        )}

        {/* ── 오답 시: 내가 선택한 답 카드 (빨간색 배경) ── */}
        {!isCorrect && (
          <div className="mb-3 rounded-md border border-[#e2caca] bg-[#f8e1e1] px-4 py-4">
            <p className="text-sm font-normal text-slate-900">내가 선택한 답</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-900">
              {selectedAnswerText}
            </p>
          </div>
        )}

        {/* ── 정답 카드 (녹색 배경) ── */}
        <div className="mb-3 rounded-md border border-[#cbe2ca] bg-[#e6f8e1] px-4 py-4">
          <p className="text-sm font-normal text-slate-900">정답</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-900">
            {correctAnswerText}
          </p>
        </div>

        {/* ── 해설 카드 (흰색 배경) ── */}
        <div className="rounded-md border border-slate-300 bg-white px-4 py-4">
          <p className="text-sm font-normal text-slate-900">해설</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-900">
            {explanation}
          </p>
        </div>
      </section>

      {/* Footer — "다음 문제" CTA */}
      <ChoiceQuestionFooter onClick={onNext}>
        {isLastQuestion ? "최종 결과 확인" : "다음 문제"}
      </ChoiceQuestionFooter>
    </div>
  )
}
