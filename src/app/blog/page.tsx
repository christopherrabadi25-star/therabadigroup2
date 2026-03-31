import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { POSTS } from "@/lib/posts";
import { BUSINESS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Real Estate Guides & Market Reports | The Rabadi Group",
  description:
    "Local real estate guides for La Verne, Claremont, San Dimas, Glendora, and the San Gabriel Valley. Market data, buyer guides, seller strategies, and neighborhood breakdowns by The Rabadi Group.",
  keywords: [
    "La Verne real estate guide",
    "Claremont CA home buyers guide",
    "SGV real estate market report 2025",
    "San Dimas homes for sale guide",
    "Glendora real estate market",
    "Foothill Cities real estate blog",
    "Rabadi Group market reports",
  ],
};

const categoryColors: Record<string, string> = {
  "Buyers Guide": "text-sky-400 border-sky-400/30 bg-sky-400/5",
  "Sellers Guide": "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  "Market Report": "text-[#C4953A] border-[#C4953A]/30 bg-[#C4953A]/5",
  "Local Guide": "text-violet-400 border-violet-400/30 bg-violet-400/5",
};

export default function BlogPage() {
  const featured = POSTS.find((p) => p.featured)!;
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#C4953A]" />
            <span className="eyebrow">Local Guides & Market Reports</span>
          </div>
          <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-[#EDE8DC] mb-4 max-w-3xl">
            SGV Real Estate Guides.<br />
            <span className="gold-grad">Real Data. Straight Talk.</span>
          </h1>
          <p className="text-[#6A6560] text-lg max-w-xl leading-relaxed">
            Market reports, buyer guides, and neighborhood breakdowns for La Verne, Claremont, San Dimas, Glendora, and the broader San Gabriel Valley.
          </p>
        </div>
      </section>

      <div className="rule-gold" />

      {/* Featured post */}
      <section className="py-14 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="card overflow-hidden grid grid-cols-1 lg:grid-cols-2 hover:border-[#C4953A]/40 transition-colors duration-300">
              <div className="relative h-72 lg:h-auto min-h-[320px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0D0D0D]/60" />
                <div className="absolute top-5 left-5">
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-[#C4953A] text-black px-3 py-1.5 rounded-full">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className={`inline-block text-[10px] font-bold tracking-widest uppercase border px-3 py-1 rounded-full mb-5 w-fit ${categoryColors[featured.category]}`}>
                  {featured.category}
                </span>
                <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-[#EDE8DC] mb-4 leading-snug group-hover:text-[#D4A84A] transition-colors duration-200">
                  {featured.title}
                </h2>
                <p className="text-[#6A6560] text-sm leading-relaxed mb-8 line-clamp-3">
                  {featured.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#C4953A]/20 flex items-center justify-center">
                      <span className="text-[#C4953A] text-xs font-bold">RG</span>
                    </div>
                    <div>
                      <p className="text-[#EDE8DC] text-xs font-semibold">The Rabadi Group</p>
                      <p className="text-[#3A3834] text-[10px]">{featured.readTime} · {featured.publishedAt}</p>
                    </div>
                  </div>
                  <span className="text-[#C4953A] text-sm font-bold group-hover:translate-x-1 transition-transform inline-block">
                    Read Guide →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All posts grid */}
      <section className="pb-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-[#EDE8DC]">All Guides</h2>
            <span className="text-[#3A3834] text-sm">{POSTS.length} articles</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card group flex flex-col hover:border-[#C4953A]/40 transition-colors duration-300"
                style={{ animation: `fadeUp 0.5s ease both ${0.05 * i}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`text-[10px] font-bold tracking-widest uppercase border px-2.5 py-1 rounded-full ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[#3A3834] text-[10px] uppercase tracking-widest mb-2">{post.city}</p>
                  <h3 className="text-[#EDE8DC] font-semibold text-base leading-snug mb-3 group-hover:text-[#D4A84A] transition-colors duration-200 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-[#5A5550] text-xs leading-relaxed line-clamp-2 mb-5">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1E1E1E]">
                    <span className="text-[#3A3834] text-[10px]">{post.readTime}</span>
                    <span className="text-[#C4953A] text-xs font-bold group-hover:translate-x-1 transition-transform inline-block">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#060606] border-t border-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center">
          <span className="eyebrow mb-4">Have Questions?</span>
          <h2 className="text-2xl font-semibold text-[#EDE8DC] mb-4 mt-2">
            These guides are a starting point.<br />A call will give you the real answer.
          </h2>
          <p className="text-[#5A5550] mb-8">Ramzi or Christopher will give you a current, specific read on any property or market in the SGV.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={BUSINESS.phoneHref} className="btn btn-gold btn-lg w-full sm:w-auto">
              Call {BUSINESS.phone}
            </a>
            <a href={BUSINESS.smsHref} className="btn btn-outline btn-lg w-full sm:w-auto">
              Text Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
