/** A real sequence, so it gets numbers. */
export default function Steps({ items }: { items: readonly { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-x-12 md:grid-cols-2">
      {items.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[44px_1fr] gap-3 border-t border-line py-6">
          <span className="num text-[1.6rem] leading-none text-brass-ink">{i + 1}</span>
          <div>
            <h3 className="text-[1.45rem]">{s.title}</h3>
            <p className="mt-2 text-ink-soft">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
