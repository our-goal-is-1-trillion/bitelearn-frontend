import ChapterIndicator from '@/components/features/learning/chapter/ChapterIndicator';
import Footer from '@/components/common/Footer';
import { cn } from '@/lib/utils';
import type { StepIndicatorInfo } from '../quiz.types';
import QuizTitle from '../shared/QuizTitle';

type OXChoiceViewProps = {
  questionNumber: number;
  questionTitle: string;
  indicatorSteps: StepIndicatorInfo[];
  /** 정답 인덱스: 0 = O, 1 = X */
  correctIndex?: number;
  selectedValue: string;
  onSelectChoice: (value: string) => void;
  onCheckAnswer: (selectedIndex: number) => void;
  isChecking?: boolean;
  onPrevious?: () => void;
  ctaLabel?: string;
  allowSubmitWhenChecking?: boolean;
};

export default function OXChoiceView({
  questionTitle,
  indicatorSteps,
  correctIndex,
  selectedValue,
  onSelectChoice,
  onCheckAnswer,
  isChecking = false,
  onPrevious,
  ctaLabel,
  allowSubmitWhenChecking = false,
}: OXChoiceViewProps) {
  const selected =
    selectedValue === '' ? null : (Number(selectedValue) as 0 | 1);
  const isCtaEnabled =
    selected !== null && (!isChecking || allowSubmitWhenChecking);

  const handleSelect = (value: 0 | 1) => {
    if (isChecking) return;
    onSelectChoice(String(value));
  };

  const handleConfirm = () => {
    if (selected === null) return;
    onCheckAnswer(selected);
  };

  const getButtonState = (value: 0 | 1) => {
    if (!isChecking) {
      return selected === value ? 'selected' : 'idle';
    }

    const isSelected = selected === value;
    const isAnswer = value === correctIndex;

    if (isSelected) {
      return isAnswer ? 'correct' : 'wrong';
    }

    return 'dim';
  };

  const buttonConfig = {
    idle: {
      container:
        'border-slate-100 bg-card text-slate-500 shadow-bl-card',
      icon: 'text-slate-400',
      label: 'text-slate-600',
    },
    selected: {
      container:
        'border-slate-300 bg-slate-100 text-slate-700 shadow-bl-card scale-[1.02]',
      icon: 'text-slate-600',
      label: 'text-slate-600',
    },
    correct: {
      container:
        'border-success bg-success-bg text-success scale-[1.05] shadow-[0_12px_24px_0_rgba(74,222,128,0.4)] transition-all duration-300 ease-out z-10',
      icon: 'text-success',
      label: 'text-success font-bold',
    },
    wrong: {
      container:
        'border-destructive bg-destructive-bg text-destructive scale-[1.05] shadow-[0_12px_24px_0_rgba(244,63,94,0.3)] transition-all duration-300 ease-out z-10',
      icon: 'text-destructive',
      label: 'text-destructive font-bold',
    },
    dim: {
      container: 'border-slate-100 bg-slate-50 text-slate-300',
      icon: 'text-slate-300',
      label: 'text-slate-300',
    },
  } as const;

  const renderButton = (value: 0 | 1, label: 'O' | 'X') => {
    const state = getButtonState(value);
    const cfg = buttonConfig[state];
    const isO = label === 'O';
    const answerLabel = isO ? '그렇다' : '아니다';

    return (
      <button
        key={value}
        type="button"
        disabled={isChecking}
        onClick={() => handleSelect(value)}
        className={cn(
          'flex h-[200px] flex-1 cursor-pointer select-none flex-col items-center justify-center gap-3 rounded-3xl border-2 p-5 transition-all duration-200',
          cfg.container,
          isChecking && 'cursor-not-allowed',
          (state === 'correct' || state === 'wrong') && 'border-[3px] border-solid'
        )}
        aria-label={answerLabel}
      >
        <div
          className={cn(
            'relative flex size-[72px] items-center justify-center',
            cfg.icon,
            state === 'dim' && 'opacity-30'
          )}
        >
          {isO ? (
            <span className="block size-[54px] rounded-full border-[8px] border-current" />
          ) : (
            <>
              <span className="absolute h-2 w-[58px] rotate-45 rounded-full bg-current" />
              <span className="absolute h-2 w-[58px] -rotate-45 rounded-full bg-current" />
            </>
          )}
        </div>

        <span
          className={cn(
            'text-base font-medium leading-6 tracking-normal',
            cfg.label,
            state === 'dim' && 'opacity-70'
          )}
        >
          {answerLabel}
        </span>
      </button>
    );
  };

  return (
    <>
      <section className="flex flex-1 flex-col overflow-hidden px-5 pt-[74px]">
        <div className="flex min-h-full w-full flex-col justify-center py-6">
          <div className="flex flex-col gap-3">
            <QuizTitle showQuestionPrefix questionTitle={questionTitle} />

            <div className="flex gap-5">
              {renderButton(0, 'O')}
              {renderButton(1, 'X')}
            </div>
          </div>
        </div>
      </section>

      <ChapterIndicator steps={indicatorSteps} variant="quiz" />
      <Footer
        disabled={!isCtaEnabled}
        previousDisabled={isChecking && !allowSubmitWhenChecking}
        onClick={handleConfirm}
        onPrevious={onPrevious}
        showTrailingIcon={false}
      >
        {ctaLabel ?? '정답 확인'}
      </Footer>
    </>
  );
}
