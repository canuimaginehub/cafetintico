import farm from "@/assets/colombia-farm.jpg";
import hands from "@/assets/producer-hands.jpg";

export type Producer = {
  id: string;
  name: string;
  farm: string;
  region: string;
  altitude: string;
  process: string;
  story: string;
  image: string;
};

export const producers: Producer[] = [
  {
    id: "riveros",
    name: "Familia Riveros",
    farm: "Finca La Esperanza",
    region: "Planadas, Tolima",
    altitude: "1.750 msnm",
    process: "Lavado y secado al sol",
    story:
      "Tres generaciones cultivando café en las laderas de Planadas. Cada cereza se cosecha a mano en su punto óptimo de madurez.",
    image: hands,
  },
  {
    id: "mirador",
    name: "Finca El Mirador",
    farm: "El Mirador",
    region: "Pitalito, Huila",
    altitude: "1.900 msnm",
    process: "Honey y procesos experimentales",
    story:
      "Una finca familiar de cuarta generación. Sus microlotes de Geisha han ganado premios en los principales concursos del país.",
    image: farm,
  },
  {
    id: "buesaco",
    name: "Cooperativa Buesaco",
    farm: "Asociación de pequeños productores",
    region: "Buesaco, Nariño",
    altitude: "2.100 msnm",
    process: "Natural y fermentaciones controladas",
    story:
      "Más de 80 familias trabajan juntas en una de las regiones cafeteras más altas del mundo. Comercio justo y trazabilidad total.",
    image: farm,
  },
];
