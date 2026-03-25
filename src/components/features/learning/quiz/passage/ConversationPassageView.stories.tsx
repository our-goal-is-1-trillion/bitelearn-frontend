import type { Meta, StoryObj } from '@storybook/react-vite';
import type { QuizInfo } from '@/api/learning/learning.types';
import type { StepIndicatorInfo } from '../quiz.types';
import ConversationPassageView from './ConversationPassageView';

const indicatorSteps: StepIndicatorInfo[] = [
  { type: 'quiz', status: 'none', isCurrent: true },
  { type: 'quiz', status: 'none', isCurrent: false },
  { type: 'quiz', status: 'none', isCurrent: false },
];

const conversationQuestion: QuizInfo = {
  quizId: 2,
  sequence: 2,
  type: 'DIALOGUE_MCQ',
  passageTitle: '중개사와의 대화',
  passageContent: '',
  questionImageUrl: '',
  questionTitle: '중개사의 말 중 가장 위험한 것은?',
  specificData: {
    dialogues: [
      {
        speaker: '불독 중개사',
        message: '이 집은 융자가 거의 없어서 괜찮아요.',
      },
      { speaker: '멍뭉이', message: '등기부등본을 먼저 봐도 될까요?' },
      {
        speaker: '불독 중개사',
        message: '그건 나중에 보고 지금 계약부터 해요.',
      },
    ],
    options: [
      '등기부등본을 먼저 보자는 말',
      '계약을 먼저 하자는 말',
      '융자가 거의 없다는 말',
    ],
    documentElements: [],
  },
};

const baseArgs = {
  question: conversationQuestion,
  indicatorSteps,
  onSolve: () => {},
};

const meta = {
  title: 'Learning/Quiz/Passage/ConversationPassageView',
  component: ConversationPassageView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ConversationPassageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BubbleRevealAnimating: Story = {
  args: { ...baseArgs, skipAnimation: false },
};

export const AllBubblesVisible: Story = {
  args: { ...baseArgs, skipAnimation: true },
};
