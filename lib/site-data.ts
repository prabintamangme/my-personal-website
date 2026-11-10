import type { ContentItem, LearningPath } from "./types";

const demoBody = `This is demonstration copy showing how a published piece will read. Replace it in the admin area with your own research, evidence, analysis, citations, and conclusions.

## A clear structure for careful ideas

Long-form work is presented in a focused reading column with room for headings, quotations, tables, references, and downloadable files. The site is designed to make academic ideas approachable without flattening their complexity.

> Demonstration content is visibly labelled throughout this site and should not be interpreted as Prabin Tamang's published research.

## Next steps

Use the secure admin area to create a draft, preview it, and publish it when it is ready. External work should include its original author, source, URL, and permission status.`;

export const demoContent: ContentItem[] = [
  { id: "demo-thesis", slug: "thesis-publishing-template", title: "Thesis publishing template", subtitle: "A demonstration of the academic publication format", summary: "A removable demonstration showing where an abstract, PDF, references, DOI, and related research will appear.", body: demoBody, type: "Thesis", topic: "Finance & economics", author: "Demonstration content", tags: ["Thesis", "Research"], status: "published", featured: true, abstract: "Demonstration abstract only. Replace this item with the verified title, abstract, institution, date, and file for your thesis.", references: ["Demonstration reference — replace before launch."], publishedAt: "2026-10-18", updatedAt: "2026-10-18", createdAt: "2026-10-18", demo: true },
  { id: "demo-article", slug: "reading-economic-evidence-carefully", title: "Reading economic evidence carefully", summary: "A demonstration article card for clear, evidence-led writing about economics and public decisions.", body: demoBody, type: "Article", topic: "Economics", author: "Demonstration content", tags: ["Evidence", "Economics"], status: "published", featured: true, references: [], publishedAt: "2026-10-09", updatedAt: "2026-10-09", createdAt: "2026-10-09", demo: true },
  { id: "demo-blog", slug: "notes-on-building-a-research-practice", title: "Notes on building a research practice", summary: "A demonstration journal entry about reading with purpose, documenting assumptions, and revisiting questions.", body: demoBody, type: "Journal entry", topic: "Research methods", author: "Demonstration content", tags: ["Methods", "Learning"], status: "published", featured: false, references: [], publishedAt: "2026-09-27", updatedAt: "2026-09-27", createdAt: "2026-09-27", demo: true },
  { id: "demo-newsletter", slug: "field-notes-edition-zero", title: "Field Notes — Edition Zero", summary: "A demonstration newsletter edition combining one research idea, one useful method, and one question to carry forward.", body: demoBody, type: "Newsletter edition", topic: "Finance & economics", author: "Demonstration content", tags: ["Newsletter", "Reading notes"], status: "published", featured: false, references: [], publishedAt: "2026-09-12", updatedAt: "2026-09-12", createdAt: "2026-09-12", demo: true },
  { id: "demo-curated", slug: "curated-work-attribution-template", title: "Curated work attribution template", summary: "A demonstration of the visible attribution and outbound-link treatment used for another author's work.", body: "This is an attributed summary template, not a republication. Replace it with your own commentary and the verified source details.", type: "Curated external work", topic: "Research methods", author: "Original author placeholder", tags: ["Curated", "Attribution"], status: "published", featured: false, externalKind: "Attributed summary and external link", sourceName: "Original publication placeholder", sourceUrl: "https://example.com", permissionNote: "Full text is not hosted. Link and summary only.", references: [], publishedAt: "2026-08-30", updatedAt: "2026-08-30", createdAt: "2026-08-30", demo: true },
];

export const demoLearningPaths: LearningPath[] = [
  { id: "foundations", slug: "finance-foundations", title: "Finance foundations", description: "A demonstration learning path for building a careful vocabulary around value, risk, and time.", topic: "Finance", difficulty: "Beginner", demo: true, lessons: [
    { id: "time-value", slug: "time-value-of-money", title: "1. Time and value", summary: "Understand why timing changes the meaning of a cash flow." },
    { id: "risk-return", slug: "risk-and-return", title: "2. Risk and return", summary: "Separate uncertainty, expected return, and compensation for risk." },
    { id: "reading-statements", slug: "reading-financial-statements", title: "3. Reading statements", summary: "A first pass through connected financial statements." },
  ] },
  { id: "research", slug: "research-methods-starter", title: "Research methods starter", description: "A demonstration path from a focused question to transparent evidence and a readable result.", topic: "Research methods", difficulty: "Beginner", demo: true, lessons: [
    { id: "question", slug: "forming-a-research-question", title: "1. Form a research question", summary: "Turn a broad interest into a specific, answerable question." },
    { id: "literature", slug: "mapping-the-literature", title: "2. Map the literature", summary: "Build a useful map without turning notes into an archive." },
    { id: "evidence", slug: "documenting-evidence", title: "3. Document evidence", summary: "Record sources, assumptions, transformations, and limits." },
  ] },
];

export const draftServices = [
  ["Finance and economics research support", "Support with defining questions, organizing evidence, and communicating findings.", "Students, independent researchers, and mission-led teams"],
  ["Research summaries and literature reviews", "Clear, attributed syntheses designed to make a body of work easier to navigate.", "Readers, researchers, and educators"],
  ["Educational writing and learning support", "Structured explanations and learning materials for finance, economics, and research methods.", "Students and lifelong learners"],
] as const;
