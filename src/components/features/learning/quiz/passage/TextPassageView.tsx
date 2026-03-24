import Footer from '@/components/common/Footer';
import ChapterIndicator from '@/components/features/learning/chapter/ChapterIndicator';
import type { QuizInfo } from '@/api/learning/learning.types';
import useIndicatorShadow from '@/hooks/useIndicatorShadow';
import type { StepIndicatorInfo } from '../quiz.types';
import QuizTitle from '../shared/QuizTitle';
import TextPassageCard from './TextPassageCard';

type Props = {
  question: QuizInfo;
  indicatorSteps: StepIndicatorInfo[];
  onSolve: () => void;
};

export default function TextPassageView({
  question,
  indicatorSteps,
  onSolve,
}: Props) {
  const passageTitle = question.passageTitle ?? '';
  const passageContent = question.passageContent ?? '';
  const shouldHideImage =
    question.type === 'DOC_MCQ' || question.type === 'DOC_CLICK';
  const imageSrc = shouldHideImage
    ? undefined
    : (question.questionImageUrl ?? undefined);
  const hasPassageCard = passageContent.trim().length > 0 || Boolean(imageSrc);
  const { scrollRef, showIndicatorShadow } = useIndicatorShadow<HTMLElement>();

  return (
    <>
      <section
        ref={scrollRef}
        className="hide-scrollbar flex-1 overflow-y-auto bg-background px-5 pt-[74px]"
      >
        <div className="flex min-h-full w-full flex-col justify-center py-6">
          <div className="flex flex-col gap-3">
            {passageTitle && (
              <QuizTitle
                questionNumber={question.sequence}
                questionTitle={passageTitle}
              />
            )}

            {hasPassageCard ? (
              <TextPassageCard
                content={passageContent}
                imageAlt={question.questionTitle}
                imageSrc={imageSrc}
              />
            ) : null}
          </div>
        </div>
      </section>

      <ChapterIndicator
        steps={indicatorSteps}
        variant="quiz"
        showShadow={showIndicatorShadow}
      />
      <Footer onClick={onSolve} showTrailingIcon={false}>
        퀴즈 풀기
      </Footer>
    </>
  );
}
