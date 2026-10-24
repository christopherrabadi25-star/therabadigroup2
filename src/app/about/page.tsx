import type { Metadata } from "next";
import Image from "next/image";
import { BUSINESS, PHOTOS, STATS, TEAM } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import ContactPanel from "@/components/ContactPanel";
import { CountUp, Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "About Ramzi and Christopher Rabadi",
  description:
    "Meet Ramzi and Christopher Rabadi, a father and son real estate team at Agency 8 Real Estate Group in Claremont. 20+ years and $110M+ closed. CA DRE #01738777 and #02246356.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TEAM.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: m.name,
        jobTitle: m.title,
        worksFor: { "@type": "RealEstateAgent", name: BUSINESS.name },
        description: m.bio,
        telephone: "+16262031372",
        image: `${BUSINESS.url}${m.image}`,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageIntro
        title="About us"
        lead="Father and son. $110M+ closed and more than 20 years in Southern California real estate."
        image={PHOTOS.risingGlen}
        fallback="/images/rising-glen.jpg"
        imageAlt="A Hollywood Hills home we sold"
        position="40% 55%"
      />

      <section className="section bg-onyx">
        <div className="wrap">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-[clamp(2.6rem,6vw,4rem)] font-semibold leading-none tracking-[-0.03em]">
                  <CountUp value={s.value} />
                </dd>
                <dd className="mt-2 text-ivory/75">{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {TEAM.map((m, i) => (
        <section key={m.name} className={i === 0 ? "light section" : "light-2 section"}>
          <div className={`wrap grid items-center gap-12 md:grid-cols-2 md:gap-20`}>
            <Reveal className={i === 1 ? "md:order-2" : ""}>
              <div className="relative aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[24px] bg-ink/10">
                <Image src={m.image} alt={m.name} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top" />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="kicker text-champagne-deep">{m.title}</p>
              <h2 className="h-section mt-4">{m.name}</h2>
              <p className="mt-2 text-[0.92rem] text-ink-soft">{m.dre}</p>
              <p className="mt-8 max-w-[34em] text-[1.12rem] leading-relaxed">{m.bio}</p>
              <p className="mt-8 text-ink-soft">{m.specialties.join(", ")}</p>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="section bg-onyx">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <Reveal>
            <h2 className="h-section">Local roots</h2>
          </Reveal>
          <Reveal delay={0.1} className="prose-body text-[1.12rem]">
            <p>Our family has lived and worked in the San Gabriel Valley for decades.</p>
            <p className="text-ivory/75">
              {BUSINESS.brokerage}, {BUSINESS.address.full}. When you call, Ramzi or Christopher answers.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
