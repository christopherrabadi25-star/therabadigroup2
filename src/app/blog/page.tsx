import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { POSTS } from "@/lib/posts";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Guides for Buyers and Sellers",
  description:
    "Local real estate guides for Claremont, La Verne, San Dimas, Glendora, and the San Gabriel Valley: buying, selling, and market reports from The Rabadi Group.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [first, ...rest] = [...POSTS].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <>
      <PageIntro title="Guides" lead="Plain-language guides to buying and selling in Claremont, La Verne, and the San Gabriel Valley." />

      <section className="section !pt-10 md:!pt-16">
        <div className="wrap">
          <Link href={`/blog/${first.slug}`} className="group grid gap-6 no-underline md:grid-cols-2 md:items-center md:gap-12">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-stone">
              <Image src={first.image} alt="" fill preload sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <p className="text-ink-soft">
                {first.category}, {first.readTime}
              </p>
              <h2 className="mt-2 text-[clamp(1.9rem,4vw,2.8rem)] group-hover:text-brass-ink">{first.title}</h2>
              <p className="mt-4 text-ink-soft">{first.description}</p>
            </div>
          </Link>

          <ul className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block no-underline">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-stone">
                    <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <p className="mt-4 text-[0.95rem] text-ink-soft">
                    {p.category}, {p.readTime}
                  </p>
                  <h3 className="mt-1 text-[1.5rem] leading-tight group-hover:text-brass-ink">{p.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
