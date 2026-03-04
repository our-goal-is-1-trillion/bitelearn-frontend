import { useState } from "react"
import QuizHeader from "@/components/layout/QuizHeader"
import QuizFooter from "@/components/layout/QuizFooter"
import type { ChoiceQuestionSet } from "@/data/mock/choiceQuestion"
import { cn } from "@/lib/utils"

type WordLearningProps = {
  /** 퀴즈의 원본 세트 데이터 (여기서 word 타입만 필터링하여 사용) */
  wordSet: ChoiceQuestionSet
  /** 홈이나 이전 화면으로 돌아가는 함수 */
  onBack: () => void
}

export default function WordLearning({ wordSet, onBack }: WordLearningProps) {
  // 전체 문항 중 "word" 타입만 추출합니다.
  const words = wordSet.questions.filter((q) => q.type === "word")
  
  const [currentIndex, setCurrentIndex] = useState(0)
  // 카드의 뒤집힘 상태를 관리합니다 (false: 앞면, true: 뒷면)
  const [isFlipped, setIsFlipped] = useState(false)
  // 슬라이드 애니메이션 제어를 위한 클래스 상태
  const [slideClasses, setSlideClasses] = useState("translate-x-0 opacity-100")

  const handleNext = () => {
    if (currentIndex >= words.length - 1) {
      onBack()
      return
    }
    
    // 1. 현재 카드를 왼쪽으로 내보냅니다.
    setSlideClasses("-translate-x-[120%] opacity-0")
    
    setTimeout(() => {
      // 2. 카드 위치를 화면 오른쪽 바깥으로 즉시(duration-0) 이동시키고, 카드 앞면으로 원상복구합니다.
      // 이 때 duration-0 상태가 되므로 뒤집히는 애니메이션 없이 즉시 앞면으로 바뀝니다.
      setSlideClasses("translate-x-[120%] opacity-0 !duration-0")
      setIsFlipped(false)
      setCurrentIndex((prev) => prev + 1)
      
      // 3. 브라우저가 화면을 그린 후, 원래 위치(translate-x-0)로 슬라이드-인 애니메이션을 실행합니다.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSlideClasses("translate-x-0 opacity-100 duration-500 ease-out")
        })
      })
    }, 300) // 내보내는 애니메이션 시간 대기
  }

  const handlePrev = () => {
    if (currentIndex <= 0) return

    // 1. 현재 카드를 오른쪽으로 내보냅니다.
    setSlideClasses("translate-x-[120%] opacity-0")
    
    setTimeout(() => {
      // 2. 카드 위치를 화면 왼쪽 바깥으로 즉시(duration-0) 이동시키고, 즉시 앞면으로 바꿉니다.
      setSlideClasses("-translate-x-[120%] opacity-0 !duration-0")
      setIsFlipped(false)
      setCurrentIndex((prev) => prev - 1)
      
      // 3. 다시 원래 위치(translate-x-0)로 부드럽게 가져옵니다.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSlideClasses("translate-x-0 opacity-100 duration-500 ease-out")
        })
      })
    }, 300)
  }

  const currentWord = words[currentIndex]

  return (
    <main className="relative mx-auto h-[812px] w-[375px] overflow-hidden bg-slate-50 text-slate-900 shadow-xl flex flex-col border border-slate-200">
      {/* 헤더 */}
      <div className="shrink-0 bg-white z-20">
        <QuizHeader title="생존 단어장" showCloseButton onCloseClick={onBack} />
      </div>
      
      {/* 진행 상태 인디케이터 상단 배치 */}
      <div className="w-full bg-white px-6 py-4 flex items-center justify-between border-b border-slate-200 shadow-sm shrink-0 z-10">
        <span className="text-sm font-semibold text-slate-600">
          학습 진행도
        </span>
        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
          {currentIndex + 1} / {words.length}
        </span>
      </div>

      {/* 메인 학습 컨텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-24 relative bg-slate-50 overflow-y-auto overflow-x-hidden">
        {/*
          [Flip Animation 컨테이너]
          perspective를 주어 3D 효과를 생성합니다.
        */}
        <div 
          className={cn(
             "w-full perspective-1000 my-auto relative transition-all duration-300",
             slideClasses
          )}
        >
          <div
            className={cn(
              "w-full relative preserve-3d cursor-pointer shadow-md rounded-2xl",
              isFlipped ? "rotate-y-180 min-h-[600px]" : "min-h-[560px]"
            )}
            style={{ 
              transition: slideClasses.includes("duration-0") 
                ? "none" 
                : "transform 600ms cubic-bezier(0.4, 0, 0.2, 1), min-height 600ms cubic-bezier(0.4, 0, 0.2, 1)" 
            }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* 
              [카드 앞면 (Front)]
              배경색과 이미지, 단어가 제시됩니다.
            */}
            <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden group">
                <div className="flex-1 w-full bg-slate-100 flex items-center justify-center p-6 group-hover:bg-slate-200 transition-colors">
                    {/* 이미지 영역 */}
                    {currentWord.imageUrl ? (
                        <img 
                          src={currentWord.imageUrl} 
                          alt={currentWord.imageAlt} 
                          className="w-full h-full object-cover rounded-xl shadow-sm"
                        />
                    ) : (
                        <div className="text-6xl drop-shadow-sm flex flex-col items-center">
                          <span className="mb-4">📖</span>
                          <span className="text-base font-semibold text-slate-400">이미지가 없습니다</span>
                        </div>
                    )}
                </div>
                <div className="shrink-0 flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-white border-t border-slate-100 z-10">
                    <div className="flex flex-col items-center justify-center flex-1 w-full">
                      <div className="mb-4 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                        <span className="text-xs font-extrabold tracking-wide text-primary">
                            {currentWord.flavorText || "KEY WORD"}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 break-keep mb-6">
                          {currentWord.choices[0] || '단어 이름'}
                      </h2>
                      <div className="bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-xl w-full max-w-[220px]">
                        <p className="text-sm font-semibold text-slate-500 animate-pulse">
                            터치해서 숨은 의미 확인! 👇
                        </p>
                      </div>
                    </div>
                </div>
            </div>

            {/* 
              [카드 뒷면 (Back)]
              rotate-y-180 상태로 시작하며, 카드 전체가 뒤집힐 때 똑바로 보이게 됩니다.
            */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl text-white">
                <div className="flex-1 flex flex-col p-6 items-center justify-center overflow-y-auto w-full">
                    <h3 className="text-xl font-bold mb-4 text-emerald-400 text-center">
                        {currentWord.question}
                    </h3>
                    <div className="w-12 h-1 bg-slate-600 mb-6 rounded-full shrink-0" />
                    <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-200 break-keep text-center w-full max-w-sm">
                        {currentWord.passage}
                    </p>
                    <div className="mt-8 p-4 sm:p-5 bg-slate-900/50 rounded-xl border border-slate-700/50 w-full max-w-sm text-left shadow-inner">
                        <p className="text-sm text-slate-300 leading-relaxed font-medium">
                            <span className="mr-2 text-emerald-400">💡</span>
                            {currentWord.explanation}
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 영역 (이전 / 다음 버튼) */}
      <QuizFooter
        disabled={!isFlipped}
        previousDisabled={currentIndex === 0}
        onClick={handleNext}
        onPrevious={handlePrev}
      >
        {currentIndex === words.length - 1 ? "학습 완료 (홈으로)" : "다음 단어"}
      </QuizFooter>
    </main>
  )
}

