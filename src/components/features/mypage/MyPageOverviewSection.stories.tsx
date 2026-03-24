import type { Meta, StoryObj } from '@storybook/react-vite';

import MyPageOverviewSection from './MyPageOverviewSection';

const meta = {
  title: 'MyPage/MyPageOverviewSection',
  component: MyPageOverviewSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    email: 'bitelearn@bitelearn.com',
    providerType: 'GOOGLE',
    version: '1.1.1',
    onLogoutClick: () => {},
  },
} satisfies Meta<typeof MyPageOverviewSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto min-h-dvh max-w-screen-sm bg-slate-50 pt-6">
      <MyPageOverviewSection {...args} />
    </div>
  ),
};
