import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AppLoading from '@/components/common/AppLoading';
import { useMeQuery } from '@/api/auth/auth.query';

export default function ProtectedRoute() {
  const { data: user, isPending } = useMeQuery();
  const location = useLocation();

  if (isPending) {
    return <AppLoading message="인증 정보를 확인하는 중..." />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, reason: 'auth-required' }}
      />
    );
  }

  return <Outlet />;
}
