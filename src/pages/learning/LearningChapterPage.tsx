import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { isAppError } from '@/api/error/appError';
import ChapterPlayer from '@/components/features/learning/chapter/ChapterPlayer';
import { getLearningChapterResult } from '@/api/learning/learning.api';
import AppLoading from '@/components/common/AppLoading';
import { useLearningChapterProgress } from '@/hooks/useLearningChapterProgress';
import { useResolvedLearningChapterRoute } from '@/hooks/useResolvedLearningChapterRoute';
import {
  CHAPTER_BLOCKED_TOAST_MESSAGE,
} from '@/lib/learningAccess';
import NotFoundPage from '@/pages/NotFoundPage';

const LEARNING_CHAPTER_ERROR_MESSAGE =
  '학습 데이터를 불러오지 못했습니다. 다시 시도해 주세요.';

type LearningChapterLocationState = {
  topicId?: string;
  chapterSequence?: number;
  chapterIds?: number[];
  chapterSequenceById?: Record<number, number>;
};

export default function LearningChapterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId, chapterId } = useParams();
  const locationState = (location.state ?? {}) as LearningChapterLocationState;
  const blockedRouteToastShownRef = useRef(false);
  const {
    routeCategory,
    chapterIdNumber,
    chapterQuery,
    resolvedTopicId,
    resolvedTopicCode,
    resolvedTopicName,
    isBlockedChapterRoute,
    shouldBlockIntroStart,
    nextChapterId,
    nextChapterNavigationState,
  } = useResolvedLearningChapterRoute({
    categoryId,
    chapterId,
    locationState,
  });
  const { completeLearningVocab, submitLearningQuiz } =
    useLearningChapterProgress({
      chapterId: chapterIdNumber,
      categoryId: routeCategory?.id,
      topicId: resolvedTopicId,
      categoryCode: routeCategory?.code,
      topicCode: resolvedTopicCode,
    });

  // 챕터 접근 차단 처리
  useEffect(() => {
    if (
      !routeCategory ||
      !categoryId ||
      !chapterId ||
      Number.isNaN(chapterIdNumber)
    ) {
      return;
    }

    if (!isBlockedChapterRoute) {
      return;
    }

    if (blockedRouteToastShownRef.current) {
      return;
    }

    blockedRouteToastShownRef.current = true;
    toast.info(CHAPTER_BLOCKED_TOAST_MESSAGE);
    navigate(
      resolvedTopicId
        ? `/learning/${routeCategory.id}/topics/${resolvedTopicId}`
        : '/learning',
      { replace: true }
    );
  }, [
    routeCategory,
    categoryId,
    chapterId,
    chapterIdNumber,
    isBlockedChapterRoute,
    navigate,
    resolvedTopicId,
  ]);

  if (!routeCategory || !categoryId || !chapterId || Number.isNaN(chapterIdNumber)) {
    return <NotFoundPage />;
  }

  if (chapterQuery.isPending) {
    return <AppLoading message="학습 데이터를 불러오는 중이에요." />;
  }

  if (chapterQuery.error || !chapterQuery.data) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-red-400">
          {isAppError(chapterQuery.error)
            ? chapterQuery.error.message
            : LEARNING_CHAPTER_ERROR_MESSAGE}
        </p>
      </main>
    );
  }

  if (isBlockedChapterRoute) {
    return null;
  }

  const chapterLabel = `${resolvedTopicName} Chapter ${chapterQuery.data.chapterSequence}`;

  return (
    <ChapterPlayer
      chapterTitle={chapterQuery.data.chapterTitle}
      chapterLabel={chapterLabel}
      vocabs={chapterQuery.data.vocabs}
      quizzes={chapterQuery.data.quizzes}
      chapterIntro={{
        prologueSubtitle: chapterQuery.data.prologueSubtitle,
        goal: chapterQuery.data.currentGoal,
        prologueContent: chapterQuery.data.prologueContent,
        closingMessage: chapterQuery.data.closingMessage,
        coreKeywords: chapterQuery.data.coreKeywords,
      }}
      initialStatus={chapterQuery.data.currentStatus}
      initialQuizSequence={chapterQuery.data.resumeQuizSequence}
      blockedIntroStartMessage={CHAPTER_BLOCKED_TOAST_MESSAGE}
      shouldBlockIntroStart={shouldBlockIntroStart}
      onVocabComplete={completeLearningVocab}
      onSubmitQuiz={(quizId, selectedAnswer, nextQuizSequence) =>
        submitLearningQuiz({
          quizId,
          selectedAnswer,
          nextQuizSequence,
        })
      }
      onFetchResult={() => getLearningChapterResult(chapterIdNumber)}
      onBack={() => navigate(-1)}
      onComplete={() => {
        if (nextChapterId) {
          navigate(`/learning/${routeCategory.id}/${nextChapterId}`, {
            replace: true,
            state: nextChapterNavigationState ?? undefined,
          });
          return;
        }

        navigate(-1);
      }}
      onRetryWrongAnswers={() => navigate('/notes')}
    />
  );
}
