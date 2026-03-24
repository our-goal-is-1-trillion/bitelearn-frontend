import type { ContentBlock } from '@/mock/article';

export function renderContentBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p
          key={index}
          className="word-break-keep mb-6 whitespace-pre-wrap text-sm leading-6 tracking-[-0.01em] text-foreground"
        >
          {block.content}
        </p>
      );

    case 'heading':
      if (block.level === 3) {
        return (
          <h3
            key={index}
            className="word-break-keep mb-4 mt-10 text-xl font-bold leading-7 tracking-[-0.02em] text-foreground"
          >
            {block.content}
          </h3>
        );
      }

      return (
        <h2
          key={index}
          className="word-break-keep mb-5 mt-12 text-xl font-bold leading-7 tracking-[-0.02em] text-foreground"
        >
          {block.content}
        </h2>
      );

    case 'image':
      return (
        <figure key={index} className="my-8">
          <div className="overflow-hidden rounded-xl bg-slate-100">
            <img
              src={block.url}
              alt={block.altText}
              className="h-auto w-full object-cover"
            />
          </div>

          {block.caption && (
            <figcaption className="word-break-keep mx-auto mt-2 max-w-[90%] text-center text-xs text-slate-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'list':
      return (
        <ul key={index} className="my-6 space-y-3 pl-1">
          {block.items.map((item, itemIndex) => {
            const parts = item.split(/\*\*(.*?)\*\*/g);

            return (
              <li
                key={itemIndex}
                className="word-break-keep flex items-start text-sm leading-6 tracking-[-0.01em] text-foreground"
              >
                <span className="flex-1">
                  {parts.map((part, partIndex) => (
                    <span key={partIndex}>{part}</span>
                  ))}
                </span>
              </li>
            );
          })}
        </ul>
      );

    case 'quote':
      return (
        <blockquote
          key={index}
          className="word-break-keep my-8 border-l-4 border-primary bg-card p-5"
        >
          <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
            {block.content}
          </p>
        </blockquote>
      );

    default:
      return null;
  }
}
