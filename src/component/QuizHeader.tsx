import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

type QuizHeaderProps = {
  title: string
  showBackButton?: boolean
  onBackClick?: () => void
}

export default function QuizHeader({ title, showBackButton = true, onBackClick }: QuizHeaderProps) {
  return (
    <header className="relative flex h-14 items-center border-b border-slate-200 px-3">
      {showBackButton ? (
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={onBackClick}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">뒤로가기</span>
        </Button>
      ) : null}

      <h1 className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-sm font-medium">{title}</h1>
    </header>
  )
}
