"use client";

import { useEffect, useMemo, useState } from "react";
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
  /** For very wide photos, request more pixels on tall phone screens. */
  sizes?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const HOLD = 7000;

/**
 * Full-screen property film: slow push-in on each photo, cross-dissolves and
 * a caption naming the place. A slide whose photo fails to load is skipped.
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
  const [failed, setFailed] = useState<string[]>([]);
  const live = useMemo(() => slides.filter((s) => !failed.includes(s.src)), [slides, failed]);
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const idx = live.length ? i % live.length : 0;

  useEffect(() => {
    if (reduce || video || live.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % live.length), HOLD);
    return () => clearTimeout(t);
  }, [i, reduce, video, live.length]);

  const s = live[idx];

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
          s && (
            <AnimatePresence initial={false}>
              <motion.div
                key={s.src}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              >
                <div
                  className={`absolute inset-0 ${reduce ? "" : "kenburns"}`}
                  style={{ ["--kb-origin" as string]: s.origin ?? "50% 50%" }}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    preload={idx === 0}
                    sizes={s.sizes ?? "(orientation: portrait) 330vw, 100vw"}
                    unoptimized={s.src.startsWith("http")}
                    referrerPolicy={s.src.startsWith("http") ? "no-referrer" : undefined}
                    onError={() => setFailed((f) => [...f, s.src])}
                    className="object-cover"
                    style={{ objectPosition: s.position ?? "50% 50%", filter: "saturate(0.9) contrast(1.05)" }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          )
        )}
        <div className="grade" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-onyx/75 via-onyx/30 to-transparent" />
      </div>

      <div className="wrap pb-8 pt-[calc(var(--header-h)+40px)] md:pb-10">
        {children}

        {!video && s && (
          <div className="mt-12 flex items-end justify-between gap-6 border-t border-ivory/20 pt-5 md:mt-14">
            <AnimatePresence mode="wait">
              <motion.p
                key={s.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="leading-snug"
              >
                <span className="block text-[1.05rem] font-semibold">{s.title}</span>
                {s.detail && <span className="block text-[0.95rem] text-ivory/75">{s.detail}</span>}
              </motion.p>
            </AnimatePresence>
            <div className="flex shrink-0 gap-1.5" role="tablist" aria-label="Photos">
              {live.map((sl, n) => (
                <button
                  key={sl.src}
                  type="button"
                  role="tab"
                  aria-selected={n === idx}
                  aria-label={`Show ${sl.title}`}
                  onClick={() => setI(n)}
                  className="relative h-8 w-8 md:w-12"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[2px] rounded-full bg-ivory/30" />
                  {n === idx && (
                    <motion.span
                      key={`bar-${i}`}
                      className="absolute left-0 top-1/2 h-[2px] rounded-full bg-ivory"
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
