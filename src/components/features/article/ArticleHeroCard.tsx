import { ArrowRight } from 'lucide-react';

import TextBadge from '@/components/common/TextBadge';
import { Button } from '@/components/ui/button';
import ArticleThumb from '@/components/features/article/ArticleThumb';
import type { ArticleDetail, ArticleListItem } from '@/mock/article';
import { formatDate } from '@/utils/formatDate';

type ArticleHeroCardProps = {
  article: ArticleListItem | ArticleDetail;
  onSelect: () => void;
};

function getAuthorName(article: ArticleListItem | ArticleDetail) {
  return 'authorName' in article ? article.authorName : article.author.name;
}

export default function ArticleHeroCard({
  article,
  onSelect,
}: ArticleHeroCardProps) {
  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-slate-100 bg-white shadow-[0_20px_25px_-5px_rgba(226,232,240,0.3),0_8px_10px_-6px_rgba(226,232,240,0.3)] transition-all duration-200 hover:border-primary/40 active:scale-[0.98]"
      onClick={onSelect}
    >
      <div className="h-[220px] w-full overflow-hidden bg-slate-100">
        {article.thumbnailUrl ? (
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <ArticleThumb />
        )}
      </div>

      <div className="flex flex-col gap-3 px-7 py-6">
        <div className="flex items-center justify-between">
          <TextBadge variant="primary">추천 콘텐츠</TextBadge>

          <span className="text-sm font-medium leading-5 text-slate-400">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <h2 className="line-clamp-3 min-h-[84px] break-keep text-lg font-semibold leading-7 text-foreground">
          {article.title}
        </h2>

        <div className="flex items-center justify-between border-t border-slate-50 pt-6">
          <p className="text-sm font-medium text-slate-500">
            {getAuthorName(article)} 에디터
          </p>

          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="h-11 w-11 rounded-full bg-slate-100 text-slate-500 shadow-none transition-all group-hover:bg-primary group-hover:text-foreground"
          >
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </article>
  );
}
