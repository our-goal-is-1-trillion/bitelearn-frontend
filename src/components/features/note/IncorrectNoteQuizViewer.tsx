import { useMemo, useState } from 'react';
import type { QuizInfo } from '@/api/learning/learning.types';
import type {
  QuizPhase,
  StepIndicatorInfo,
} from '@/components/features/learning/quiz/quiz.types';
import { findDocumentFieldIndexByAnswerText } from '@/components/features/learning/quiz/learningQuiz.utils';
import QuizPassagePhase from '@/components/features/learning/quiz/phases/QuizPassagePhase';
import QuizChoicesPhase from '@/components/features/learning/quiz/phases/QuizChoicesPhase';
import QuizResultPhase from '@/components/features/learning/quiz/phases/QuizResultPhase';

type IncorrectNoteQuizViewerProps = {
  quiz: QuizInfo;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  onClose: () => void;
};

function findSelectedChoiceIndex(userAnswer: string, options: string[]) {
  return options.findIndex((option) => option.trim() === userAnswer.trim());
}

function findSelectedDocumentIndex(
  userAnswer: string,
  documentElements: { key: string; value: string }[]
) {
  return findDocumentFieldIndexByAnswerText(documentElements, userAnswer);
}

function resolveInitialSelectedChoice(quiz: QuizInfo, userAnswer: string) {
  if (quiz.type === 'DOC_CLICK' || quiz.type === 'DOC_MCQ') {
    const documentIndex = findSelectedDocumentIndex(
      userAnswer,
      quiz.specificData?.documentElements ?? []
    );

    return documentIndex === -1 ? '' : String(documentIndex);
  }

  const selectedIndex = findSelectedChoiceIndex(
    userAnswer,
    quiz.specificData?.options ?? []
  );

  return selectedIndex === -1 ? '' : String(selectedIndex);
}

export default function IncorrectNoteQuizViewer({
  quiz,
  userAnswer,
  correctAnswer,
  explanation,
  onClose,
}: IncorrectNoteQuizViewerProps) {
  const [phase, setPhase] = useState<QuizPhase>('passage');
  const [selectedChoice, setSelectedChoice] = useState(() =>
    resolveInitialSelectedChoice(quiz, userAnswer)
  );

  const isCorrect = userAnswer.trim() === correctAnswer.trim();
  const indicatorSteps: StepIndicatorInfo[] = [
    {
      type: 'quiz',
      status: isCorrect ? 'correct' : 'incorrect',
      isCurrent: true,
    },
  ];
  const correctAnswerIndex = useMemo(() => {
    if (quiz.type === 'DOC_CLICK') {
      return findDocumentFieldIndexByAnswerText(
        quiz.specificData?.documentElements ?? [],
        correctAnswer
      );
    }

    return (quiz.specificData?.options ?? []).findIndex(
      (choice) => choice.trim() === correctAnswer.trim()
    );
  }, [correctAnswer, quiz]);

  const handleSolve = () => {
    setPhase('choices');
  };

  const handleGoPassage = () => {
    setPhase('passage');
  };

  const handleCheckAnswer = () => {
    setPhase('result');
  };

  return (
    <>
      {phase === 'passage' && (
        <QuizPassagePhase
          question={quiz}
          currentIndex={0}
          indicatorSteps={indicatorSteps}
          skipConversationAnimation
          onSolve={handleSolve}
        />
      )}

      {phase === 'choices' && (
        <QuizChoicesPhase
          question={quiz}
          currentIndex={0}
          indicatorSteps={indicatorSteps}
          correctIndex={correctAnswerIndex}
          selectedChoice={selectedChoice}
          isChecking
          onSelectChoice={setSelectedChoice}
          onCheckAnswer={handleCheckAnswer}
          onCheckAnswerWithIndex={(selectedIndex) => {
            setSelectedChoice(String(selectedIndex));
            setPhase('result');
          }}
          onPrevious={handleGoPassage}
          ctaLabel="결과 보기"
          allowSubmitWhenChecking
        />
      )}

      {phase === 'result' && (
        <QuizResultPhase
          question={quiz}
          selectedChoice={selectedChoice}
          isCorrect={isCorrect}
          indicatorSteps={indicatorSteps}
          overrideResult={{
            correct: isCorrect,
            explanation,
            correctAnswer,
            correctAnswerIndex,
          }}
          isLastQuestion
          onNext={onClose}
          nextLabel="오답노트로 돌아가기"
        />
      )}
    </>
  );
}
