import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import OnboardingModal from '@/components/features/onboarding/OnboardingModal';

export default function Home() {
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
