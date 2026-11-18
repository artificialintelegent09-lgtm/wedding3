import Image from "next/image";
import type { ImageAsset } from "@/types/invitation";

interface PhotoProps {
  asset: ImageAsset;
  /** Layout hint for the browser; kept so a CDN loader can be added later without touching call sites. */
  sizes: string;
  priority?: boolean;
  /** "eager" + fetchPriority "low": load right away without competing with the photo that is actually on screen. */
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
  alt?: string;
}

/**
 * Fills its (positioned, sized) parent and respects each photo's focal point.
 * Static export has no image optimizer: srcset candidates come from the pre-generated variants in
 * src/lib/image-loader.ts (`npm run images:responsive`), so `sizes` really matters: describe the displayed width.
 */
export function Photo({ asset, sizes, priority, loading, fetchPriority, className = "", alt }: PhotoProps) {
  return (
    <Image
      src={asset.src}
      alt={alt ?? asset.alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={loading}
      fetchPriority={fetchPriority}
      className={`object-cover ${className}`}
      style={{ objectPosition: asset.focal ?? "50% 50%" }}
    />
  );
}
