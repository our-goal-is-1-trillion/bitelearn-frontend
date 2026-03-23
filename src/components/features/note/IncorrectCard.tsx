import type { Topic } from '@/api/learning/learning.types';
import TextBadge from '@/components/common/TextBadge';

import { formatDate } from '@/utils/formatDate';

type IncorrectCardProps = {
  categoryName: string;
  createdAt: string;
  chapterId: number;
  topic: Topic;
  questionTitle: string;
  onSelect: () => void;
  onRetry?: () => void;
};

const TOPIC_LABEL: Record<Topic, string> = {
  JEONSE: '전세',
  MONTHLY_RENT: '월세',
  BUYING: '매매',
  SALARY: '월급 관리',
  CREDIT: '신용 관리',
  EMPLOYMENT: '고용 · 복지',
  SALARY_NEGOTIATION: '연봉 협상',
  YEAR_END_TAX: '연말정산',
  INCOME_TAX: '종합소득세',
  ETF: 'ETF',
  STOCK: '주식',
  PENSION: '연금',
};

export default function IncorrectCard({
  categoryName,
  createdAt,
  chapterId,
  topic,
  questionTitle,
  onSelect,
  onRetry,
}: IncorrectCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border-2 border-slate-100 bg-card p-0.5 shadow-bl-sm transition-colors hover:border-slate-200">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-1">
          <TextBadge>{categoryName}</TextBadge>
          <TextBadge>{TOPIC_LABEL[topic]}</TextBadge>
        </div>

        <span className="text-xs font-base leading-4 text-slate-400">
          {formatDate(createdAt)}
        </span>
      </div>

      <div className="px-4 pb-4">
        <p className="truncate text-sm font-medium leading-5 text-slate-600">
          {`Chapter ${chapterId}.`}
        </p>
        <h3 className="mt-1 break-keep text-base font-semibold leading-6 text-foreground">
          {questionTitle}
        </h3>
      </div>

      <div className="overflow-hidden rounded-b-[14px] bg-slate-50">
        <div className="flex items-center px-4 py-2">
          <button
            type="button"
            onClick={onSelect}
            className="flex h-7 flex-1 items-center justify-center text-sm font-semibold leading-5 text-slate-600 transition-colors hover:text-foreground me-4"
          >
            지난 기록
          </button>
          <div className="flex items-center pt-0.5">
            <div className="h-6 w-[2px] rounded-full bg-slate-200" />
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="flex h-7 flex-1 items-center justify-center text-sm font-semibold leading-5 text-slate-600 transition-colors hover:text-foreground ms-4"
          >
            다시 도전
          </button>
        </div>
      </div>
    </div>
  );
}
