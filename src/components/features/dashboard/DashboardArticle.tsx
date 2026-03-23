import ArticleCard from '@/components/features/article/ArticleCard';
import type { ArticleDetail } from '@/mock/article';

type DashboardArticleProps = {
  articles: ArticleDetail[];
};

export default function DashboardArticle({ articles }: DashboardArticleProps) {
  const previewArticles = articles.slice(0, 2);

  if (previewArticles.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-end gap-2">
        <span>📰</span>
        <h3 className="text-lg font-semibold leading-7 text-foreground">
          유용한 지식 아티클
        </h3>
      </div>

      <div className="flex flex-col gap-5">
        {previewArticles.map((article) => (
          <ArticleCard
            key={article.articleId}
            article={article}
            variant="home"
          />
        ))}
      </div>
    </section>
  );
}
