import Image from "next/image";
import { Reveal } from "./Motion";

/** Cinematic top of an inner page: a full-bleed photo, a title, a lead line. */
export default function PageIntro({
  title,
  lead,
  image,
  imageAlt = "",
  position = "50% 50%",
  children,
}: {
  title: string;
  lead?: React.ReactNode;
  image: string;
  imageAlt?: string;
  position?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden bg-onyx text-ivory md:min-h-[86svh]">
      <div className="absolute inset-0 -z-10">
        <div className="kenburns absolute inset-0" style={{ animationDuration: "14s" }}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: position, filter: "saturate(0.85) contrast(1.06)" }}
          />
        </div>
        <div className="grade" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-onyx/75 via-onyx/30 to-transparent" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="grain" />
        </div>
      </div>
      <div className="wrap pb-14 pt-[calc(var(--header-h)+48px)] md:pb-20">
        <Reveal>
          <h1 className="display max-w-[13ch]">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.15}>
            <p className="lead mt-6 text-ivory/80">{lead}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
