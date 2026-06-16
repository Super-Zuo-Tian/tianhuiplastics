export type NewsCategory = "company" | "global";

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** 中文标题 */
  titleZh?: string;
  /** 中文摘要 */
  excerptZh?: string;
  /** 中文标签 */
  tagsZh?: string[];
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
    titleZh: "天晖集团参加 2024 国际橡塑展（CHINAPLAS）",
    excerpt:
      "Our international sales team met with partners from over 20 countries and presented our HDPE, PP and ABS resin portfolios.",
    excerptZh:
      "公司国际销售团队在上海与来自 20 多个国家和地区的客户交流，集中展示了 HDPE、PP 与 ABS 等树脂产品。",
    date: "2024-04-25",
    category: "company",
    tags: ["Exhibition", "Marketing"],
    tagsZh: ["展会", "市场"],
  },
  {
    slug: "new-export-route-to-southeast-asia",
    title: "New direct export route launched to Southeast Asia",
    titleZh: "面向东南亚的直达出口通道开通",
    excerpt:
      "TIANHUI completes its first FCL shipments of HDPE and PP grades from Qinhuangdao port directly to Vietnam and Indonesia.",
    excerptZh:
      "天晖完成首批 HDPE 与 PP 牌号整柜货物，从秦皇岛港直发越南与印度尼西亚。",
    date: "2024-02-12",
    category: "company",
    tags: ["Logistics", "Export"],
    tagsZh: ["物流", "出口"],
  },
  {
    slug: "qinhuangdao-logistics-park-expansion",
    title: "Tianhui Logistics Park expansion reaches phase two",
    titleZh: "天晖物流园区扩建进入二期",
    excerpt:
      "An additional 12,000 m² of warehousing comes online to support growing domestic and international demand.",
    excerptZh:
      "新增约 12,000 平方米仓储投入使用，以支持不断增长的国内外需求。",
    date: "2023-11-08",
    category: "company",
    tags: ["Infrastructure"],
    tagsZh: ["基础设施"],
  },
  {
    slug: "global-pe-market-outlook-2024",
    title: "Global polyethylene market outlook for 2024",
    titleZh: "2024 年全球聚乙烯市场展望",
    excerpt:
      "Demand for HDPE pipe and film grades continues to grow across Southeast Asia and the Middle East.",
    excerptZh:
      "东南亚与中东地区对 HDPE 管材与薄膜牌号的需求持续增长。",
    date: "2024-03-18",
    category: "global",
    tags: ["Market"],
    tagsZh: ["市场"],
  },
  {
    slug: "polypropylene-capacity-additions",
    title: "Polypropylene capacity additions in the Asia-Pacific region",
    titleZh: "亚太地区聚丙烯新增产能",
    excerpt:
      "Multiple new PP plants commissioned this year reshape pricing across the region.",
    excerptZh:
      "今年区域内多套聚丙烯新装置陆续投产，对区域价格形成影响。",
    date: "2024-01-22",
    category: "global",
    tags: ["Industry"],
    tagsZh: ["行业"],
  },
];

export function getPostsByCategory(category: NewsCategory): NewsPost[] {
  return newsPosts
    .filter((p) => p.category === category)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
