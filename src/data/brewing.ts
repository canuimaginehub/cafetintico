import v60 from "@/assets/brewing-v60.jpg";
import espresso from "@/assets/brewing-espresso.jpg";
import chemex from "@/assets/brewing-chemex.jpg";

export type BrewingMethod = {
  slug: string;
  name: string;
  short: string;
  time: string;
  ratio: string;
  image: string;
  steps: string[];
};

export const brewingMethods: BrewingMethod[] = [
  {
    slug: "v60",
    name: "V60",
    short: "Claridad y precisión",
    time: "3:30 min",
    ratio: "1:16",
    image: v60,
    steps: [
      "15g de café en molienda media-fina",
      "Bloom con 50g de agua a 93°C, 30 segundos",
      "Vertidos en espiral hasta 250g totales",
      "Drawdown completo a los 3:30 minutos",
    ],
  },
  {
    slug: "espresso",
    name: "Espresso",
    short: "Intensidad concentrada",
    time: "28 seg",
    ratio: "1:2",
    image: espresso,
    steps: [
      "18g en el portafiltro, molienda fina",
      "Distribución y tamping nivelado",
      "Extracción de 36g en 25-30 segundos",
      "Crema dorada y persistente",
    ],
  },
  {
    slug: "chemex",
    name: "Chemex",
    short: "Cuerpo limpio y sedoso",
    time: "4:30 min",
    ratio: "1:15",
    image: chemex,
    steps: [
      "30g de café en molienda media",
      "Bloom con 60g de agua, 45 segundos",
      "Tres vertidos hasta 450g totales",
      "Filtro grueso para una taza cristalina",
    ],
  },
];
