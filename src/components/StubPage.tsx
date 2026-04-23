import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Reveal } from "@/components/Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
};

/**
 * Plantilla editorial para páginas en construcción del sitio TINTICO.
 * Mantiene la calidad visual del Home en cada ruta.
 */
export const StubPage = ({ eyebrow, title, description, children }: Props) => (
  <SiteLayout>
    <section className="bg-background pt-40 pb-24 md:pt-48 md:pb-36 border-b border-border/40">
      <div className="container-editorial max-w-4xl">
        <Reveal>
          <p className="eyebrow text-accent mb-8">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="display-xl text-balance">{title}</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead mt-8 max-w-2xl">{description}</p>
        </Reveal>
      </div>
    </section>

    <section className="bg-background py-20 md:py-28">
      <div className="container-editorial max-w-4xl space-y-10">
        {children ?? (
          <Reveal>
            <div className="border border-border/60 bg-card p-10 md:p-14 text-center space-y-6">
              <p className="eyebrow">Próximamente</p>
              <p className="font-serif text-3xl font-light text-balance">
                Esta sección está en construcción <span className="italic">como parte de la experiencia premium.</span>
              </p>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Mientras tanto, te invitamos a recorrer el resto del sitio o consultarnos por WhatsApp.
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <Link to="/" className="btn-luxury bg-foreground text-background hover:bg-accent">Volver al inicio</Link>
                <Link to="/tienda" className="btn-luxury border border-border hover:bg-secondary">Ver tienda</Link>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  </SiteLayout>
);
