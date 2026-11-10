export function ArticleBody({ body }: { body: string }) {
  const blocks=body.split(/\n\s*\n/);
  return <div className="article-body">{blocks.map((block,i)=>block.startsWith("## ")?<h2 id={`section-${i}`} key={i}>{block.slice(3)}</h2>:block.startsWith("> ")?<blockquote key={i}>{block.slice(2)}</blockquote>:<p key={i}>{block}</p>)}</div>;
}
