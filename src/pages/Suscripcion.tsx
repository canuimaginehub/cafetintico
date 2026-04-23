import { Check } from "lucide-react";
import { StubPage } from "@/components/StubPage";
import { Reveal } from "@/components/Reveal";
import { formatARS } from "@/contexts/CartContext";

const plans = [
  { name: "Esencial", freq: "Cada 30 días", bags: 1, price: 11500, perks: ["1 microlote x 250g", "Envío gratis en CABA", "Pausá cuando quieras"] },
  { name: "Curado", freq: "Cada 30 días", bags: 2, price: 21800, perks: ["2 microlotes x 250g", "Envío gratis en CABA", "Acceso anticipado a ediciones limitadas"], featured: true },
  { name: "Inmersión", freq: "Cada 15 días", bags: 2, price: 38500, perks: ["2 microlotes x 500g", "Envío gratis en todo el país", "Notas de cata firmadas por el tostador"] },
];

const Suscripcion = () => (
  <StubPage
    eyebrow="Suscripción"
    title={<>Tu café perfecto. <span className="italic">Cada mes.</span></>}
    description="Tres planes para acompañar tu ritual. Personalizá la frecuencia, la molienda y descubrí microlotes nuevos sin moverte de tu casa."
  >
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.1}>
          <div className={`relative p-8 lg:p-10 h-full flex flex-col border ${p.featured ? "bg-espresso text-cream border-espresso" : "bg-background border-border"}`}>
            {p.featured && (
              <span className="absolute top-0 right-6 -translate-y-1/2 bg-terracotta text-cream text-[10px] uppercase tracking-[0.22em] px-3 py-1.5">Más elegido</span>
            )}
            <p className={`text-[11px] uppercase tracking-[0.22em] ${p.featured ? "text-cream-muted" : "text-muted-foreground"}`}>{p.freq}</p>
            <h3 className={`font-serif text-4xl font-light mt-3 ${p.featured ? "text-cream" : ""}`}>{p.name}</h3>
            <p className={`mt-6 font-serif text-3xl tabular-nums ${p.featured ? "text-cream" : ""}`}>{formatARS(p.price)}<span className={`text-xs uppercase tracking-[0.22em] ml-2 ${p.featured ? "text-cream-muted" : "text-muted-foreground"}`}>/ envío</span></p>
            <ul className="mt-8 space-y-3 flex-1">
              {p.perks.map((perk) => (
                <li key={perk} className="flex gap-3 text-sm">
                  <Check className={`h-4 w-4 mt-0.5 shrink-0 ${p.featured ? "text-terracotta" : "text-accent"}`} />
                  <span className={p.featured ? "text-cream/90" : ""}>{perk}</span>
                </li>
              ))}
            </ul>
            <button className={`mt-8 btn-luxury w-full ${p.featured ? "bg-cream text-espresso hover:bg-terracotta hover:text-cream" : "bg-foreground text-background hover:bg-accent"}`}>
              Empezar
            </button>
          </div>
        </Reveal>
      ))}
    </div>
  </StubPage>
);
export default Suscripcion;
