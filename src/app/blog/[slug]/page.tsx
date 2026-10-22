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
        <header className="bg-oak text-paper">
          <div className="wrap pb-12 pt-10 md:pb-16 md:pt-16">
            <Link href="/blog" className="text-sage no-underline hover:text-paper">
              All guides
            </Link>
            <h1 className="mt-6 max-w-[20ch] text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05]">{post.title}</h1>
            <p className="mt-5 text-sage">
              By Ramzi and Christopher Rabadi, {formatDate(post.publishedAt, "full")}, {post.readTime}
            </p>
          </div>
        </header>
        <div className="wrap">
          <div className="relative -mt-0 aspect-[16/8] overflow-hidden rounded-b-[16px] bg-stone md:aspect-[21/8]">
            <Image src={post.image} alt="" fill preload sizes="100vw" className="object-cover" />
          </div>
        </div>

        <div className="wrap section !pt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div className="min-w-0 max-w-[42rem]">
            <p className="lead">{post.description}</p>
            <div className="mt-8 space-y-6">
              {post.blocks.map((block, i) => (
                <ContentBlock key={i} block={block} />
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
            <div className="rounded-[16px] bg-oak p-6 text-paper">
              <p className="font-serif text-[1.6rem] leading-tight">Questions about {post.city}?</p>
              <p className="mt-2 text-sage">Call or text Ramzi or Christopher. Real answers, usually the same day.</p>
              <div className="mt-5 grid gap-3">
                <a href={BUSINESS.phoneHref} className="btn btn-brass w-full">
                  Call {BUSINESS.phone}
                </a>
                <a href={BUSINESS.smsHref} className="btn btn-line w-full">
                  Text us
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section className="section bg-stone">
        <div className="wrap">
          <h2 className="h-section mb-10">More guides</h2>
          <ul className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="group block no-underline">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-paper">
                    <Image src={r.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <h3 className="mt-4 text-[1.4rem] leading-tight group-hover:text-brass-ink">{r.title}</h3>
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
        <ul className="list-disc space-y-2 pl-5 marker:text-brass-ink">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1 leading-[1.6]">
              {item}
            </li>
          ))}
        </ul>
      );
    case "stat-grid":
      return (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-6 md:grid-cols-3">
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
      return <p className="border-l-2 border-brass bg-stone px-5 py-4 text-[1.05rem]">{block.text}</p>;
    case "table":
      return (
        <div className="overflow-x-auto rounded-[12px] border border-line">
          <table className="w-full min-w-[480px] border-collapse text-[0.97rem]">
            <thead className="bg-stone">
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
                <tr key={i} className="border-t border-line">
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
