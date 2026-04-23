import bag1 from "@/assets/product-bag-1.jpg";
import bag2 from "@/assets/product-bag-2.jpg";
import bag3 from "@/assets/product-bag-3.jpg";

export type Roast = "Claro" | "Medio" | "Oscuro";
export type Process = "Lavado" | "Honey" | "Natural" | "Anaeróbico";
export type Method = "Espresso" | "V60" | "Chemex" | "French Press" | "Moka" | "Aeropress";

export type TastingNotes = {
  acidity: number; // 1-5
  body: number;
  sweetness: number;
  flavor: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string; // "Tolima"
  variety: string; // "Bourbon Rosado"
  region: string; // "Tolima, Colombia"
  altitude: string; // "1.750 msnm"
  producer: string;
  process: Process;
  roast: Roast;
  methods: Method[];
  price: number; // ARS por 250g
  badge?: "Best Seller" | "Nuevo" | "Edición limitada";
  image: string;
  description: string;
  story: string;
  notes: TastingNotes;
};

export const products: Product[] = [
  {
    id: "tolima-bourbon-rosado",
    slug: "tolima-bourbon-rosado",
    name: "Tolima",
    variety: "Bourbon Rosado",
    region: "Planadas, Tolima",
    altitude: "1.750 msnm",
    producer: "Familia Riveros",
    process: "Lavado",
    roast: "Medio",
    methods: ["V60", "Chemex", "Aeropress"],
    price: 12800,
    badge: "Best Seller",
    image: bag1,
    description: "Una taza luminosa, jugosa y delicada. Bourbon Rosado de altura, fermentado y secado al sol.",
    story:
      "En las laderas de Planadas, la familia Riveros cultiva un microlote de Bourbon Rosado a más de 1.700 metros. La cosecha selectiva y el secado lento al sol revelan una taza de increíble claridad.",
    notes: {
      acidity: 4,
      body: 3,
      sweetness: 4,
      flavor: ["Mandarina", "Miel", "Jazmín", "Cacao blanco"],
    },
  },
  {
    id: "huila-geisha",
    slug: "huila-geisha",
    name: "Huila",
    variety: "Geisha",
    region: "Pitalito, Huila",
    altitude: "1.900 msnm",
    producer: "Finca El Mirador",
    process: "Honey",
    roast: "Claro",
    methods: ["V60", "Chemex"],
    price: 18500,
    badge: "Edición limitada",
    image: bag3,
    description: "Geisha lavada en honey. Floral, etérea y compleja. Una experiencia para los sentidos.",
    story:
      "El Mirador es una finca familiar de cuarta generación. Su microlote de Geisha es una de las expresiones más finas del Huila.",
    notes: {
      acidity: 5,
      body: 2,
      sweetness: 5,
      flavor: ["Bergamota", "Jazmín", "Durazno blanco", "Té negro"],
    },
  },
  {
    id: "narino-castillo",
    slug: "narino-castillo",
    name: "Nariño",
    variety: "Castillo",
    region: "Buesaco, Nariño",
    altitude: "2.100 msnm",
    producer: "Cooperativa Buesaco",
    process: "Natural",
    roast: "Medio",
    methods: ["Espresso", "Moka", "French Press"],
    price: 11200,
    badge: "Nuevo",
    image: bag2,
    description: "Cuerpo sedoso, dulzor profundo. Notas de fruta roja madura y chocolate negro.",
    story:
      "Nariño produce algunos de los cafés más altos del mundo. Este natural cuidadosamente fermentado es chocolate puro en taza.",
    notes: {
      acidity: 3,
      body: 4,
      sweetness: 5,
      flavor: ["Frutos rojos", "Chocolate negro", "Ciruela", "Caramelo"],
    },
  },
  {
    id: "antioquia-caturra",
    slug: "antioquia-caturra",
    name: "Antioquia",
    variety: "Caturra",
    region: "Jericó, Antioquia",
    altitude: "1.650 msnm",
    producer: "Don Aníbal Restrepo",
    process: "Lavado",
    roast: "Oscuro",
    methods: ["Espresso", "Moka"],
    price: 10500,
    badge: "Best Seller",
    image: bag2,
    description: "Espresso clásico colombiano. Achocolatado, con cuerpo y un final largo y suave.",
    story:
      "Don Aníbal cultiva en Jericó desde hace 40 años. Su Caturra es la base de nuestras mezclas para espresso.",
    notes: {
      acidity: 2,
      body: 5,
      sweetness: 4,
      flavor: ["Cacao", "Avellana", "Caramelo", "Tabaco dulce"],
    },
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
