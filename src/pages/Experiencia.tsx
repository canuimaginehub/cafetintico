import { StubPage } from "@/components/StubPage";
import { Reveal } from "@/components/Reveal";
import { brewingMethods } from "@/data/brewing";

const Experiencia = () => (
  <StubPage
    eyebrow="Experiencia"
    title={<>El ritual <span className="italic">paso a paso.</span></>}
    description="Cuatro métodos, cuatro maneras de extraer un microlote. Recetas precisas para cada preparación."
  >
    <div className="space-y-20">
      {brewingMethods.map((m, i) => (
        <Reveal key={m.slug} delay={i * 0.05}>
          <article id={m.slug} className="grid md:grid-cols-2 gap-10 items-center">
            <div className={`aspect-[4/5] overflow-hidden bg-secondary ${i % 2 ? "md:order-2" : ""}`}>
              <img src={m.image} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-5">
              <p className="eyebrow text-accent">{m.short}</p>
              <h3 className="font-serif text-5xl font-light">{m.name}</h3>
              <div className="flex gap-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <span>Tiempo · {m.time}</span>
                <span>Ratio · {m.ratio}</span>
              </div>
              <ol className="space-y-3 pt-4 border-t border-border/60">
                {m.steps.map((s, idx) => (
                  <li key={idx} className="flex gap-4 text-sm">
                    <span className="font-serif text-accent w-6 shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </StubPage>
);
export default Experiencia;
