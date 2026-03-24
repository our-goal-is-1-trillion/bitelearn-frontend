import defaultPassageImage from '@/assets/learning/default_passage.png';

type TextPassageCardProps = {
  content: string;
  imageAlt?: string;
  imageSrc?: string;
};

const DEFAULT_PASSAGE_IMAGE = defaultPassageImage;

export default function TextPassageCard({
  content,
  imageAlt,
  imageSrc,
}: TextPassageCardProps) {
  const resolvedImageSrc = imageSrc?.trim()
    ? imageSrc
    : DEFAULT_PASSAGE_IMAGE;

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-bl-card">
      <div className="aspect-[335/220] w-full overflow-hidden bg-[#f6f7fb]">
        <img
          src={resolvedImageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = DEFAULT_PASSAGE_IMAGE;
          }}
        />
      </div>

      <div className="px-5 pb-5 pt-5">
        <p className="whitespace-pre-line text-sm font-medium leading-6 text-foreground">
          {content}
        </p>
      </div>
    </article>
  );
}
