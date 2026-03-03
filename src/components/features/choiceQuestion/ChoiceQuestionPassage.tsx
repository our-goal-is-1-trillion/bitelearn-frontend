import ChoiceQuestionFooter from "./ChoiceQuestionFooter"

type ChoiceQuestionPassageProps = {
  /** 지문 텍스트 */
  passage: string
  /** 지문 아래 플레이버 텍스트 */
  flavorText: string
  /** "문제 풀기" 버튼 클릭 핸들러 */
  onSolve: () => void
}

/**
 * 객관식 퀴즈의 지문(문제) 화면.
 * 지문 카드와 플레이버 텍스트를 표시하고,
 * 하단 "문제 풀기" 버튼으로 보기 화면으로 전환한다.
 */
export default function ChoiceQuestionPassage({
  passage,
  flavorText,
  onSolve,
}: ChoiceQuestionPassageProps) {
  return (
    <>
      {/* 스크롤 가능한 콘텐츠 영역 */}
      <section className="flex-1 overflow-y-auto px-6">
        {/* 지문 카드 */}
        <div className="rounded-md border border-slate-300 bg-white px-4 py-4">
          <p className="text-sm leading-relaxed text-slate-900">{passage}</p>
        </div>

        {/* 플레이버 텍스트 */}
        <p className="mt-6 text-sm text-black">{flavorText}</p>
      </section>

      {/* Footer — "문제 풀기" CTA */}
      <ChoiceQuestionFooter onClick={onSolve}>
        문제 풀기
      </ChoiceQuestionFooter>
    </>
  )
}
