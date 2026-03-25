import { useEffect, useMemo, useRef, useState } from 'react';
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
import { getVocabImageUrl, preloadImages } from '@/lib/image';
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
  const cardFrameRef = useRef<HTMLDivElement>(null);
  const [flippedStates, setFlippedStates] = useState<boolean[]>(() =>
    vocabs.map(() => false)
  );
  const [direction, setDirection] = useState(1);
  const [isCompleting, setIsCompleting] = useState(false);
  const [swipeHintDirection, setSwipeHintDirection] = useState<
    'left' | 'right' | null
  >(null);
  const [cardWidth, setCardWidth] = useState(360);
  const dragX = useMotionValue(0);
  const cardRotate = useTransform(dragX, [-150, 0, 150], [-8, 0, 8]);

  const currentVocab = vocabs[vocabIdx];
  const isFlipped = flippedStates[vocabIdx] ?? false;
  const cardYOffset = isFlipped ? 6.75 : 0;
  const isFirstVocab = vocabIdx === 0;
  const isLastVocab = vocabIdx === vocabs.length - 1;
  const showPrevSwipeHint = swipeHintDirection === 'right' && !isFirstVocab;
  const showNextSwipeHint = swipeHintDirection === 'left' && isFlipped;

  // vocabIdx가 변경될 때마다 드래그 위치 초기화
  useEffect(() => {
    dragX.set(0);
  }, [vocabIdx, dragX]);

  // vocabs 배열이 변경될 때마다 flippedStates 배열을 초기화하여 카드가 모두 앞면으로 시작하도록 설정
  useEffect(() => {
    setFlippedStates((prev) => vocabs.map((_, idx) => prev[idx] ?? false));
  }, [vocabs]);

  // 현재 카드와 다음 카드, 다다음 카드의 이미지를 미리 불러오기
  useEffect(() => {
    void preloadImages([
      getVocabImageUrl(vocabs[vocabIdx]),
      getVocabImageUrl(vocabs[vocabIdx + 1]),
      getVocabImageUrl(vocabs[vocabIdx + 2]),
    ]);
  }, [vocabs, vocabIdx]);

  // 카드 프레임의 너비를 측정하여 스와이프 임계값 계산에 활용
  useEffect(() => {
    const element = cardFrameRef.current;

    if (!element) return;

    const updateCardWidth = () => {
      setCardWidth(element.getBoundingClientRect().width || 360);
    };

    updateCardWidth();

    const resizeObserver = new ResizeObserver(updateCardWidth);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

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
  const swipeHintThreshold = Math.max(12, Math.round(cardWidth * 0.035));
  const swipeCommitThreshold = Math.max(72, Math.round(cardWidth * 0.22));
  const swipeVelocityThreshold = Math.max(500, Math.round(cardWidth * 1.4));

  // 챕터 완료 처리 준비
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

  // 다음 카드로 이동 처리
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

  // 이전 카드로 이동 처리
  const handlePrev = () => {
    if (isFirstVocab) return;

    setDirection(-1);
    onVocabIdxChange(vocabIdx - 1);
  };

  // 카드 뒤집기 처리
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
          backgroundVariant="popover"
        />
      </div>

      <div
        ref={scrollRef}
        className="hide-scrollbar flex min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-5"
      >
        <div className="flex min-h-full w-full flex-col">
          <div className="min-h-6 flex-1" aria-hidden />

          <div className="flex w-full flex-col items-center gap-7 px-4">
            <div
              ref={cardFrameRef}
              className="relative mx-auto w-full max-w-[360px] shrink-0 overflow-visible"
            >
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
                  className="pointer-events-none absolute -left-10 top-1/2 z-20 -translate-y-1/2 text-secondary"
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
                  className="pointer-events-none absolute -right-10 top-1/2 z-20 -translate-y-1/2 text-slate-300"
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
                  className="perspective-1000 z-10 aspect-[34/44] min-h-[440px] w-full shrink-0"
                >
                  <motion.div
                    style={{
                      x: dragX,
                      rotate: cardRotate,
                      touchAction: 'pan-y',
                    }}
                    drag="x"
                    dragDirectionLock
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragStart={() => setSwipeHintDirection(null)}
                    onDrag={(_, info) => {
                      if (info.offset.x <= -swipeHintThreshold && isFlipped) {
                        setSwipeHintDirection('left');
                        return;
                      }

                      if (
                        info.offset.x >= swipeHintThreshold &&
                        !isFirstVocab
                      ) {
                        setSwipeHintDirection('right');
                        return;
                      }

                      setSwipeHintDirection(null);
                    }}
                    onDragEnd={(_, info) => {
                      setSwipeHintDirection(null);
                      const { offset, velocity } = info;
                      if (
                        offset.x < -swipeCommitThreshold ||
                        velocity.x < -swipeVelocityThreshold
                      ) {
                        handleNext();
                      } else if (
                        (offset.x > swipeCommitThreshold ||
                          velocity.x > swipeVelocityThreshold) &&
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

          <div className="min-h-6 flex-1" aria-hidden />
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
