import type { Meta, StoryObj } from '@storybook/react-vite';

import ChapterResult from './ChapterResult';

const meta = {
  title: 'Learning/Chapter/ChapterResult',
  component: ChapterResult,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    correct: 10,
    total: 10,
    accuracyRate: 100,
    earnedBytes: 500,
    lostBytes: 0,
    currentLevel: 2,
    currentTotalBytes: 3200,
    chapterTitle: '[2단계: 계약] 도장 찍기 전, 멍뭉이의 마지막 방어선!',
    onBack: () => {},
    onFinish: () => {},
    onRetryWrongAnswers: () => {},
  },
} satisfies Meta<typeof ChapterResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Perfect: Story = {};

export const Close: Story = {
  args: {
    correct: 7,
    total: 10,
    accuracyRate: 70,
    earnedBytes: 260,
    lostBytes: 240,
    currentLevel: 2,
    currentTotalBytes: 2760,
  },
};

export const Fail: Story = {
  args: {
    correct: 3,
    total: 10,
    accuracyRate: 30,
    earnedBytes: 0,
    lostBytes: 500,
    currentLevel: 1,
    currentTotalBytes: 480,
  },
};
