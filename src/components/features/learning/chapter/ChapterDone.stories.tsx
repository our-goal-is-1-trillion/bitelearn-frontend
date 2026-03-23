import type { Meta, StoryObj } from '@storybook/react-vite';

import ChapterDone from './ChapterDone';

const meta = {
  title: 'Learning/Chapter/ChapterDone',
  component: ChapterDone,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    correct: 7,
    total: 10,
    accuracyRate: 70,
    chapterTitle: '[2단계: 계약] 도장 찍기 전, 멍뭉이의 마지막 방어선!',
    onFinish: () => {},
  },
} satisfies Meta<typeof ChapterDone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
