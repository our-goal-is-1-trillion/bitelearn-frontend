import Footer from '@/components/common/Footer';
import ChapterIndicator from '@/components/features/learning/chapter/ChapterIndicator';
import type { QuizInfo } from '@/api/learning/learning.types';
import useIndicatorShadow from '@/hooks/useIndicatorShadow';
import DocumentCard from '../shared/DocumentCard';
import { toDocumentCardData } from '../learningQuiz.utils';
import type { StepIndicatorInfo } from '../quiz.types';
import QuizTitle from '../shared/QuizTitle';

type DocumentPassageViewProps = {
  question: QuizInfo;
  indicatorSteps: StepIndicatorInfo[];
  onSolve: () => void;
};

export default function DocumentPassageView({
  question,
  indicatorSteps,
  onSolve,
}: DocumentPassageViewProps) {
  const documentCard = toDocumentCardData(question);
  const { scrollRef, showIndicatorShadow } = useIndicatorShadow<HTMLElement>();

  if (!documentCard) return null;

  return (
    <>
      <section
        ref={scrollRef}
        className="hide-scrollbar flex-1 overflow-y-auto bg-background px-6 pt-[74px]"
      >
        <div className="flex min-h-full w-full flex-col justify-center py-6">
          <div className="flex flex-col gap-4">
            <QuizTitle
              questionNumber={question.sequence}
              questionTitle={question.passageTitle ?? question.questionTitle}
            />

            <DocumentCard
              data={documentCard}
              mode="interactive"
              choiceMode="multiple"
              typography="serif"
            />
          </div>
        </div>
      </section>

      <ChapterIndicator
        steps={indicatorSteps}
        variant="quiz"
        showShadow={showIndicatorShadow}
      />
      <Footer onClick={onSolve} showTrailingIcon={false}>
        문제 풀기
      </Footer>
    </>
  );
}
