import type { ChangeEvent } from "react"

type QuizContentProps = {
  choices: string[]
  selectedChoice: string
  onChangeChoice: (value: string) => void
}

export default function QuizContent({ choices, selectedChoice, onChangeChoice }: QuizContentProps) {
  const handleChoiceChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeChoice(e.target.value)
  }

  return (
    <section className="flex-1 p-4">
      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>진행도</span>
            <span>2/10</span>
          </div>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200">
          <div className="h-full w-1/5 rounded-full bg-slate-800" />
        </div>
      </div>

      <div className="flex h-full flex-col gap-6 p-4">
        <div className="space-y-2">
          <p className="text-m font-semibold text-slate-600">Q2. 테스트 퀴즈</p>
          <div className="rounded-md border border-slate-300 bg-white p-4">
            <p className="text-sm font-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          {choices.map((choice) => (
            <label
              key={choice}
              className="flex h-12 w-full cursor-pointer items-center gap-3 rounded-md border border-slate-300 bg-white px-4 text-sm"
            >
              <input
                type="radio"
                name="quiz-choice"
                value={choice}
                checked={selectedChoice === choice}
                onChange={handleChoiceChange}
                className="h-4 w-4 accent-slate-900"
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  )
}
