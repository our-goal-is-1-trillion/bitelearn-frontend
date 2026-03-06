import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import QuizHeader from "@/components/layout/QuizHeader"
import { motion } from "framer-motion"

export type QuizResultData = {
  total: number
  correct: number
  timeSpent?: number
}

// 3가지 결과 변형 타입
export type ResultVariant = "perfect" | "close" | "fail"

interface ResultProps {
  onFinish?: () => void
  variant?: ResultVariant
}

// 변형별 콘텐츠 정의 — lo-fi: 배경 무채색, 시멘틱 컬러(초록/빨강)만 유지
const VARIANT_CONFIG = {
  perfect: {
    image: "/images/result/dog_perfect.png",
    emoji: "🪙✨",
    title: "야호! 멍멍이의 소중한 500 바이트를\n완벽하게 지켰어요!",
    description: "사기꾼도 울고 갈 완벽한 지식!\n오늘 멍멍이는 위험한 함정들을 요리조리 피해서 바이트를 안전하게 지켜냈습니다. 멋진 어른이네요!",
    biteSaved: "+500 B",
    biteLost: "-0 B",
    accuracy: 100,
    total: 5,
    correct: 5,
    timeSpent: 78,
    primaryBtn: "다음 챕터 학습하기",
    secondaryBtn: undefined,
    progressLabel: "으른 레벨업 게이지",
    progressValue: 92,
    statLabel: "멍멍이의 지갑 방어율",
    confetti: true,
  },
  close: {
    image: "/images/result/dog_close.png",
    emoji: "💦",
    title: "휴우~ 아슬아슬하게\n바이트 방어 성공!",
    description: "몇 개는 헷갈려서 바이트를 조금 흘렸지만, 치명적인 손해는 막았어요.\n틀린 부분만 다시 주우러 가볼까요?",
    biteSaved: "+260 B",
    biteLost: "-240 B",
    accuracy: 60,
    total: 5,
    correct: 3,
    timeSpent: 130,
    primaryBtn: "다음 챕터 학습하기",
    secondaryBtn: "오답 풀고 바이트 되찾기",
    progressLabel: "으른 레벨업 게이지",
    progressValue: 55,
    statLabel: "멍멍이의 지갑 방어율",
    confetti: false,
  },
  fail: {
    image: "/images/result/dog_fail.png",
    emoji: "😭",
    title: "앗... 나쁜 어른들에게\n500 바이트를 털렸어요",
    description: "세상 물정 모르는 멍멍이, 결국 함정에 빠져 소중한 바이트가 털려버렸네요.\n얼른 다시 공부해서 잃어버린 내 바이트를 되찾아올까요?",
    biteSaved: "+0 B",
    biteLost: "-500 B",
    accuracy: 0,
    total: 5,
    correct: 0,
    timeSpent: 210,
    primaryBtn: "다음 챕터 학습하기",
    secondaryBtn: "오답 풀고 바이트 되찾기",
    progressLabel: "으른 레벨업 게이지",
    progressValue: 8,
    statLabel: "멍멍이의 지갑 방어율",
    confetti: false,
  },
} as const

// 코인 애니메이션 컴포넌트
function CoinParticles() {
  const coins = [
    { x: "10%", delay: 0, rotate: 15 },
    { x: "25%", delay: 0.1, rotate: -10 },
    { x: "45%", delay: 0.2, rotate: 5 },
    { x: "65%", delay: 0.05, rotate: -20 },
    { x: "80%", delay: 0.15, rotate: 10 },
    { x: "55%", delay: 0.3, rotate: -5 },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {coins.map((coin, i) => (
        <motion.div
          key={i}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 820, opacity: [0, 1, 1, 0], rotate: coin.rotate }}
          transition={{ duration: 2.8, delay: coin.delay, ease: "easeIn" }}
          className="absolute text-2xl"
          style={{ left: coin.x }}
        >
          🪙
        </motion.div>
      ))}
    </div>
  )
}


export default function Result({ onFinish, variant = "perfect" }: ResultProps) {
  const [animated, setAnimated] = useState(false)
  const cfg = VARIANT_CONFIG[variant]

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="relative mx-auto flex h-[812px] w-[375px] flex-col overflow-hidden bg-white text-slate-900 border border-slate-200">
      {cfg.confetti && <CoinParticles />}

      {/* 헤더 */}
      <div className="relative z-20 shrink-0">
        <QuizHeader title="오늘의 생존 결과! 🐾" showCloseButton={true} />
      </div>

      {/* 스크롤 가능한 본문 */}
      <div className="flex-1 overflow-y-auto">
        {/* 일러스트 + 타이틀 영역 */}
        <section className="flex flex-col items-center px-6 pt-4 pb-2 text-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-4 h-44 w-44"
          >
            <img
              src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}${cfg.image}`}
              alt="result dog illustration"
              className="h-full w-full object-contain"
            />
          </motion.div>

          <div className="text-3xl mb-2">{cfg.emoji}</div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[22px] font-extrabold leading-snug tracking-tight whitespace-pre-line text-slate-900"
          >
            {cfg.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-3 text-sm leading-relaxed text-slate-500 whitespace-pre-line"
          >
            {cfg.description}
          </motion.p>
        </section>

        {/* 바이트 손익 카드 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mx-5 mt-4 rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">{cfg.progressLabel}</span>
            <span className="text-sm font-bold text-slate-700">{cfg.progressValue}% 📈</span>
          </div>

          {/* 레벨업 게이지 */}
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: animated ? `${cfg.progressValue}%` : 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-slate-900"
            />

          </div>

          {/* 바이트 손익 표시 — 시멘틱 컬러 (초록=이득, 빨강=손실) 유지 */}
          <div className="mt-4 flex gap-3">
            <div className="flex-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-center">
              <p className="text-[11px] font-medium text-slate-500">지켜낸 바이트</p>
              <p className="mt-0.5 text-[17px] font-extrabold text-emerald-600">{cfg.biteSaved}</p>
            </div>
            <div className="flex-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-center">
              <p className="text-[11px] font-medium text-slate-500">잃어버린 바이트</p>
              <p className="mt-0.5 text-[17px] font-extrabold text-red-500">{cfg.biteLost}</p>
            </div>
          </div>
        </motion.section>



        {/* 끝 패딩 */}
        <div className="h-4" />
      </div>

      {/* 하단 CTA 버튼 */}
      <footer className="relative z-20 shrink-0 border-t border-slate-100 bg-white px-5 pb-8 pt-4">
        <div className="flex flex-col gap-2">
          {cfg.primaryBtn && (
            <Button
              className="h-14 w-full rounded-2xl text-[16px] font-bold text-white bg-slate-900 hover:bg-slate-700 shadow-none"
            >
              {cfg.primaryBtn}
            </Button>
          )}
          {cfg.secondaryBtn && (
            <Button
              variant="outline"
              className="h-14 w-full rounded-2xl text-[16px] font-bold text-slate-700 hover:bg-slate-50 border-slate-200 shadow-none"
              onClick={onFinish}
            >
              {cfg.secondaryBtn}
            </Button>
          )}
        </div>
      </footer>
    </main>
  )
}
