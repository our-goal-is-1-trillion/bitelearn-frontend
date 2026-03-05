import DocumentChoiceQuestion from "@/components/features/documentChoiceQuestion/DocumentChoiceQuestion"

type DocumentChoiceQuizPageProps = {
  onComplete?: (total: number, correct: number) => void
}

export default function DocumentChoiceQuizPage({ onComplete }: DocumentChoiceQuizPageProps) {
  const handleComplete = (total: number, correct: number) => {
    onComplete?.(total, correct)
  }

  return <DocumentChoiceQuestion onComplete={handleComplete} />
}
