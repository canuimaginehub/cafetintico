import { StubPage } from "@/components/StubPage";
import { Reveal } from "@/components/Reveal";
import { producers } from "@/data/producers";

const Origen = () => (
  <StubPage
    eyebrow="Origen Colombia"
    title={<>Las manos detrás <span className="italic">de cada taza.</span></>}
    description="Trabajamos directamente con familias productoras en Tolima, Huila, Nariño y Antioquia. Conocelas."
  >
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
      {producers.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.1}>
          <article>
            <div className="aspect-[4/3] overflow-hidden bg-secondary mb-6">
              <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{p.region}</p>
            <h3 className="font-serif text-3xl font-light mt-2">{p.name}</h3>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{p.story}</p>
            <div className="mt-4 pt-4 border-t border-border/60 text-xs text-muted-foreground">
              {p.altitude} · {p.process}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </StubPage>
);
export default Origen;
