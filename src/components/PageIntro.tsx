import Image from "next/image";
import SafeImage from "./SafeImage";
import { Reveal } from "./Motion";

/**
 * Cinematic top of an inner page: a full-bleed photo, a title, one line.
 * `image` may be a remote listing photo; `fallback` (local) shows if it can't load.
 */
export default function PageIntro({
  title,
  lead,
  image,
  fallback,
  imageAlt = "",
  position = "50% 50%",
  sizes = "(orientation: portrait) 330vw, 100vw",
  children,
}: {
  title: string;
  lead?: React.ReactNode;
  image: string;
  fallback?: string;
  imageAlt?: string;
  position?: string;
  sizes?: string;
  children?: React.ReactNode;
}) {
  const local = fallback ?? image;
  return (
    <section className="relative isolate flex min-h-[72svh] flex-col justify-end overflow-hidden bg-onyx text-ivory md:min-h-[80svh]">
      <div className="absolute inset-0 -z-10">
        <div className="kenburns absolute inset-0" style={{ animationDuration: "16s" }}>
          {image.startsWith("http") ? (
            <SafeImage
              srcs={[image]}
              alt={imageAlt}
              sizes={sizes}
              preload
              className="[filter:saturate(0.9)_contrast(1.05)]"
              fallback={<Image src={local} alt={imageAlt} fill preload sizes={sizes} className="object-cover" style={{ objectPosition: position }} />}
            />
          ) : (
            <Image
              src={image}
              alt={imageAlt}
              fill
              preload
              sizes={sizes}
              className="object-cover"
              style={{ objectPosition: position, filter: "saturate(0.9) contrast(1.05)" }}
            />
          )}
        </div>
        <div className="grade" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-onyx/80 via-onyx/35 to-transparent" />
      </div>
      <div className="wrap pb-14 pt-[calc(var(--header-h)+48px)] md:pb-20">
        <Reveal>
          <h1 className="display max-w-[14ch]">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.12}>
            <p className="lead mt-5 text-ivory/90">{lead}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
