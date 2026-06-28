import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Lazy, optimized wrapper for rendered (raster) 3D illustrations or photos.
 *
 * Drop files into `/public/art/` and reference them as `src="/art/name.avif"`.
 * next/image then serves modern formats (AVIF/WebP), device-correct sizes, and
 * — for anything below the fold — lazy-loads so heavy art never blocks the
 * initial paint. Keep `priority` for above-the-fold art only.
 *
 * See `/public/art/README.md` for the recommended file list and specs.
 */
export function ArtImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = "(max-width: 768px) 90vw, 640px",
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={cn("h-auto w-full select-none", className)}
    />
  );
}
