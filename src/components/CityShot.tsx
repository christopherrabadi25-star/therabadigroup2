import Image from "next/image";
import type { CityPhoto } from "@/lib/cities";

/** A full-bleed city photo with an optional small credit in the corner. */
export default function CityShot({
  photo,
  sizes = "100vw",
  className = "",
  preload = false,
}: {
  photo: CityPhoto;
  sizes?: string;
  className?: string;
  preload?: boolean;
}) {
  const remote = photo.src.startsWith("http");
  return (
    <figure className={`relative overflow-hidden bg-coal ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        preload={preload}
        unoptimized={remote}
        className="object-cover [filter:saturate(0.92)_contrast(1.05)]"
      />
      {photo.credit && (
        <figcaption className="absolute bottom-2 right-3 text-[0.7rem] text-ivory/70 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
          {photo.creditUrl ? (
            <a href={photo.creditUrl} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-ivory">
              Photo: {photo.credit}
            </a>
          ) : (
            <>Photo: {photo.credit}</>
          )}
        </figcaption>
      )}
    </figure>
  );
}
