import ChapterIndicator from '@/components/features/learning/chapter/ChapterIndicator';
import Footer from '@/components/common/Footer';
import DocumentCard from '../shared/DocumentCard';
import type { QuizInfo } from '@/api/learning/learning.types';
import useIndicatorShadow from '@/hooks/useIndicatorShadow';
import { toDocumentCardData } from '../learningQuiz.utils';
import type { StepIndicatorInfo } from '../quiz.types';
import QuizTitle from '../shared/QuizTitle';

type DocumentSelectViewProps = {
  question: QuizInfo;
  questionNumber: number;
  questionTitle: string;
  indicatorSteps: StepIndicatorInfo[];
  correctIndex?: number;
  selectedValue: string;
  onSelectChoice: (value: string) => void;
  onCheckAnswer: (selectedIndex?: number) => void;
  isChecking?: boolean;
  onPrevious?: () => void;
  ctaLabel?: string;
  allowSubmitWhenChecking?: boolean;
};

export default function DocumentSelectView({
  question,
  questionTitle,
  indicatorSteps,
  correctIndex,
  selectedValue,
  isChecking,
  onSelectChoice,
  onCheckAnswer,
  onPrevious,
  ctaLabel,
  allowSubmitWhenChecking = false,
}: DocumentSelectViewProps) {
  const documentCard = toDocumentCardData(question)!;
  const { scrollRef, showIndicatorShadow } = useIndicatorShadow<HTMLElement>();

  return (
    <>
      <section
        ref={scrollRef}
        className="hide-scrollbar flex-1 overflow-y-auto bg-background px-5 pt-[74px]"
      >
        <div className="flex min-h-full w-full flex-col justify-center py-6">
          <div className="flex flex-col gap-4">
            <QuizTitle showQuestionPrefix questionTitle={questionTitle} />

            <DocumentCard
              data={documentCard}
              mode="interactive"
              choiceMode="document_select"
              typography="serif"
              selectedValue={selectedValue}
              onSelectField={onSelectChoice}
              isChecking={isChecking}
              correctIndex={correctIndex}
            />
          </div>
        </div>
      </section>

      <ChapterIndicator
        steps={indicatorSteps}
        variant="quiz"
        showShadow={showIndicatorShadow}
      />
      <Footer
        disabled={
          selectedValue === '' || (isChecking && !allowSubmitWhenChecking)
        }
        previousDisabled={isChecking && !allowSubmitWhenChecking}
        onClick={onCheckAnswer}
        onPrevious={onPrevious}
        showTrailingIcon={false}
      >
        {ctaLabel ?? '정답 확인'}
      </Footer>
    </>
  );
}
