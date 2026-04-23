export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Camila R.",
    role: "Suscriptora hace 8 meses",
    quote:
      "Cada bolsa que llega a casa es una sorpresa. Se nota el cuidado en cada detalle: el tueste, el empaque, la ficha del productor.",
  },
  {
    name: "Mateo D.",
    role: "Barista, Palermo",
    quote:
      "Trabajamos con TINTICO en la cafetería. La consistencia del Tolima Bourbon Rosado en filtrado es notable, taza tras taza.",
  },
  {
    name: "Lucía F.",
    role: "Cliente desde 2023",
    quote:
      "El quiz me recomendó el Nariño y fue exactamente lo que buscaba para mi moka. Una experiencia diferente al café de supermercado.",
  },
];
