import type { Metadata } from "next";
import Image from "next/image";
import { BUSINESS, STATS, TEAM } from "@/lib/data";
import PageIntro from "@/components/PageIntro";
import ContactPanel from "@/components/ContactPanel";

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
        title="A father and son, on every deal"
        lead="Ramzi brings more than 20 years of Southern California deals. Christopher grew up in the San Gabriel Valley and works next to him on every one."
      />

      <section className="section !pt-10">
        <div className="wrap">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] md:aspect-[21/9]">
            <Image src="/images/hero-bg.png" alt="Christopher and Ramzi Rabadi" fill sizes="100vw" className="object-cover object-[50%_22%]" />
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="num text-[2.6rem] leading-none">{s.value}</dd>
                <dd className="mt-2 text-ink-soft">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {TEAM.map((m, i) => (
        <section key={m.name} className={`section ${i === 0 ? "bg-stone" : ""}`}>
          <div className="wrap grid gap-10 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16">
            <div className="relative aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[16px] bg-stone">
              <Image src={m.image} alt={m.name} fill sizes="340px" className="object-cover object-top" />
            </div>
            <div>
              <h2 className="h-section">{m.name}</h2>
              <p className="mt-2 text-ink-soft">
                {m.title}, {m.dre}
              </p>
              <p className="mt-6 max-w-[38em] text-[1.1rem]">{m.bio}</p>
              <h3 className="h-sans mt-8 text-[1rem]">Focus</h3>
              <p className="mt-1 text-ink-soft">{m.specialties.join(", ")}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="section bg-stone">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 className="h-section">Rooted in the San Gabriel Valley</h2>
          <div className="prose-body text-[1.1rem]">
            <p>
              The Rabadi family has lived and worked in the San Gabriel Valley for decades. That history is why so
              much of our business is here, from Claremont and La Verne to Pasadena, Sierra Madre, and Monrovia.
            </p>
            <p className="text-ink-soft">
              We work out of {BUSINESS.brokerage} at {BUSINESS.address.full}. When you call, you get Ramzi or
              Christopher, not a call center.
            </p>
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
