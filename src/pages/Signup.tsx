import type { FormEvent } from "react"

type SignupProps = {
  onBack?: () => void
  onLogin?: () => void
  onSuccess?: () => void
}

export default function Signup({ onBack, onLogin, onSuccess }: SignupProps) {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSuccess?.()
  }

  return (
    <main className="mx-auto flex h-[812px] w-[375px] flex-col bg-white p-6 text-slate-900">
      <button
        type="button"
        className="mb-4 self-start rounded border px-3 py-1 text-sm"
        onClick={onBack}
      >
        뒤로
      </button>
      <h1 className="mb-2 text-xl font-semibold">회원가입</h1>
      <p className="mb-6 text-sm text-slate-500">새 계정을 만들고 학습을 시작하세요.</p>

      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <input className="rounded border px-3 py-2" type="email" placeholder="이메일" required />
        <input className="rounded border px-3 py-2" type="password" placeholder="비밀번호" required />
        <input className="rounded border px-3 py-2" type="password" placeholder="비밀번호 확인" required />
        <input className="rounded border px-3 py-2" type="text" placeholder="닉네임" required />
        <button className="mt-2 rounded bg-slate-900 px-3 py-2 text-white" type="submit">
          가입하기
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-600">
        이미 계정이 있나요? {" "}
        <button type="button" className="font-semibold text-blue-600" onClick={onLogin}>
          로그인
        </button>
      </p>
    </main>
  )
}
