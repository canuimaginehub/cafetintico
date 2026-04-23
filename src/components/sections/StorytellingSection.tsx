import { Reveal } from "@/components/Reveal";
import { producers } from "@/data/producers";
import farm from "@/assets/colombia-farm.jpg";

export const StorytellingSection = () => (
  <section className="relative bg-espresso text-cream py-32 md:py-44 overflow-hidden">
    <div className="absolute inset-0 grain-overlay" />

    <div className="container-editorial relative">
      <div className="max-w-3xl mb-20 md:mb-28">
        <Reveal>
          <p className="eyebrow text-cream-muted mb-6">Origen</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-xl text-cream text-balance">
            No vendemos café.
            <br />
            <span className="italic text-cream-muted">Compartimos historias.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead text-cream-muted/90 max-w-xl mt-8">
            Cada bolsa que llega a tu casa nace en una finca colombiana. Conocé a quienes están detrás.
          </p>
        </Reveal>
      </div>

      {/* Hero farm image */}
      <Reveal delay={0.1}>
        <div className="relative aspect-[21/9] overflow-hidden mb-20">
          <img src={farm} alt="Plantación de café en los Andes colombianos" loading="lazy" width={1920} height={820} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-x-12 gap-y-3 text-cream">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-cream-muted">Altitud</p>
              <p className="font-serif text-2xl mt-1">1.500 — 2.100 msnm</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-cream-muted">Regiones</p>
              <p className="font-serif text-2xl mt-1">Tolima · Huila · Nariño · Antioquia</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-cream-muted">Productores</p>
              <p className="font-serif text-2xl mt-1">14 fincas familiares</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Producer cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {producers.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}>
            <article className="group">
              <div className="aspect-[4/5] overflow-hidden mb-6 bg-espresso-soft">
                <img src={p.image} alt={p.name} loading="lazy" width={1080} height={1350} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-cream-muted">{p.region}</p>
              <h3 className="font-serif text-3xl font-light mt-3 text-cream">{p.name}</h3>
              <p className="text-sm text-cream-muted/85 mt-3 leading-relaxed">{p.story}</p>
              <div className="mt-4 pt-4 border-t border-cream/10 text-xs text-cream-muted/70 space-y-1">
                <p>{p.altitude} · {p.farm}</p>
                <p>{p.process}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
