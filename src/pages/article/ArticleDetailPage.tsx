import { Check } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { mockArticles } from '@/mock/article';
import { formatDate } from '@/utils/formatDate';
import Footer from '@/components/common/Footer';
import { renderContentBlock } from '@/components/features/article/renderContentBlock';
import ArticleDetailHeader from '@/components/features/article/ArticleDetailHeader';

export default function ArticleDetailPage() {
  const { articleId } = useParams();

  const currentId = articleId ?? mockArticles[0]?.articleId;
  const article = mockArticles.find((item) => item.articleId === currentId);

  if (!article) {
    return (
      <main className="flex h-full flex-1 items-center justify-center bg-slate-50 px-6 text-slate-500">
        아티클을 찾을 수 없습니다.
      </main>
    );
  }

  return (
    <main className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background text-foreground">
      <ArticleDetailHeader
        onBack={() => window.history.back()}
        title={article.title}
        articleId={article.articleId}
      />

      <section className="hide-scrollbar min-h-0 flex-1 overflow-y-auto pt-[60px]">
        <div className="relative aspect-[4/3] w-full bg-slate-100">
          {article.thumbnailUrl ? (
            <img
              src={article.thumbnailUrl}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-50 text-sm font-semibold tracking-[0.2em] text-slate-300">
              ARTICLE
            </div>
          )}
        </div>

        <section className="px-5 pb-5 pt-6">
          <h1 className="word-break-keep text-xl font-bold leading-snug tracking-tight text-foreground">
            {article.title}
          </h1>

          <div className="mt-6 flex items-center justify-between border-y border-slate-100 py-4">
            <div className="flex items-center gap-3">
              {article.author.profileImageUrl ? (
                <img
                  src={article.author.profileImageUrl}
                  alt={article.author.name}
                  className="h-10 w-10 rounded-full border border-slate-100 bg-slate-50 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-sm font-bold text-slate-400">
                  {article.author.name.slice(-2)}
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">
                  {article.author.name}
                </span>
              </div>
            </div>

            <span className="text-xs text-slate-400">
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </section>

        {article.summary && (
          <section className="px-5">
            <div className="rounded-2xl border border-primary-600 bg-primary-50 p-5">
              <h4 className="mb-4 flex items-center gap-1 text-base font-semibold leading-6 text-foreground">
                <span className="flex h-6 w-6 items-center justify-center leading-none">
                  📌
                </span>
                {article.summary.title}
              </h4>

              <ul className="flex flex-col gap-2.5">
                {article.summary.points.map((point, index) => (
                  <li
                    key={index}
                    className="word-break-keep flex items-start gap-2 text-sm leading-6 text-foreground"
                  >
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06)]">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="px-5 py-6">
          {(article.contentBlocks ?? []).map((block, index) =>
            renderContentBlock(block, index)
          )}
        </section>

        {(article.tags?.length ?? 0) > 0 && (
          <section className="px-5 pb-8 pt-2">
            <div className="flex flex-wrap gap-2">
              {article.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="cursor-pointer rounded-full bg-slate-100 px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        )}
      </section>

      <Footer
        onClick={() => {}}
        disabled
        containerClassName="border-t border-slate-100 bg-white/95 pb-4 backdrop-blur-md"
      >
        서비스 준비 중이에요
      </Footer>
    </main>
  );
}
