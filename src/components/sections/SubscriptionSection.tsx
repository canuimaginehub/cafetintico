import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Check } from "lucide-react";
import boxImg from "@/assets/subscription-box.jpg";

const benefits = [
  "Microlote nuevo cada mes",
  "15% off vs compra unitaria",
  "Envío gratis en CABA",
  "Pausá o cancelá cuando quieras",
];

export const SubscriptionSection = () => (
  <section className="bg-espresso text-cream py-32 md:py-44 relative overflow-hidden">
    <div className="absolute inset-0 grain-overlay" />
    <div className="container-editorial relative grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
      <div className="lg:col-span-6 order-2 lg:order-1">
        <Reveal>
          <div className="aspect-[4/5] overflow-hidden">
            <img src={boxImg} alt="Caja de suscripción TINTICO con tres microlotes" loading="lazy" width={1600} height={2000} className="w-full h-full object-cover" />
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-6 order-1 lg:order-2 space-y-8">
        <Reveal>
          <p className="eyebrow text-cream-muted">Suscripción</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-xl text-cream text-balance">
            Tu café perfecto.
            <br />
            <span className="italic text-cream-muted">Cada mes.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead text-cream-muted/90 max-w-md">
            Microlotes seleccionados, tostados frescos y enviados a tu casa cada 15 o 30 días. Personalizá según tu método y tu paladar.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <ul className="space-y-3 pt-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-cream/90">
                <span className="w-6 h-6 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.4}>
          <Link
            to="/suscripcion"
            className="btn-luxury bg-cream text-espresso hover:bg-terracotta hover:text-cream group inline-flex mt-4"
          >
            Armá tu suscripción
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);
