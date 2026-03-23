import { useNavigate } from 'react-router-dom';
import { logout } from '@/api/auth/auth.api';
import { clearAuthSession, markLogoutRedirect } from '@/api/auth/authSession';
import MyBadgeSummaryCard from '@/components/features/mypage/MyBadgeSummaryCard';
import MyPageOverviewSection from '@/components/features/mypage/MyPageOverviewSection';
import { useMeQuery } from '@/api/auth/auth.query';
import {
  PRIVACY_TERMS_URL,
  SERVICE_TERMS_URL,
} from '@/constants/terms';
import { logError } from '@/lib/logError';
import { formatDisplayName } from '@/utils/formatUser';

export default function MyPage() {
  const navigate = useNavigate();
  const { data: user } = useMeQuery();

  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      logError('MyPage', '로그아웃 요청 실패', error);
    } finally {
      markLogoutRedirect();
      clearAuthSession();
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      <section className="hide-scrollbar flex-1 overflow-y-auto pt-[60px]">
        <div className="flex min-h-full flex-col">
          <div className="shrink-0 bg-background px-5 pb-8 pt-5">
            <div className="flex flex-col gap-5">
              <div className="text-2xl font-semibold leading-9 text-foreground">
                {formatDisplayName(user?.nickname)}님
              </div>
              <MyBadgeSummaryCard
                currentLevel={user?.level}
                currentBytes={user?.totalBytes ?? 0}
              />
            </div>
          </div>

          <div className="flex-1 pb-14">
            <MyPageOverviewSection
              email={user?.email ?? ''}
              providerType={user?.providerType}
              version="1.1.1"
              onNicknameClick={() => navigate('/mypage/nickname')}
              onTermsClick={() => openExternalLink(SERVICE_TERMS_URL)}
              onPrivacyClick={() => openExternalLink(PRIVACY_TERMS_URL)}
              onLogoutClick={handleLogout}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
