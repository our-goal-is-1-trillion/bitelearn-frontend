import { useMeQuery } from '@/api/auth/auth.query';
import { useDashboardRecommendationsQuery } from '@/api/dashboard/dashboard.query';
import { isAppError } from '@/api/error/appError';
import DashboardArticle from '@/components/features/dashboard/DashboardArticle';
import DashboardTodayRecommendation from '@/components/features/dashboard/DashboardTodayRecommendation';
import GuestHeroSection from '@/components/features/dashboard/GuestHeroSection';
import MemberHeroSection from '@/components/features/dashboard/MemberHeroSection';
import { mockArticles } from '@/mock/article';
import { formatDisplayName } from '@/utils/formatUser';

function HomePage() {
  const { data: user, isSuccess: isMeResolved } = useMeQuery();
  const dashboardRecommendationsQuery = useDashboardRecommendationsQuery(
    isMeResolved && Boolean(user)
  );
  const dashboardRecommendationErrorMessage =
    isAppError(dashboardRecommendationsQuery.error)
      ? dashboardRecommendationsQuery.error.message
      : '추천 학습을 불러오지 못했습니다.';

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <section className="hide-scrollbar flex-1 overflow-y-auto bg-background pb-20 pt-[60px]">
        <div className="mb-8 flex flex-col px-5 pt-5">
          {user ? (
            <MemberHeroSection
              nickname={user.nickname ? formatDisplayName(user.nickname) : null}
              currentLevel={user.level}
              recentLearning={user.recentLearning}
            />
          ) : (
            <GuestHeroSection />
          )}

          {user && (
            <DashboardTodayRecommendation
              recommendations={dashboardRecommendationsQuery.data ?? []}
              isLoading={dashboardRecommendationsQuery.isPending}
              errorMessage={
                dashboardRecommendationsQuery.error
                  ? dashboardRecommendationErrorMessage
                  : null
              }
            />
          )}

          <DashboardArticle articles={mockArticles} />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
