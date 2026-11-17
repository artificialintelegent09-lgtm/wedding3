import Image from "next/image";
import type { ImageAsset } from "@/types/invitation";

interface PhotoProps {
  asset: ImageAsset;
  /** Layout hint for the browser; kept so a CDN loader can be added later without touching call sites. */
  sizes: string;
  priority?: boolean;
  className?: string;
  alt?: string;
}

/**
 * Fills its (positioned, sized) parent and respects each photo's focal point.
 * Images are served as-is from /public (static export has no image optimizer),
 * so keep source photos web-sized: see `npm run images:optimize`.
 */
export function Photo({ asset, sizes, priority, className = "", alt }: PhotoProps) {
  return (
    <Image
      src={asset.src}
      alt={alt ?? asset.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      style={{ objectPosition: asset.focal ?? "50% 50%" }}
    />
  );
}
