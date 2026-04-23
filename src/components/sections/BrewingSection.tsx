import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { brewingMethods } from "@/data/brewing";
import { ArrowRight } from "lucide-react";

export const BrewingSection = () => (
  <section className="bg-background py-28 md:py-40">
    <div className="container-editorial">
      <div className="grid lg:grid-cols-12 gap-12 mb-16 md:mb-20">
        <div className="lg:col-span-7 space-y-6">
          <Reveal>
            <p className="eyebrow">El ritual</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-lg text-balance">
              Cada método es <span className="italic">una pausa.</span>
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:pt-10">
          <Reveal delay={0.2}>
            <p className="lead">
              Guías cortas para extraer lo mejor de cada microlote. Desde el espresso clásico hasta el filtrado más delicado.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-x-6 gap-y-12">
        {brewingMethods.map((m, i) => (
          <Reveal key={m.slug} delay={i * 0.1}>
            <article className="group">
              <Link to={`/experiencia#${m.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden mb-6">
                  <img src={m.image} alt={`Preparación con ${m.name}`} loading="lazy" width={1024} height={1280} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between text-cream text-[10px] uppercase tracking-[0.22em]">
                    <span>{m.time}</span>
                    <span>Ratio {m.ratio}</span>
                  </div>
                </div>
                <h3 className="font-serif text-3xl font-light">{m.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{m.short}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] link-underline">
                  Ver guía <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
