import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const previews = [
  { n: "01", q: "¿Cómo te gusta tu café?" },
  { n: "02", q: "¿Suave o intenso?" },
  { n: "03", q: "¿Frutal o achocolatado?" },
  { n: "04", q: "¿Tu método favorito?" },
];

export const QuizSection = () => (
  <section className="bg-background py-28 md:py-40">
    <div className="container-editorial grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <div className="lg:col-span-5 space-y-8">
        <Reveal>
          <p className="eyebrow text-accent">Coffee Finder</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg text-balance">
            ¿Qué café es <span className="italic">tuyo?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead max-w-md">
            Cuatro preguntas. Una recomendación personalizada. Descubrí el microlote que mejor se adapta a tu paladar y tu método.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <Link to="/quiz" className="btn-luxury bg-foreground text-background hover:bg-accent group inline-flex">
            Empezar el quiz
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <div className="lg:col-span-7">
        <div className="grid sm:grid-cols-2 gap-4">
          {previews.map((p, i) => (
            <Reveal key={p.n} delay={0.1 + i * 0.08}>
              <div className="group relative bg-card border border-border/60 p-8 aspect-[4/3] flex flex-col justify-between hover:shadow-card-hover hover:-translate-y-1 transition-all duration-700">
                <span className="font-serif text-5xl font-light text-muted-foreground/40">{p.n}</span>
                <p className="font-serif text-xl font-light leading-snug text-balance">{p.q}</p>
                <span className="absolute bottom-6 right-6 w-8 h-8 border border-border rounded-full flex items-center justify-center text-muted-foreground group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-all duration-500">
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
