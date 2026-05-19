export type ProductGrade = {
  name: string;
  description?: string;
  applications?: string[];
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
  /** Long-form description shown on the product family page */
  description: string;
  /** Typical end-uses */
  applications: string[];
  /** Subcategories defined in the source 产品类别.xlsx */
  grades: ProductGrade[];
  /** Cover gradient (Tailwind classes) used when no image is provided yet */
  cover: string;
};

export const productFamilies: ProductFamily[] = [
  {
    slug: "polystyrene",
    name: "Polystyrene (PS)",
    cnName: "聚苯乙烯",
    abbreviation: "PS",
    summary:
      "GPPS and HIPS resins with stable rheology for packaging, appliances and consumer goods.",
    description:
      "Polystyrene is a versatile thermoplastic widely used in packaging, electronics housings and household goods. TIANHUI supplies general-purpose polystyrene (GPPS) and high-impact polystyrene (HIPS) grades sourced from leading Chinese petrochemical producers, with full traceability and stable monthly volumes.",
    applications: [
      "Disposable tableware and food packaging",
      "Refrigerator and TV housings",
      "Toys and stationery",
      "Optical and lighting components",
    ],
    grades: [
      {
        name: "GPPS",
        description:
          "General-purpose polystyrene with excellent transparency and gloss; suitable for injection moulding and extrusion.",
        applications: [
          "Transparent packaging",
          "Disposable cutlery",
          "Optical articles",
        ],
      },
      {
        name: "HIPS",
        description:
          "High-impact polystyrene modified with rubber for improved toughness, used in appliances and structural parts.",
        applications: [
          "Refrigerator liners",
          "Television back covers",
          "Toy parts",
        ],
      },
    ],
    cover: "from-sky-100 via-white to-slate-100",
  },
  {
    slug: "hdpe",
    name: "HDPE — High-Density Polyethylene",
    cnName: "低压聚乙烯",
    abbreviation: "HDPE",
    summary:
      "Low-pressure polyethylene grades for pipes, blow moulding, films and injection moulding.",
    description:
      "HDPE (referred to as 低压聚乙烯 in China) offers excellent stiffness, chemical resistance and processability. TIANHUI carries a complete portfolio for pipe extrusion, raffia, film, blow moulding and injection moulding, supporting both bulk industrial users and converters.",
    applications: [
      "PE100 / PE80 pressure pipes",
      "Detergent and industrial bottles",
      "Heavy-duty films and bags",
      "Crates, caps and housewares",
    ],
    grades: [
      {
        name: "Pipe Grade",
        description:
          "PE80 / PE100 black-pigmented compounds for water and gas pipeline extrusion.",
        applications: ["Water supply pipes", "Gas pipes", "Cable conduits"],
      },
      {
        name: "Raffia Grade",
        description:
          "Low-pressure raffia HDPE for woven bag tapes and ropes with high tensile strength.",
        applications: ["Woven bags", "Ropes and nets"],
      },
      {
        name: "Film Grade",
        description:
          "HDPE film grades for shopping bags, T-shirt bags and lamination layers.",
        applications: ["Shopping bags", "Carrier bags", "Lamination film"],
      },
      {
        name: "Blow-Moulding Grade",
        description:
          "Bimodal HDPE for industrial containers, drums and chemical packaging.",
        applications: [
          "1L–200L containers",
          "Detergent bottles",
          "Lubricant drums",
        ],
      },
      {
        name: "Injection Grade",
        description:
          "Easy-flow HDPE injection grades for caps, crates and housewares.",
        applications: ["Closures", "Crates", "Houseware parts"],
      },
    ],
    cover: "from-emerald-50 via-white to-slate-100",
  },
  {
    slug: "lldpe",
    name: "LLDPE — Linear Low-Density Polyethylene",
    cnName: "线性聚乙烯",
    abbreviation: "LLDPE",
    summary:
      "Linear PE for rotomoulding, blown film, stretch film and injection moulding.",
    description:
      "LLDPE combines toughness, tear resistance and excellent processability. TIANHUI supplies rotomoulding, film and injection grades suitable for agricultural film, packaging and rotomoulded tanks across global markets.",
    applications: [
      "Stretch and shrink films",
      "Agricultural and greenhouse films",
      "Rotomoulded water tanks and tools",
      "Toys and housewares",
    ],
    grades: [
      {
        name: "Rotomoulding Grade",
        description:
          "Powder grade LLDPE with balanced impact and processability for rotomoulded products.",
        applications: ["Water tanks", "Kayaks", "Outdoor furniture"],
      },
      {
        name: "Film Grade",
        description:
          "High-clarity, high-tear-strength LLDPE film grades for packaging and agriculture.",
        applications: ["Packaging films", "Agricultural films", "Stretch film"],
      },
      {
        name: "Injection Grade",
        description:
          "Easy-flow injection LLDPE for thin-walled and flexible parts.",
        applications: ["Lids and closures", "Toys", "Houseware"],
      },
    ],
    cover: "from-cyan-50 via-white to-slate-100",
  },
  {
    slug: "ldpe",
    name: "LDPE — Low-Density Polyethylene",
    cnName: "高压聚乙烯",
    abbreviation: "LDPE",
    summary:
      "High-pressure polyethylene grades for films, injection moulding and heavy packaging.",
    description:
      "LDPE (高压聚乙烯) is produced through a high-pressure process and provides outstanding clarity, flexibility and seal strength. TIANHUI offers film, injection and heavy-duty packaging grades for converters across packaging, construction and agricultural sectors.",
    applications: [
      "Food and laminated packaging film",
      "Shrink film and overwrap",
      "Heavy-duty industrial bags",
      "Cable insulation and coatings",
    ],
    grades: [
      {
        name: "Film Grade",
        description:
          "LDPE film grades with excellent clarity and seal performance.",
        applications: ["Food packaging", "Lamination", "Shrink film"],
      },
      {
        name: "Injection Grade",
        description:
          "LDPE injection grades for flexible parts, lids and squeeze bottles.",
        applications: ["Lids and caps", "Squeeze containers", "Toys"],
      },
      {
        name: "Heavy Packaging Grade",
        description:
          "Heavy-duty LDPE grades for cement bags, fertiliser bags and industrial packaging.",
        applications: [
          "Cement and chemical bags",
          "Fertiliser packaging",
          "Industrial liners",
        ],
      },
    ],
    cover: "from-indigo-50 via-white to-slate-100",
  },
  {
    slug: "polypropylene",
    name: "Polypropylene (PP)",
    cnName: "聚丙烯",
    abbreviation: "PP",
    summary:
      "Homopolymer, copolymer, fibre, pipe and high-flow PP grades for diverse industries.",
    description:
      "Polypropylene is one of TIANHUI's largest product lines. We supply homopolymer, block copolymer, random copolymer, fibre, pipe, raffia and high-melt-flow injection grades, covering packaging, automotive, fibre and infrastructure applications.",
    applications: [
      "Woven bags and FIBC raffia",
      "Non-woven fabric and hygiene fibre",
      "Hot/cold water pipes (PP-R)",
      "Food containers, caps, automotive parts",
    ],
    grades: [
      {
        name: "High-Flow Injection PP",
        description:
          "High melt-flow PP for thin-walled packaging, caps and automotive parts.",
        applications: ["Thin-wall packaging", "Caps", "Auto interior parts"],
      },
      {
        name: "PP Copolymer",
        description:
          "Block / random PP copolymer with improved impact and clarity.",
        applications: ["Houseware", "Containers", "Automotive components"],
      },
      {
        name: "PP Pipe Grade (PP-R)",
        description:
          "Random copolymer PP-R for hot and cold water plumbing systems.",
        applications: ["Plumbing pipes", "Industrial pipes", "Fittings"],
      },
      {
        name: "PP Homopolymer",
        description:
          "General-purpose PP homopolymer with balanced stiffness and flow.",
        applications: ["Houseware", "Furniture", "Pails"],
      },
      {
        name: "PP Raffia",
        description:
          "High-tenacity PP raffia for woven bags, ropes and FIBCs.",
        applications: ["Woven bags", "FIBCs", "Ropes"],
      },
      {
        name: "Transparent PP",
        description:
          "Random copolymer with nucleator for excellent transparency and gloss.",
        applications: [
          "Transparent containers",
          "Thin-wall packaging",
          "Disposable cups",
        ],
      },
    ],
    cover: "from-amber-50 via-white to-slate-100",
  },
  {
    slug: "abs",
    name: "ABS Resin",
    cnName: "ABS树脂",
    abbreviation: "ABS",
    summary:
      "Acrylonitrile-Butadiene-Styrene resins with strong impact resistance and surface gloss.",
    description:
      "ABS combines toughness, rigidity and excellent surface finish, making it a popular engineering plastic for appliances, automotive parts and electronics. TIANHUI supplies general-purpose, high-impact and electroplating ABS grades from premium domestic producers.",
    applications: [
      "Electronics and appliance housings",
      "Automotive interior trims",
      "Helmets and luggage shells",
      "Toys and 3D-printing filaments",
    ],
    grades: [
      {
        name: "General-Purpose ABS",
        description:
          "Balanced impact strength, processability and gloss for the majority of injection-moulded products.",
        applications: [
          "Electronics housings",
          "Appliance shells",
          "Office equipment",
        ],
      },
    ],
    cover: "from-rose-50 via-white to-slate-100",
  },
];

export function getProductFamily(slug: string): ProductFamily | undefined {
  return productFamilies.find((p) => p.slug === slug);
}
