import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { StepIndicatorInfo } from '../quiz/quiz.types';

type ChapterIndicatorVariant = 'vocab' | 'quiz';

type ChapterIndicatorProps = {
  steps: StepIndicatorInfo[];
  variant?: ChapterIndicatorVariant;
  showShadow?: boolean;
};

type IndicatorItemState = 'card' | 'quiz' | 'correct' | 'incorrect';

function getIndicatorState(
  step: StepIndicatorInfo,
  variant: ChapterIndicatorVariant
): IndicatorItemState {
  if (variant === 'vocab') {
    return 'card';
  }

  if (step.status === 'correct') {
    return 'correct';
  }

  if (step.status === 'incorrect') {
    return 'incorrect';
  }

  return 'quiz';
}


function getIndicatorClasses(state: IndicatorItemState, isCurrent: boolean) {
  switch (state) {
    case 'card':
      return isCurrent
        ? {
            outer: 'bg-[#c7c8ff]',
            inner: 'bg-[#8b8ff5]',
          }
        : {
            outer: 'bg-[#8b8ff5]',
            inner: '',
          };
    case 'correct':
      return isCurrent
        ? {
            outer: 'bg-primary/30',
            inner: 'bg-[#4ade80]',
          }
        : {
            outer: 'bg-[#4ade80]',
            inner: '',
          };
    case 'incorrect':
      return isCurrent
        ? {
            outer: 'bg-destructive/30',
            inner: 'bg-destructive',
          }
        : {
            outer: 'bg-destructive',
            inner: '',
          };
    case 'quiz':
    default:
      return isCurrent
        ? {
            outer: 'bg-secondary/30',
            inner: 'bg-secondary',
          }
        : {
            outer: 'bg-secondary',
            inner: '',
          };
  }
}

function IndicatorItem({
  step,
  variant,
}: {
  step: StepIndicatorInfo;
  variant: ChapterIndicatorVariant;
}) {
  const state = getIndicatorState(step, variant);
  const { outer, inner } = getIndicatorClasses(state, step.isCurrent);

  return (
    <div className="relative h-[18px] w-[18px] shrink-0">
      <div
        className={cn(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300',
          step.isCurrent ? 'h-[18px] w-[18px]' : 'h-2 w-2'
        )}
      >
        <motion.div
          className={cn('h-full w-full rounded-full', outer)}
          animate={step.isCurrent ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{
            duration: step.isCurrent ? 1.4 : 0.3,
            repeat: step.isCurrent ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      </div>
      {step.isCurrent ? (
        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300',
            inner
          )}
        />
      ) : null}
    </div>
  );
}

export default function ChapterIndicator({
  steps,
  variant = 'quiz',
  showShadow = false,
}: ChapterIndicatorProps) {
  return (
    <div
      className={cn(
        'relative z-10 flex h-10 items-center justify-center bg-popover transition-[box-shadow] duration-300 ease-out',
        showShadow && 'shadow-[0_-6px_12px_0_#EDEEF6]'
      )}
    >
      <div className="flex h-full w-full items-center justify-center px-5 pb-3 pt-2.5">
        {steps.map((step, index) => (
          <IndicatorItem
            key={`${variant}-${index}`}
            step={step}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
