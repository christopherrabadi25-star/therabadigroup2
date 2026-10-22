import Ridgeline from "./Ridgeline";

/** Standard top of an inner page: a title, a lead sentence, and optional actions. */
export default function PageIntro({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-oak text-paper">
      <div className="wrap pb-20 pt-14 md:pb-28 md:pt-24">
        <h1 className="display max-w-[14ch]">{title}</h1>
        {lead && <p className="lead mt-6 text-sage">{lead}</p>}
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </div>
      <Ridgeline className="absolute inset-x-0 bottom-0 block h-12 w-full md:h-16" stroke="var(--color-brass)" fill="var(--color-paper)" />
    </section>
  );
}
