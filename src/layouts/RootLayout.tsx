import { Outlet } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import OnboardingModal from '@/components/features/onboarding/OnboardingModal';
import { completeOnboarding } from '@/api/auth/auth.api';
import { authQueryKeys, useMeQuery } from '@/api/auth/auth.query';
import { Toaster } from '@/components/ui/sonner';
import { logError } from '@/lib/logError';
import SeoHead from '@/components/common/SeoHead';

export default function RootLayout() {
  const queryClient = useQueryClient();
  const { data: user } = useMeQuery();
  const completeOnboardingMutation = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me,
      });
    },
  });

  const isOnboardingOpen = !!user && !user.isOnboardingCompleted;

  const handleCompleteOnboarding = async () => {
    try {
      await completeOnboardingMutation.mutateAsync();
    } catch (error) {
      logError('RootLayout', '온보딩 완료 처리 실패', error);
    }
  };

  return (
    <div className="h-dvh bg-white">
      <SeoHead />

      <div className="mx-auto flex h-full w-full max-w-screen-sm flex-col">
        <Outlet />

        {isOnboardingOpen ? (
          <OnboardingModal
            key={`onboarding-${user.id}`}
            isOpen
            onClose={handleCompleteOnboarding}
          />
        ) : null}

        <Toaster position="top-center" />
      </div>
    </div>
  );
}
