import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

type ChoiceQuestionFooterProps = {
  /** 버튼 비활성화 여부 */
  disabled?: boolean
  /** 클릭 핸들러 */
  onClick: () => void
  /** 버튼 내부 텍스트 또는 엘리먼트 */
  children: ReactNode
}

/**
 * 객관식 문제풀이 화면 하단에 고정되는 공통 CTA 풋터 내비게이션
 */
export default function ChoiceQuestionFooter({
  disabled = false,
  onClick,
  children,
}: ChoiceQuestionFooterProps) {
  return (
    <footer className="absolute inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white p-4">
      <Button
        disabled={disabled}
        className="h-12 w-full rounded-md"
        onClick={onClick}
      >
        {children}
      </Button>
    </footer>
  )
}
