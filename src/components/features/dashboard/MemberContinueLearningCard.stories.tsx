import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

import MemberContinueLearningCard from './MemberContinueLearningCard';

const storyQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const meta = {
  title: 'Dashboard/MemberContinueLearningCard',
  component: MemberContinueLearningCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    recentLearning: {
      categoryCode: 'REAL_ESTATE_HOUSING',
      topicCode: 'MONTHLY_RENT',
      chapterId: 1,
      categoryName: '부동산 · 주거',
      topicName: '월세',
      chapterTitle: '나의 첫 집 찾아보기',
      progressRate: 40,
    },
  },
} satisfies Meta<typeof MemberContinueLearningCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <QueryClientProvider client={storyQueryClient}>
      <MemoryRouter initialEntries={['/']}>
        <div className="mx-auto w-full max-w-sm">
          <MemberContinueLearningCard {...args} />
        </div>
      </MemoryRouter>
    </QueryClientProvider>
  ),
};

export const WithoutProgress: Story = {
  render: (args) => (
    <QueryClientProvider client={storyQueryClient}>
      <MemoryRouter initialEntries={['/']}>
        <div className="mx-auto w-full max-w-sm">
          <MemberContinueLearningCard {...args} />
        </div>
      </MemoryRouter>
    </QueryClientProvider>
  ),
  args: {
    recentLearning: {
      categoryCode: 'REAL_ESTATE_HOUSING',
      topicCode: 'MONTHLY_RENT',
      chapterId: 1,
      categoryName: '부동산 · 주거',
      topicName: '월세',
      chapterTitle: '나의 첫 집 찾아보기',
      progressRate: 0,
    },
  },
};
