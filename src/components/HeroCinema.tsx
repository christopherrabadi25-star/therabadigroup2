"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  /** Local photo to use if the remote one can't load. */
  fallback?: string;
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
  const [swapped, setSwapped] = useState<string[]>([]);
  const live = useMemo(() => slides.filter((s) => !failed.includes(s.src)), [slides, failed]);
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  // Anyone can stop the motion (WCAG 2.2.2). Reduced-motion visitors start paused.
  const [paused, setPaused] = useState<boolean | null>(null);
  const stopped = paused ?? !!reduce;
  const videoRef = useRef<HTMLVideoElement>(null);
  const idx = live.length ? i % live.length : 0;

  useEffect(() => {
    if (stopped || video || live.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % live.length), HOLD);
    return () => clearTimeout(t);
  }, [i, stopped, video, live.length]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (stopped) v.pause();
    else v.play().catch(() => {});
  }, [stopped]);

  const canMove = !!video || live.length > 1;
  const pauseButton = canMove && (
    <button
      type="button"
      onClick={() => setPaused(!stopped)}
      aria-pressed={stopped}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory hover:border-ivory/70"
    >
      <span className="sr-only">{video ? "Pause background video" : "Pause slideshow"}</span>
      {stopped ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 4.5v15l13-7.5z" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
        </svg>
      )}
    </button>
  );

  const s = live[idx];
  const shownSrc = s && swapped.includes(s.src) && s.fallback ? s.fallback : s?.src;
  const onImgError = () => {
    if (!s) return;
    if (s.fallback && !swapped.includes(s.src)) setSwapped((x) => [...x, s.src]);
    else setFailed((f) => [...f, s.src]);
  };

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-onyx text-ivory">
      <div className="absolute inset-0 -z-10">
        {video ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={video.src}
            poster={video.poster}
            aria-hidden="true"
            tabIndex={-1}
            autoPlay={!reduce}
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
                  className={`absolute inset-0 ${stopped ? "" : "kenburns"}`}
                  style={{ ["--kb-origin" as string]: s.origin ?? "50% 50%" }}
                >
                  <Image
                    src={shownSrc!}
                    alt={s.alt}
                    fill
                    preload={idx === 0}
                    sizes={s.sizes ?? "(orientation: portrait) 330vw, 100vw"}
                    key={shownSrc}
                    unoptimized={shownSrc!.startsWith("http")}
                    referrerPolicy={shownSrc!.startsWith("http") ? "no-referrer" : undefined}
                    onError={onImgError}
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

        {video && <div className="mt-10 flex justify-end">{pauseButton}</div>}

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
            <div className="flex shrink-0 items-center gap-1.5" role="group" aria-label="Featured homes">
              {pauseButton}
              {live.map((sl, n) => (
                <button
                  key={sl.src}
                  type="button"
                  aria-current={n === idx ? "true" : undefined}
                  aria-label={`Show ${sl.title}, ${n + 1} of ${live.length}`}
                  onClick={() => setI(n)}
                  className="relative h-8 w-8 md:w-12"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[2px] rounded-full bg-ivory/30" />
                  {n === idx && (
                    <motion.span
                      key={`bar-${i}`}
                      className="absolute left-0 top-1/2 h-[2px] rounded-full bg-ivory"
                      initial={{ width: stopped ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: stopped ? 0 : HOLD / 1000, ease: "linear" }}
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
