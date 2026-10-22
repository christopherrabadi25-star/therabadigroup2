"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Shows the first photo that loads from `srcs`. Remote listing photos are loaded
 * straight from their CDN; if every source fails, `fallback` renders instead.
 */
export default function SafeImage({
  srcs,
  alt,
  sizes,
  className = "",
  preload = false,
  fallback,
}: {
  srcs: readonly string[];
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
  fallback: React.ReactNode;
}) {
  const [i, setI] = useState(0);
  const src = srcs[i];
  if (!src) return <>{fallback}</>;
  const remote = src.startsWith("http");
  return (
    <Image
      key={src}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      unoptimized={remote}
      referrerPolicy={remote ? "no-referrer" : undefined}
      className={`object-cover ${className}`}
      onError={() => setI((n) => n + 1)}
    />
  );
}
