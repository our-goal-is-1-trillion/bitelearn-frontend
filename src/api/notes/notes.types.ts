import type {
  Category,
  QuizInfo,
  Topic,
} from '@/api/learning/learning.types';

// 오답노트 목록 조회
export type GetNotesRequest = {
  category?: Category;
  cursor?: number | null;
};

export type Note = {
  noteId: number;
  chapterId: number;
  chapterSequence: number;
  chapterTitle: string;
  quizId: number;
  category: Category;
  topic: Topic;
  questionTitle: string;
  userAnswer: string;
  correctAnswer: string;
  createdAt: string;
};

export type GetNotesResponse = {
  totalCount: number;
  totalBytes: number;
  notes: Note[];
  nextCursor: number | null;
  hasNext: boolean;
};

// 오답노트 상세 조회
export type IncorrectNoteDetailResponse = {
  totalCount: number;
  totalBytes: number;
  noteId: number;
  chapterId: number;
  createdAt: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  quiz: QuizInfo;
};
