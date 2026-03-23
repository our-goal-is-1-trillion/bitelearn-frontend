import type { RecentLearningResponse } from '@/api/auth/auth.types';
import DashboardHero from './DashboardHero';
import MemberContinueLearningCard from './MemberContinueLearningCard';

type MemberHeroSectionProps = {
  nickname?: string | null;
  currentLevel: number;
  recentLearning?: RecentLearningResponse | null;
};

export default function MemberHeroSection({
  nickname,
  currentLevel,
  recentLearning,
}: MemberHeroSectionProps) {
  return (
    <div className="flex flex-col">
      <DashboardHero
        variant="member"
        nickname={nickname}
        currentLevel={currentLevel}
        levelBadgeLabel="레벨 배지"
      />

      {recentLearning && recentLearning.progressRate < 100 ? (
        <MemberContinueLearningCard recentLearning={recentLearning} />
      ) : null}
    </div>
  );
}
