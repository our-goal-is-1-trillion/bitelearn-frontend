import { useEffect, useState } from 'react';

import Header from '@/components/common/Header';
import type { QuizInfo } from '@/api/learning/learning.types';
import type { QuizMetric, QuizPhase, StepIndicatorInfo } from './quiz.types';
import QuizPassagePhase from './phases/QuizPassagePhase';
import QuizChoicesPhase from './phases/QuizChoicesPhase';
import QuizResultPhase from './phases/QuizResultPhase';
import QuizExitDialog from './shared/QuizExitDialog';
import type { QuizSubmitResponse } from '@/api/learning/learning.types';
import { isAppError } from '@/api/error/appError';
import { logError } from '@/lib/logError';
import { getQuizPassageImageUrl, preloadImages } from '@/lib/image';
import { toast } from 'sonner';
import { findDocumentFieldIndexByAnswerText } from './learningQuiz.utils';

type QuizPlayerProps = {
  questions: QuizInfo[];
  startIndex?: number;
  chapterTitle: string;
  onBack: () => void;
  onPrepareCompletion?: () => Promise<boolean>;
  onComplete: () => void;
  indicatorSteps: StepIndicatorInfo[];
  onCurrentIndexChange: (index: number) => void;
  onMetricsChange: (metrics: QuizMetric[]) => void;
  onSubmitAnswer: (
    question: QuizInfo,
    selectedAnswerIndex: number
  ) => Promise<QuizSubmitResponse>;
};

export default function QuizPlayer({
  questions,
  startIndex = 0,
  chapterTitle,
  onBack,
  onPrepareCompletion,
  onComplete,
  indicatorSteps,
  onCurrentIndexChange,
  onMetricsChange,
  onSubmitAnswer,
}: QuizPlayerProps) {
  const safeStartIndex =
    questions.length > 0
      ? Math.max(0, Math.min(startIndex, questions.length - 1))
      : 0;
  const [currentIndex, setCurrentIndex] = useState(safeStartIndex);
  const [phase, setPhase] = useState<QuizPhase>('passage');
  const [selectedChoice, setSelectedChoice] = useState('');
  const [metrics, setMetrics] = useState<QuizMetric[]>(
    Array(questions.length).fill('none')
  );
  const [seenPassages, setSeenPassages] = useState<Set<number>>(new Set());
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);
  const [resultByIndex, setResultByIndex] = useState<
    Record<
      number,
      {
        correct: boolean;
        explanation: string;
        correctAnswer: string;
        correctAnswerIndex: number;
      }
    >
  >({});
  const currentQuestion = questions[currentIndex];
  const currentChoices = currentQuestion?.specificData?.options ?? [];
  const currentResult = resultByIndex[currentIndex];
  const isShowingEvaluation = phase === 'checking' && !isEvaluating;
  const isCorrect = currentResult?.correct ?? false;
  const isLastQuestion = currentIndex === questions.length - 1;
  const resolvedCorrectIndex = currentResult?.correctAnswerIndex ?? -1;
  const shouldConfirmExit = phase !== 'result' || !isLastQuestion;

  useEffect(() => {
    onCurrentIndexChange(currentIndex);
  }, [currentIndex, onCurrentIndexChange]);

  useEffect(() => {
    onMetricsChange(metrics);
  }, [metrics, onMetricsChange]);

  useEffect(() => {
    void preloadImages([
      getQuizPassageImageUrl(questions[currentIndex]),
      getQuizPassageImageUrl(questions[currentIndex + 1]),
      getQuizPassageImageUrl(questions[currentIndex + 2]),
    ]);
  }, [questions, currentIndex]);

  const handleSolve = () => {
    if (
      currentQuestion.type === 'DIALOGUE_MCQ' ||
      currentQuestion.type === 'DIALOGUE_OX'
    ) {
      setSeenPassages((prev) => new Set(prev).add(currentIndex));
    }
    setPhase('choices');
  };

  const handleGoPassage = () => {
    setPhase('passage');
    setSelectedChoice('');
  };

  const handleRequestClose = () => {
    setIsExitDialogOpen(true);
  };

  const handleConfirmExit = () => {
    setIsExitDialogOpen(false);
    onBack();
  };

  const handleCheckAnswer = async (selectedIndex?: number) => {
    const resolvedIndex =
      selectedIndex !== undefined ? selectedIndex : Number(selectedChoice);

    if (Number.isNaN(resolvedIndex)) return;

    setSelectedChoice(String(resolvedIndex));
    setPhase('checking');
    setIsEvaluating(true);

    let correct = false;
    let explanation = '';
    let correctAnswer = '';

    try {
      const submitResult = await onSubmitAnswer(currentQuestion, resolvedIndex);
      correct = submitResult.correct;
      explanation = submitResult.explanation;
      correctAnswer = submitResult.correctAnswer;
    } catch (error) {
      logError('QuizPlayer', '퀴즈 제출 실패', error);
      setIsEvaluating(false);
      setPhase('choices');
      toast.error(
        isAppError(error)
          ? error.message
          : '답안을 제출하지 못했습니다. 다시 시도해 주세요.'
      );
      return;
    }

    const correctAnswerIndex =
      currentQuestion.type === 'DOC_CLICK'
        ? findDocumentFieldIndexByAnswerText(
            currentQuestion.specificData?.documentElements ?? [],
            correctAnswer
          )
        : currentChoices.findIndex(
            (choice) => choice.trim() === correctAnswer.trim()
          );

    setMetrics((prev) => {
      const next = [...prev];
      next[currentIndex] = correct ? 'correct' : 'incorrect';
      return next;
    });
    setResultByIndex((prev) => ({
      ...prev,
      [currentIndex]: {
        correct,
        explanation,
        correctAnswer,
        correctAnswerIndex,
      },
    }));

    if (isLastQuestion && onPrepareCompletion) {
      await onPrepareCompletion();
    }

    setIsEvaluating(false);
  };

  useEffect(() => {
    if (phase !== 'checking' || isEvaluating) return;

    const timer = window.setTimeout(() => {
      setPhase('result');
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [phase, isEvaluating]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedChoice('');
    setPhase('passage');
  };

  if (questions.length === 0 || !currentQuestion) {
    return (
      <main className="flex h-full min-h-0 items-center justify-center bg-white text-foreground">
        <p className="text-sm text-slate-400">문제 데이터가 없습니다.</p>
      </main>
    );
  }

  return (
    <main className="flex h-full min-h-0 flex-col bg-background text-foreground">
      <Header
        title={chapterTitle}
        subtitle="학습 퀴즈"
        showCloseButton
        onCloseClick={shouldConfirmExit ? handleRequestClose : onBack}
        backgroundVariant="popover"
      />

      {shouldConfirmExit ? (
        <QuizExitDialog
          open={isExitDialogOpen}
          onOpenChange={setIsExitDialogOpen}
          onConfirmExit={handleConfirmExit}
        />
      ) : null}

      {phase === 'passage' && (
        <QuizPassagePhase
          question={currentQuestion}
          currentIndex={currentIndex}
          indicatorSteps={indicatorSteps}
          skipConversationAnimation={seenPassages.has(currentIndex)}
          onSolve={handleSolve}
        />
      )}

      {(phase === 'choices' || phase === 'checking') && (
        <QuizChoicesPhase
          question={currentQuestion}
          currentIndex={currentIndex}
          indicatorSteps={indicatorSteps}
          correctIndex={resolvedCorrectIndex}
          selectedChoice={selectedChoice}
          isChecking={isShowingEvaluation}
          onSelectChoice={setSelectedChoice}
          onCheckAnswer={() => handleCheckAnswer()}
          onCheckAnswerWithIndex={handleCheckAnswer}
          onPrevious={handleGoPassage}
        />
      )}

      {phase === 'result' && (
        <QuizResultPhase
          question={currentQuestion}
          selectedChoice={selectedChoice}
          isCorrect={isCorrect}
          indicatorSteps={indicatorSteps}
          overrideResult={currentResult}
          isLastQuestion={isLastQuestion}
          onNext={handleNext}
        />
      )}
    </main>
  );
}
