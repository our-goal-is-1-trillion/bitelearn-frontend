import { useEffect, useMemo, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ChevronsLeft, ChevronsRight, Pointer } from 'lucide-react';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ChapterIndicator from '@/components/features/learning/chapter/ChapterIndicator';
import useIndicatorShadow from '@/hooks/useIndicatorShadow';
import VocabCard from './VocabCard';

import type { VocabInfo } from '@/api/learning/learning.types';
import type { StepIndicatorInfo } from '@/components/features/learning/quiz/quiz.types';

type VocabCardsPlayerProps = {
  chapterTitle: string;
  vocabs: VocabInfo[];
  vocabIdx: number;
  onVocabIdxChange: (idx: number) => void;
  onComplete: () => Promise<void> | void;
  onBack: () => void;
  indicatorSteps?: StepIndicatorInfo[];
};

export default function VocabCardsPlayer({
  chapterTitle,
  vocabs,
  vocabIdx,
  onVocabIdxChange,
  onComplete,
  onBack,
  indicatorSteps: externalSteps,
}: VocabCardsPlayerProps) {
  const [flippedStates, setFlippedStates] = useState<boolean[]>(() =>
    vocabs.map(() => false)
  );
  const [direction, setDirection] = useState(1);
  const [isCompleting, setIsCompleting] = useState(false);
  const [swipeHintDirection, setSwipeHintDirection] = useState<
    'left' | 'right' | null
  >(null);
  const dragX = useMotionValue(0);
  const cardRotate = useTransform(dragX, [-150, 0, 150], [-8, 0, 8]);

  const currentVocab = vocabs[vocabIdx];
  const isFlipped = flippedStates[vocabIdx] ?? false;
  const cardYOffset = isFlipped ? 6.75 : 0;
  const isFirstVocab = vocabIdx === 0;
  const isLastVocab = vocabIdx === vocabs.length - 1;
  const showPrevSwipeHint = swipeHintDirection === 'right' && !isFirstVocab;
  const showNextSwipeHint = swipeHintDirection === 'left' && isFlipped;

  useEffect(() => {
    dragX.set(0);
  }, [vocabIdx, dragX]);

  useEffect(() => {
    setFlippedStates((prev) => vocabs.map((_, idx) => prev[idx] ?? false));
  }, [vocabs]);

  const localSteps: StepIndicatorInfo[] = useMemo(
    () =>
      vocabs.map((_, idx) => ({
        type: 'vocab',
        status: 'none',
        isCurrent: idx === vocabIdx,
      })),
    [vocabs, vocabIdx]
  );

  const indicatorSteps = externalSteps ?? localSteps;
  const { scrollRef, showIndicatorShadow } =
    useIndicatorShadow<HTMLDivElement>();

  const slideVariants: Variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? '110%' : '-110%',
      y: cardYOffset,
      opacity: 0,
    }),
    animate: {
      x: 0,
      y: cardYOffset,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        y: { type: 'spring', stiffness: 200, damping: 25 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-110%' : '110%',
      y: cardYOffset,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const handleNext = async () => {
    if (isCompleting || !isFlipped) return;

    if (isLastVocab) {
      setIsCompleting(true);
      try {
        await onComplete();
      } finally {
        setIsCompleting(false);
      }
      return;
    }

    setDirection(1);
    onVocabIdxChange(vocabIdx + 1);
  };

  const handlePrev = () => {
    if (isFirstVocab) return;

    setDirection(-1);
    onVocabIdxChange(vocabIdx - 1);
  };

  const handleFlip = () => {
    setFlippedStates((prev) =>
      prev.map((value, idx) => (idx === vocabIdx ? !value : value))
    );
  };

  return (
    <main className="flex h-full min-h-0 flex-col bg-slate-50 text-foreground">
      <div className="z-20 shrink-0 border-b border-slate-100 bg-white pt-[74px]">
        <Header
          title="단어 학습"
          subtitle={chapterTitle}
          showCloseButton
          onCloseClick={onBack}
        />
      </div>

      <div
        ref={scrollRef}
        className="hide-scrollbar flex min-h-0 flex-1 flex-col items-center overflow-y-auto overflow-x-hidden px-5 pt-[37px]"
      >
        <div className="flex w-full flex-col items-center gap-7 px-4 pb-7">
          <div className="relative w-full shrink-0">
            {showPrevSwipeHint ? (
              <motion.div
                aria-hidden
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="pointer-events-none absolute -left-4 top-1/2 z-20 -translate-y-1/2 text-secondary"
              >
                <ChevronsRight size={62} strokeWidth={1.8} />
              </motion.div>
            ) : null}

            {showNextSwipeHint ? (
              <motion.div
                aria-hidden
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="pointer-events-none absolute -right-4 top-1/2 z-20 -translate-y-1/2 text-slate-300"
              >
                <ChevronsLeft size={62} strokeWidth={1.8} />
              </motion.div>
            ) : null}

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={vocabIdx}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="perspective-1000 z-10 h-[440px] w-full shrink-0"
              >
                <motion.div
                  style={{ x: dragX, rotate: cardRotate, touchAction: 'pan-y' }}
                  drag="x"
                  dragDirectionLock
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => setSwipeHintDirection(null)}
                  onDrag={(_, info) => {
                    if (info.offset.x <= -12 && isFlipped) {
                      setSwipeHintDirection('left');
                      return;
                    }

                    if (info.offset.x >= 12 && !isFirstVocab) {
                      setSwipeHintDirection('right');
                      return;
                    }

                    setSwipeHintDirection(null);
                  }}
                  onDragEnd={(_, info) => {
                    setSwipeHintDirection(null);
                    const { offset, velocity } = info;
                    if (offset.x < -80 || velocity.x < -500) {
                      handleNext();
                    } else if (
                      (offset.x > 80 || velocity.x > 500) &&
                      !isFirstVocab
                    ) {
                      handlePrev();
                    }
                  }}
                  className="relative h-full w-full"
                >
                  <VocabCard
                    vocab={currentVocab}
                    isFlipped={isFlipped}
                    onFlip={handleFlip}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pointer-events-none flex min-h-10 items-center justify-center">
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                <motion.div
                  key="flip-guide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex flex-col items-center gap-2 text-slate-400"
                >
                  <Pointer size={20} strokeWidth={1.8} />
                  <p className="text-sm font-semibold tracking-tight">
                    카드를 뒤집어 확인해 보세요!
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="swipe-guide"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-2 text-slate-400"
                >
                  <ChevronsLeft size={20} strokeWidth={1.8} />
                  <span className="text-sm font-semibold tracking-tight">
                    스와이프로 카드를 넘길 수 있어요
                  </span>
                  <ChevronsRight size={20} strokeWidth={1.8} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <ChapterIndicator
        steps={indicatorSteps}
        variant="vocab"
        showShadow={showIndicatorShadow}
      />
      <div className="relative shrink-0">
        <Footer
          disabled={!isFlipped || isCompleting}
          previousDisabled={false}
          onPrevious={isFirstVocab ? undefined : handlePrev}
          onClick={handleNext}
        >
          {isLastVocab ? '단어 학습 완료' : '다음 단어'}
        </Footer>
      </div>
    </main>
  );
}
