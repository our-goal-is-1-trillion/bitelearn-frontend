import type { QuizInfo } from '@/api/learning/learning.types';
import type { StepIndicatorInfo } from '../quiz.types';

import ConversationPassageView from '../passage/ConversationPassageView';
import DocumentPassageView from '../passage/DocumentPassageView';
import TextPassageView from '../passage/TextPassageView';

type Props = {
  question: QuizInfo;
  currentIndex: number;
  indicatorSteps: StepIndicatorInfo[];
  skipConversationAnimation: boolean;
  onSolve: () => void;
};

export default function QuizPassagePhase({
  question,
  currentIndex,
  indicatorSteps,
  skipConversationAnimation,
  onSolve,
}: Props) {
  if (question.type === 'DIALOGUE_MCQ' || question.type === 'DIALOGUE_OX') {
    return (
      <ConversationPassageView
        key={`${question.sequence ?? currentIndex}-${skipConversationAnimation ? 'skip' : 'play'}`}
        question={question}
        indicatorSteps={indicatorSteps}
        onSolve={onSolve}
        skipAnimation={skipConversationAnimation}
      />
    );
  }

  if (
    (question.type === 'DOC_MCQ' || question.type === 'DOC_CLICK') &&
    question.specificData?.documentElements?.length
  ) {
    return (
      <DocumentPassageView
        question={question}
        indicatorSteps={indicatorSteps}
        onSolve={onSolve}
      />
    );
  }

  return (
    <TextPassageView
      question={question}
      indicatorSteps={indicatorSteps}
      onSolve={onSolve}
    />
  );
}
