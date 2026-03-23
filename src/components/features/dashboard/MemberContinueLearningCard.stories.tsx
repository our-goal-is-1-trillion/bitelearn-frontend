import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import MemberContinueLearningCard from './MemberContinueLearningCard';

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
    <MemoryRouter initialEntries={['/']}>
      <div className="mx-auto w-full max-w-sm">
        <MemberContinueLearningCard {...args} />
      </div>
    </MemoryRouter>
  ),
};

export const WithoutProgress: Story = {
  render: (args) => (
    <MemoryRouter initialEntries={['/']}>
      <div className="mx-auto w-full max-w-sm">
        <MemberContinueLearningCard {...args} />
      </div>
    </MemoryRouter>
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
