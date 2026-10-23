"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform, animate } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts content into place once, as it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** Counts a figure like "$130M+" up from zero when it scrolls into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const m = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!m || reduce || !inView) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setText(`${pre}${v.toFixed(decimals)}${post}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  // Bodoni's "+" is a hairline; set it in the sans so it reads at a glance.
  const plus = text.endsWith("+");
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{plus ? text.slice(0, -1) : text}</span>
      {plus && (
        <span aria-hidden className="ml-1 align-[0.35em] font-sans text-[0.5em] font-light">
          +
        </span>
      )}
    </span>
  );
}

/** A photo that drifts slower than the page, for depth. */
export function ParallaxImage({
  src,
  alt,
  sizes = "(orientation: portrait) 330vw, 100vw",
  className = "",
  strength = 12,
  position = "50% 50%",
  preload = false,
  fallback,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  strength?: number;
  position?: string;
  preload?: boolean;
  fallback?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  const [current, setCurrent] = useState(src);
  const remote = current.startsWith("http");
  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div className="absolute inset-x-0" style={{ top: `-${strength}%`, bottom: `-${strength}%`, y: reduce ? 0 : y }}>
        <Image
          key={current}
          src={current}
          onError={() => fallback && current !== fallback && setCurrent(fallback)}
          referrerPolicy={remote ? "no-referrer" : undefined}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          unoptimized={remote}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
    </div>
  );
}
