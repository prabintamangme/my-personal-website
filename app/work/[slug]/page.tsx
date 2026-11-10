import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { CopyLink } from "@/components/copy-link";
import { getContentBySlug } from "@/lib/data";
import { freePdf, primaryCtaLabel } from "@/lib/subscription";

type Props = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const item = await getContentBySlug((await params).slug);
  if (!item) return {title: "Work not found"};
  return {title: item.title, description: item.summary};
}

export default async function WorkPage({params}: Props) {
  const item = await getContentBySlug((await params).slug);
  if (!item) notFound();
  const date = item.publishedAt ?? item.updatedAt;
  return <article>
    <header className="page-hero"><div className="narrow stack">
      <div className="meta"><span className="pill">{item.type}</span>{item.demo && <span className="pill demo">Demonstration</span>}<span>{item.topic}</span></div>
      <h1>{item.title}</h1>
      {item.subtitle && <p className="lede">{item.subtitle}</p>}
      <p className="lede">{item.summary}</p>
      <div className="meta"><span>By {item.author}</span><span aria-hidden="true">·</span><time dateTime={date}>{new Intl.DateTimeFormat("en", {dateStyle: "long"}).format(new Date(date))}</time></div>
    </div></header>
    <section className="section"><div className="shell article-shell">
      <div className="stack" style={{gap: "2rem"}}>
        {item.demo && <div className="attribution"><strong>Demonstration content</strong><p>This layout preview is not a published claim or source. Replace it through the admin area before launch.</p></div>}
        {item.type === "Curated external work" && <div className="attribution"><strong>Work by another author</strong><p>{item.externalKind ?? "Attributed summary and external link"}.</p>{item.sourceUrl && <p><a className="rule-link" href={item.sourceUrl} rel="noopener noreferrer" target="_blank">Read the original at {item.sourceName ?? "the source"}</a></p>}{item.permissionNote && <p className="muted">{item.permissionNote}</p>}</div>}
        {item.abstract && <section className="stack"><h2 style={{fontSize: "2rem"}}>Abstract</h2><p className="lede">{item.abstract}</p></section>}
        <ArticleBody body={item.body} />
        {item.references.length > 0 && <section className="stack"><h2 style={{fontSize: "2rem"}}>References</h2><ol>{item.references.map(reference => <li key={reference}>{reference}</li>)}</ol></section>}
        <section className="card stack"><span className="eyebrow">Want to keep learning?</span><h2 style={{fontSize: "2.25rem"}}>Continue with LEARNINGEVERGROW.</h2><p>{freePdf ? `Subscribe for new articles and resources, and get your free copy of ${freePdf.title}.` : "Subscribe for new articles and learning resources."}</p><div><Link className="btn accent" href="/#subscribe">{primaryCtaLabel}</Link></div></section>
      </div>
      <aside className="article-aside" aria-label="Article details">
        <CopyLink />
        {item.sourceUrl && <a className="btn secondary small" href={item.sourceUrl} rel="noopener noreferrer" target="_blank">Original source</a>}
        {item.attachmentKey && <a className="btn secondary small" href={`/api/files/${encodeURIComponent(item.attachmentKey)}`}>Download attachment</a>}
        {item.doi && <a className="rule-link" href={`https://doi.org/${item.doi}`} rel="noopener noreferrer" target="_blank">DOI: {item.doi}</a>}
      </aside>
    </div></section>
  </article>;
}
