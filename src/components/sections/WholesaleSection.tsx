import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

const segments = ["Hoteles", "Restaurantes", "Oficinas", "Cafeterías"];

export const WholesaleSection = () => (
  <section className="bg-secondary py-28 md:py-36 border-t border-border/40">
    <div className="container-editorial grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 space-y-6">
        <Reveal>
          <p className="eyebrow text-accent">Mayoristas</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg text-balance">
            Para quienes hacen del café <span className="italic">su oficio.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead max-w-xl">
            Trabajamos con cafeterías, restaurantes, hoteles y oficinas. Microlotes consistentes, asesoría barista y logística cuidada.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
            {segments.map((s) => (
              <span key={s} className="text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
                · {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-5 lg:justify-self-end">
        <Reveal delay={0.3}>
          <Link
            to="/mayoristas"
            className="btn-luxury bg-foreground text-background hover:bg-accent group inline-flex"
          >
            Ser cliente B2B
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);
