import type { Category, Topic } from '@/api/learning/learning.types';

// 회원가입
export type SignupRequest = {
  email: string;
  password: string;
  nickname: string;
};

export type SignupResponse = {
  userId: number;
  email: string;
  nickname: string;
};

// 로그인
export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  grantType: string;
  accessToken: string;
  accessTokenExpiresIn: number;
};

// 토큰 재발급
export type RefreshResponse = {
  grantType: string;
  accessToken: string;
  accessTokenExpiresIn: number;
};

export type ProviderType = 'LOCAL' | 'NAVER' | 'GOOGLE';

export type RecentLearningResponse = {
  categoryCode: Category;
  categoryName: string;
  topicCode: Topic;
  topicName: string;
  chapterTitle: string;
  chapterId: number;
  progressRate: number;
};

// 사용자 정보 조회
export type MeResponse = {
  id: number;
  email: string;
  nickname: string;
  providerType: ProviderType;
  isOnboardingCompleted: boolean;
  level: number;
  totalBytes: number;
  recentLearning: RecentLearningResponse | null;
};

// 사용자 닉네임 수정
export type UpdateNicknameRequest = {
  nickname: string;
};
