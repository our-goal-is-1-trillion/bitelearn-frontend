import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import OnboardingModal from '@/components/features/onboarding/OnboardingModal';

function Home() {
  const navigate = useNavigate();

  const DONE_KEY = 'onboarding:done';
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // 온보딩 완료 여부 체크
  useEffect(() => {
    const done = localStorage.getItem(DONE_KEY) === '1';

    if (!done) {
      setIsOnboardingOpen(true);
    }
  }, []);

  // 온보딩 완료 처리
  const handleOnboardingClose = () => {
    localStorage.setItem(DONE_KEY, '1');
    setIsOnboardingOpen(false);
  };

  return (
    <div className="mx-auto h-full w-full p-6">
      <h1 className="text-3xl font-bold">BiteLearn</h1>
      <p className="text-sm text-slate-600">홈 페이지</p>

      <button
        onClick={() => navigate('/learning/word/contract_step2')}
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
      >
        단어 학습 시작
      </button>

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleOnboardingClose}
      />
    </div>
  );
}

export default function Home({ onMoveToChapter, onMoveToLogin }: HomePageProps) {
  return (
    <DashboardHome
      tabs={DASHBOARD_TABS}
      categories={DASHBOARD_CATEGORIES}
      recommendations={DASHBOARD_TODAY_RECOMMENDATIONS}
      onMoveToChapter={onMoveToChapter ?? (() => {})}
      onMoveToLogin={onMoveToLogin ?? (() => {})}
      headerTitle="BiteLearn"
      headerSubtitle="로그인하고 맞춤 학습을 시작해보세요."
      continueHeadline="학습이 처음인 당신을 위해"
      continueCategory="부동산 · 주거"
      continueLessonTitle="전세사기 예방 기초"
      continueMeta="처음 시작 · 약 5분"
    />
  )
}
