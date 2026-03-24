import type { Meta, StoryObj } from '@storybook/react-vite';

import IncorrectCard from './IncorrectCard';

const meta = {
  title: 'Note/IncorrectCard',
  component: IncorrectCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    categoryName: '부동산 · 주거',
    createdAt: '2026-03-06T12:42:00Z',
    chapterSequence: 1,
    topic: 'JEONSE',
    questionTitle: '계약서 특약에 반드시 포함해야 할 문구는?',
    onSelect: () => {},
    onRetry: () => {},
  },
} satisfies Meta<typeof IncorrectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="mx-auto w-full max-w-sm">
      <IncorrectCard {...args} />
    </div>
  ),
};
