import defaultPassageImage from '@/assets/learning/default_passage.png';
import PreloadedImage from '@/components/common/PreloadedImage';
import { normalizeImageUrl } from '@/lib/image';

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
  const resolvedImageSrc = normalizeImageUrl(imageSrc) ?? undefined;

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-bl-card">
      <div className="aspect-[335/220] w-full overflow-hidden bg-slate-100">
        <PreloadedImage
          src={resolvedImageSrc}
          fallbackSrc={DEFAULT_PASSAGE_IMAGE}
          alt={imageAlt}
          className="h-full w-full object-cover"
          skeletonClassName="bg-slate-100"
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
