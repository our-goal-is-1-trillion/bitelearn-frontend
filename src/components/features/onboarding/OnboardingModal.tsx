import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type OnboardingModalProps = {
  isOpen: boolean
  onClose: () => void
}

const ONBOARDING_DATA = [
  {
    image: `${import.meta.env.BASE_URL}images/onboarding/step1.png`,
    title: (
      <>
        드디어 어른이 된 멍멍이,<br />
        첫 출근과 독립을 축하해! 🎉
      </>
    ),
    body: (
      <>
        꿈에 그리던 나만의 자취방, 그리고 첫 직장.<br />
        이제 완벽하고 멋진 '어른 라이프'가<br />
        시작될 줄 알았는데...?
      </>
    ),
  },
  {
    image: `${import.meta.env.BASE_URL}images/onboarding/step2.png`,
    title: (
      <>
        잠깐, '확정일자'요?<br />
        '전세 사기'는 또 뭐고요?! 😵💫
      </>
    ),
    body: (
      <>
        부동산 계약, 세금, 월급 관리...<br />
        학교에선 안 알려준 진짜 어른들의 단어들 앞에서<br />
        우리 멍멍이는 너무 막막하기만 해요.
      </>
    ),
  },
  {
    image: `${import.meta.env.BASE_URL}images/onboarding/step3.png`,
    title: (
      <>
        걱정 마세요! 어려운 세상 물정,<br />
        바이트런이 한 입에 떠먹여 줄게요 🦴✨
      </>
    ),
    body: (
      <>
        어려운 계약 용어도, 헷갈리는 금융 지식도 괜찮아요.<br />
        어른이 되기 위해 꼭 필요한 필수 상식들만 모아,<br />
        강아지 간식처럼 한 입(Bite)에 쏙! 아주 쉽게 알려드릴게요.
      </>
    ),
  },
  {
    image: `${import.meta.env.BASE_URL}images/onboarding/step4.png`,
    title: (
      <>
        하찮은 멍멍이에서<br />
        당당한 '프로 어른'으로! 😎
      </>
    ),
    body: (
      <>
        이제 내 몫은 내가 챙기는 진짜 어른이 될 준비, 끝!<br />
        멍멍이와 함께 첫 번째 지식을 맛보러 가볼까요?
      </>
    ),
  },
]

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(0)

  if (!isOpen) return null

  const handleNext = () => {
    if (step < ONBOARDING_DATA.length - 1) {
      setStep((p) => p + 1)
    } else {
      onClose()
    }
  }

  const currentData = ONBOARDING_DATA[step]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative flex w-full max-w-md flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl h-[85vh] sm:h-[600px]"
      >
        {/* 건너뛰기 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-slate-500 hover:bg-black/10 transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">건너뛰기</span>
        </button>

        <div className="flex-1 overflow-hidden relative bg-slate-50/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              {/* 이미지 영역 */}
              <div className="relative w-full h-[50%] max-h-[280px] bg-indigo-50/50">
                <img
                  src={currentData.image}
                  alt={`onboarding step ${step + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50/50 to-transparent" />
              </div>

              {/* 텍스트 영역 */}
              <div className="flex-1 flex flex-col px-6 pt-6 pb-4 text-center w-full">
                <h2 className="text-xl font-bold text-slate-900 leading-tight mb-3">
                  {currentData.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-slate-600 word-break-keep">
                  {currentData.body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 푸터 영역: 인디케이터 & 버튼 */}
        <div className="shrink-0 p-6 pt-2 bg-white flex flex-col items-center gap-6">
          <div className="flex gap-2">
            {ONBOARDING_DATA.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step ? "w-6 bg-indigo-600" : "w-2 bg-slate-200"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className={`w-full h-14 rounded-2xl text-lg font-bold shadow-md transition-all duration-300 ${
              step === ONBOARDING_DATA.length - 1
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-slate-900 hover:bg-slate-800 text-white"
            }`}
          >
            {step === ONBOARDING_DATA.length - 1 ? "멋진 어른으로 출발하기 🚀" : "다음"}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
