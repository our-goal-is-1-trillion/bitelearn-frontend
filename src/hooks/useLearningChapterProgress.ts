import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  completeLearningVocab,
  submitLearningQuiz,
} from '@/api/learning/learning.api';
import { authQueryKeys } from '@/api/auth/auth.query';
import { learningQueryKeys } from '@/api/learning/learning.query';
import type {
  ChapterLearningResponse,
  ChapterListRequest,
} from '@/api/learning/learning.types';

type UseLearningChapterProgressParams = {
  chapterId: number;
  categoryId?: string;
  topicId?: string;
  categoryCode?: ChapterListRequest['category'];
  topicCode?: ChapterListRequest['topic'];
};

type SubmitLearningQuizParams = {
  quizId: number;
  selectedAnswer: string;
  nextQuizSequence: number | null;
};

// 학습 챕터 진행 상태를 관리하는 커스텀 훅
async function invalidateRoadmapQuery(
  queryClient: QueryClient,
  params: UseLearningChapterProgressParams
) {
  if (!params.categoryId || !params.topicId) {
    return;
  }

  await queryClient.invalidateQueries({
    queryKey: learningQueryKeys.roadmap(params.categoryId, params.topicId),
  });
}

async function invalidateChaptersQuery(
  queryClient: QueryClient,
  params: UseLearningChapterProgressParams
) {
  if (!params.categoryCode || !params.topicCode) {
    return;
  }

  await queryClient.invalidateQueries({
    queryKey: learningQueryKeys.chapters({
      category: params.categoryCode,
      topic: params.topicCode,
    }),
  });
}

async function invalidateLearningProgressQueries(
  queryClient: QueryClient,
  params: UseLearningChapterProgressParams
) {
  await Promise.all([
    invalidateRoadmapQuery(queryClient, params),
    invalidateChaptersQuery(queryClient, params),
    queryClient.invalidateQueries({ queryKey: authQueryKeys.me }),
  ]);
}

// 학습 챕터 진행 상태를 업데이트하는 함수
function updateLearningChapterCache(params: {
  queryClient: QueryClient;
  chapterId: number;
  status: ChapterLearningResponse['currentStatus'];
  resumeQuizSequence?: number | null;
}) {
  const { queryClient, chapterId, status, resumeQuizSequence } = params;

  queryClient.setQueryData(
    learningQueryKeys.chapter(chapterId),
    (prev?: ChapterLearningResponse) =>
      prev
        ? {
            ...prev,
            currentStatus: status,
            resumeQuizSequence:
              status === 'COMPLETED'
                ? null
                : (resumeQuizSequence ?? prev.resumeQuizSequence ?? 1),
          }
        : prev
  );
}

// 학습 챕터 진행 상태를 관리하는 커스텀 훅
export function useLearningChapterProgress(
  params: UseLearningChapterProgressParams
) {
  const queryClient = useQueryClient();

  const completeLearningVocabMutation = useMutation({
    mutationFn: () => completeLearningVocab(params.chapterId),
    onSuccess: async () => {
      updateLearningChapterCache({
        queryClient,
        chapterId: params.chapterId,
        status: 'QUIZ_IN_PROGRESS',
        resumeQuizSequence: 1,
      });

      await invalidateLearningProgressQueries(queryClient, params);
    },
  });

  const submitLearningQuizMutation = useMutation({
    mutationFn: ({ quizId, selectedAnswer }: SubmitLearningQuizParams) =>
      submitLearningQuiz(params.chapterId, quizId, { selectedAnswer }),
    onSuccess: async (result, variables) => {
      if (result.newStatus === 'READY') {
        return;
      }

      updateLearningChapterCache({
        queryClient,
        chapterId: params.chapterId,
        status: result.newStatus,
        resumeQuizSequence:
          result.newStatus === 'COMPLETED' ? null : variables.nextQuizSequence,
      });

      await invalidateLearningProgressQueries(queryClient, params);
    },
  });

  return {
    completeLearningVocab: () => completeLearningVocabMutation.mutateAsync(),
    submitLearningQuiz: (variables: SubmitLearningQuizParams) =>
      submitLearningQuizMutation.mutateAsync(variables),
  };
}
