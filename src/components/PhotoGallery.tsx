"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export type GalleryPhoto = {
  /** Sources in order of preference. If all fail, the photo is dropped. */
  srcs: string[];
  alt: string;
  caption?: string;
  /** Span two columns on desktop for a cinematic, editorial rhythm. */
  wide?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function Photo({
  photo,
  onDead,
  onOpen,
  sizes,
}: {
  photo: GalleryPhoto;
  onDead: () => void;
  onOpen: (src: string) => void;
  sizes: string;
}) {
  const [i, setI] = useState(0);
  const src = photo.srcs[i];
  if (!src) return null;
  const remote = src.startsWith("http");
  return (
    <button
      type="button"
      onClick={() => onOpen(src)}
      className={`zoom-on-hover group relative block w-full overflow-hidden rounded-[18px] bg-coal text-left ${
        photo.wide ? "aspect-[16/10] md:col-span-2 md:aspect-[21/9]" : "aspect-[4/3]"
      }`}
      aria-label={`Open photo: ${photo.alt}`}
    >
      <Image
        key={src}
        src={src}
        alt={photo.alt}
        fill
        sizes={sizes}
        unoptimized={remote}
        referrerPolicy={remote ? "no-referrer" : undefined}
        className="object-cover"
        style={{ filter: "saturate(0.92) contrast(1.05)" }}
        onError={() => {
          if (i + 1 < photo.srcs.length) setI(i + 1);
          else onDead();
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-onyx/70 via-transparent to-transparent opacity-80" />
      {photo.caption && (
        <span className="absolute bottom-4 left-5 text-[0.95rem] font-medium text-ivory">{photo.caption}</span>
      )}
    </button>
  );
}

/** Editorial photo grid with a full-screen viewer. Photos that fail to load are removed. */
export default function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [dead, setDead] = useState<number[]>([]);
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5">
        {photos.map((p, n) =>
          dead.includes(n) ? null : (
            <Photo
              key={p.srcs[0]}
              photo={p}
              sizes={p.wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
              onDead={() => setDead((d) => [...d, n])}
              onOpen={(src) => setOpen({ src, alt: p.alt })}
            />
          ),
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-onyx/95 p-4 backdrop-blur-sm md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.alt}
          >
            <motion.div
              className="relative h-full w-full"
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Image
                src={open.src}
                alt={open.alt}
                fill
                sizes="100vw"
                unoptimized={open.src.startsWith("http")}
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </motion.div>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute right-5 top-5 rounded-full bg-ivory/10 px-4 py-2 text-[0.95rem] text-ivory backdrop-blur-md"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
