import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const cols = [
  {
    title: "Tienda",
    links: [
      { to: "/tienda/cafe", label: "Café de especialidad" },
      { to: "/tienda/equipos", label: "Equipos" },
      { to: "/tienda/combos", label: "Combos" },
      { to: "/suscripcion", label: "Suscripción" },
    ],
  },
  {
    title: "Marca",
    links: [
      { to: "/nuestro-cafe", label: "Nuestro café" },
      { to: "/origen", label: "Origen Colombia" },
      { to: "/experiencia", label: "Experiencia" },
      { to: "/diario", label: "Coffee Journal" },
    ],
  },
  {
    title: "Servicio",
    links: [
      { to: "/contacto", label: "Contacto" },
      { to: "/mayoristas", label: "Mayoristas" },
      { to: "/cuenta", label: "Mi cuenta" },
      { to: "/quiz", label: "Coffee Finder" },
    ],
  },
];

export const Footer = () => (
  <footer className="bg-espresso text-cream relative grain-overlay">
    <div className="container-editorial py-24 lg:py-32">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <h3 className="font-serif text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.01em] text-balance">
            Sumate al ritual.
            <br />
            <span className="italic text-cream-muted">Recibí cada microlote nuevo.</span>
          </h3>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              required
              placeholder="tu@email.com"
              className="flex-1 bg-transparent border-b border-cream/30 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-cream transition"
            />
            <button
              type="submit"
              className="text-[11px] uppercase tracking-[0.28em] text-cream hover:text-terracotta transition py-3"
            >
              Suscribirme →
            </button>
          </form>
          <p className="text-xs text-cream-muted/70 max-w-md leading-relaxed">
            Una vez al mes. Productores, microlotes nuevos y guías de brewing. Nada más.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
          {cols.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-[11px] uppercase tracking-[0.28em] text-cream/50">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-cream/85 hover:text-cream link-underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-cream/10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-serif text-2xl tracking-[0.2em] font-light">TINTICO</p>
          <p className="text-xs text-cream-muted/70">Café de especialidad de Colombia · Tostado en Buenos Aires</p>
        </div>
        <div className="flex items-center gap-8 text-xs text-cream-muted/70">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cream transition">
            <Instagram className="h-4 w-4" /> @tintico
          </a>
          <span>© {new Date().getFullYear()} TINTICO</span>
        </div>
      </div>
    </div>
  </footer>
);
