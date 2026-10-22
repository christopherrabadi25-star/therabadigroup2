"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type Slide = {
  src: string;
  alt: string;
  title: string;
  detail?: string;
  /** transform-origin for the push-in, e.g. "30% 60%" */
  origin?: string;
  position?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const HOLD = 7000;

/**
 * Full-screen property film: slow push-in on each photo, cross-dissolves,
 * film grain, and a caption naming what you're looking at.
 * Pass `video` (an mp4 in /public) to play real footage instead.
 */
export default function HeroCinema({
  slides,
  video,
  children,
}: {
  slides: Slide[];
  video?: { src: string; poster: string };
  children: React.ReactNode;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || video || slides.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), HOLD);
    return () => clearTimeout(t);
  }, [i, reduce, video, slides.length]);

  const s = slides[i];

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-onyx text-ivory">
      <div className="absolute inset-0 -z-10">
        {video ? (
          <video
            className="h-full w-full object-cover"
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <AnimatePresence initial={false}>
            <motion.div
              key={s.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            >
              <div className={`absolute inset-0 ${reduce ? "" : "kenburns"}`} style={{ ["--kb-origin" as string]: s.origin ?? "50% 50%" }}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  preload={i === 0}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: s.position ?? "50% 50%", filter: "saturate(0.88) contrast(1.06)" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}
        <div className="grade" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-onyx/70 via-onyx/25 to-transparent md:via-onyx/10" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="grain" />
        </div>
      </div>

      <div className="wrap pb-8 pt-[calc(var(--header-h)+40px)] md:pb-10">
        {children}

        {!video && (
          <div className="mt-12 flex flex-col gap-4 border-t border-ivory/20 pt-5 md:mt-14 md:flex-row md:items-end md:justify-between">
            <AnimatePresence mode="wait">
              <motion.p
                key={s.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="text-[0.95rem] text-ivory/85"
              >
                <span className="font-display text-[1.15rem] text-ivory">{s.title}</span>
                {s.detail && <span className="block text-taupe md:inline md:pl-3">{s.detail}</span>}
              </motion.p>
            </AnimatePresence>
            <div className="flex gap-2" role="tablist" aria-label="Photos">
              {slides.map((sl, n) => (
                <button
                  key={sl.src}
                  type="button"
                  role="tab"
                  aria-selected={n === i}
                  aria-label={`Show ${sl.title}`}
                  onClick={() => setI(n)}
                  className="group relative h-8 w-12 md:w-16"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px bg-ivory/30" />
                  {n === i && (
                    <motion.span
                      key={`bar-${i}`}
                      className="absolute left-0 top-1/2 h-px bg-champagne"
                      initial={{ width: reduce ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: reduce ? 0 : HOLD / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
