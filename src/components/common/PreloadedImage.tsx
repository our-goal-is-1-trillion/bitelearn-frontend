import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { hasLoadedImage, normalizeImageUrl, preloadImage } from '@/lib/image';

type PreloadedImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src'
> & {
  src?: string | null;
  fallbackSrc: string;
  containerClassName?: string;
  skeletonClassName?: string;
};

export default function PreloadedImage({
  src,
  fallbackSrc,
  alt,
  className,
  containerClassName,
  skeletonClassName,
  onError,
  ...imgProps
}: PreloadedImageProps) {
  const fallbackImageSrc = useMemo(
    () => normalizeImageUrl(fallbackSrc) ?? fallbackSrc,
    [fallbackSrc]
  );
  const targetImageSrc = normalizeImageUrl(src) ?? fallbackImageSrc;
  const [imageState, setImageState] = useState(() => ({
    targetImageSrc,
    displayImageSrc: targetImageSrc,
    isLoaded: hasLoadedImage(targetImageSrc),
  }));
  const isCurrentTarget = imageState.targetImageSrc === targetImageSrc;
  const displayImageSrc = isCurrentTarget
    ? imageState.displayImageSrc
    : targetImageSrc;
  const isLoaded = isCurrentTarget
    ? imageState.isLoaded
    : hasLoadedImage(targetImageSrc);

  // src가 변경될 때마다 이미지 로드 시도
  useEffect(() => {
    let isCancelled = false;

    if (hasLoadedImage(targetImageSrc)) {
      return () => {
        isCancelled = true;
      };
    }

    preloadImage(targetImageSrc)
      .catch(() => preloadImage(fallbackImageSrc))
      .then((loadedImageSrc) => {
        if (isCancelled) {
          return;
        }

        setImageState({
          targetImageSrc,
          displayImageSrc: loadedImageSrc ?? fallbackImageSrc,
          isLoaded: true,
        });
      });

    return () => {
      isCancelled = true;
    };
  }, [fallbackImageSrc, targetImageSrc]);

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden',
        containerClassName
      )}
    >
      {!isLoaded ? (
        <div
          aria-hidden
          className={cn(
            'absolute inset-0 animate-pulse bg-slate-200',
            skeletonClassName
          )}
        />
      ) : null}

      <img
        {...imgProps}
        src={displayImageSrc}
        alt={alt}
        className={cn(
          'h-full w-full transition-opacity duration-200',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        decoding="async"
        fetchPriority="high"
        onError={(event) => {
          if (displayImageSrc === fallbackImageSrc) {
            onError?.(event);
            return;
          }

          setImageState({
            targetImageSrc,
            displayImageSrc: fallbackImageSrc,
            isLoaded: hasLoadedImage(fallbackImageSrc),
          });
          void preloadImage(fallbackImageSrc).finally(() => {
            setImageState({
              targetImageSrc,
              displayImageSrc: fallbackImageSrc,
              isLoaded: true,
            });
          });
          onError?.(event);
        }}
      />
    </div>
  );
}
