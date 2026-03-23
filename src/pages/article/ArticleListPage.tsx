import { useNavigate } from 'react-router-dom';

import ArticleCard from '@/components/features/article/ArticleCard';
import ArticleHeroCard from '@/components/features/article/ArticleHeroCard';
import { mockArticleCards } from '@/mock/article';

export default function ArticleListPage() {
  const navigate = useNavigate();
  const articles = mockArticleCards;

  const [heroArticle, ...otherArticles] = articles;

  const handleSelectArticle = (articleId: string) => {
    navigate(`/articles/${articleId}`);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background pt-[60px] text-foreground">
      <section className="hide-scrollbar flex-1 overflow-y-auto px-5 pb-32 pt-5">
        <div className="flex flex-col gap-5">
          <div className="pb-5">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              아티클
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-400">
              든든하게 채우는 알찬 꿀팁
            </p>
          </div>

          <div>
            {heroArticle && (
              <ArticleHeroCard
                article={heroArticle}
                onSelect={() => handleSelectArticle(heroArticle.articleId)}
              />
            )}

            {otherArticles.length > 0 && (
              <div className="mt-5 flex flex-col gap-5">
                {otherArticles.map((article) => (
                  <ArticleCard
                    key={article.articleId}
                    article={article}
                    variant="article"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 px-10 pb-10 text-center">
          <p className="text-xs font-bold leading-relaxed text-slate-300">
            새로운 지식이 매주 업데이트되고 있어요
          </p>
        </div>
      </section>
    </div>
  );
}
