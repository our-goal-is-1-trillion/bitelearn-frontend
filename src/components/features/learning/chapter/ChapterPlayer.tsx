import { useMemo, useState } from 'react';

import QuizPlayer from '@/components/features/learning/quiz/QuizPlayer';
import ChapterDone from './ChapterDone';
import ChapterResult from './ChapterResult';
import ChapterIntro from './ChapterIntro';
import VocabDone from '../vocab/VocabDone';

import type {
  QuizMetric,
  StepIndicatorInfo,
} from '@/components/features/learning/quiz/quiz.types';
import VocabCardsPlayer from '../vocab/VocabCardsPlayer';
import type {
  ChapterResultResponse,
  ChapterStatus,
  QuizInfo,
  QuizSubmitResponse,
  VocabInfo,
} from '@/api/learning/learning.types';
import { isAppError } from '@/api/error/appError';
import { CHAPTER_BLOCKED_TOAST_MESSAGE } from '@/lib/learningAccess';
import { logError } from '@/lib/logError';
import { toast } from 'sonner';

type ChapterPhase =
  | 'intro'
  | 'vocabs'
  | 'vocab_done'
  | 'quiz'
  | 'done'
  | 'final';

type ChapterIntroData = {
  prologueSubtitle: string;
  goal: string;
  prologueContent: string;
  closingMessage?: string | null;
  coreKeywords: string[];
};

type ChapterPlayerProps = {
  chapterTitle: string;
  chapterLabel?: string;
  vocabs: VocabInfo[];
  quizzes: QuizInfo[];
  chapterIntro: ChapterIntroData;
  initialStatus?: ChapterStatus;
  initialQuizSequence?: number | null;
  shouldBlockIntroStart?: boolean;
  blockedIntroStartMessage?: string;
  onVocabComplete?: () => Promise<void>;
  onSubmitQuiz: (
    quizId: number,
    selectedAnswer: string
  ) => Promise<QuizSubmitResponse>;
  onFetchResult: () => Promise<ChapterResultResponse>;
  onComplete: (total: number, correct: number) => void;
  onRetryWrongAnswers?: () => void;
  onBack: () => void;
};

export default function ChapterPlayer({
  chapterTitle,
  chapterLabel,
  vocabs,
  quizzes,
  chapterIntro,
  initialStatus = 'READY',
  initialQuizSequence = null,
  shouldBlockIntroStart = false,
  blockedIntroStartMessage = CHAPTER_BLOCKED_TOAST_MESSAGE,
  onVocabComplete,
  onSubmitQuiz,
  onFetchResult,
  onComplete,
  onRetryWrongAnswers,
  onBack,
}: ChapterPlayerProps) {
  const initialPhase: ChapterPhase = 'intro';
  const isQuizInProgress = initialStatus === 'QUIZ_IN_PROGRESS';
  const chapterIntroMode =
    initialStatus === 'COMPLETED'
      ? 'retry'
      : isQuizInProgress
        ? 'resume'
        : 'start';

  const [chapterPhase, setChapterPhase] = useState<ChapterPhase>(initialPhase);
  const [quizResult, setQuizResult] = useState<ChapterResultResponse | null>(
    null
  );
  const [vocabIdx, setVocabIdx] = useState(0);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(
    isQuizInProgress && initialQuizSequence && initialQuizSequence > 0
      ? initialQuizSequence - 1
      : 0
  );
  const [quizMetrics, setQuizMetrics] = useState<QuizMetric[]>(
    Array(quizzes.length).fill('none')
  );

  // 챕터 결과 조회 및 챕터 완료 처리 준비
  const prepareQuizCompletion = async () => {
    try {
      const result = await onFetchResult();
      setQuizResult(result);
      return true;
    } catch (error) {
      logError('ChapterPlayer', '챕터 결과 조회 실패', error);
      toast.error(
        isAppError(error)
          ? error.message
          : '챕터 결과를 불러오지 못했습니다. 다시 시도해 주세요.'
      );
      return false;
    }
  };

  // 챕터 완료 처리
  const handleQuizComplete = () => {
    if (quizResult) {
      setChapterPhase('done');
      return;
    }

    // 결과가 없는 경우, 챕터 완료 처리 준비부터 시작
    prepareQuizCompletion().then((result) => {
      if (result) {
        setChapterPhase('done');
      }
    });
  };

  // 퀴즈 답안 제출 핸들러
  const submitQuizAnswer = async (
    question: QuizInfo,
    selectedAnswerIndex: number
  ) => {
    const selectedAnswer =
      question.type === 'DOC_CLICK'
        ? (question.specificData?.documentElements?.[selectedAnswerIndex]
            ?.key ??
          question.specificData?.options?.[selectedAnswerIndex] ??
          '')
        : (question.specificData?.options?.[selectedAnswerIndex] ?? '');

    if (typeof selectedAnswer !== 'string' || selectedAnswer.trim() === '') {
      throw new Error('퀴즈 제출에 필요한 데이터가 올바르지 않습니다.');
    }

    return onSubmitQuiz(question.quizId, selectedAnswer);
  };

  // 단어 학습 단계 표시 정보 계산
  const vocabIndicatorSteps: StepIndicatorInfo[] = useMemo(
    () =>
      vocabs.map((_, idx) => ({
        type: 'vocab',
        status: 'none',
        isCurrent: chapterPhase === 'vocabs' && idx === vocabIdx,
      })),
    [vocabs, chapterPhase, vocabIdx]
  );

  // 퀴즈 단계 표시 정보 계산
  const quizIndicatorSteps: StepIndicatorInfo[] = useMemo(
    () =>
      quizzes.map((_, idx) => ({
        type: 'quiz',
        status: chapterPhase === 'vocabs' ? 'none' : quizMetrics[idx],
        isCurrent: chapterPhase === 'quiz' && idx === quizCurrentIndex,
      })),
    [quizzes, chapterPhase, quizMetrics, quizCurrentIndex]
  );

  if (chapterPhase === 'final' && quizResult) {
    return (
      <ChapterResult
        correct={quizResult.correctCount}
        total={quizResult.totalCount}
        accuracyRate={quizResult.accuracyRate}
        earnedBytes={quizResult.earnedBytes}
        lostBytes={quizResult.lostBytes}
        currentLevel={quizResult.currentLevel}
        currentTotalBytes={quizResult.currentTotalBytes}
        chapterTitle={chapterTitle}
        onBack={onBack}
        onFinish={() =>
          onComplete(quizResult.totalCount, quizResult.correctCount)
        }
        onRetryWrongAnswers={onRetryWrongAnswers}
      />
    );
  }

  if (chapterPhase === 'done' && quizResult) {
    return (
      <ChapterDone
        correct={quizResult.correctCount}
        total={quizResult.totalCount}
        accuracyRate={quizResult.accuracyRate}
        chapterTitle={chapterTitle}
        closingMessage={chapterIntro.closingMessage}
        onFinish={() => setChapterPhase('final')}
        onClose={onBack}
      />
    );
  }

  if (chapterPhase === 'quiz') {
    return (
      <QuizPlayer
        questions={quizzes}
        chapterTitle={chapterTitle}
        onBack={onBack}
        onPrepareCompletion={prepareQuizCompletion}
        onComplete={handleQuizComplete}
        indicatorSteps={quizIndicatorSteps}
        onCurrentIndexChange={setQuizCurrentIndex}
        onMetricsChange={setQuizMetrics}
        startIndex={quizCurrentIndex}
        onSubmitAnswer={submitQuizAnswer}
      />
    );
  }

  if (chapterPhase === 'intro') {
    return (
      <ChapterIntro
        chapterTitle={chapterTitle}
        chapterLabel={chapterLabel}
        prologueSubtitle={chapterIntro.prologueSubtitle}
        chapterGoal={chapterIntro.goal}
        prologueContent={chapterIntro.prologueContent}
        coreKeywords={chapterIntro.coreKeywords}
        introMode={chapterIntroMode}
        onBack={onBack}
        onStart={() => {
          if (shouldBlockIntroStart) {
            toast.info(blockedIntroStartMessage);
            return;
          }

          if (isQuizInProgress) {
            setChapterPhase('quiz');
            return;
          }

          if (vocabs.length > 0) {
            setChapterPhase('vocabs');
            return;
          }

          setChapterPhase('quiz');
        }}
      />
    );
  }

  if (chapterPhase === 'vocab_done') {
    return (
      <VocabDone
        chapterTitle={chapterTitle}
        onClose={onBack}
        onStartQuiz={() => setChapterPhase('quiz')}
      />
    );
  }

  return (
    <VocabCardsPlayer
      chapterTitle={chapterTitle}
      vocabs={vocabs}
      vocabIdx={vocabIdx}
      onVocabIdxChange={setVocabIdx}
      onComplete={async () => {
        if (onVocabComplete) {
          try {
            await onVocabComplete();
          } catch (error) {
            logError('ChapterPlayer', '단어 학습 완료 처리 실패', error);
            toast.error(
              isAppError(error)
                ? error.message
                : '단어 학습 완료 처리에 실패했습니다. 다시 시도해 주세요.'
            );
            return;
          }
        }

        setChapterPhase('vocab_done');
      }}
      onBack={onBack}
      indicatorSteps={vocabIndicatorSteps}
    />
  );
}
