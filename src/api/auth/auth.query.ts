import { useQuery } from '@tanstack/react-query';
import { getMe } from './auth.api';
import { ensureValidAccessToken } from './authRefresh';
import type { MeResponse } from './auth.types';

const ME_STALE_TIME_MS = 1000 * 60;

export const authQueryKeys = {
  me: ['auth', 'me'] as const,
};

export async function fetchMe(): Promise<MeResponse | null> {
  const accessToken = await ensureValidAccessToken();

  if (!accessToken) {
    return null;
  }

  try {
    return await getMe();
  } catch {
    return null;
  }
}

export function useMeQuery() {
  return useQuery({
    queryKey: authQueryKeys.me,
    queryFn: fetchMe,
    retry: false,
    staleTime: ME_STALE_TIME_MS,
  });
}
