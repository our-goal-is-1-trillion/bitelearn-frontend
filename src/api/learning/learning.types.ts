// 챕터 학습 진행 상태
export type ChapterStatus = 'READY' | 'QUIZ_IN_PROGRESS' | 'COMPLETED';

// 퀴즈 유형
export type QuizType =
  | 'TEXT_MCQ'
  | 'DOC_CLICK'
  | 'DOC_MCQ'
  | 'DIALOGUE_MCQ'
  | 'DIALOGUE_OX';

// 카테고리 / 토픽
export type Category =
  | 'REAL_ESTATE_HOUSING'
  | 'LIVING_FINANCE_EMPLOYMENT'
  | 'CAREER_TAX'
  | 'ASSET_MANAGEMENT_INVESTMENT';
export type Topic =
  | 'JEONSE'
  | 'MONTHLY_RENT'
  | 'BUYING'
  | 'INCOME_EXPENDITURE'
  | 'CREDIT_LIABILITIES'
  | 'WORK_WELFARE'
  | 'SALARY_REAL_INCOME'
  | 'INCOME_TAX_DEDUCTION'
  | 'COMPREHENSIVE_INCOME_TAX'
  | 'STOCK'
  | 'BOND_DEPOSIT'
  | 'ANNUITY';

export type LearningTopicDto = {
  topicCode: Topic;
  topicName: string;
};

export type LearningCategoryDto = {
  categoryCode: Category;
  categoryName: string;
  topics: LearningTopicDto[];
};

export type LearningCategoriesResponse = LearningCategoryDto[];

// 챕터 목록 조회
export type ChapterListRequest = {
  category: Category;
  topic: Topic;
};

export type ChapterListResponse = {
  chapters: ChapterSummaryDto[];
};

// 챕터 목록 아이템
export type ChapterSummaryDto = {
  chapterId: number;
  title: string;
  sequence: number;
  status: ChapterStatus;
  // FE 로드맵 UI 확장 필드 (백엔드 응답에는 없음)
  isLocked?: boolean;
};

// 단어 정보
export type VocabInfo = {
  id: number;
  frontMain: string;
  frontSub?: string;
  frontImageUrl?: string | null;
  backMain: string;
  backSub?: string;
};

// 퀴즈 정보
export type QuizInfo = {
  quizId: number;
  sequence: number;
  type: QuizType;
  passageTitle?: string | null;
  passageContent?: string | null;
  questionImageUrl?: string | null;
  questionTitle: string;
  specificData?: SpecificDataInfo | null;
};

// 단일 챕터 학습 데이터
export type ChapterLearningResponse = {
  chapterId: number;
  chapterSequence: number;
  category: string;
  topic: string;
  chapterTitle: string;
  prologueSubtitle: string;
  prologueContent: string;
  currentGoal: string;
  closingMessage: string | null;
  coreKeywords: string[];
  currentStatus: ChapterStatus;
  resumeQuizSequence: number | null;
  vocabs: VocabInfo[];
  quizzes: QuizInfo[];
};

// 대화형 지문 정보
export type DialogueInfo = {
  speaker: string;
  message: string;
};

// 문서 다지선다형 보기 요소
export type DocumentElementInfo = {
  key: string;
  value: string;
};

// 퀴즈 추가 데이터
export type SpecificDataInfo = {
  options: string[];
  dialogues: DialogueInfo[];
  documentElements: DocumentElementInfo[];
  documentTitle?: string | null;
  documentSubtitle?: string | null;
};

// 퀴즈 정답 제출
export type QuizSubmitRequest = {
  selectedAnswer: string;
};

export type QuizSubmitResponse = {
  correct: boolean;
  correctAnswer: string;
  explanation: string;
  newStatus: ChapterStatus;
};

// 챕터 최종 결과
export type ChapterResultResponse = {
  correctCount: number;
  totalCount: number;
  accuracyRate: number;
  earnedBytes: number;
  lostBytes: number;
  currentLevel: number;
  currentTotalBytes: number;
};
