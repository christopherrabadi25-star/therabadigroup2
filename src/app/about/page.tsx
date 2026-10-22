import type { Metadata } from "next";
import Image from "next/image";
import { BUSINESS, STATS, TEAM } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import ContactPanel from "@/components/ContactPanel";
import { CountUp, Reveal } from "@/components/Motion";

export const metadata: Metadata = {
  title: "About Ramzi and Christopher Rabadi",
  description:
    "Meet Ramzi and Christopher Rabadi, a father and son real estate team at Agency 8 Real Estate Group in Claremont. 20+ years and $100M+ closed. CA DRE #01738777 and #02246356.",
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
        title="Two generations, one standard"
        lead="Ramzi brings more than twenty years of Southern California deals. Christopher grew up in the San Gabriel Valley and works beside him on every one."
        image="/images/claremont.jpg"
        imageAlt="Claremont Village with the San Gabriel Mountains behind"
        position="60% 50%"
      />

      <section className="section bg-onyx">
        <div className="wrap">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="num text-[clamp(2.8rem,6vw,4.6rem)] leading-none text-champagne">
                  <CountUp value={s.value} />
                </dd>
                <dd className="mt-3 text-taupe">{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {TEAM.map((m, i) => (
        <section key={m.name} className={i === 0 ? "light section" : "light-2 section"}>
          <div className={`wrap grid items-center gap-12 md:grid-cols-2 md:gap-20`}>
            <Reveal className={i === 1 ? "md:order-2" : ""}>
              <div className="relative aspect-[4/5] w-full max-w-[460px] overflow-hidden bg-ink/10">
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
            <h2 className="h-section">Rooted in the San Gabriel Valley</h2>
          </Reveal>
          <Reveal delay={0.1} className="prose-body text-[1.12rem]">
            <p>
              The Rabadi family has lived and worked in the San Gabriel Valley for decades. It&apos;s why so much of our work is
              here, from Claremont and La Verne to Pasadena, Sierra Madre, and Monrovia, and why our clients follow us to
              Los Angeles and the coast.
            </p>
            <p className="text-taupe">
              We work from {BUSINESS.brokerage} at {BUSINESS.address.full}. When you call, Ramzi or Christopher answers.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
