export type NewsCategory = "company" | "global";

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  tags?: string[];
  /** Optional cover image path (e.g. /news/<slug>.jpg) */
  cover?: string;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "tianhui-at-chinaplas-2024",
    title: "TIANHUI Group attends CHINAPLAS 2024 in Shanghai",
    excerpt:
      "Our international sales team met with partners from over 20 countries and presented our HDPE, PP and ABS resin portfolios.",
    date: "2024-04-25",
    category: "company",
    tags: ["Exhibition", "Marketing"],
  },
  {
    slug: "new-export-route-to-southeast-asia",
    title: "New direct export route launched to Southeast Asia",
    excerpt:
      "TIANHUI completes its first FCL shipments of HDPE and PP grades from Qinhuangdao port directly to Vietnam and Indonesia.",
    date: "2024-02-12",
    category: "company",
    tags: ["Logistics", "Export"],
  },
  {
    slug: "qinhuangdao-logistics-park-expansion",
    title: "Tianhui Logistics Park expansion reaches phase two",
    excerpt:
      "An additional 12,000 m² of warehousing comes online to support growing domestic and international demand.",
    date: "2023-11-08",
    category: "company",
    tags: ["Infrastructure"],
  },
  {
    slug: "global-pe-market-outlook-2024",
    title: "Global polyethylene market outlook for 2024",
    excerpt:
      "Demand for HDPE pipe and film grades continues to grow across Southeast Asia and the Middle East.",
    date: "2024-03-18",
    category: "global",
    tags: ["Market"],
  },
  {
    slug: "polypropylene-capacity-additions",
    title: "Polypropylene capacity additions in the Asia-Pacific region",
    excerpt:
      "Multiple new PP plants commissioned this year reshape pricing across the region.",
    date: "2024-01-22",
    category: "global",
    tags: ["Industry"],
  },
];

export function getPostsByCategory(category: NewsCategory): NewsPost[] {
  return newsPosts
    .filter((p) => p.category === category)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
