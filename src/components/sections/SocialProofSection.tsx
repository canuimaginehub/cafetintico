import { Reveal } from "@/components/Reveal";
import { testimonials } from "@/data/testimonials";

export const SocialProofSection = () => (
  <section className="bg-secondary py-28 md:py-36">
    <div className="container-editorial">
      <div className="max-w-3xl mb-16 md:mb-20">
        <Reveal>
          <p className="eyebrow mb-6">Comunidad</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg text-balance">
            Voces de quienes <span className="italic">comparten el ritual.</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="bg-background p-8 lg:p-10 h-full flex flex-col">
              <div className="text-4xl font-serif text-accent mb-6 leading-none">"</div>
              <blockquote className="font-serif text-xl font-light leading-relaxed text-balance flex-1">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-border/60">
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4}>
        <div className="mt-20 pt-12 border-t border-border/60 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: "14", l: "Productores aliados" },
            { n: "2.100", l: "msnm máxima altitud" },
            { n: "+8.000", l: "Bolsas tostadas/mes" },
            { n: "4.9", l: "Calificación promedio" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-serif text-5xl md:text-6xl font-light tracking-tight">{s.n}</p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mt-3">{s.l}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);
