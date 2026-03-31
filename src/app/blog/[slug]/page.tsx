import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { POSTS, getPost, type BlockType } from "@/lib/posts";
import { BUSINESS } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-0 overflow-hidden">
        <div className="absolute inset-0 h-[420px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-[#050505]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 pb-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#5A5550] text-xs hover:text-[#C4953A] transition-colors mb-8">
            ← All Guides
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase border border-[#C4953A]/40 bg-[#C4953A]/10 text-[#C4953A] px-3 py-1 rounded-full mb-5">
              {post.category}
            </span>
            <h1 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-bold text-[#EDE8DC] mb-5 leading-snug">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C4953A]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#C4953A] text-xs font-bold">RG</span>
                </div>
                <div>
                  <p className="text-[#EDE8DC] text-sm font-semibold">The Rabadi Group</p>
                  <p className="text-[#3A3834] text-xs">Ramzi &amp; Christopher Rabadi · {BUSINESS.brokerage}</p>
                </div>
              </div>
              <div className="h-4 w-px bg-[#2A2A2A]" />
              <span className="text-[#4A4844] text-xs">{post.publishedAt}</span>
              <div className="h-4 w-px bg-[#2A2A2A]" />
              <span className="text-[#4A4844] text-xs">{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="pb-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

            {/* Article body */}
            <article className="min-w-0 pt-4">
              <p className="text-[#9A9690] text-lg leading-relaxed mb-12 border-l-2 border-[#C4953A]/40 pl-5 italic">
                {post.description}
              </p>
              <div className="space-y-7">
                {post.blocks.map((block, i) => (
                  <ContentBlock key={i} block={block} />
                ))}
              </div>

              {/* Author card */}
              <div className="mt-16 p-6 border border-[#1E1E1E] rounded-xl bg-[#0A0A0A] flex flex-col sm:flex-row gap-5">
                <div className="w-14 h-14 rounded-full bg-[#C4953A]/15 flex items-center justify-center shrink-0">
                  <span className="text-[#C4953A] font-bold text-lg">RG</span>
                </div>
                <div>
                  <p className="text-[#EDE8DC] font-semibold mb-1">The Rabadi Group</p>
                  <p className="text-[#5A5550] text-sm leading-relaxed mb-3">
                    Ramzi and Christopher Rabadi — father-and-son real estate team based in Claremont, CA. $100M+ in closed transactions, 20+ years in Southern California real estate, 5.0 Zillow rating.
                  </p>
                  <a href={BUSINESS.phoneHref} className="btn btn-gold btn-sm">Call {BUSINESS.phone}</a>
                </div>
              </div>
            </article>

            {/* Sticky sidebar */}
            <aside className="lg:sticky lg:top-28 space-y-5 pt-4">
              {/* CTA card */}
              <div className="card p-6 border-[#C4953A]/20">
                <span className="eyebrow mb-3 block">Free Consultation</span>
                <h3 className="text-lg font-bold text-[#EDE8DC] mb-3 leading-snug">
                  Questions About the {post.city} Market?
                </h3>
                <p className="text-[#5A5550] text-sm leading-relaxed mb-5">
                  Call or text Ramzi or Christopher directly. We give real answers, not automated responses.
                </p>
                <div className="flex flex-col gap-3">
                  <a href={BUSINESS.phoneHref} className="btn btn-gold w-full">
                    Call {BUSINESS.phone}
                  </a>
                  <a href={BUSINESS.smsHref} className="btn btn-outline w-full">
                    Text Us
                  </a>
                </div>
              </div>

              {/* Related guides */}
              <div className="space-y-3">
                <p className="text-[10px] text-[#3A3834] uppercase tracking-widest font-bold">More Guides</p>
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="block p-4 card hover:border-[#C4953A]/40 transition-colors"
                  >
                    <p className="text-[10px] text-[#C4953A] uppercase tracking-wider mb-1">{r.category}</p>
                    <p className="text-[#EDE8DC] text-sm font-semibold leading-snug hover:text-[#D4A84A] transition-colors">
                      {r.title}
                    </p>
                    <p className="text-[#3A3834] text-[10px] mt-1.5">{r.readTime}</p>
                  </Link>
                ))}
                <Link href="/blog" className="block text-center text-[#C4953A] text-xs font-bold hover:text-[#D4A84A] pt-2">
                  View All Guides →
                </Link>
              </div>

              {/* Quick links */}
              <div className="card p-5 space-y-2">
                <p className="text-[10px] text-[#3A3834] uppercase tracking-widest font-bold mb-3">Our Services</p>
                {[
                  { label: "Buying a Home", href: "/buyers" },
                  { label: "Selling a Home", href: "/sellers" },
                  { label: "Commercial & Investment", href: "/commercial" },
                  { label: "View Properties", href: "/listings" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="flex items-center justify-between py-1.5 text-[#7A7570] hover:text-[#C4953A] transition-colors text-sm border-b border-[#1A1A1A] last:border-0">
                    {l.label}
                    <span className="text-[#2A2824]">→</span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related posts full grid */}
      <section className="py-16 bg-[#080808] border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <h2 className="text-xl font-semibold text-[#EDE8DC] mb-8">More Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="card group flex flex-col hover:border-[#C4953A]/40 transition-colors">
                <div className="relative h-40 overflow-hidden">
                  <Image src={r.image} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="400px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[#C4953A] text-[10px] uppercase tracking-widest mb-2">{r.category}</p>
                  <h3 className="text-[#EDE8DC] font-semibold text-sm leading-snug mb-2 group-hover:text-[#D4A84A] transition-colors flex-1">{r.title}</h3>
                  <p className="text-[#3A3834] text-[10px] mt-auto">{r.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ContentBlock({ block }: { block: BlockType }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-[clamp(1.3rem,2.5vw,1.7rem)] font-bold text-[#EDE8DC] mt-12 mb-4 first:mt-0 pb-3 border-b border-[#1A1A1A]">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-lg font-bold text-[#EDE8DC] mt-8 mb-3">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-[#8A8680] leading-[1.85] text-base">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-2.5 pl-0">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[#8A8680] text-sm leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C4953A]/60 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "stat-grid":
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
          {block.stats.map((s, i) => (
            <div key={i} className="card p-5 text-center">
              <p className="text-2xl font-bold text-[#C4953A] serif mb-1">{s.value}</p>
              <p className="text-[#EDE8DC] text-xs font-semibold mb-0.5">{s.label}</p>
              {s.sub && <p className="text-[#3A3834] text-[10px]">{s.sub}</p>}
            </div>
          ))}
        </div>
      );
    case "callout":
      return (
        <div className="my-8 border-l-4 border-[#C4953A] bg-[#C4953A]/5 rounded-r-xl p-5">
          <p className="text-[#C4953A] text-sm leading-relaxed font-medium">{block.text}</p>
        </div>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-xl border border-[#1E1E1E]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                {block.head.map((h, i) => (
                  <th key={i} className="text-left px-5 py-3 text-[#5A5550] text-[10px] uppercase tracking-widest font-bold bg-[#0A0A0A]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-[#151515] last:border-0 hover:bg-[#0A0A0A] transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-5 py-3.5 ${j === 0 ? "text-[#EDE8DC] font-semibold" : "text-[#7A7570]"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}
