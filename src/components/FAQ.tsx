import { FAQS } from "@/lib/data";

export default function FAQ({ heading = "Common questions" }: { heading?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <h2 className="h-section">{heading}</h2>
        <div className="faq">
          {FAQS.map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
