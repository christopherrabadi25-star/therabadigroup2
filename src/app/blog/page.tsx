import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { POSTS } from "@/lib/posts";
import PageIntro from "@/components/PageIntro";
import { Reveal } from "@/components/Motion";

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
      <PageIntro
        title="Guides"
        lead="Buying and selling in Claremont, La Verne, and the San Gabriel Valley."
        image="/images/dana-point.jpg"
        imageAlt="The Dana Point coastline"
        position="50% 60%"
      />

      <section className="section bg-onyx">
        <div className="wrap">
          <Reveal>
            <Link href={`/blog/${first.slug}`} className="group grid gap-8 no-underline md:grid-cols-2 md:items-center md:gap-16">
              <div className="zoom-on-hover relative aspect-[16/11] overflow-hidden bg-coal">
                <Image src={first.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div>
                <p className="kicker text-champagne">{first.category}</p>
                <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.2rem)] transition-colors group-hover:text-champagne">{first.title}</h2>
                <p className="mt-5 text-ivory/75">{first.description}</p>
              </div>
            </Link>
          </Reveal>

          <ul className="mt-20 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 0.08}>
                <Link href={`/blog/${p.slug}`} className="group block no-underline">
                  <div className="zoom-on-hover relative aspect-[16/11] overflow-hidden bg-coal">
                    <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <p className="kicker mt-5 text-champagne">{p.category}</p>
                  <h3 className="mt-2 text-[1.6rem] leading-tight transition-colors group-hover:text-champagne">{p.title}</h3>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
