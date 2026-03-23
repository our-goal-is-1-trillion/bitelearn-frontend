import type { ReactNode } from 'react';
import ChapterIndicator from '@/components/features/learning/chapter/ChapterIndicator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, X } from 'lucide-react';
import Footer from '@/components/common/Footer';
import useIndicatorShadow from '@/hooks/useIndicatorShadow';
import type { StepIndicatorInfo } from '../quiz.types';
import QuizTitle from '../shared/QuizTitle';

type MultipleChoiceViewProps = {
  questionTitle: string;
  indicatorSteps: StepIndicatorInfo[];
  choices: string[];
  selectedValue: string;
  onSelectChoice: (value: string) => void;
  onCheckAnswer: (selectedIndex: number) => void;
  isChecking?: boolean;
  correctIndex?: number;
  onPrevious?: () => void;
  ctaLabel?: string;
  allowSubmitWhenChecking?: boolean;
};

export default function MultipleChoiceView({
  questionTitle,
  indicatorSteps,
  choices,
  selectedValue,
  onSelectChoice,
  onCheckAnswer,
  isChecking = false,
  correctIndex,
  onPrevious,
  ctaLabel,
  allowSubmitWhenChecking = false,
}: MultipleChoiceViewProps) {
  const isCtaEnabled = selectedValue !== '';
  const { scrollRef, showIndicatorShadow } = useIndicatorShadow<HTMLElement>();

  return (
    <>
      <section
        ref={scrollRef}
        className="hide-scrollbar flex-1 overflow-y-auto px-5 pt-[74px]"
      >
        <div className="flex min-h-full w-full flex-col justify-center">
          <div className="flex flex-col gap-3">
            <QuizTitle showQuestionPrefix questionTitle={questionTitle} />

            <RadioGroup
              value={selectedValue}
              onValueChange={onSelectChoice}
              className="flex flex-col gap-3"
              disabled={isChecking}
            >
              {choices.map((choice, index) => {
                const isSelected = selectedValue === String(index);
                const isAnswer = index === correctIndex;

                // 기본 스타일
                let containerClass =
                  'border-2 border-slate-100 bg-white text-foreground shadow-bl-card';
                let radioClass = 'border-secondary text-slate-400';
                let customIcon: ReactNode = undefined;
                let showIconAlways = false;

                // 정답 확인 후 스타일
                if (isChecking) {
                  if (isAnswer) {
                    containerClass = `border-2 border-[rgba(74,222,128,0.5)] bg-green-50 text-foreground shadow-bl-card ${
                      isSelected ? 'animate-pop' : ''
                    }`;
                    radioClass =
                      'relative overflow-hidden border-transparent bg-primary text-white shadow-none disabled:opacity-100';
                    customIcon = (
                      <>
                        <span className="absolute inset-0 rounded-full bg-success shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
                        <Check className="relative z-10 h-3 w-3 stroke-[2.75]" />
                      </>
                    );
                    showIconAlways = true;
                  } else if (isSelected && !isAnswer) {
                    containerClass =
                      'animate-shake border-2 border-[rgba(248,113,113,0.5)] bg-red-50 text-foreground shadow-bl-card';
                    radioClass =
                      'relative overflow-hidden border-transparent bg-transparent text-white shadow-none disabled:opacity-100';
                    customIcon = (
                      <>
                        <span className="absolute inset-0 rounded-full bg-destructive shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
                        <X className="relative z-10 h-3 w-3 stroke-[2.75]" />
                      </>
                    );
                    showIconAlways = true;
                  } else {
                    containerClass =
                      'border-2 border-slate-100 bg-white text-foreground shadow-bl-card';
                    radioClass =
                      'border-secondary text-slate-400 disabled:opacity-100';
                  }

                  // 정답 확인 전 선택된 상세 스타일
                } else if (isSelected) {
                  containerClass =
                    'border-2 border-[rgba(71,85,105,0.4)] bg-slate-100 text-foreground shadow-bl-card';
                  radioClass =
                    'border-slate-600 text-slate-600 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]';
                  customIcon = (
                    <span className="block size-2.5 rounded-full bg-slate-600" />
                  );
                }

                return (
                  <label
                    key={index}
                    className={`flex w-full items-center gap-3 rounded-[6px] px-4 py-3 text-sm transition-colors ${
                      isChecking ? 'cursor-not-allowed' : 'cursor-pointer'
                    } ${containerClass}`}
                  >
                    <RadioGroupItem
                      value={String(index)}
                      id={`choice-${index}`}
                      className={`size-4 shrink-0 ${radioClass}`}
                      icon={customIcon}
                      showIconAlways={showIconAlways}
                    />
                    <span className="text-sm font-medium leading-5 tracking-normal text-foreground">
                      {choice}
                    </span>
                  </label>
                );
              })}
            </RadioGroup>
          </div>
        </div>
      </section>

      <ChapterIndicator
        steps={indicatorSteps}
        variant="quiz"
        showShadow={showIndicatorShadow}
      />
      <Footer
        disabled={!isCtaEnabled || (isChecking && !allowSubmitWhenChecking)}
        previousDisabled={isChecking && !allowSubmitWhenChecking}
        onClick={() => onCheckAnswer(Number(selectedValue))}
        onPrevious={onPrevious}
      >
        {ctaLabel ?? '정답 확인'}
      </Footer>
    </>
  );
}
