import { FileText } from 'lucide-react';

export default function ArticleThumb() {
  return (
    <div className="flex h-full w-full items-center justify-center border-b border-slate-100 bg-slate-50">
      <div className="flex flex-col items-center gap-3 opacity-20">
        <FileText size={48} className="text-foreground" />
        <span className="text-[10px] font-bold tracking-widest">ARTICLE</span>
      </div>
    </div>
  );
}
