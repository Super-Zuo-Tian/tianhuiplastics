export type ProductGrade = {
  name: string;
  description?: string;
  applications?: string[];
  /** 中文牌号名称 */
  nameZh?: string;
  /** 中文描述 */
  descriptionZh?: string;
  /** 中文应用 */
  applicationsZh?: string[];
  /** Future hook: { property: string; value: string }[] */
  specs?: { property: string; value: string }[];
  /** Optional image inside /public/products/<family>/<slug>.jpg */
  image?: string;
};

export type ProductFamily = {
  slug: string;
  /** English display name */
  name: string;
  /** Chinese reference name (kept for traceability against source materials) */
  cnName: string;
  /** Short abbreviation, shown in nav and tags */
  abbreviation: string;
  /** One-line summary (hero) */
  summary: string;
  /** 中文一句话摘要 */
  summaryZh?: string;
  /** Long-form description shown on the product family page */
  description: string;
  /** 中文详细描述 */
  descriptionZh?: string;
  /** Typical end-uses */
  applications: string[];
  /** 中文典型应用 */
  applicationsZh?: string[];
  /** Subcategories defined in the source 产品类别.xlsx */
  grades: ProductGrade[];
  /** Cover gradient (Tailwind classes) used when no image is provided yet */
  cover: string;
};

/** Cover photos for PE, PP, ABS and PS — used on the homepage, catalogue and family pages */
export const productFamilyImages: Record<string, string> = {
  pe: "/images/products/pe-1.webp",
  polypropylene: "/images/products/pp-1.webp",
  abs: "/images/products/abs-1.webp",
  polystyrene: "/images/products/ps-1.webp",
};

export const productFamilies: ProductFamily[] = [
  {
    slug: "pe",
    name: "Polyethylene (PE)",
    cnName: "聚乙烯（PE）",
    abbreviation: "PE",
    summary:
      "Linear (LLDPE), high-pressure (LDPE) and low-pressure (HDPE) polyethylene grades for film, pipe, blow moulding, rotomoulding and injection.",
    summaryZh:
      "涵盖线性（LLDPE）、高压（LDPE）与高密度（HDPE）聚乙烯牌号，适用于薄膜、管材、吹塑、滚塑及注塑等领域。",
    description:
      "Polyethylene is TIANHUI's broadest product line, spanning LLDPE, LDPE and HDPE. Together they cover film, packaging, pipe, blow moulding, rotomoulding and injection applications, sourced from leading Chinese petrochemical producers with full traceability and stable monthly volumes.",
    descriptionZh:
      "聚乙烯是天晖产品线中覆盖面较广的一类，包含 LLDPE、LDPE 与 HDPE，可满足薄膜、包装、管材、吹塑、滚塑与注塑等多种应用。货源来自国内大型石化生产企业，来源可追溯，月度供应量稳定。",
    applications: [
      "Packaging and agricultural film",
      "Pressure pipes and conduits",
      "Blow-moulded bottles and drums",
      "Rotomoulded tanks, caps and housewares",
    ],
    applicationsZh: [
      "包装与农用薄膜",
      "压力管材与穿线管",
      "吹塑瓶与桶",
      "滚塑水箱、瓶盖与日用品",
    ],
    grades: [
      {
        name: "LLDPE — Linear Low-Density Polyethylene",
        nameZh: "LLDPE — 线性低密度聚乙烯",
        description:
          "Combines toughness, tear resistance and excellent processability — rotomoulding, blown / stretch film and injection grades for packaging, agriculture and rotomoulded products.",
        descriptionZh:
          "兼具韧性、抗撕裂性与良好的加工性能，提供滚塑、吹膜/拉伸膜及注塑牌号，适用于包装、农业与滚塑制品。",
        applications: [
          "Stretch and shrink films",
          "Agricultural and greenhouse films",
          "Rotomoulded water tanks",
          "Toys and housewares",
        ],
        applicationsZh: [
          "拉伸膜与收缩膜",
          "农用与大棚薄膜",
          "滚塑水箱",
          "玩具与日用品",
        ],
      },
      {
        name: "LDPE — Low-Density Polyethylene",
        nameZh: "LDPE — 低密度聚乙烯",
        description:
          "High-pressure process resin with outstanding clarity, flexibility and seal strength — film, injection and heavy-duty packaging grades.",
        descriptionZh:
          "采用高压工艺，具有良好的透明度、柔韧性与热封强度，提供薄膜、注塑及重包装牌号。",
        applications: [
          "Food and laminated packaging film",
          "Shrink film and overwrap",
          "Heavy-duty industrial bags",
          "Cable insulation and coatings",
        ],
        applicationsZh: [
          "食品与复合包装膜",
          "收缩膜与外裹膜",
          "工业重包装袋",
          "电缆绝缘与涂层",
        ],
      },
      {
        name: "HDPE — High-Density Polyethylene",
        nameZh: "HDPE — 高密度聚乙烯",
        description:
          "Excellent stiffness, chemical resistance and processability — pipe, raffia, film, blow-moulding and injection grades for industrial users and converters.",
        descriptionZh:
          "具有良好的刚性、耐化学性与加工性能，提供管材、拉丝、薄膜、吹塑与注塑牌号，适用于工业用户与加工企业。",
        applications: [
          "PE100 / PE80 pressure pipes",
          "Detergent and industrial bottles",
          "Heavy-duty films and bags",
          "Crates, caps and housewares",
        ],
        applicationsZh: [
          "PE100 / PE80 压力管材",
          "洗涤剂瓶与工业瓶",
          "重型薄膜与袋",
          "周转箱、瓶盖与日用品",
        ],
      },
    ],
    cover: "from-emerald-50 via-white to-slate-100",
  },
  {
    slug: "polypropylene",
    name: "Polypropylene (PP)",
    cnName: "聚丙烯（PP）",
    abbreviation: "PP",
    summary:
      "Homopolymer, copolymer, fibre, pipe and high-flow PP grades for diverse industries.",
    summaryZh:
      "提供均聚、共聚、纤维、管材及高流动等多种聚丙烯牌号，适配多行业需求。",
    description:
      "Polypropylene is one of TIANHUI's largest product lines. We supply homopolymer, block copolymer, random copolymer, fibre, pipe, raffia and high-melt-flow injection grades, covering packaging, automotive, fibre and infrastructure applications.",
    descriptionZh:
      "聚丙烯是天晖规模较大的产品线之一，供应均聚、嵌段共聚、无规共聚、纤维、管材、拉丝及高熔指注塑等牌号，覆盖包装、汽车、纤维与基础设施等应用领域。",
    applications: [
      "Woven bags and FIBC raffia",
      "Non-woven fabric and hygiene fibre",
      "Hot/cold water pipes (PP-R)",
      "Food containers, caps, automotive parts",
    ],
    applicationsZh: [
      "编织袋与吨袋拉丝",
      "无纺布与卫材纤维",
      "冷热水管（PP-R）",
      "食品容器、瓶盖与汽车部件",
    ],
    grades: [
      {
        name: "High-Flow Injection PP",
        nameZh: "高流动注塑聚丙烯",
        description:
          "High melt-flow PP for thin-walled packaging, caps and automotive parts.",
        descriptionZh:
          "高熔指聚丙烯，适用于薄壁包装、瓶盖与汽车部件。",
        applications: ["Thin-wall packaging", "Caps", "Auto interior parts"],
        applicationsZh: ["薄壁包装", "瓶盖", "汽车内饰件"],
      },
      {
        name: "PP Copolymer",
        nameZh: "共聚聚丙烯",
        description:
          "Block / random PP copolymer with improved impact and clarity.",
        descriptionZh:
          "嵌段/无规共聚聚丙烯，具有更好的抗冲击性与透明度。",
        applications: ["Houseware", "Containers", "Automotive components"],
        applicationsZh: ["日用品", "容器", "汽车部件"],
      },
      {
        name: "PP Pipe Grade (PP-R)",
        nameZh: "管材级聚丙烯（PP-R）",
        description:
          "Random copolymer PP-R for hot and cold water plumbing systems.",
        descriptionZh:
          "无规共聚 PP-R，适用于冷热水管道系统。",
        applications: ["Plumbing pipes", "Industrial pipes", "Fittings"],
        applicationsZh: ["给水管道", "工业管道", "管件"],
      },
      {
        name: "PP Homopolymer",
        nameZh: "均聚聚丙烯",
        description:
          "General-purpose PP homopolymer with balanced stiffness and flow.",
        descriptionZh:
          "通用型均聚聚丙烯，刚性与流动性较为均衡。",
        applications: ["Houseware", "Furniture", "Pails"],
        applicationsZh: ["日用品", "家具", "周转桶"],
      },
      {
        name: "PP Raffia",
        nameZh: "拉丝级聚丙烯",
        description:
          "High-tenacity PP raffia for woven bags, ropes and FIBCs.",
        descriptionZh:
          "高强度拉丝聚丙烯，适用于编织袋、绳索与吨袋。",
        applications: ["Woven bags", "FIBCs", "Ropes"],
        applicationsZh: ["编织袋", "吨袋", "绳索"],
      },
      {
        name: "Transparent PP",
        nameZh: "透明聚丙烯",
        description:
          "Random copolymer with nucleator for excellent transparency and gloss.",
        descriptionZh:
          "添加成核剂的无规共聚牌号，具有良好的透明度与光泽。",
        applications: [
          "Transparent containers",
          "Thin-wall packaging",
          "Disposable cups",
        ],
        applicationsZh: ["透明容器", "薄壁包装", "一次性杯具"],
      },
    ],
    cover: "from-amber-50 via-white to-slate-100",
  },
  {
    slug: "abs",
    name: "ABS Resin",
    cnName: "ABS 树脂",
    abbreviation: "ABS",
    summary:
      "Acrylonitrile-Butadiene-Styrene resins with strong impact resistance and surface gloss.",
    summaryZh:
      "丙烯腈-丁二烯-苯乙烯共聚树脂，具有良好的抗冲击性与表面光泽。",
    description:
      "ABS combines toughness, rigidity and excellent surface finish, making it a popular engineering plastic for appliances, automotive parts and electronics. TIANHUI supplies general-purpose, high-impact and electroplating ABS grades from premium domestic producers.",
    descriptionZh:
      "ABS 兼具韧性、刚性与良好的表面质感，是家电、汽车部件与电子产品中常用的工程塑料。天晖供应通用级、高抗冲及电镀级 ABS 牌号，货源来自国内优质生产企业。",
    applications: [
      "Electronics and appliance housings",
      "Automotive interior trims",
      "Helmets and luggage shells",
      "Toys and 3D-printing filaments",
    ],
    applicationsZh: [
      "电子与家电外壳",
      "汽车内饰件",
      "头盔与箱包外壳",
      "玩具与 3D 打印耗材",
    ],
    grades: [
      {
        name: "General-Purpose ABS",
        nameZh: "通用级 ABS",
        description:
          "Balanced impact strength, processability and gloss for the majority of injection-moulded products.",
        descriptionZh:
          "抗冲击性、加工性与光泽较为均衡，适用于多数注塑制品。",
        applications: [
          "Electronics housings",
          "Appliance shells",
          "Office equipment",
        ],
        applicationsZh: ["电子外壳", "家电外壳", "办公设备"],
      },
    ],
    cover: "from-rose-50 via-white to-slate-100",
  },
  {
    slug: "polystyrene",
    name: "Polystyrene (PS)",
    cnName: "聚苯乙烯（PS）",
    abbreviation: "PS",
    summary:
      "GPPS and HIPS resins with stable rheology for packaging, appliances and consumer goods.",
    summaryZh:
      "GPPS 与 HIPS 牌号，流变性能稳定，适用于包装、家电与消费品。",
    description:
      "Polystyrene is a versatile thermoplastic widely used in packaging, electronics housings and household goods. TIANHUI supplies general-purpose polystyrene (GPPS) and high-impact polystyrene (HIPS) grades sourced from leading Chinese petrochemical producers, with full traceability and stable monthly volumes.",
    descriptionZh:
      "聚苯乙烯是一种用途广泛的热塑性塑料，常用于包装、电子外壳与家居用品。天晖供应通用级聚苯乙烯（GPPS）与高抗冲聚苯乙烯（HIPS），货源来自国内大型石化生产企业，来源可追溯，月度供应量稳定。",
    applications: [
      "Disposable tableware and food packaging",
      "Refrigerator and TV housings",
      "Toys and stationery",
      "Optical and lighting components",
    ],
    applicationsZh: [
      "一次性餐具与食品包装",
      "冰箱与电视外壳",
      "玩具与文具",
      "光学与照明部件",
    ],
    grades: [
      {
        name: "GPPS",
        nameZh: "GPPS 通用级聚苯乙烯",
        description:
          "General-purpose polystyrene with excellent transparency and gloss; suitable for injection moulding and extrusion.",
        descriptionZh:
          "通用级聚苯乙烯，具有良好的透明度与光泽，适用于注塑与挤出成型。",
        applications: [
          "Transparent packaging",
          "Disposable cutlery",
          "Optical articles",
        ],
        applicationsZh: ["透明包装", "一次性餐具", "光学制品"],
      },
      {
        name: "HIPS",
        nameZh: "HIPS 高抗冲聚苯乙烯",
        description:
          "High-impact polystyrene modified with rubber for improved toughness, used in appliances and structural parts.",
        descriptionZh:
          "经橡胶改性的高抗冲聚苯乙烯，韧性更佳，适用于家电与结构件。",
        applications: [
          "Refrigerator liners",
          "Television back covers",
          "Toy parts",
        ],
        applicationsZh: ["冰箱内胆", "电视后壳", "玩具部件"],
      },
    ],
    cover: "from-sky-100 via-white to-slate-100",
  },
];

export function getProductFamily(slug: string): ProductFamily | undefined {
  return productFamilies.find((p) => p.slug === slug);
}
