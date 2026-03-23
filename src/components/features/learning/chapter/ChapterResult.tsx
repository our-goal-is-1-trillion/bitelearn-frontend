import { useEffect, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import chapterResultCloseImage from '@/assets/character/chapter_result_close.png';
import chapterResultFailImage from '@/assets/character/chapter_result_fail.png';
import chapterResultPerfectImage from '@/assets/character/chapter_result_perfect.png';
import Header from '@/components/common/Header';
import LevelBadge from '@/components/features/level/LevelBadge';
import {
  formatBytes,
  getLevelByteProgress,
} from '@/components/features/level/level.utils';
import { Button } from '@/components/ui/button';

type ResultVariant = 'perfect' | 'close' | 'fail';

type ChapterResultProps = {
  correct: number;
  total: number;
  accuracyRate: number;
  earnedBytes: number;
  lostBytes: number;
  currentLevel: number;
  currentTotalBytes: number;
  chapterTitle: string;
  onBack: () => void;
  onFinish: () => void;
  onRetryWrongAnswers?: () => void;
};

const PROGRESS_BAR_CLASS_NAME = 'from-[#fed7aa] to-[#fb923c]';
const EARNED_TEXT_CLASS_NAME = 'text-[#4ade80]';
const LOST_TEXT_CLASS_NAME = 'text-[#f87171]';

const VARIANT_CONFIG = {
  perfect: {
    image: chapterResultPerfectImage,
    title: '야호! 소중한 500 바이트를\n완벽하게 지켰어요!',
    description:
      '사기꾼도 울고 갈 완벽한 지식!\n오늘 멍뭉이는 험난한 인생을 요리조리 피해서\n바이트를 안전하게 지켜냈어요. 멋진 어른이네요!',
    primaryButtonLabel: '다음 챕터로 이동하기',
    secondaryButtonLabel: null,
    showCelebration: true,
  },
  close: {
    image: chapterResultCloseImage,
    title: '휴우~ 아슬아슬하게\n바이트 방어에 성공했어요!',
    description:
      '몇 개는 헷갈려서 바이트를 조금 흘렸지만,\n다행히도 치명적인 손해는 막았어요.\n다시 공부해서 바이트를 다시 되찾으러 가볼까요?',
    primaryButtonLabel: '다음 챕터로 이동하기',
    secondaryButtonLabel: '오답 풀고 바이트 되찾기',
    showCelebration: false,
  },
  fail: {
    image: chapterResultFailImage,
    title: '앗... 나쁜 어른들에게\n소중한 바이트를 털렸어요',
    description:
      '세상 물정 모르는 멍뭉이,\n다시 실수 하지 않도록 공부해서\n잃어버린 바이트를 되찾아봐요!',
    primaryButtonLabel: '다음 챕터로 이동하기',
    secondaryButtonLabel: '오답 풀고 바이트 되찾기',
    showCelebration: false,
  },
} as const;

// 코인 애니메이션 컴포넌트
function CelebrationParticles() {
  const coins = [
    { left: '10%', delay: 0, rotate: 15 },
    { left: '25%', delay: 0.1, rotate: -10 },
    { left: '45%', delay: 0.2, rotate: 5 },
    { left: '65%', delay: 0.05, rotate: -20 },
    { left: '80%', delay: 0.15, rotate: 10 },
    { left: '55%', delay: 0.3, rotate: -5 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {coins.map((coin, index) => (
        <motion.div
          key={`coin-${index}`}
          className="absolute text-[30px] leading-none"
          initial={{ y: -40, opacity: 0 }}
          animate={{
            y: 820,
            opacity: [0, 1, 1, 0],
            rotate: coin.rotate,
          }}
          transition={{
            duration: 2.8,
            delay: coin.delay,
            ease: 'easeIn',
          }}
          style={{
            left: coin.left,
          }}
        >
          <span>🪙</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function ChapterResult({
  correct,
  total,
  accuracyRate,
  earnedBytes,
  lostBytes,
  currentLevel,
  currentTotalBytes,
  chapterTitle,
  onBack,
  onFinish,
  onRetryWrongAnswers,
}: ChapterResultProps) {
  void onRetryWrongAnswers;
  void chapterTitle;

  const [isProgressVisible, setIsProgressVisible] = useState(false);

  // 결과 분기 기준
  const variant: ResultVariant = useMemo(() => {
    if (total > 0 && correct === total) return 'perfect';
    if (Math.round(accuracyRate) >= 100) return 'perfect';
    if (accuracyRate >= 60) return 'close';
    return 'fail';
  }, [accuracyRate, correct, total]);

  const cfg = VARIANT_CONFIG[variant];
  const contentBottomPaddingClass = cfg.secondaryButtonLabel
    ? 'pb-[206px]'
    : 'pb-[144px]';

  const levelState = useMemo(
    () =>
      getLevelByteProgress({
        currentLevel,
        currentTotalBytes,
      }),
    [currentLevel, currentTotalBytes]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setIsProgressVisible(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative flex h-full min-h-0 flex-col overflow-hidden bg-background text-foreground">
      {cfg.showCelebration && <CelebrationParticles />}

      <Header showCloseButton onCloseClick={onBack} className="bg-background" />

      <div
        className={`hide-scrollbar flex-1 overflow-y-auto px-5 pt-[60px] ${contentBottomPaddingClass}`}
      >
        <section className="mx-auto flex w-full max-w-[335px] flex-col items-center pt-5 text-center">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="relative mb-5 flex h-[228px] w-[228px] items-center justify-center"
          >
            <img
              src={cfg.image}
              alt="chapter result character"
              className="h-full w-full object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="whitespace-pre-line text-xl font-bold leading-8 tracking-[-0.02em] text-foreground">
              {cfg.title}
            </p>
            <p className="whitespace-pre-line text-sm leading-[22px] text-slate-600">
              {cfg.description}
            </p>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mx-auto mt-7 w-full max-w-[335px] rounded-2xl border-2 border-slate-100 bg-card p-4 shadow-[0_12px_16px_rgba(237,238,246,0.95)]"
        >
          <div className="flex items-center gap-3">
            <LevelBadge currentLevel={levelState.currentLevel} />

            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold leading-5 text-foreground">
                  {levelState.title}
                </p>
                <p className="shrink-0 text-xs font-bold leading-4 text-slate-400">
                  {levelState.remainingLabel}
                </p>
              </div>

              <div className="h-[10px] overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: isProgressVisible
                      ? `${levelState.progressPercentage}%`
                      : '0%',
                  }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${PROGRESS_BAR_CLASS_NAME}`}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-100/80 px-3 py-3 text-center shadow-sm">
              <p className="text-xs font-medium leading-4 text-foreground">
                지켜낸 바이트
              </p>
              <p
                className={`mt-1 text-lg font-extrabold leading-[25.5px] ${EARNED_TEXT_CLASS_NAME}`}
              >
                +{formatBytes(earnedBytes)}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100/80 px-3 py-3 text-center shadow-sm">
              <p className="text-xs font-medium leading-4 text-slate-600">
                잃어버린 바이트
              </p>
              <p
                className={`mt-1 text-lg font-extrabold leading-[25.5px] ${LOST_TEXT_CLASS_NAME}`}
              >
                -{formatBytes(lostBytes)}
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      <footer className="absolute inset-x-0 bottom-0 z-20 bg-card px-5 pb-8 pt-4 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-[335px] flex-col gap-[10px]">
          <Button
            className="relative h-[52px] w-full rounded-xl bg-primary px-4 text-base font-bold text-foreground shadow-none"
            onClick={onFinish}
          >
            <span>{cfg.primaryButtonLabel}</span>
            <ChevronRight className="absolute right-5 h-6 w-6" />
          </Button>

          {cfg.secondaryButtonLabel ? (
            <Button
              variant="secondary"
              className="relative h-[52px] w-full rounded-xl bg-slate-100 px-4 text-base font-bold text-slate-600 shadow-none"
              onClick={onRetryWrongAnswers}
            >
              <span>{cfg.secondaryButtonLabel}</span>
              <ChevronRight className="absolute right-5 h-6 w-6" />
            </Button>
          ) : null}
        </div>
      </footer>
    </main>
  );
}
