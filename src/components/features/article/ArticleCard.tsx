import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';
import type { ArticleCardItem, ArticleDetail } from '@/mock/article';

type ArticleCardProps = {
  article: ArticleCardItem | ArticleDetail;
  variant?: 'article' | 'home';
};

function getAuthorName(article: ArticleCardItem | ArticleDetail) {
  return 'authorName' in article ? article.authorName : article.author.name;
}

export default function ArticleCard({
  article,
  variant = 'article',
}: ArticleCardProps) {
  return (
    <Link
      to={`/articles/${article.articleId}`}
      className={
        variant === 'home'
          ? 'group flex h-auto w-full flex-col items-start overflow-hidden rounded-3xl border-none bg-white p-0 text-left shadow-[0_12px_16px_rgba(237,238,246,1)] transition-all active:scale-[0.98]'
          : 'group flex h-auto w-full flex-col items-start overflow-hidden rounded-2xl border-2 border-slate-100 bg-white p-0 text-left shadow-none transition-colors hover:border-slate-200 active:scale-[0.98]'
      }
    >
      <div className="flex w-full items-start gap-4 px-4 pt-4">
        <h3 className="line-clamp-3 flex-1 whitespace-normal break-keep text-base font-medium leading-6 text-foreground">
          {article.title}
        </h3>

        <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-300">
          {article.thumbnailUrl ? (
            <img
              src={article.thumbnailUrl}
              className="h-full w-full object-cover"
              alt=""
            />
          ) : (
            <FileText size={24} className="text-white/80" />
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-4 py-4">
        <span className="text-sm font-base leading-5 text-slate-600">
          {getAuthorName(article)}
        </span>
        <span className="text-sm font-base leading-5 text-slate-400">
          {formatDate(article.publishedAt)}
        </span>
      </div>
    </Link>
  );
}
