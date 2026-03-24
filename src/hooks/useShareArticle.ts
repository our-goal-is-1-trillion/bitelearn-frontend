import { toast } from 'sonner';
import { logError } from '@/lib/logError';

type UseShareArticleParams = {
  title: string;
  url?: string;
};

export default function useShareArticle({
  title,
  url = window.location.href,
}: UseShareArticleParams) {
  // 시스템 공유
  const handleSystemShare = async () => {
    try {
      if (!navigator.share) {
        throw new Error('SHARE_UNSUPPORTED');
      }

      await navigator.share({
        title,
        url,
      });
    } catch (error) {
      // 시스템 공유 취소(AbortError)는 에러 토스트 없이 처리
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      logError('useShareArticle', '시스템 공유 실패', error);
      toast.error('공유를 지원하지 않는 브라우저이거나 공유에 실패했습니다');
    }
  };

  // 클립보드 복사
  const handleCopyLink = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('CLIPBOARD_UNSUPPORTED');
      }

      await navigator.clipboard.writeText(url);
      toast.success('링크가 복사되었습니다');
    } catch (error) {
      logError('useShareArticle', '링크 복사 실패', error);
      toast.error('링크 복사에 실패했습니다');
    }
  };
  return {
    handleCopyLink,
    handleSystemShare,
  };
}
