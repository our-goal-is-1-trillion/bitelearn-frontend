import { queryClient } from '@/lib/queryClient';
import { authQueryKeys } from './auth.query';
import { clearAccessToken } from './tokenStore';

const LOGOUT_REDIRECT_SESSION_KEY = 'post-logout-redirect';

// 로그아웃 시 세션 정리 (토큰 삭제, 사용자 정보 초기화)
export function clearAuthSession() {
  clearAccessToken();
  queryClient.setQueryData(authQueryKeys.me, null);
}

// 로그아웃 후 홈으로 리다이렉트 플래그 설정 및 해제 함수
export function markLogoutRedirect() {
  sessionStorage.setItem(LOGOUT_REDIRECT_SESSION_KEY, 'true');
}

// 로그아웃 후 홈으로 리다이렉트 플래그 소비 함수 (소비 후 플래그 제거)
export function consumeLogoutRedirect() {
  const shouldRedirectHome =
    sessionStorage.getItem(LOGOUT_REDIRECT_SESSION_KEY) === 'true';

  if (shouldRedirectHome) {
    sessionStorage.removeItem(LOGOUT_REDIRECT_SESSION_KEY);
  }

  return shouldRedirectHome;
}
