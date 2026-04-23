import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404: ruta no encontrada", location.pathname);
  }, [location.pathname]);

  return (
    <SiteLayout>
      <section className="container-editorial pt-40 pb-32 text-center">
        <p className="font-serif text-8xl md:text-9xl font-light text-muted-foreground/30">404</p>
        <h1 className="display-md mt-4">Esta página se enfrió.</h1>
        <p className="lead mt-6 max-w-md mx-auto">
          La ruta que buscás no existe o fue movida. Volvamos al inicio.
        </p>
        <Link to="/" className="btn-luxury bg-foreground text-background hover:bg-accent mt-10 inline-flex">
          Volver al inicio
        </Link>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
