export const contentTypes = ["Blog post", "Article", "Research paper", "Thesis", "Journal entry", "Newsletter edition", "Curated external work"] as const;
export type ContentType = (typeof contentTypes)[number];

export type ContentItem = {
  id: string; slug: string; title: string; subtitle?: string | null; summary: string; body: string;
  type: ContentType; topic: string; author: string; tags: string[]; status: "draft" | "published";
  featured: boolean; externalKind?: string | null; sourceName?: string | null; sourceUrl?: string | null;
  permissionNote?: string | null; abstract?: string | null; references: string[]; doi?: string | null;
  attachmentKey?: string | null; publishedAt?: string | null; updatedAt: string; createdAt: string; demo?: boolean;
};

export type LearningPath = {
  id: string; slug: string; title: string; description: string; topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessons: { id: string; slug: string; title: string; summary: string }[]; demo?: boolean;
};
