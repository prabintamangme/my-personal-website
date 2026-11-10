import Link from "next/link";
import type { ContentItem } from "@/lib/types";
export function ContentCard({ item }: { item: ContentItem }) { return <article className="card"><Link className="card-link" href={`/work/${item.slug}`}>
  <div className="meta"><span className="pill">{item.type}</span>{item.demo && <span className="pill demo">Demonstration</span>}<span>{item.topic}</span></div><h3>{item.title}</h3><p className="muted">{item.summary}</p>
  <div className="meta"><span>By {item.author}</span><span aria-hidden="true">·</span><time dateTime={item.publishedAt ?? item.updatedAt}>{new Intl.DateTimeFormat("en", {dateStyle: "medium"}).format(new Date(item.publishedAt ?? item.updatedAt))}</time></div>
  {item.type === "Curated external work" && <div className="attribution"><strong>External work</strong><br /><span className="muted">{item.externalKind}</span></div>}
  </Link></article>; }
