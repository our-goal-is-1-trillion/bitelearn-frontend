import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ChapterPlayer from '@/components/features/learning/chapter/ChapterPlayer';
import {
  completeLearningVocab,
  getLearningChapterResult,
  submitLearningQuiz,
} from '@/api/learning/learning.api';
import { useLearningChapterQuery } from '@/api/learning/learning.query';
import AppLoading from '@/components/common/AppLoading';
import { getCategoryMetaByRouteId } from '@/constants/learningNavigation';

const LEARNING_CHAPTER_ERROR_MESSAGE =
  '학습 데이터를 불러오지 못했습니다. 다시 시도해 주세요.';

type LearningChapterLocationState = {
  topicId?: string;
  chapterIds?: number[];
};

export default function LearningChapterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId, chapterId } = useParams();
  const category = getCategoryMetaByRouteId(categoryId);
  const chapterIdNumber = Number(chapterId);
  const locationState = (location.state ?? {}) as LearningChapterLocationState;
  const orderedChapterIds = locationState.chapterIds ?? [];
  const currentChapterIndex = orderedChapterIds.findIndex(
    (candidate) => candidate === chapterIdNumber
  );
  const nextChapterId =
    currentChapterIndex >= 0
      ? orderedChapterIds[currentChapterIndex + 1] ?? null
      : null;
  const chapterQuery = useLearningChapterQuery(
    chapterIdNumber,
    Boolean(category && categoryId && chapterId && !Number.isNaN(chapterIdNumber))
  );

  if (!category || !categoryId || !chapterId || Number.isNaN(chapterIdNumber)) {
    return (
      <main className="flex h-dvh items-center justify-center bg-slate-50 p-6">
        <p className="text-sm font-medium text-slate-500">
          존재하지 않는 학습 경로입니다.
        </p>
      </main>
    );
  }

  if (chapterQuery.isPending) {
    return <AppLoading message="학습 데이터를 불러오는 중입니다." />;
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

  return (
    <ChapterPlayer
      chapterTitle={chapterQuery.data.chapterTitle}
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
      onVocabComplete={() => completeLearningVocab(chapterIdNumber)}
      onSubmitQuiz={(quizId, selectedAnswer) =>
        submitLearningQuiz(chapterIdNumber, quizId, { selectedAnswer })
      }
      onFetchResult={() => getLearningChapterResult(chapterIdNumber)}
      onBack={() => navigate(-1)}
      onComplete={() => {
        if (nextChapterId) {
          navigate(`/learning/${category.id}/${nextChapterId}`, {
            replace: true,
            state: locationState,
          });
          return;
        }

        navigate(-1);
      }}
      onRetryWrongAnswers={() => navigate('/notes')}
    />
  );
}
