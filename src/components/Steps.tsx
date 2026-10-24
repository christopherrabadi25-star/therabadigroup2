import { Reveal } from "./Motion";

/** A real sequence, so it gets numbers. */
export default function Steps({ items }: { items: readonly { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-x-16 md:grid-cols-2">
      {items.map((s, i) => (
        <Reveal as="li" key={s.title} delay={(i % 2) * 0.08} className="grid grid-cols-[56px_1fr] gap-3 border-t border-current/15 py-8">
          <span className="num text-[2rem] leading-none text-champagne-deep">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="text-[1.6rem]">{s.title}</h3>
            <p className="mt-2 opacity-75">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
