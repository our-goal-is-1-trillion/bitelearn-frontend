import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const meta = {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderPopover(open?: boolean) {
  return (
    <div className="flex min-h-[220px] items-start justify-center pt-12">
      <Popover open={open}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline">
            공유 옵션 보기
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-foreground">공유하기</p>
              <p className="mt-1 text-sm text-slate-500">
                링크를 복사하거나 시스템 공유를 사용할 수 있습니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline">
                링크 복사
              </Button>
              <Button type="button">공유하기</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export const Default: Story = {
  render: () => renderPopover(true),
};
