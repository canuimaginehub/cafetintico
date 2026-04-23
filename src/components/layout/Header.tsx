import { Link, NavLink } from "react-router-dom";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/tienda", label: "Tienda" },
  { to: "/nuestro-cafe", label: "Nuestro café" },
  { to: "/origen", label: "Origen" },
  { to: "/experiencia", label: "Experiencia" },
  { to: "/diario", label: "Diario" },
  { to: "/suscripcion", label: "Suscripción" },
  { to: "/mayoristas", label: "Mayoristas" },
];

type Props = { transparent?: boolean };

export const Header = ({ transparent = false }: Props) => {
  const cart = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = transparent && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
            : transparent
              ? "bg-transparent"
              : "bg-background border-b border-border/40",
        )}
      >
        <div className="container-editorial flex h-20 items-center justify-between">
          {/* Mobile menu */}
          <button
            className={cn("lg:hidden", isDark ? "text-cream" : "text-foreground")}
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className={cn(
              "font-serif text-2xl tracking-[0.18em] font-light transition-colors duration-500",
              isDark ? "text-cream" : "text-foreground",
            )}
            aria-label="TINTICO inicio"
          >
            TINTICO
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "text-[12px] uppercase tracking-[0.22em] link-underline transition-colors duration-500",
                    isDark ? "text-cream/85 hover:text-cream" : "text-foreground/75 hover:text-foreground",
                    isActive && (isDark ? "text-cream" : "text-foreground"),
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className={cn("flex items-center gap-1", isDark ? "text-cream" : "text-foreground")}>
            <Link to="/tienda" className="hidden md:inline-flex p-2 hover:opacity-70 transition" aria-label="Buscar">
              <Search className="h-4 w-4" />
            </Link>
            <Link to="/cuenta" className="hidden md:inline-flex p-2 hover:opacity-70 transition" aria-label="Mi cuenta">
              <User className="h-4 w-4" />
            </Link>
            <button
              onClick={cart.open}
              className="relative p-2 hover:opacity-70 transition"
              aria-label={`Carrito (${cart.count})`}
            >
              <ShoppingBag className="h-4 w-4" />
              {cart.count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-medium flex items-center justify-center">
                  {cart.count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-espresso text-cream"
          >
            <div className="container-editorial flex h-20 items-center justify-between">
              <span className="font-serif text-2xl tracking-[0.18em]">TINTICO</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="container-editorial mt-8 flex flex-col gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-4xl font-light"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 pt-8 border-t border-cream/15 flex flex-col gap-4 text-[12px] uppercase tracking-[0.22em] text-cream/70">
                <Link to="/cuenta" onClick={() => setMobileOpen(false)}>Mi cuenta</Link>
                <Link to="/contacto" onClick={() => setMobileOpen(false)}>Contacto</Link>
                <Link to="/quiz" onClick={() => setMobileOpen(false)}>Coffee Finder</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
