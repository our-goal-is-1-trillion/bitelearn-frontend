import type { Meta, StoryObj } from '@storybook/react-vite';

import type { LearningTopicSummary } from '@/lib/learningNavigation';
import realEstateIcon from '@/assets/icons/category/real_estate.png';

import CategoryCard from './CategoryCard';

const realEstateTopics: LearningTopicSummary[] = [
  {
    topicId: 'jeonse',
    topicName: '전세',
    chapters: [
      {
        chapterId: 1,
        title: '전세, 도대체 그게 뭔데?',
        sequence: 1,
        status: 'COMPLETED',
      },
      {
        chapterId: 2,
        title: '내 보증금 철통 방어하기',
        sequence: 2,
        status: 'QUIZ_IN_PROGRESS',
      },
      {
        chapterId: 3,
        title: '은행의 힘을 빌려보자',
        sequence: 3,
        status: 'READY',
      },
    ],
  },
  {
    topicId: 'monthly-rent',
    topicName: '월세',
    chapters: [
      {
        chapterId: 4,
        title: '월세 계약서에서 꼭 봐야 할 조항',
        sequence: 1,
        status: 'READY',
      },
      {
        chapterId: 5,
        title: '관리비 항목 제대로 따져보기',
        sequence: 2,
        status: 'READY',
      },
    ],
  },
  {
    topicId: 'buying',
    topicName: '매매',
    chapters: [],
  },
];
const total = realEstateTopics.flatMap((topic) => topic.chapters).length;
const progressed = realEstateTopics
  .flatMap((topic) => topic.chapters)
  .filter((chapter) => chapter.status !== 'READY').length;
const progress = total > 0 ? Math.round((progressed / total) * 100) : 0;

const meta = {
  title: 'Learning/CategoryCard',
  component: CategoryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    categoryId: 'real-estate',
    categoryName: '부동산 · 주거',
    categoryTagline: '내 보증금, 내가 지킨다',
    categoryIconSrc: realEstateIcon,
    progress,
    topics: realEstateTopics,
    isExpanded: false,
    onToggle: () => {},
    onSelectTopic: () => {},
  },
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    isExpanded: false,
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <CategoryCard {...args} />
    </div>
  ),
};

export const Expanded: Story = {
  args: {
    isExpanded: true,
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <CategoryCard {...args} />
    </div>
  ),
};

export const NoProgress: Story = {
  args: {
    progress: 0,
    isExpanded: false,
  },
  render: (args) => (
    <div className="mx-auto w-full max-w-md">
      <CategoryCard {...args} />
    </div>
  ),
};
