import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';

import TextBadge from '@/components/common/TextBadge';
import { cn } from '@/lib/utils';
import type { MockTopicSummary } from '@/mock/learning';

const TOPIC_ICONS: Record<string, string> = {
  jeonse: '🏦',
  'monthly-rent': '💸',
  buying: '🏢',
  salary: '💵',
  credit: '💳',
  employment: '🧑‍💼',
  'salary-negotiation': '🤝',
  'year-end-tax': '🧾',
  'income-tax': '📊',
  etf: '📈',
  stock: '📉',
  pension: '🏝️',
};

type TopicRowProps = {
  topic: MockTopicSummary;
  onSelect: (topicId: string) => void;
};

function TopicRow({ topic, onSelect }: TopicRowProps) {
  const progressedCount = topic.chapters.filter(
    (chapter) => chapter.status !== 'READY'
  ).length;
  const totalCount = topic.chapters.length;
  const hasStarted = progressedCount > 0;
  const isComplete = totalCount > 0 && progressedCount === totalCount;

  return (
    <button
      type="button"
      onClick={() => onSelect(topic.topicId)}
      className="flex w-full items-center gap-1 px-0 pb-5 pt-3 text-left"
    >
      <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center text-lg leading-none">
        {TOPIC_ICONS[topic.topicId] ?? '•'}
      </span>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <div className="text-base font-semibold leading-6 text-foreground">
          {topic.topicName}
        </div>

        <div className="flex items-center gap-3.5">
          {hasStarted && (
            <TextBadge
              variant={isComplete ? 'default' : 'primary'}
              className="px-2.5 py-1.5"
            >
              {`${progressedCount}/${totalCount}`}
            </TextBadge>
          )}
          <ChevronRight
            size={24}
            strokeWidth={1.75}
            className="text-slate-600"
          />
        </div>
      </div>
    </button>
  );
}

type CategoryCardProps = {
  categoryId: string;
  categoryName: string;
  categoryTagline: string;
  categoryIconSrc: string;
  progress: number;
  topics: MockTopicSummary[];
  isExpanded: boolean;
  onToggle: () => void;
  onSelectTopic: (topicId: string) => void;
};

export default function CategoryCard({
  categoryId,
  categoryName,
  categoryTagline,
  categoryIconSrc,
  progress,
  topics,
  isExpanded,
  onToggle,
  onSelectTopic,
}: CategoryCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-bl-card">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-2 pt-2 text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-[68px] w-[68px] shrink-0 overflow-hidden">
              <img
                src={categoryIconSrc}
                alt={categoryName}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <h3 className="text-lg font-semibold leading-7 text-foreground">
                {categoryName}
              </h3>
              <p className="text-sm font-medium leading-5 text-slate-400">
                {categoryTagline}
              </p>
            </div>
          </div>

          {/* 드롭다운 화살표 (열릴 때 부드럽게 사라짐) */}
          <div
            className={cn(
              'pr-2 text-slate-600 transition-opacity duration-300 ease-in-out',
              isExpanded ? 'opacity-0' : 'opacity-100'
            )}
          >
            <ChevronDown size={32} strokeWidth={1.5} />
          </div>
        </div>

        {progress > 0 && (
          <div className="px-3 pb-5 pt-1">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-base leading-5 text-slate-400">
                학습진행률
              </span>
              <span className="text-xs font-bold leading-5 text-slate-700">
                {progress}%
              </span>
            </div>

            <div className="h-[6px] overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-200 to-orange-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </button>

      {/* 하단 콘텐츠 (Grid Transition을 활용한 부드러운 Accordion 애니메이션) */}
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-0">
            <div className="px-0">
              {topics.map((topic, index) => (
                <div
                  key={`${categoryId}-${topic.topicId}`}
                  className={
                    index !== topics.length - 1 ? 'border-b border-slate-100' : ''
                  }
                >
                  <TopicRow topic={topic} onSelect={onSelectTopic} />
                </div>
              ))}

              <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-center gap-1.5 pt-2 text-xs font-medium leading-4 text-slate-600"
              >
                <span className="pb-0.5">접기</span>
                <ChevronUp size={18} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
