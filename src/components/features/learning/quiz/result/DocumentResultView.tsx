import { motion } from 'framer-motion';
import { Circle, X } from 'lucide-react';

import Footer from '@/components/common/Footer';
import ChapterIndicator from '@/components/features/learning/chapter/ChapterIndicator';
import useIndicatorShadow from '@/hooks/useIndicatorShadow';
import DocumentCard, { type DocumentCardData } from '../shared/DocumentCard';
import type { StepIndicatorInfo } from '../quiz.types';

type DocumentResultViewProps = {
  isCorrect: boolean;
  explanation: string;
  documentCard: DocumentCardData;
  correctIndex: number;
  selectedAnswerIndex?: number;
  characterImageUrl?: string;
  indicatorSteps: StepIndicatorInfo[];
  isLastQuestion: boolean;
  onNext: () => void;
  nextLabel?: string;
};

export default function DocumentResultView({
  isCorrect,
  explanation,
  documentCard,
  correctIndex,
  selectedAnswerIndex,
  characterImageUrl,
  indicatorSteps,
  isLastQuestion,
  onNext,
  nextLabel,
}: DocumentResultViewProps) {
  const title = isCorrect ? '정답이에요! 👌' : '오답이에요! 😔';
  const footerLabel =
    nextLabel ?? (isLastQuestion ? '전체보기' : '다음 퀴즈');
  const { scrollRef, showIndicatorShadow } = useIndicatorShadow<HTMLElement>();

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background pt-[74px] duration-500 animate-in fade-in slide-in-from-right-8">
      <section
        ref={scrollRef}
        className="hide-scrollbar flex flex-1 flex-col overflow-y-auto"
      >
        <div className="relative px-5">
          <div className="relative flex min-h-[132px] items-start justify-between overflow-hidden">
            <div className="z-10 flex flex-col items-start gap-4 pl-3 pt-8">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`flex h-[60px] w-[60px] items-center justify-center rounded-2xl ${
                  isCorrect ? 'bg-primary' : 'bg-destructive'
                }`}
              >
                {isCorrect ? (
                  <Circle className="text-white" size={40} strokeWidth={2.75} />
                ) : (
                  <X className="text-white" size={40} strokeWidth={2.75} />
                )}
              </motion.div>
              <h2 className="text-xl font-bold leading-8 tracking-normal text-foreground">
                {title}
              </h2>
            </div>
          </div>
          {characterImageUrl ? (
            <img
              src={characterImageUrl}
              alt={isCorrect ? '정답 결과 캐릭터' : '오답 결과 캐릭터'}
              className="pointer-events-none absolute right-0 top-[-8px] h-[180px] w-[180px] object-contain"
            />
          ) : null}
        </div>

        <div className="mt-6 flex-1 rounded-t-3xl bg-popover px-5 pb-8 pt-6 shadow-bl-popover">
          <div className="flex flex-col gap-4">
            <div className="rounded-xl bg-background px-[14px] py-3">
              <p className="mb-1.5 text-xs font-semibold leading-4 text-primary-500">
                해설
              </p>
              <p className="whitespace-pre-line break-words text-sm font-medium leading-5 text-foreground">
                {explanation}
              </p>
            </div>

            <DocumentCard
              data={documentCard}
              mode="result"
              correctIndex={correctIndex}
              selectedAnswerIndex={selectedAnswerIndex}
            />
          </div>
        </div>
      </section>

      <ChapterIndicator
        steps={indicatorSteps}
        variant="quiz"
        showShadow={showIndicatorShadow}
      />
      <Footer onClick={onNext} showTrailingIcon={false}>
        {footerLabel}
      </Footer>
    </div>
  );
}
