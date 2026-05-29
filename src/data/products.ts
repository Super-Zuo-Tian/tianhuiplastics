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
    cnName: "聚乙烯",
    abbreviation: "PE",
    summary:
      "Linear (LLDPE), high-pressure (LDPE) and low-pressure (HDPE) polyethylene grades for film, pipe, blow moulding, rotomoulding and injection.",
    description:
      "Polyethylene is TIANHUI's broadest product line, spanning LLDPE, LDPE and HDPE. Together they cover film, packaging, pipe, blow moulding, rotomoulding and injection applications, sourced from leading Chinese petrochemical producers with full traceability and stable monthly volumes.",
    applications: [
      "Packaging and agricultural film",
      "Pressure pipes and conduits",
      "Blow-moulded bottles and drums",
      "Rotomoulded tanks, caps and housewares",
    ],
    grades: [
      {
        name: "LLDPE — Linear Low-Density Polyethylene",
        description:
          "Combines toughness, tear resistance and excellent processability — rotomoulding, blown / stretch film and injection grades for packaging, agriculture and rotomoulded products.",
        applications: [
          "Stretch and shrink films",
          "Agricultural and greenhouse films",
          "Rotomoulded water tanks",
          "Toys and housewares",
        ],
      },
      {
        name: "LDPE — Low-Density Polyethylene",
        description:
          "High-pressure process resin with outstanding clarity, flexibility and seal strength — film, injection and heavy-duty packaging grades.",
        applications: [
          "Food and laminated packaging film",
          "Shrink film and overwrap",
          "Heavy-duty industrial bags",
          "Cable insulation and coatings",
        ],
      },
      {
        name: "HDPE — High-Density Polyethylene",
        description:
          "Excellent stiffness, chemical resistance and processability — pipe, raffia, film, blow-moulding and injection grades for industrial users and converters.",
        applications: [
          "PE100 / PE80 pressure pipes",
          "Detergent and industrial bottles",
          "Heavy-duty films and bags",
          "Crates, caps and housewares",
        ],
      },
    ],
    cover: "from-emerald-50 via-white to-slate-100",
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
];

export function getProductFamily(slug: string): ProductFamily | undefined {
  return productFamilies.find((p) => p.slug === slug);
}
