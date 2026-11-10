"use client";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ContentCard } from "./content-card";
import type { ContentItem } from "@/lib/types";

export function ContentBrowser({ items, initialType = "All" }: { items: ContentItem[]; initialType?: string }) {
  const router = useRouter(), pathname = usePathname(), params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? ""); const [type, setType] = useState(params.get("type") ?? initialType);
  const [topic, setTopic] = useState(params.get("topic") ?? "All"); const [year, setYear] = useState(params.get("year") ?? "All");
  const [order, setOrder] = useState(params.get("sort") ?? "newest"); const [limit, setLimit] = useState(6);
  const topics = ["All", ...Array.from(new Set(["Finance", "Economics", "Current Events Explained", "Learning Resources", "Recommended Reading", ...items.map(x => x.topic)]))]; const years = ["All", ...Array.from(new Set(items.map(x => new Date(x.publishedAt ?? x.updatedAt).getFullYear().toString())))];
  function sync(next: Record<string,string>) { const search = new URLSearchParams(params.toString()); Object.entries(next).forEach(([k,v]) => v === "All" || !v ? search.delete(k) : search.set(k,v)); router.replace(`${pathname}?${search.toString()}`, { scroll: false }); }
  const filtered = useMemo(() => items.filter(item => {
    const haystack = `${item.title} ${item.summary} ${item.author} ${item.tags.join(" ")}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (type === "All" || item.type === type) && (topic === "All" || item.topic === topic) && (year === "All" || new Date(item.publishedAt ?? item.updatedAt).getFullYear().toString() === year);
  }).sort((a,b) => (order === "oldest" ? 1 : -1) * ((a.publishedAt ?? a.updatedAt).localeCompare(b.publishedAt ?? b.updatedAt))), [items,query,type,topic,year,order]);
  return <div>
    <div className="filters" aria-label="Content filters">
      <div className="field"><label htmlFor="search">Search</label><input id="search" className="input" type="search" value={query} placeholder="Title, author, summary, tag…" onChange={e => { setQuery(e.target.value); sync({ q:e.target.value }); }} /></div>
      <div className="field"><label htmlFor="type">Type</label><select id="type" className="input" value={type} onChange={e => { setType(e.target.value); setLimit(6); sync({ type:e.target.value }); }}><option>All</option>{Array.from(new Set(items.map(x => x.type))).map(x => <option key={x}>{x}</option>)}</select></div>
      <div className="field"><label htmlFor="topic">Topic</label><select id="topic" className="input" value={topic} onChange={e => { setTopic(e.target.value); sync({ topic:e.target.value }); }}>{topics.map(x => <option key={x}>{x}</option>)}</select></div>
      <div className="field"><label htmlFor="year">Year</label><select id="year" className="input" value={year} onChange={e => { setYear(e.target.value); sync({ year:e.target.value }); }}>{years.map(x => <option key={x}>{x}</option>)}</select></div>
    </div>
    <div className="cluster" style={{justifyContent:"space-between", marginBottom:"1.5rem"}}><p className="muted" aria-live="polite">{filtered.length} result{filtered.length === 1 ? "" : "s"}</p><label className="cluster">Sort <select className="input" style={{width:"auto"}} value={order} onChange={e => { setOrder(e.target.value); sync({ sort:e.target.value }); }}><option value="newest">Newest</option><option value="oldest">Oldest</option></select></label></div>
    {filtered.length ? <><div className="grid-3">{filtered.slice(0,limit).map(item => <ContentCard key={item.id} item={item} />)}</div>{limit < filtered.length && <div className="cluster" style={{justifyContent:"center",marginTop:"2rem"}}><button className="btn secondary" onClick={() => setLimit(limit + 6)}>Load more</button></div>}</> : <div className="empty"><h3>{items.length ? "No matching work" : "No articles have been published yet"}</h3><p>{items.length ? "Try a broader search or clear one of the filters." : "Published work will appear here with dates, authorship, and source information."}</p></div>}
  </div>;
}
