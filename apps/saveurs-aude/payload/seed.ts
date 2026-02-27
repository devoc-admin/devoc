import config from "@payload-config";
import type { Payload } from "payload";
import { getPayload } from "payload";

// ── Seed data types ─────────────────────────────────────────────────────────

type CategorySeed = {
  order: number;
  slug: string;
  titleEn: string;
  titleFr: string;
};

type VariantSeed = {
  labelEn: string;
  labelFr: string;
  price: number;
  sku: string;
  stock: number;
  weight: number;
};

type ProductSeed = {
  categorySlug: string;
  featured?: boolean;
  promotion?: {
    endDate: string;
    startDate: string;
    type: "percentage" | "fixed";
    value: number;
  };
  shortDescEn: string;
  shortDescFr: string;
  slug: string;
  titleEn: string;
  titleFr: string;
  variants: VariantSeed[];
};

// ── Categories ──────────────────────────────────────────────────────────────

const CATEGORIES: CategorySeed[] = [
  {
    order: 1,
    slug: "conserves-plats",
    titleEn: "Preserves & Prepared Dishes",
    titleFr: "Conserves & Plats cuisinés",
  },
  {
    order: 2,
    slug: "olives-condiments",
    titleEn: "Olives & Condiments",
    titleFr: "Olives & Condiments",
  },
  {
    order: 3,
    slug: "miels",
    titleEn: "Honeys",
    titleFr: "Miels",
  },
  {
    order: 4,
    slug: "vins-boissons",
    titleEn: "Wines & Beverages",
    titleFr: "Vins & Boissons",
  },
  {
    order: 5,
    slug: "confiseries",
    titleEn: "Sweets & Confectionery",
    titleFr: "Confiseries & Douceurs",
  },
  {
    order: 6,
    slug: "huiles-vinaigres",
    titleEn: "Oils & Vinegars",
    titleFr: "Huiles & Vinaigres",
  },
  {
    order: 7,
    slug: "pates-produits-secs",
    titleEn: "Pasta & Dry Goods",
    titleFr: "Pâtes & Produits secs",
  },
  {
    order: 8,
    slug: "epices-aromates",
    titleEn: "Spices & Herbs",
    titleFr: "Épices & Aromates",
  },
  {
    order: 9,
    slug: "confitures",
    titleEn: "Jams & Preserves",
    titleFr: "Confitures",
  },
  {
    order: 10,
    slug: "sirops-tisanes",
    titleEn: "Syrups & Herbal Teas",
    titleFr: "Sirops & Tisanes",
  },
];

// ── Products ────────────────────────────────────────────────────────────────

const PRODUCTS: ProductSeed[] = [
  // ── Conserves & Plats cuisinés ──
  {
    categorySlug: "conserves-plats",
    featured: true,
    shortDescEn:
      "The iconic Languedoc dish, prepared following the traditional recipe with Castelnaudary lingot beans.",
    shortDescFr:
      "Le plat emblématique du Languedoc, préparé selon la recette traditionnelle avec des haricots lingots de Castelnaudary.",
    slug: "cassoulet-castelnaudary",
    titleEn: "Castelnaudary Cassoulet",
    titleFr: "Cassoulet de Castelnaudary",
    variants: [
      {
        labelEn: "350g",
        labelFr: "350g",
        price: 890,
        sku: "CASS-350",
        stock: 45,
        weight: 350,
      },
      {
        labelEn: "750g",
        labelFr: "750g",
        price: 1590,
        sku: "CASS-750",
        stock: 30,
        weight: 750,
      },
    ],
  },
  {
    categorySlug: "conserves-plats",
    shortDescEn:
      "Duck legs slowly preserved in their own fat, tender and flavorful.",
    shortDescFr:
      "Cuisses de canard confites lentement dans leur graisse, tendres et savoureuses.",
    slug: "confit-canard",
    titleEn: "Duck Confit",
    titleFr: "Confit de canard",
    variants: [
      {
        labelEn: "2 legs",
        labelFr: "2 cuisses",
        price: 1290,
        sku: "CONF-2",
        stock: 25,
        weight: 600,
      },
      {
        labelEn: "4 legs",
        labelFr: "4 cuisses",
        price: 2290,
        sku: "CONF-4",
        stock: 15,
        weight: 1200,
      },
    ],
  },
  {
    categorySlug: "conserves-plats",
    shortDescEn:
      "Sun-ripened vegetables slowly cooked in olive oil, traditional recipe.",
    shortDescFr:
      "Légumes du soleil mijotés à l'huile d'olive, recette traditionnelle.",
    slug: "ratatouille-provencale",
    titleEn: "Provençal Ratatouille",
    titleFr: "Ratatouille provençale",
    variants: [
      {
        labelEn: "350g",
        labelFr: "350g",
        price: 650,
        sku: "RAT-350",
        stock: 40,
        weight: 350,
      },
    ],
  },
  {
    categorySlug: "conserves-plats",
    shortDescEn: "Artisanal farm pork terrine seasoned with Espelette pepper.",
    shortDescFr:
      "Terrine artisanale au porc fermier relevée au piment d'Espelette.",
    slug: "terrine-campagne-espelette",
    titleEn: "Country Terrine with Espelette Pepper",
    titleFr: "Terrine de campagne au piment d'Espelette",
    variants: [
      {
        labelEn: "200g",
        labelFr: "200g",
        price: 790,
        sku: "TER-200",
        stock: 20,
        weight: 200,
      },
    ],
  },

  // ── Olives & Condiments ──
  {
    categorySlug: "olives-condiments",
    shortDescEn:
      "Green Lucques olives, the pearl of Languedoc, fleshy and delicate.",
    shortDescFr:
      "Olives vertes Lucques, la perle du Languedoc, charnues et délicates.",
    slug: "olives-lucques-languedoc",
    titleEn: "Lucques Olives from Languedoc",
    titleFr: "Olives Lucques du Languedoc",
    variants: [
      {
        labelEn: "150g",
        labelFr: "150g",
        price: 590,
        sku: "OLI-150",
        stock: 50,
        weight: 150,
      },
      {
        labelEn: "300g",
        labelFr: "300g",
        price: 990,
        sku: "OLI-300",
        stock: 35,
        weight: 300,
      },
    ],
  },
  {
    categorySlug: "olives-condiments",
    shortDescEn:
      "Black olive tapenade from the region, with capers and anchovies.",
    shortDescFr: "Tapenade aux olives noires de la région, câpres et anchois.",
    slug: "tapenade-noire",
    titleEn: "Artisanal Black Tapenade",
    titleFr: "Tapenade noire artisanale",
    variants: [
      {
        labelEn: "90g",
        labelFr: "90g",
        price: 490,
        sku: "TAP-90",
        stock: 60,
        weight: 90,
      },
    ],
  },
  {
    categorySlug: "olives-condiments",
    featured: true,
    shortDescEn:
      "Salt-cured Collioure anchovies, prepared in the traditional Catalan way.",
    shortDescFr:
      "Anchois salés de Collioure, préparés à l'ancienne selon la tradition catalane.",
    slug: "anchois-collioure",
    titleEn: "Collioure Anchovies IGP",
    titleFr: "Anchois de Collioure IGP",
    variants: [
      {
        labelEn: "100g",
        labelFr: "100g",
        price: 890,
        sku: "ANC-100",
        stock: 30,
        weight: 100,
      },
    ],
  },
  {
    categorySlug: "olives-condiments",
    shortDescEn:
      "Smooth Espelette pepper AOP purée, perfect for enhancing your dishes.",
    shortDescFr:
      "Purée onctueuse de piment d'Espelette AOP, parfaite pour relever vos plats.",
    slug: "puree-piment-espelette",
    titleEn: "Espelette Pepper Purée",
    titleFr: "Purée de piment d'Espelette",
    variants: [
      {
        labelEn: "90g",
        labelFr: "90g",
        price: 590,
        sku: "PIM-90",
        stock: 35,
        weight: 90,
      },
    ],
  },

  // ── Miels ──
  {
    categorySlug: "miels",
    featured: true,
    shortDescEn:
      "Wildflower honey from the Aude garrigue, harvested by a local beekeeper.",
    shortDescFr:
      "Miel toutes fleurs de la garrigue audoise, récolté par un apiculteur local.",
    slug: "miel-garrigue",
    titleEn: "Garrigue Honey",
    titleFr: "Miel de Garrigue",
    variants: [
      {
        labelEn: "250g",
        labelFr: "250g",
        price: 890,
        sku: "MIE-GAR-250",
        stock: 40,
        weight: 250,
      },
      {
        labelEn: "500g",
        labelFr: "500g",
        price: 1590,
        sku: "MIE-GAR-500",
        stock: 25,
        weight: 500,
      },
    ],
  },
  {
    categorySlug: "miels",
    shortDescEn: "Corbières lavender honey, gentle and aromatic.",
    shortDescFr: "Miel de lavande des Corbières, doux et parfumé.",
    slug: "miel-lavande",
    titleEn: "Lavender Honey",
    titleFr: "Miel de Lavande",
    variants: [
      {
        labelEn: "250g",
        labelFr: "250g",
        price: 950,
        sku: "MIE-LAV-250",
        stock: 30,
        weight: 250,
      },
    ],
  },
  {
    categorySlug: "miels",
    shortDescEn: "Black Mountain chestnut honey, bold and woody.",
    shortDescFr: "Miel de châtaignier de la Montagne Noire, puissant et boisé.",
    slug: "miel-chataignier",
    titleEn: "Chestnut Honey",
    titleFr: "Miel de Châtaignier",
    variants: [
      {
        labelEn: "500g",
        labelFr: "500g",
        price: 1490,
        sku: "MIE-CHA-500",
        stock: 20,
        weight: 500,
      },
    ],
  },

  // ── Vins & Boissons ──
  {
    categorySlug: "vins-boissons",
    featured: true,
    shortDescEn:
      "The world's oldest sparkling wine, fine bubbles with green apple aromas.",
    shortDescFr:
      "Le plus ancien brut du monde, fines bulles et arômes de pomme verte.",
    slug: "blanquette-limoux",
    titleEn: "Blanquette de Limoux AOP",
    titleFr: "Blanquette de Limoux AOP",
    variants: [
      {
        labelEn: "75cl",
        labelFr: "75cl",
        price: 1290,
        sku: "BLA-75",
        stock: 50,
        weight: 900,
      },
    ],
  },
  {
    categorySlug: "vins-boissons",
    shortDescEn:
      "Full-bodied Corbières red wine, notes of dark fruits and garrigue.",
    shortDescFr:
      "Vin rouge charpenté des Corbières, notes de fruits noirs et garrigue.",
    slug: "corbieres-rouge",
    titleEn: "Corbières Red AOP",
    titleFr: "Corbières Rouge AOP",
    variants: [
      {
        labelEn: "75cl",
        labelFr: "75cl",
        price: 990,
        sku: "COR-75",
        stock: 60,
        weight: 900,
      },
    ],
  },
  {
    categorySlug: "vins-boissons",
    shortDescEn: "Minervois red wine, round and fruity with silky tannins.",
    shortDescFr:
      "Vin rouge du Minervois, rond et fruité avec des tanins soyeux.",
    slug: "minervois-rouge",
    titleEn: "Minervois Red AOP",
    titleFr: "Minervois Rouge AOP",
    variants: [
      {
        labelEn: "75cl",
        labelFr: "75cl",
        price: 1090,
        sku: "MIN-75",
        stock: 40,
        weight: 900,
      },
    ],
  },
  {
    categorySlug: "vins-boissons",
    promotion: {
      endDate: "2026-12-31",
      startDate: "2026-01-01",
      type: "percentage",
      value: 10,
    },
    shortDescEn:
      "Muscat de Rivesaltes grape juice, naturally sweet and aromatic.",
    shortDescFr:
      "Jus de raisin Muscat de Rivesaltes, naturellement sucré et parfumé.",
    slug: "jus-raisin-muscat",
    titleEn: "Muscat Grape Juice",
    titleFr: "Jus de raisin Muscat",
    variants: [
      {
        labelEn: "75cl",
        labelFr: "75cl",
        price: 690,
        sku: "JUS-75",
        stock: 45,
        weight: 900,
      },
    ],
  },

  // ── Confiseries & Douceurs ──
  {
    categorySlug: "confiseries",
    featured: true,
    shortDescEn:
      "Traditional Carcassonne berlingot sweets with fruity flavors.",
    shortDescFr:
      "Bonbons berlingots traditionnels de Carcassonne, aux saveurs fruitées.",
    slug: "berlingots-carcassonne",
    titleEn: "Carcassonne Berlingots",
    titleFr: "Berlingots de Carcassonne",
    variants: [
      {
        labelEn: "150g",
        labelFr: "150g",
        price: 490,
        sku: "BER-150",
        stock: 80,
        weight: 150,
      },
      {
        labelEn: "300g",
        labelFr: "300g",
        price: 890,
        sku: "BER-300",
        stock: 50,
        weight: 300,
      },
    ],
  },
  {
    categorySlug: "confiseries",
    shortDescEn: "Artisanal nougat with garrigue honey and toasted almonds.",
    shortDescFr: "Nougat artisanal au miel de garrigue et amandes grillées.",
    slug: "nougat-miel-garrigue",
    titleEn: "Garrigue Honey Nougat",
    titleFr: "Nougat au miel de garrigue",
    variants: [
      {
        labelEn: "200g",
        labelFr: "200g",
        price: 790,
        sku: "NOU-200",
        stock: 35,
        weight: 200,
      },
    ],
  },
  {
    categorySlug: "confiseries",
    shortDescEn: "Sugar-coated almond dragées, artisanal production.",
    shortDescFr:
      "Dragées aux amandes enrobées de sucre, fabrication artisanale.",
    slug: "dragees-amandes",
    titleEn: "Almond Dragées",
    titleFr: "Dragées aux amandes",
    variants: [
      {
        labelEn: "250g",
        labelFr: "250g",
        price: 690,
        sku: "DRA-250",
        stock: 0,
        weight: 250,
      },
    ],
  },
  {
    categorySlug: "confiseries",
    shortDescEn: "Candied fruit and almond calissons, Occitan-inspired.",
    shortDescFr:
      "Calissons aux fruits confits et amandes, inspiration occitane.",
    slug: "calissons-occitanie",
    titleEn: "Occitan Calissons",
    titleFr: "Calissons d'Occitanie",
    variants: [
      {
        labelEn: "200g",
        labelFr: "200g",
        price: 890,
        sku: "CAL-200",
        stock: 25,
        weight: 200,
      },
    ],
  },

  // ── Huiles & Vinaigres ──
  {
    categorySlug: "huiles-vinaigres",
    promotion: {
      endDate: "2026-12-31",
      startDate: "2026-01-01",
      type: "percentage",
      value: 15,
    },
    shortDescEn:
      "Extra virgin olive oil from Cathar country, first cold press.",
    shortDescFr:
      "Huile d'olive vierge extra du pays cathare, première pression à froid.",
    slug: "huile-olive-vierge-extra",
    titleEn: "Extra Virgin Olive Oil",
    titleFr: "Huile d'olive vierge extra",
    variants: [
      {
        labelEn: "25cl",
        labelFr: "25cl",
        price: 790,
        sku: "HUI-OLI-25",
        stock: 55,
        weight: 250,
      },
      {
        labelEn: "50cl",
        labelFr: "50cl",
        price: 1390,
        sku: "HUI-OLI-50",
        stock: 35,
        weight: 500,
      },
    ],
  },
  {
    categorySlug: "huiles-vinaigres",
    shortDescEn: "Red wine vinegar softened with garrigue honey.",
    shortDescFr: "Vinaigre de vin rouge adouci au miel de garrigue.",
    slug: "vinaigre-vin-miel",
    titleEn: "Wine Vinegar with Honey",
    titleFr: "Vinaigre de vin au miel",
    variants: [
      {
        labelEn: "25cl",
        labelFr: "25cl",
        price: 590,
        sku: "VIN-25",
        stock: 40,
        weight: 250,
      },
    ],
  },
  {
    categorySlug: "huiles-vinaigres",
    shortDescEn: "Périgord walnut oil, ideal for salads and dressings.",
    shortDescFr:
      "Huile de noix du Périgord, idéale pour salades et assaisonnements.",
    slug: "huile-noix-perigord",
    titleEn: "Périgord Walnut Oil",
    titleFr: "Huile de noix du Périgord",
    variants: [
      {
        labelEn: "25cl",
        labelFr: "25cl",
        price: 890,
        sku: "HUI-NOI-25",
        stock: 20,
        weight: 250,
      },
    ],
  },

  // ── Pâtes & Produits secs ──
  {
    categorySlug: "pates-produits-secs",
    shortDescEn: "Fresh artisanal squid ink pasta, Mediterranean specialty.",
    shortDescFr:
      "Pâtes fraîches artisanales à l'encre de seiche, spécialité méditerranéenne.",
    slug: "pates-encre-seiche",
    titleEn: "Artisanal Squid Ink Pasta",
    titleFr: "Pâtes artisanales à l'encre de seiche",
    variants: [
      {
        labelEn: "500g",
        labelFr: "500g",
        price: 590,
        sku: "PAT-ENC-500",
        stock: 30,
        weight: 500,
      },
    ],
  },
  {
    categorySlug: "pates-produits-secs",
    shortDescEn: "Castelnaudary lingot beans IGP, essential for cassoulet.",
    shortDescFr:
      "Haricots lingots de Castelnaudary IGP, incontournables du cassoulet.",
    slug: "haricots-castelnaudary",
    titleEn: "Castelnaudary Beans IGP",
    titleFr: "Haricots de Castelnaudary IGP",
    variants: [
      {
        labelEn: "500g",
        labelFr: "500g",
        price: 490,
        sku: "HAR-500",
        stock: 70,
        weight: 500,
      },
      {
        labelEn: "1kg",
        labelFr: "1kg",
        price: 890,
        sku: "HAR-1000",
        stock: 40,
        weight: 1000,
      },
    ],
  },
  {
    categorySlug: "pates-produits-secs",
    shortDescEn: "Whole wheat flour from local organic farming.",
    shortDescFr:
      "Farine de blé complète issue de l'agriculture biologique locale.",
    slug: "farine-ble-complete-bio",
    titleEn: "Organic Whole Wheat Flour",
    titleFr: "Farine de blé complète bio",
    variants: [
      {
        labelEn: "1kg",
        labelFr: "1kg",
        price: 450,
        sku: "FAR-1000",
        stock: 25,
        weight: 1000,
      },
    ],
  },

  // ── Épices & Aromates ──
  {
    categorySlug: "epices-aromates",
    promotion: {
      endDate: "2026-12-31",
      startDate: "2026-01-01",
      type: "fixed",
      value: 200,
    },
    shortDescEn: "Hand-harvested fleur de sel from the Gruissan salt marshes.",
    shortDescFr: "Fleur de sel récoltée à la main dans les salins de Gruissan.",
    slug: "sel-gruissan",
    titleEn: "Gruissan Salt",
    titleFr: "Sel de Gruissan",
    variants: [
      {
        labelEn: "125g",
        labelFr: "125g",
        price: 590,
        sku: "SEL-125",
        stock: 65,
        weight: 125,
      },
      {
        labelEn: "250g",
        labelFr: "250g",
        price: 990,
        sku: "SEL-250",
        stock: 45,
        weight: 250,
      },
    ],
  },
  {
    categorySlug: "epices-aromates",
    shortDescEn: "Blend of thyme, rosemary and savory from the Aude garrigue.",
    shortDescFr:
      "Mélange de thym, romarin et sarriette de la garrigue audoise.",
    slug: "herbes-garrigue",
    titleEn: "Garrigue Herbs",
    titleFr: "Herbes de la Garrigue",
    variants: [
      {
        labelEn: "50g",
        labelFr: "50g",
        price: 390,
        sku: "HER-50",
        stock: 50,
        weight: 50,
      },
    ],
  },
  {
    categorySlug: "epices-aromates",
    shortDescEn: "Saffron grown in the Corbières, hand-harvested and dried.",
    shortDescFr:
      "Safran cultivé dans les Corbières, récolté et séché à la main.",
    slug: "safran-corbieres",
    titleEn: "Corbières Saffron",
    titleFr: "Safran des Corbières",
    variants: [
      {
        labelEn: "1g",
        labelFr: "1g",
        price: 1290,
        sku: "SAF-1",
        stock: 0,
        weight: 5,
      },
    ],
  },

  // ── Confitures ──
  {
    categorySlug: "confitures",
    shortDescEn:
      "Jam made from figs ripened under the southern sun, kettle-cooked.",
    shortDescFr:
      "Confiture de figues mûries au soleil du Midi, cuisson au chaudron.",
    slug: "confiture-figue",
    titleEn: "Fig Jam",
    titleFr: "Confiture de figue",
    variants: [
      {
        labelEn: "110g",
        labelFr: "110g",
        price: 450,
        sku: "CON-FIG-110",
        stock: 40,
        weight: 110,
      },
      {
        labelEn: "230g",
        labelFr: "230g",
        price: 690,
        sku: "CON-FIG-230",
        stock: 30,
        weight: 230,
      },
    ],
  },
  {
    categorySlug: "confitures",
    shortDescEn: "Red Roussillon apricot jam, traditional recipe.",
    shortDescFr:
      "Confiture d'abricots rouges du Roussillon, recette traditionnelle.",
    slug: "confiture-abricot-roussillon",
    titleEn: "Roussillon Apricot Jam",
    titleFr: "Confiture d'abricot du Roussillon",
    variants: [
      {
        labelEn: "230g",
        labelFr: "230g",
        price: 650,
        sku: "CON-ABR-230",
        stock: 35,
        weight: 230,
      },
    ],
  },
  {
    categorySlug: "confitures",
    shortDescEn: "Black cherry jam from the Pyrenees, smooth texture.",
    shortDescFr: "Confiture de cerises noires des Pyrénées, texture onctueuse.",
    slug: "confiture-cerise-noire",
    titleEn: "Black Cherry Jam",
    titleFr: "Confiture de cerise noire",
    variants: [
      {
        labelEn: "230g",
        labelFr: "230g",
        price: 690,
        sku: "CON-CER-230",
        stock: 30,
        weight: 230,
      },
    ],
  },
  {
    categorySlug: "confitures",
    shortDescEn: "Regional bitter orange marmalade with candied peel.",
    shortDescFr:
      "Marmelade d'oranges amères de la région, avec écorces confites.",
    slug: "marmelade-orange-amere",
    titleEn: "Bitter Orange Marmalade",
    titleFr: "Marmelade d'orange amère",
    variants: [
      {
        labelEn: "230g",
        labelFr: "230g",
        price: 650,
        sku: "MAR-ORA-230",
        stock: 25,
        weight: 230,
      },
    ],
  },

  // ── Sirops & Tisanes ──
  {
    categorySlug: "sirops-tisanes",
    shortDescEn: "Artisanal violet syrup, perfect for cocktails and desserts.",
    shortDescFr:
      "Sirop de violette artisanal, parfait pour cocktails et desserts.",
    slug: "sirop-violette",
    titleEn: "Artisanal Violet Syrup",
    titleFr: "Sirop de violette artisanal",
    variants: [
      {
        labelEn: "25cl",
        labelFr: "25cl",
        price: 590,
        sku: "SIR-VIO-25",
        stock: 30,
        weight: 300,
      },
    ],
  },
  {
    categorySlug: "sirops-tisanes",
    shortDescEn:
      "Wild plant herbal tea from the Corbières: thyme, rosemary, lavender.",
    shortDescFr:
      "Tisane aux plantes sauvages des Corbières : thym, romarin, lavande.",
    slug: "tisane-corbieres",
    titleEn: "Corbières Herbal Tea",
    titleFr: "Tisane des Corbières",
    variants: [
      {
        labelEn: "50g",
        labelFr: "50g",
        price: 490,
        sku: "TIS-50",
        stock: 45,
        weight: 50,
      },
      {
        labelEn: "100g",
        labelFr: "100g",
        price: 850,
        sku: "TIS-100",
        stock: 25,
        weight: 100,
      },
    ],
  },
  {
    categorySlug: "sirops-tisanes",
    shortDescEn: "Artisanal thyme and garrigue honey syrup, comforting.",
    shortDescFr:
      "Sirop artisanal au thym et au miel de garrigue, réconfortant.",
    slug: "sirop-thym-miel",
    titleEn: "Thyme & Honey Syrup",
    titleFr: "Sirop de thym au miel",
    variants: [
      {
        labelEn: "25cl",
        labelFr: "25cl",
        price: 690,
        sku: "SIR-THY-25",
        stock: 35,
        weight: 300,
      },
    ],
  },
];

// ── Lexical richtext helpers ────────────────────────────────────────────────

function txt(content: string, format = 0) {
  return {
    detail: 0,
    format,
    mode: "normal" as const,
    style: "",
    text: content,
    type: "text" as const,
    version: 1,
  };
}

function h2(content: string) {
  return {
    children: [txt(content)],
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    tag: "h2" as const,
    type: "heading" as const,
    version: 1,
  };
}

function p(content: string) {
  return {
    children: [txt(content)],
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    textFormat: 0,
    textStyle: "",
    type: "paragraph" as const,
    version: 1,
  };
}

function richText(...nodes: ReturnType<typeof h2 | typeof p>[]) {
  return {
    root: {
      children: nodes,
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      type: "root" as const,
      version: 1,
    },
  };
}

// ── Pages ───────────────────────────────────────────────────────────────────

type PageSeed = {
  contentEn: ReturnType<typeof richText>;
  contentFr: ReturnType<typeof richText>;
  seoDescEn: string;
  seoDescFr: string;
  seoTitleEn: string;
  seoTitleFr: string;
  slug: string;
  titleEn: string;
  titleFr: string;
};

const PAGES: PageSeed[] = [
  {
    contentEn: richText(
      h2("Our story"),
      p(
        "Saveurs d'Aude was born from the passion of two lovers of the Aude terroir, eager to share the gastronomic treasures of our beautiful region. From our shop in the heart of the Cité de Carcassonne, we carefully select the finest artisanal products from Occitania."
      ),
      p(
        "Every product we offer tells a story — that of a passionate producer, a know-how passed down through generations, a unique terroir between the Mediterranean and the Pyrenees."
      ),
      h2("Our values"),
      p(
        "Authenticity — We favor products made using traditional methods, with no compromise on ingredient quality."
      ),
      p(
        "Proximity — We work directly with local producers from the Aude and neighboring areas, promoting short supply chains."
      ),
      p(
        "Passion — Every product is tasted and approved by our team before being offered for sale. We select only the best."
      ),
      h2("Our producers"),
      p(
        "We work with over thirty local artisans and producers: beekeepers from the Corbières, olive growers from the Minervois, winemakers from Limoux, confectioners from Carcassonne and many more. This diversity is the richness of our catalog and reflects the variety of the Aude terroir."
      )
    ),
    contentFr: richText(
      h2("Notre histoire"),
      p(
        "Saveurs d'Aude est née de la passion de deux amoureux du terroir audois, désireux de partager les richesses gastronomiques de notre belle région. Depuis notre boutique située au cœur de la Cité de Carcassonne, nous sélectionnons avec soin les meilleurs produits artisanaux d'Occitanie."
      ),
      p(
        "Chaque produit que nous proposons raconte une histoire, celle d'un producteur passionné, d'un savoir-faire transmis de génération en génération, d'un terroir unique entre Méditerranée et Pyrénées."
      ),
      h2("Nos valeurs"),
      p(
        "Authenticité — Nous privilégions les produits fabriqués selon des méthodes traditionnelles, sans compromis sur la qualité des ingrédients."
      ),
      p(
        "Proximité — Nous travaillons en direct avec des producteurs locaux de l'Aude et des départements voisins, favorisant les circuits courts."
      ),
      p(
        "Passion — Chaque produit est goûté et approuvé par notre équipe avant d'être proposé à la vente. Nous ne sélectionnons que le meilleur."
      ),
      h2("Nos producteurs"),
      p(
        "Nous collaborons avec plus d'une trentaine d'artisans et producteurs locaux : apiculteurs des Corbières, oléiculteurs du Minervois, vignerons de Limoux, confiseurs de Carcassonne et bien d'autres. Cette diversité fait la richesse de notre catalogue et reflète la variété du terroir audois."
      )
    ),
    seoDescEn:
      "Discover the story of Saveurs d'Aude, a fine grocery store for artisanal specialties in Carcassonne. Our values, producers and passion for the Aude terroir.",
    seoDescFr:
      "Découvrez l'histoire de Saveurs d'Aude, épicerie fine de spécialités artisanales à Carcassonne. Nos valeurs, nos producteurs et notre passion pour le terroir audois.",
    seoTitleEn: "About Saveurs d'Aude",
    seoTitleFr: "À propos de Saveurs d'Aude",
    slug: "a-propos",
    titleEn: "About",
    titleFr: "À propos",
  },
  {
    contentEn: richText(
      h2("Site publisher"),
      p(
        "The website saveurs-aude.fr is published by Saveurs d'Aude, sole proprietorship."
      ),
      p("Address: 3 Rue Cros-Mayrevieille, 11000 Carcassonne, France"),
      p("Phone: +33 4 68 25 30 45"),
      p("Email: contact@saveursdaude.fr"),
      p("Publication director: Saveurs d'Aude"),
      h2("Hosting"),
      p(
        "The website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States."
      ),
      h2("Intellectual property"),
      p(
        "All content on this website (texts, images, logos, videos) is protected by copyright. Any reproduction, even partial, is prohibited without prior written authorization from Saveurs d'Aude."
      ),
      h2("Liability"),
      p(
        "Saveurs d'Aude strives to ensure the accuracy of information published on this site, but cannot guarantee its completeness or the absence of errors. Saveurs d'Aude reserves the right to modify the site content at any time without notice."
      ),
      h2("Applicable law"),
      p(
        "These legal notices are governed by French law. In case of dispute, the courts of Carcassonne shall have sole jurisdiction."
      )
    ),
    contentFr: richText(
      h2("Éditeur du site"),
      p(
        "Le site saveurs-aude.fr est édité par Saveurs d'Aude, entreprise individuelle."
      ),
      p("Adresse : 3 Rue Cros-Mayrevieille, 11000 Carcassonne, France"),
      p("Téléphone : +33 4 68 25 30 45"),
      p("Email : contact@saveursdaude.fr"),
      p("Directeur de la publication : Saveurs d'Aude"),
      h2("Hébergement"),
      p(
        "Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis."
      ),
      h2("Propriété intellectuelle"),
      p(
        "L'ensemble du contenu de ce site (textes, images, logos, vidéos) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite de Saveurs d'Aude."
      ),
      h2("Responsabilité"),
      p(
        "Saveurs d'Aude s'efforce d'assurer l'exactitude des informations diffusées sur ce site, mais ne peut garantir l'exhaustivité ou l'absence d'erreurs. Saveurs d'Aude se réserve le droit de modifier le contenu du site à tout moment et sans préavis."
      ),
      h2("Droit applicable"),
      p(
        "Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux de Carcassonne seront seuls compétents."
      )
    ),
    seoDescEn:
      "Legal notice for the Saveurs d'Aude website: publisher, hosting, intellectual property and applicable law.",
    seoDescFr:
      "Mentions légales du site Saveurs d'Aude : éditeur, hébergement, propriété intellectuelle et droit applicable.",
    seoTitleEn: "Legal notice",
    seoTitleFr: "Mentions légales",
    slug: "mentions-legales",
    titleEn: "Legal notice",
    titleFr: "Mentions légales",
  },
  {
    contentEn: richText(
      h2("Data collected"),
      p(
        "As part of your use of the website and your purchases, we may collect the following personal data: last name, first name, email address, postal address, phone number and order information."
      ),
      h2("Processing purposes"),
      p(
        "Your data is used for processing your orders, managing your customer account, sending communications related to your purchases and, with your consent, sending our newsletter."
      ),
      h2("Legal basis"),
      p(
        "The processing of your data is based on the performance of the sales contract (for orders), your consent (for the newsletter) and our legitimate interest (for improving our services)."
      ),
      h2("Cookies"),
      p(
        "This website uses functional cookies necessary for its proper operation, as well as analytics cookies to understand how the site is used. You can manage your cookie preferences at any time via the consent banner."
      ),
      h2("Data retention"),
      p(
        "Your data is retained for the period necessary for the purposes described above, and for a maximum of 3 years after your last activity on the site. Order-related data is retained in accordance with legal obligations (10 years)."
      ),
      h2("Your rights"),
      p(
        "In accordance with the GDPR, you have the right to access, rectify, delete, restrict and port your data. You can exercise these rights by contacting us at contact@saveursdaude.fr."
      ),
      h2("Contact"),
      p(
        "For any questions regarding the protection of your personal data, you can write to us at: contact@saveursdaude.fr or by mail to Saveurs d'Aude, 3 Rue Cros-Mayrevieille, 11000 Carcassonne, France."
      )
    ),
    contentFr: richText(
      h2("Données collectées"),
      p(
        "Dans le cadre de votre utilisation du site et de vos achats, nous sommes amenés à collecter les données personnelles suivantes : nom, prénom, adresse email, adresse postale, numéro de téléphone et informations de commande."
      ),
      h2("Finalités du traitement"),
      p(
        "Vos données sont utilisées pour le traitement de vos commandes, la gestion de votre compte client, l'envoi de communications relatives à vos achats et, avec votre consentement, l'envoi de notre newsletter."
      ),
      h2("Base légale"),
      p(
        "Le traitement de vos données repose sur l'exécution du contrat de vente (pour les commandes), votre consentement (pour la newsletter) et notre intérêt légitime (pour l'amélioration de nos services)."
      ),
      h2("Cookies"),
      p(
        "Ce site utilise des cookies fonctionnels nécessaires à son bon fonctionnement, ainsi que des cookies d'analyse pour comprendre comment le site est utilisé. Vous pouvez gérer vos préférences de cookies à tout moment via le bandeau de consentement."
      ),
      h2("Conservation des données"),
      p(
        "Vos données sont conservées pendant la durée nécessaire aux finalités décrites ci-dessus, et au maximum 3 ans après votre dernière activité sur le site. Les données relatives aux commandes sont conservées conformément aux obligations légales (10 ans)."
      ),
      h2("Vos droits"),
      p(
        "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression, de limitation et de portabilité de vos données. Vous pouvez exercer ces droits en nous contactant à contact@saveursdaude.fr."
      ),
      h2("Contact"),
      p(
        "Pour toute question relative à la protection de vos données personnelles, vous pouvez nous écrire à : contact@saveursdaude.fr ou par courrier à l'adresse Saveurs d'Aude, 3 Rue Cros-Mayrevieille, 11000 Carcassonne, France."
      )
    ),
    seoDescEn:
      "Saveurs d'Aude privacy policy: data collected, cookies, your GDPR rights and data retention.",
    seoDescFr:
      "Politique de confidentialité de Saveurs d'Aude : données collectées, cookies, vos droits RGPD et conservation des données.",
    seoTitleEn: "Privacy policy",
    seoTitleFr: "Politique de confidentialité",
    slug: "politique-confidentialite",
    titleEn: "Privacy policy",
    titleFr: "Politique de confidentialité",
  },
  {
    contentEn: richText(
      h2("Purpose"),
      p(
        "These general terms and conditions of sale govern all transactions made on the website saveurs-aude.fr, published by Saveurs d'Aude."
      ),
      h2("Products and pricing"),
      p(
        "Products are described as accurately as possible. Prices are shown in euros including all taxes. Saveurs d'Aude reserves the right to modify prices at any time, with products being invoiced at the rate in effect at the time of order validation."
      ),
      h2("Orders"),
      p(
        "Any order implies acceptance of these general terms and conditions of sale. Order validation constitutes a purchase commitment. A confirmation email is sent upon receipt of payment."
      ),
      h2("Payment"),
      p(
        "Payment is made online by credit card through the secure Stripe platform. The charge is made at the time of order validation."
      ),
      h2("Delivery"),
      p(
        "Orders are shipped within 2 to 5 business days. Delivery costs are calculated based on the total weight of the order and the delivery address. Free delivery is available above a certain purchase amount, as indicated on the website. In-store pickup is also available."
      ),
      h2("Right of withdrawal"),
      p(
        "In accordance with Article L221-18 of the French Consumer Code, you have 14 days from receipt of your order to exercise your right of withdrawal. Opened food products or those past their expiration date cannot be returned."
      ),
      h2("Complaints and disputes"),
      p(
        "For any complaint, please contact us by email at contact@saveursdaude.fr. In case of unresolved dispute, you may refer to the consumer mediator. These terms are governed by French law."
      )
    ),
    contentFr: richText(
      h2("Objet"),
      p(
        "Les présentes conditions générales de vente régissent l'ensemble des transactions effectuées sur le site saveurs-aude.fr, édité par Saveurs d'Aude."
      ),
      h2("Produits et prix"),
      p(
        "Les produits proposés sont décrits avec la plus grande exactitude possible. Les prix sont indiqués en euros TTC. Saveurs d'Aude se réserve le droit de modifier ses prix à tout moment, les produits étant facturés au tarif en vigueur lors de la validation de la commande."
      ),
      h2("Commandes"),
      p(
        "Toute commande suppose l'acceptation des présentes conditions générales de vente. La validation de la commande vaut engagement d'achat. Un email de confirmation vous est envoyé dès réception du paiement."
      ),
      h2("Paiement"),
      p(
        "Le paiement s'effectue en ligne par carte bancaire via la plateforme sécurisée Stripe. Le débit est effectué au moment de la validation de la commande."
      ),
      h2("Livraison"),
      p(
        "Les commandes sont expédiées sous 2 à 5 jours ouvrés. Les frais de livraison sont calculés en fonction du poids total de la commande et de l'adresse de livraison. La livraison est offerte à partir d'un certain montant d'achat, indiqué sur le site. Le retrait en boutique est également disponible."
      ),
      h2("Droit de rétractation"),
      p(
        "Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation. Les produits alimentaires ouverts ou dont la date de péremption est dépassée ne peuvent être retournés."
      ),
      h2("Réclamations et litiges"),
      p(
        "Pour toute réclamation, merci de nous contacter par email à contact@saveursdaude.fr. En cas de litige non résolu, vous pouvez recourir au médiateur de la consommation. Les présentes CGV sont soumises au droit français."
      )
    ),
    seoDescEn:
      "Saveurs d'Aude terms and conditions: orders, payment, delivery, right of withdrawal and complaints.",
    seoDescFr:
      "Conditions générales de vente de Saveurs d'Aude : commandes, paiement, livraison, droit de rétractation et réclamations.",
    seoTitleEn: "Terms & Conditions",
    seoTitleFr: "Conditions générales de vente",
    slug: "cgv",
    titleEn: "Terms & Conditions",
    titleFr: "Conditions générales de vente",
  },
];

// ── Seed functions ──────────────────────────────────────────────────────────

async function seedCategories(payload: Payload) {
  console.log("Creating 10 categories...");
  const categoryMap: Record<string, number> = {};

  for (const cat of CATEGORIES) {
    const created = await payload.create({
      collection: "categories",
      data: {
        order: cat.order,
        slug: cat.slug,
        title: cat.titleFr,
      },
      locale: "fr",
      overrideAccess: true,
    });

    await payload.update({
      collection: "categories",
      data: { title: cat.titleEn },
      id: created.id,
      locale: "en",
      overrideAccess: true,
    });

    categoryMap[cat.slug] = created.id;
  }

  console.log(`  ${CATEGORIES.length} categories created.`);
  return categoryMap;
}

async function seedProducts(
  payload: Payload,
  categoryMap: Record<string, number>
) {
  console.log(`Creating ${PRODUCTS.length} products...`);

  for (const p of PRODUCTS) {
    const categoryId = categoryMap[p.categorySlug];
    if (!categoryId) {
      console.warn(
        `  Category "${p.categorySlug}" not found, skipping ${p.slug}`
      );
      continue;
    }

    const created = await payload.create({
      collection: "products",
      data: {
        category: categoryId,
        featured: p.featured ?? false,
        promotion: p.promotion ?? {},
        shortDescription: p.shortDescFr,
        slug: p.slug,
        status: "published",
        title: p.titleFr,
        variants: p.variants.map((v) => ({
          label: v.labelFr,
          price: v.price,
          sku: v.sku,
          stock: v.stock,
          weight: v.weight,
        })),
      },
      locale: "fr",
      overrideAccess: true,
    });

    await payload.update({
      collection: "products",
      data: {
        shortDescription: p.shortDescEn,
        title: p.titleEn,
        variants: p.variants.map((v, i) => ({
          id: created.variants?.[i]?.id,
          label: v.labelEn,
          price: v.price,
          sku: v.sku,
          stock: v.stock,
          weight: v.weight,
        })),
      },
      id: created.id,
      locale: "en",
      overrideAccess: true,
    });

    console.log(`  + ${p.titleFr}`);
  }

  console.log(`  ${PRODUCTS.length} products created.`);
}

async function seedSiteConfig(payload: Payload) {
  console.log("Updating SiteConfig...");

  await payload.updateGlobal({
    data: {
      contactInfo: {
        address: "3 Rue Cros-Mayrevieille, 11000 Carcassonne",
        email: "contact@saveursdaude.fr",
        phone: "+33 4 68 25 30 45",
      },
      openingHours: [
        {
          closeAfternoon: "19:00",
          closeMorning: "12:30",
          day: "lundi",
          openAfternoon: "14:00",
          openMorning: "09:00",
        },
        {
          closeAfternoon: "19:00",
          closeMorning: "12:30",
          day: "mardi",
          openAfternoon: "14:00",
          openMorning: "09:00",
        },
        {
          closeAfternoon: "19:00",
          closeMorning: "12:30",
          day: "mercredi",
          openAfternoon: "14:00",
          openMorning: "09:00",
        },
        {
          closeAfternoon: "19:00",
          closeMorning: "12:30",
          day: "jeudi",
          openAfternoon: "14:00",
          openMorning: "09:00",
        },
        {
          closeAfternoon: "19:00",
          closeMorning: "12:30",
          day: "vendredi",
          openAfternoon: "14:00",
          openMorning: "09:00",
        },
        {
          closeAfternoon: "18:00",
          closeMorning: "12:30",
          day: "samedi",
          openAfternoon: "14:00",
          openMorning: "09:00",
        },
        {
          closed: true,
          day: "dimanche",
        },
      ],
      siteName: "Saveurs d'Aude",
      socialLinks: {
        facebook: "https://facebook.com/saveursdaude",
        instagram: "https://instagram.com/saveursdaude",
      },
    },
    overrideAccess: true,
    slug: "site-config",
  });

  console.log("  SiteConfig updated.");
}

async function seedHomepage(
  payload: Payload,
  categoryMap: Record<string, number>
) {
  console.log("Updating Homepage...");

  const featuredCategoryIds = [
    categoryMap["conserves-plats"],
    categoryMap.miels,
    categoryMap.confiseries,
    categoryMap["vins-boissons"],
  ].filter(Boolean);

  await payload.updateGlobal({
    data: {
      featuredCategories: featuredCategoryIds,
      hero: {
        cta: {
          label: "Découvrir la boutique",
          link: "/fr/boutique",
        },
        subtitle:
          "Produits artisanaux et spécialités du terroir audois, sélectionnés avec passion.",
        title: "Les saveurs authentiques de l'Aude",
      },
      promotionBanner: {
        active: true,
        link: "/fr/boutique?sort=price_asc",
        text: "Livraison offerte dès 60€ d'achat !",
      },
    },
    locale: "fr",
    overrideAccess: true,
    slug: "homepage",
  });

  await payload.updateGlobal({
    data: {
      hero: {
        cta: {
          label: "Discover our shop",
          link: "/en/shop",
        },
        subtitle:
          "Artisanal products and specialties from the Aude terroir, selected with passion.",
        title: "Authentic flavors of the Aude",
      },
      promotionBanner: {
        text: "Free delivery on orders over 60€!",
      },
    },
    locale: "en",
    overrideAccess: true,
    slug: "homepage",
  });

  console.log("  Homepage updated.");
}

async function seedPages(payload: Payload) {
  console.log(`Creating ${PAGES.length} pages...`);

  for (const page of PAGES) {
    const created = await payload.create({
      collection: "pages",
      data: {
        content: page.contentFr,
        seo: {
          description: page.seoDescFr,
          title: page.seoTitleFr,
        },
        slug: page.slug,
        title: page.titleFr,
      },
      locale: "fr",
      overrideAccess: true,
    });

    await payload.update({
      collection: "pages",
      data: {
        content: page.contentEn,
        seo: {
          description: page.seoDescEn,
          title: page.seoTitleEn,
        },
        title: page.titleEn,
      },
      id: created.id,
      locale: "en",
      overrideAccess: true,
    });

    console.log(`  + ${page.titleFr}`);
  }

  console.log(`  ${PAGES.length} pages created.`);
}

// ── Reset ───────────────────────────────────────────────────────────────────

async function resetData(payload: Payload) {
  console.log("Resetting existing data...");

  const products = await payload.find({
    collection: "products",
    limit: 0,
    overrideAccess: true,
  });
  for (const product of products.docs) {
    await payload.delete({
      collection: "products",
      id: product.id,
      overrideAccess: true,
    });
  }
  console.log(`  Deleted ${products.totalDocs} products.`);

  const categories = await payload.find({
    collection: "categories",
    limit: 0,
    overrideAccess: true,
  });
  for (const category of categories.docs) {
    await payload.delete({
      collection: "categories",
      id: category.id,
      overrideAccess: true,
    });
  }
  console.log(`  Deleted ${categories.totalDocs} categories.`);

  const pages = await payload.find({
    collection: "pages",
    limit: 0,
    overrideAccess: true,
  });
  for (const page of pages.docs) {
    await payload.delete({
      collection: "pages",
      id: page.id,
      overrideAccess: true,
    });
  }
  console.log(`  Deleted ${pages.totalDocs} pages.`);
}

// ── Main ────────────────────────────────────────────────────────────────────

async function resetPages(payload: Payload) {
  const pages = await payload.find({
    collection: "pages",
    limit: 0,
    overrideAccess: true,
  });
  for (const page of pages.docs) {
    await payload.delete({
      collection: "pages",
      id: page.id,
      overrideAccess: true,
    });
  }
  if (pages.totalDocs > 0) {
    console.log(`  Deleted ${pages.totalDocs} existing pages.`);
  }
}

async function seed() {
  const force = process.argv.includes("--force");
  const pagesOnly = process.argv.includes("--pages-only");
  const payload = await getPayload({ config });

  if (pagesOnly) {
    console.log("Seeding pages only...\n");
    await resetPages(payload);
    await seedPages(payload);
    console.log("\nPages seed completed!");
    process.exit(0);
  }

  const { totalDocs } = await payload.find({
    collection: "categories",
    limit: 1,
    overrideAccess: true,
  });

  if (totalDocs > 0) {
    if (!force) {
      console.log("Data already exists, skipping seed. Use --force to reset.");
      process.exit(0);
    }
    await resetData(payload);
  }

  console.log("Starting seed...\n");

  const categoryMap = await seedCategories(payload);
  await seedProducts(payload, categoryMap);
  await seedPages(payload);
  await seedSiteConfig(payload);
  await seedHomepage(payload, categoryMap);

  console.log("\nSeed completed!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
