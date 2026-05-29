export const site = {
  name: "TIANHUI Group",
  nameZh: "天晖集团",            // Logo 旁第一行
  nameEn: "TIANHUI GROUP",       // Logo 旁第二行（全大写）
  shortName: "TIANHUI",
  /** 完整品牌 logo（页头、页脚）；JPG 兼容性最好，SVG 见 /tianhui-logo.svg */
  logoSrc: "/logo-2.svg",
  logoAlt: "TIANHUI Group — 天晖集团",
  /** 浏览器标签图标（仅图形 emblem） */
  faviconSrc: "/favicon.svg",
  legalName: "TIANHUI (Hebei) Supply Chain Management Group Co., Ltd.",
  tagline: "Reliable Plastic Resin Solutions for the World",
  description:
    "TIANHUI Group is an integrated plastic resin trading and supply chain company based in Qinhuangdao, China. Wesupply PE, PP, ABS and PS resins to global manufacturers.",
  email: "customer@tianhuiplastics.com",
  phone: "+44 7709954687",
  address: "No.40 Yansai Avenue, Haigang District, Qinhuangdao City, Hebei Province, China",
  founded: 2004,
  domain: "tianhuiplastics.com",
};

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about/company-profile/",
    children: [
      {
        label: "Company Profile",
        href: "/about/company-profile/",
        description: "Who we are and what we do",
      },
      {
        label: "Factory & Capability",
        href: "/about/factory-capability/",
        description: "Logistics park, warehouses, equipment",
      },
      {
        label: "Awards & Recognitions",
        href: "/about/awards-recognitions/",
        description: "Certifications and quality reports",
      },
      {
        label: "Our History",
        href: "/about/our-history/",
        description: "Milestones since 2004",
      },
      {
        label: "TIANHUI Values",
        href: "/about/tianhui-values/",
        description: "Our mission, vision and values",
      },
    ],
  },
  {
    label: "Products",
    href: "/products/",
    children: [
      {
        label: "Products & Services",
        href: "/products/",
        description: "Core resin product lines",
      },
      {
        label: "Polyethylene (PE)",
        href: "/products/pe/",
        description: "LLDPE, LDPE, HDPE",
      },
      {
        label: "Polypropylene (PP)",
        href: "/products/polypropylene/",
        description: "Homo, copolymer, fibre, pipe, raffia",
      },
      {
        label: "ABS Resin",
        href: "/products/abs/",
        description: "General-purpose ABS grades",
      },
      {
        label: "Polystyrene (PS)",
        href: "/products/polystyrene/",
        description: "GPPS, HIPS",
      },
    ],
  },
  {
    label: "Market & Marketing",
    href: "/market-marketing/long-term-strategic-partners/",
    children: [
      {
        label: "Long-term Strategic Partners",
        href: "/market-marketing/long-term-strategic-partners/",
        description: "Upstream and downstream partnerships",
      },
    ],
  },
  {
    label: "International Trade",
    href: "/international-trade/market-introduction/",
    children: [
      {
        label: "Market Introduction",
        href: "/international-trade/market-introduction/",
        description: "Import & export footprint",
      },
    ],
  },
  {
    label: "Sustainability",
    href: "/sustainability/our-initiatives-in-china/",
    children: [
      {
        label: "Our Initiatives in China",
        href: "/sustainability/our-initiatives-in-china/",
        description: "Public welfare projects",
      },
      {
        label: "People & Community",
        href: "/sustainability/people-and-community/",
        description: "Care and community building",
      },
    ],
  },
  {
    label: "News",
    href: "/news/company-news/",
    children: [
      {
        label: "Company News",
        href: "/news/company-news/",
        description: "Corporate updates and exhibitions",
      },
      {
        label: "Global News",
        href: "/news/global-news/",
        description: "Industry and market updates",
      },
    ],
  },
  // { label: "Contact", href: "/contact/" },
];
