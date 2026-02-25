import QuizHeader from "./component/QuizHeader"

export default function Result() {
  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-white text-slate-900">
      <div className="flex h-full flex-col border border-slate-200">
        <QuizHeader title="최종 결과" showBackButton={false} />
        <section className="flex flex-1 items-center justify-center p-6 text-center">
          <p className="text-base font-medium">최종 결과 페이지</p>
        </section>
      </div>
    </main>
  )
}
