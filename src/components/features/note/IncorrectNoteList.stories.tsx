import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import type { Note } from '@/api/notes/notes.types';
import type { Category } from '@/api/learning/learning.types';

import IncorrectNoteList from './IncorrectNoteList';

const sampleCategories: {
  category: Category;
  categoryName: string;
}[] = [
  { category: 'REAL_ESTATE_HOUSING', categoryName: '부동산 · 주거' },
  {
    category: 'LIVING_FINANCE_EMPLOYMENT',
    categoryName: '생활금융 · 고용',
  },
];

const sampleNotes: Note[] = [
  {
    noteId: 1,
    chapterId: 101,
    chapterSequence: 1,
    quizId: 1001,
    category: 'REAL_ESTATE_HOUSING',
    topic: 'JEONSE',
    questionTitle: '계약서 특약에 반드시 포함해야 할 문구는?',
    userAnswer: '특약은 없어도 된다',
    correctAnswer: '보증보험 가입 불가 시 계약 해제 특약',
    createdAt: '2026-03-17T09:00:00Z',
  },
];

const meta = {
  title: 'Note/IncorrectNoteList',
  component: IncorrectNoteList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/notes']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    categories: sampleCategories,
    notes: sampleNotes,
  },
} satisfies Meta<typeof IncorrectNoteList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hasNext: true,
  },
  render: (args) => (
    <div className="px-6">
      <IncorrectNoteList {...args} />
    </div>
  ),
};

export const Empty: Story = {
  args: {
    notes: [],
  },
  render: (args) => (
    <div className="px-6">
      <IncorrectNoteList {...args} />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    isLoading: true,
    notes: [],
  },
  render: (args) => (
    <div className="px-6">
      <IncorrectNoteList {...args} />
    </div>
  ),
};

export const LoadingMore: Story = {
  args: {
    isLoadingMore: true,
    hasNext: true,
  },
  render: (args) => (
    <div className="px-6">
      <IncorrectNoteList {...args} />
    </div>
  ),
};

export const EndOfList: Story = {
  args: {
    hasNext: false,
  },
  render: (args) => (
    <div className="px-6">
      <IncorrectNoteList {...args} />
    </div>
  ),
};
