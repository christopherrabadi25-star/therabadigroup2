import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { POSTS, getPost, type BlockType } from "@/lib/posts";
import { BUSINESS, formatDate } from "@/lib/data";

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    image: `${BUSINESS.url}${post.image}`,
    author: { "@type": "Organization", name: BUSINESS.name, url: BUSINESS.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article>
        <header className="relative isolate flex min-h-[70svh] flex-col justify-end overflow-hidden bg-onyx text-ivory">
          <div className="absolute inset-0 -z-10">
            <div className="kenburns absolute inset-0" style={{ animationDuration: "14s" }}>
              <Image src={post.image} alt="" fill preload sizes="100vw" className="object-cover" style={{ filter: "saturate(0.85) contrast(1.06)" }} />
            </div>
            <div className="grade" />
          </div>
          <div className="wrap pb-14 pt-[calc(var(--header-h)+48px)]">
            <Link href="/blog" className="link-line text-ivory/80">
              All guides
            </Link>
            <h1 className="mt-8 max-w-[18ch] text-[clamp(2.4rem,6.5vw,4.6rem)] leading-[1.02]">{post.title}</h1>
            <p className="mt-6 text-ivory/70">
              Ramzi and Christopher Rabadi, {formatDate(post.publishedAt, "full")}, {post.readTime}
            </p>
          </div>
        </header>

        <div className="light">
          <div className="wrap section grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
            <div className="min-w-0 max-w-[42rem]">
              <p className="lead">{post.description}</p>
              <div className="mt-10 space-y-6">
                {post.blocks.map((block, i) => (
                  <ContentBlock key={i} block={block} />
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
              <div className="bg-onyx p-8 text-ivory">
                <p className="font-display text-[1.7rem] leading-tight">Questions about {post.city}?</p>
                <p className="mt-3 text-taupe">Call or text Ramzi or Christopher. A personal reply, usually the same day.</p>
                <div className="mt-6 grid gap-3">
                  <a href={BUSINESS.phoneHref} className="btn btn-gold w-full">
                    {BUSINESS.phone}
                  </a>
                  <a href={BUSINESS.smsHref} className="btn btn-ghost w-full">
                    Text us
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="section bg-onyx">
        <div className="wrap">
          <h2 className="h-section mb-12">More guides</h2>
          <ul className="grid gap-x-8 gap-y-12 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="group block no-underline">
                  <div className="zoom-on-hover relative aspect-[16/11] overflow-hidden bg-coal">
                    <Image src={r.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <h3 className="mt-5 text-[1.5rem] leading-tight transition-colors group-hover:text-champagne">{r.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function ContentBlock({ block }: { block: BlockType }) {
  switch (block.type) {
    case "h2":
      return <h2 className="!mt-12 text-[clamp(1.7rem,4vw,2.2rem)]">{block.text}</h2>;
    case "h3":
      return <h3 className="!mt-8 text-[1.45rem]">{block.text}</h3>;
    case "p":
      return <p className="text-[1.08rem] leading-[1.7]">{block.text}</p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5 marker:text-champagne-deep">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1 leading-[1.6]">
              {item}
            </li>
          ))}
        </ul>
      );
    case "stat-grid":
      return (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-y border-ink/15 py-6 md:grid-cols-3">
          {block.stats.map((s, i) => (
            <div key={i}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="num text-[2rem] leading-none">{s.value}</dd>
              <dd className="mt-1 font-semibold text-[0.95rem]">{s.label}</dd>
              {s.sub && <dd className="text-[0.88rem] text-ink-soft">{s.sub}</dd>}
            </div>
          ))}
        </dl>
      );
    case "callout":
      return <p className="border-l-2 border-champagne-deep bg-sand px-6 py-5 font-display text-[1.25rem] leading-snug">{block.text}</p>;
    case "table":
      return (
        <div className="overflow-x-auto border border-ink/15">
          <table className="w-full min-w-[480px] border-collapse text-[0.97rem]">
            <thead className="bg-sand">
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-ink/12">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 py-3 ${j === 0 ? "font-semibold" : "text-ink-soft"}`}>
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
