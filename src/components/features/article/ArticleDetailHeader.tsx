import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import useShareArticle from '@/hooks/useShareArticle';
import { ArrowLeft, Bookmark, Copy, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ArticleDetailHeaderProps = {
  onBack: () => void;
  title: string;
  articleId: string;
  sharePopoverOpen?: boolean;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
};

export default function ArticleDetailHeader({
  onBack,
  title,
  articleId,
  sharePopoverOpen,
  isBookmarked = false,
  onToggleBookmark,
}: ArticleDetailHeaderProps) {
  const shareUrl = `${window.location.origin}/articles/${articleId}`;

  const { handleCopyLink, handleSystemShare } = useShareArticle({
    title,
    url: shareUrl,
  });

  const canUseWebShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <header className="fixed left-1/2 top-0 z-40 flex h-[60px] w-full max-w-screen-sm -translate-x-1/2 items-center justify-between bg-white px-1.5">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="이전"
        onClick={onBack}
        className="size-11 rounded-xl"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <div className="flex items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={isBookmarked ? '북마크 해제' : '북마크'}
          aria-pressed={isBookmarked}
          onClick={onToggleBookmark}
          className="size-11 rounded-xl"
        >
          <Bookmark
            className={cn(
              'h-6 w-6',
              isBookmarked && 'fill-current text-primary'
            )}
          />
        </Button>

        <Popover open={sharePopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="아티클 공유"
              className="size-11 rounded-xl"
            >
              <Share2 className="h-6 w-6" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="w-80 rounded-2xl border border-slate-200 p-4 shadow-lg"
          >
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-50 px-3 py-2">
                <p className="truncate text-xs text-slate-600">{shareUrl}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <Copy className="h-4 w-4" />
                  링크 복사
                </button>

                <button
                  type="button"
                  onClick={handleSystemShare}
                  disabled={!canUseWebShare}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                  <Share2 className="h-4 w-4" />
                  공유하기
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
