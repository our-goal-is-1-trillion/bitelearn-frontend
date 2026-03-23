import type { NoteTab } from '@/pages/note/NotesPage';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type NoteTopNavProps = {
  activeTab: NoteTab;
  onChangeTab: (tab: NoteTab) => void;
};

const NOTE_TABS: { value: NoteTab; label: string }[] = [
  { value: 'incorrect', label: '오답 복습' },
  { value: 'bookmark', label: '저장한 글' },
];

export default function NoteTopNav({
  activeTab,
  onChangeTab,
}: NoteTopNavProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value: string) => onChangeTab(value as NoteTab)}
      className="sticky top-0 z-20 w-full"
    >
      <TabsList className="flex w-full items-start justify-center rounded-none bg-white p-0">
        {NOTE_TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex h-[50px] flex-1 items-center justify-center rounded-none border-b-2 border-transparent bg-white px-4 py-[13px] text-center text-base font-medium leading-6 text-slate-600 shadow-none ring-0 transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
