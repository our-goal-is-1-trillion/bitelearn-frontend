import apiClient from '@/api/auth/axios';
import type {
  ChapterLearningResponse,
  ChapterListRequest,
  ChapterListResponse,
  LearningCategoriesResponse,
  ChapterResultResponse,
  QuizSubmitRequest,
  QuizSubmitResponse,
} from './learning.types';

// 학습 카테고리 / 주제 목록 조회
export async function getLearningCategories(): Promise<LearningCategoriesResponse> {
  const response =
    await apiClient.get<LearningCategoriesResponse>('/learning/categories');

  return Array.isArray(response.data) ? response.data : [];
}

// 학습 챕터 목록 조회
export async function getLearningChapters(
  params: ChapterListRequest
): Promise<ChapterListResponse> {
  const response = await apiClient.get<ChapterListResponse>(
    '/learning/chapters',
    {
      params,
    }
  );
  return {
    chapters: Array.isArray(response.data?.chapters) ? response.data.chapters : [],
  };
}

// 학습 챕터 상세 조회
export async function getLearningChapter(
  chapterId: number
): Promise<ChapterLearningResponse> {
  const response = await apiClient.get<ChapterLearningResponse>(
    `/learning/chapters/${chapterId}`
  );
  return response.data;
}

// 단어 학습 완료 처리
export async function completeLearningVocab(chapterId: number) {
  await apiClient.post(`/learning/chapters/${chapterId}/vocab-complete`);
}

// 퀴즈 제출
export async function submitLearningQuiz(
  chapterId: number,
  quizId: number,
  data: QuizSubmitRequest
): Promise<QuizSubmitResponse> {
  const response = await apiClient.post<QuizSubmitResponse>(
    `/learning/chapters/${chapterId}/quizzes/${quizId}`,
    data
  );
  return response.data;
}

// 챕터 학습 결과 조회
export async function getLearningChapterResult(
  chapterId: number
): Promise<ChapterResultResponse> {
  const response = await apiClient.get<ChapterResultResponse>(
    `/learning/chapters/${chapterId}/result`
  );
  return response.data;
}
