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
  legalNameZh: "天晖（河北）供应链管理集团有限公司",
  tagline: "Reliable Plastic Resin Solutions for the World",
  description:
    "TIANHUI Group is an integrated plastic resin trading and supply chain company based in Qinhuangdao, China. Wesupply PE, PP, ABS and PS resins to global manufacturers.",
  email: "customer@tianhuiplastics.com",
  phone: "+44 7709954687",
  address: "No.40 Yansai Avenue, Haigang District, Qinhuangdao City, Hebei Province, China",
  addressZh: "河北省秦皇岛市海港区燕塞大街 40 号",
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

/* ------------------------------------------------------------------ */
/* 中文版（/zh/）导航与界面文案                                          */
/* ------------------------------------------------------------------ */

export const primaryNavZh: NavItem[] = [
  { label: "首页", href: "/zh/" },
  {
    label: "关于我们",
    href: "/zh/about/company-profile/",
    children: [
      {
        label: "公司简介",
        href: "/zh/about/company-profile/",
        description: "我们是谁，我们做什么",
      },
      {
        label: "园区与能力",
        href: "/zh/about/factory-capability/",
        description: "物流园区、仓储与设备",
      },
      {
        label: "资质与荣誉",
        href: "/zh/about/awards-recognitions/",
        description: "认证证书与质量管理",
      },
      {
        label: "发展历程",
        href: "/zh/about/our-history/",
        description: "2004 年至今的发展足迹",
      },
      {
        label: "天晖价值观",
        href: "/zh/about/tianhui-values/",
        description: "使命、愿景与价值观",
      },
    ],
  },
  {
    label: "产品中心",
    href: "/zh/products/",
    children: [
      {
        label: "产品与服务",
        href: "/zh/products/",
        description: "核心树脂产品系列",
      },
      {
        label: "聚乙烯（PE）",
        href: "/zh/products/pe/",
        description: "LLDPE、LDPE、HDPE",
      },
      {
        label: "聚丙烯（PP）",
        href: "/zh/products/polypropylene/",
        description: "均聚、共聚、纤维、管材、拉丝",
      },
      {
        label: "ABS 树脂",
        href: "/zh/products/abs/",
        description: "通用级 ABS 牌号",
      },
      {
        label: "聚苯乙烯（PS）",
        href: "/zh/products/polystyrene/",
        description: "GPPS、HIPS",
      },
    ],
  },
  {
    label: "市场与营销",
    href: "/zh/market-marketing/long-term-strategic-partners/",
    children: [
      {
        label: "长期战略合作伙伴",
        href: "/zh/market-marketing/long-term-strategic-partners/",
        description: "上下游合作关系",
      },
    ],
  },
  {
    label: "国际贸易",
    href: "/zh/international-trade/market-introduction/",
    children: [
      {
        label: "市场介绍",
        href: "/zh/international-trade/market-introduction/",
        description: "进出口业务概览",
      },
    ],
  },
  {
    label: "社会责任",
    href: "/zh/sustainability/our-initiatives-in-china/",
    children: [
      {
        label: "公益实践",
        href: "/zh/sustainability/our-initiatives-in-china/",
        description: "国内公益项目",
      },
      {
        label: "员工与社区",
        href: "/zh/sustainability/people-and-community/",
        description: "关爱员工与社区建设",
      },
    ],
  },
  {
    label: "新闻资讯",
    href: "/zh/news/company-news/",
    children: [
      {
        label: "公司新闻",
        href: "/zh/news/company-news/",
        description: "企业动态与展会活动",
      },
      {
        label: "全球资讯",
        href: "/zh/news/global-news/",
        description: "行业与市场动态",
      },
    ],
  },
];

export type Lang = "en" | "zh";

/** 界面通用文案（页头 / 页脚 / 通用按钮） */
export const ui = {
  en: {
    quote: "Get a Quote",
    home: "/",
    contact: "/contact/",
    openMenu: "Open main menu",
    closeMenu: "Close menu",
    footerAbout: "About",
    footerProducts: "Products",
    footerCompany: "Company",
    footerNewsContact: "News & Contact",
    footerEmail: "Email",
    footerPhone: "Phone",
    footerAddress: "Address",
    rights: "All rights reserved.",
    description: site.description,
  },
  zh: {
    quote: "获取报价",
    home: "/zh/",
    contact: "/zh/contact/",
    openMenu: "打开主菜单",
    closeMenu: "关闭菜单",
    footerAbout: "关于我们",
    footerProducts: "产品中心",
    footerCompany: "业务与责任",
    footerNewsContact: "新闻与联系",
    footerEmail: "邮箱",
    footerPhone: "电话",
    footerAddress: "地址",
    rights: "版权所有。",
    description:
      "天晖集团是一家以塑料原料销售为主、集供应链服务于一体的综合性企业，总部位于河北省秦皇岛市，为国内外制造企业提供 PE、PP、ABS、PS 等树脂原料及供应链服务。",
  },
} as const;

export const footerSectionsZh: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "关于我们",
    links: [
      { label: "公司简介", href: "/zh/about/company-profile/" },
      { label: "园区与能力", href: "/zh/about/factory-capability/" },
      { label: "资质与荣誉", href: "/zh/about/awards-recognitions/" },
      { label: "发展历程", href: "/zh/about/our-history/" },
      { label: "天晖价值观", href: "/zh/about/tianhui-values/" },
    ],
  },
  {
    title: "产品中心",
    links: [
      { label: "产品与服务", href: "/zh/products/" },
      { label: "聚乙烯（PE）", href: "/zh/products/pe/" },
      { label: "聚丙烯（PP）", href: "/zh/products/polypropylene/" },
      { label: "ABS 树脂", href: "/zh/products/abs/" },
      { label: "聚苯乙烯（PS）", href: "/zh/products/polystyrene/" },
    ],
  },
  {
    title: "业务与责任",
    links: [
      {
        label: "长期战略合作伙伴",
        href: "/zh/market-marketing/long-term-strategic-partners/",
      },
      {
        label: "国际贸易",
        href: "/zh/international-trade/market-introduction/",
      },
      {
        label: "公益实践",
        href: "/zh/sustainability/our-initiatives-in-china/",
      },
      {
        label: "员工与社区",
        href: "/zh/sustainability/people-and-community/",
      },
    ],
  },
  {
    title: "新闻与联系",
    links: [
      { label: "公司新闻", href: "/zh/news/company-news/" },
      { label: "全球资讯", href: "/zh/news/global-news/" },
      { label: "联系方式", href: "/zh/contact/" },
    ],
  },
];
