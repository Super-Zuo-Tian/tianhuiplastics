import type { NewsPost } from "./news";

export type NewsArticleContent = {
  slug: string;
  title: string;
  contentHtml: string;
  titleZh?: string;
  contentHtmlZh?: string;
};

const modules = import.meta.glob<NewsArticleContent | { default: NewsArticleContent }>(
  "./news-content/*.json",
  { eager: true },
);

const contentBySlug = new Map<string, NewsArticleContent>();
for (const mod of Object.values(modules)) {
  const data = "default" in mod && mod.default ? mod.default : (mod as NewsArticleContent);
  contentBySlug.set(data.slug, data);
}

export function getArticleContent(slug: string): NewsArticleContent | undefined {
  return contentBySlug.get(slug);
}

export function getArticleContentOrFallback(
  post: NewsPost,
  locale: "en" | "zh" = "en",
): NewsArticleContent {
  const found = contentBySlug.get(post.slug);
  if (found) {
    if (locale === "zh") {
      return {
        slug: found.slug,
        title: found.titleZh ?? post.titleZh ?? found.title,
        contentHtml: found.contentHtmlZh ?? found.contentHtml,
      };
    }
    return {
      slug: found.slug,
      title: found.title,
      contentHtml: found.contentHtml,
    };
  }

  if (locale === "zh") {
    return {
      slug: post.slug,
      title: post.titleZh ?? post.title,
      contentHtml: `<p>${post.excerptZh ?? post.excerpt}</p>`,
    };
  }

  return {
    slug: post.slug,
    title: post.title,
    contentHtml: `<p>${post.excerpt}</p>`,
  };
}
