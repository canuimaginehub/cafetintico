import farm from "@/assets/colombia-farm.jpg";
import v60 from "@/assets/brewing-v60.jpg";
import hands from "@/assets/producer-hands.jpg";

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Origen" | "Brewing" | "Cultura" | "Ritual";
  readingTime: string;
  date: string;
  image: string;
};

export const journalPosts: JournalPost[] = [
  {
    slug: "la-altura-del-sabor",
    title: "La altura del sabor: por qué los cafés de Nariño son únicos",
    excerpt:
      "A más de dos mil metros sobre el nivel del mar, el café madura más lento. Una guía sobre cómo la altitud transforma cada taza.",
    category: "Origen",
    readingTime: "6 min",
    date: "Marzo 2025",
    image: farm,
  },
  {
    slug: "v60-la-receta-perfecta",
    title: "V60: la receta que usamos cada mañana",
    excerpt:
      "Tres baristas, tres recetas. Compartimos el método paso a paso para extraer lo mejor de un microlote en V60.",
    category: "Brewing",
    readingTime: "4 min",
    date: "Febrero 2025",
    image: v60,
  },
  {
    slug: "manos-que-cosechan",
    title: "Las manos detrás de cada taza",
    excerpt:
      "Visitamos la finca de la familia Riveros en Tolima. Una historia sobre tradición, paciencia y el oficio del café.",
    category: "Cultura",
    readingTime: "8 min",
    date: "Enero 2025",
    image: hands,
  },
];
