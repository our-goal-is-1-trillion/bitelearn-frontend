import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import ChapterPlayer from '@/components/features/learning/chapter/ChapterPlayer';
import { getLearningChapterResult } from '@/api/learning/learning.api';
import {
  useLearningChapterQuery,
  useLearningRoadmapQuery,
} from '@/api/learning/learning.query';
import AppLoading from '@/components/common/AppLoading';
import { useLearningChapterProgress } from '@/hooks/useLearningChapterProgress';
import { getTopicLabel } from '@/constants/learningMeta';
import { getCategoryMetaByRouteId } from '@/constants/learningNavigation';
import {
  CHAPTER_BLOCKED_TOAST_MESSAGE,
  shouldBlockChapterRoute,
  shouldBlockMonthlyRentIntroStart,
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
  const category = getCategoryMetaByRouteId(categoryId);
  const chapterIdNumber = Number(chapterId);
  const locationState = (location.state ?? {}) as LearningChapterLocationState;
  const blockedRouteToastShownRef = useRef(false);

  // 챕터 데이터 쿼리
  const chapterQuery = useLearningChapterQuery(
    chapterIdNumber,
    Boolean(
      category && categoryId && chapterId && !Number.isNaN(chapterIdNumber)
    )
  );

  const resolvedTopic = category?.topics.find(
    (topic) => topic.code === chapterQuery.data?.topic
  );

  // 로드맵 데이터 쿼리 (챕터 접근 제어 및 다음 챕터 정보 확보용)
  const resolvedTopicId = locationState.topicId ?? resolvedTopic?.id;
  const roadmapQuery = useLearningRoadmapQuery(
    category && resolvedTopic
      ? {
          categoryId: category.id,
          categoryCode: category.code,
          topicId: resolvedTopic.id,
          topicCode: resolvedTopic.code,
        }
      : null,
    !locationState.chapterIds?.length || !locationState.chapterSequenceById
  );

  // 챕터 순서 정보 확보 로직
  const fallbackChapters = roadmapQuery.data ?? [];
  const fallbackChapterSequenceById = Object.fromEntries(
    fallbackChapters.map((entry) => [entry.chapterId, entry.sequence])
  ) as Record<number, number>;
  const chapterSequence =
    locationState.chapterSequenceById?.[chapterIdNumber] ??
    locationState.chapterSequence ??
    fallbackChapterSequenceById[chapterIdNumber] ??
    chapterQuery.data?.chapterSequence;
  const canEvaluateBlockedRoute = Boolean(chapterQuery.data && resolvedTopicId);
  const isBlockedChapterRoute = canEvaluateBlockedRoute
    ? shouldBlockChapterRoute(resolvedTopicId)
    : false;
  const shouldBlockIntroStart = shouldBlockMonthlyRentIntroStart({
    topicId: resolvedTopicId,
    chapterSequence,
  });
  const orderedChapterIds = locationState.chapterIds?.length
    ? locationState.chapterIds
    : fallbackChapters.map((entry) => entry.chapterId);
  const currentChapterIndex = orderedChapterIds.findIndex(
    (candidate) => candidate === chapterIdNumber
  );
  const nextChapterId =
    currentChapterIndex >= 0
      ? (orderedChapterIds[currentChapterIndex + 1] ?? null)
      : null;
  const { completeLearningVocab, submitLearningQuiz } =
    useLearningChapterProgress({
      chapterId: chapterIdNumber,
      categoryId: category?.id,
      topicId: resolvedTopicId,
    });

  // 챕터 접근 차단 처리
  useEffect(() => {
    if (
      !category ||
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
    navigate('/learning', { replace: true });
  }, [
    category,
    categoryId,
    chapterId,
    chapterIdNumber,
    isBlockedChapterRoute,
    navigate,
  ]);

  if (!category || !categoryId || !chapterId || Number.isNaN(chapterIdNumber)) {
    return <NotFoundPage />;
  }

  if (chapterQuery.isPending) {
    return <AppLoading message="학습 데이터를 불러오는 중이에요." />;
  }

  if (chapterQuery.error || !chapterQuery.data) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-red-400">
          {chapterQuery.error instanceof Error
            ? chapterQuery.error.message
            : LEARNING_CHAPTER_ERROR_MESSAGE}
        </p>
      </main>
    );
  }

  if (isBlockedChapterRoute) {
    return null;
  }

  const chapterLabel = `${getTopicLabel(chapterQuery.data.topic)} Chapter ${chapterQuery.data.chapterSequence}`;

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
          navigate(`/learning/${category.id}/${nextChapterId}`, {
            replace: true,
            state: {
              ...locationState,
              topicId: resolvedTopicId,
              chapterSequence:
                locationState.chapterSequenceById?.[nextChapterId] ??
                fallbackChapterSequenceById[nextChapterId] ??
                locationState.chapterSequence,
              chapterIds: orderedChapterIds,
              chapterSequenceById:
                locationState.chapterSequenceById ??
                fallbackChapterSequenceById,
            },
          });
          return;
        }

        navigate(-1);
      }}
      onRetryWrongAnswers={() => navigate('/notes')}
    />
  );
}
