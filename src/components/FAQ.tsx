import { FAQS } from "@/lib/data";
import { Reveal } from "./Motion";

type QA = { readonly question: string; readonly answer: string };

export default function FAQ({
  heading = "Questions, answered",
  items = FAQS,
}: {
  heading?: string;
  items?: readonly QA[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="light section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-24">
        <Reveal>
          <h2 className="h-section">{heading}</h2>
        </Reveal>
        <Reveal delay={0.1} className="faq">
          {items.map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
