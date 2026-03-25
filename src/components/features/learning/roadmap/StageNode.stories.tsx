import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { ChapterSummaryDto } from '@/api/learning/learning.types';

import StageNode from './StageNode';

const roadmapChapters: ChapterSummaryDto[] = [
  {
    chapterId: 1001,
    title: '완료 챕터',
    status: 'COMPLETED',
    sequence: 1,
  },
  {
    chapterId: 1002,
    title: '진행 중 챕터',
    status: 'QUIZ_IN_PROGRESS',
    sequence: 2,
  },
  {
    chapterId: 1003,
    title: '학습 가능 챕터',
    status: 'READY',
    sequence: 3,
  },
];

const completedChapter = roadmapChapters[0];
const inProgressChapter = roadmapChapters[1];
const availableChapter = roadmapChapters[2];

const meta = {
  title: 'Learning/Roadmap/StageNode',
  component: StageNode,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    chapter: roadmapChapters[0],
    index: 0,
    onSelect: () => {},
  },
} satisfies Meta<typeof StageNode>;

export default meta;
type Story = StoryObj<typeof meta>;
type StageNodeProps = ComponentProps<typeof StageNode>;

function renderNode(args: StageNodeProps) {
  return (
    <div className="flex min-h-[180px] items-start justify-center p-6">
      <StageNode {...args} />
    </div>
  );
}

export const Completed: Story = {
  render: (args) => renderNode(args),
  args: {
    chapter: completedChapter,
  },
};

export const InProgress: Story = {
  render: (args) => renderNode(args),
  args: {
    chapter: inProgressChapter,
  },
};

export const Available: Story = {
  render: (args) => renderNode(args),
  args: {
    chapter: availableChapter,
  },
};
