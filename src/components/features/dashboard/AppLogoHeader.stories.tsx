import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import AppLogoHeader from './AppLogoHeader';

const meta = {
  title: 'Dashboard/AppLogoHeader',
  component: AppLogoHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppLogoHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomePage: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/']}>
      <div className="bg-neutral-100">
        <AppLogoHeader />
      </div>
    </MemoryRouter>
  ),
};

export const NotesPage: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/notes']}>
      <div className="bg-neutral-100">
        <AppLogoHeader />
      </div>
    </MemoryRouter>
  ),
};
