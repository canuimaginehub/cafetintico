import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { formatARS } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

type Props = { product: Product; index?: number; theme?: "light" | "dark" };

export const ProductCard = ({ product, index = 0, theme = "light" }: Props) => {
  const dark = theme === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/producto/${product.slug}`} className="block">
        <div className={cn("relative aspect-[4/5] overflow-hidden mb-6", dark ? "bg-espresso-soft" : "bg-secondary")}>
          {product.badge && (
            <span
              className={cn(
                "absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[0.22em] px-3 py-1.5",
                dark ? "bg-cream text-espresso" : "bg-espresso text-cream",
              )}
            >
              {product.badge}
            </span>
          )}
          <img
            src={product.image}
            alt={`${product.name} ${product.variety}`}
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 p-5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500",
              dark ? "bg-gradient-to-t from-espresso/90 to-transparent" : "bg-gradient-to-t from-background/95 to-transparent",
            )}
          >
            <span className={cn("text-[11px] uppercase tracking-[0.22em]", dark ? "text-cream" : "text-foreground")}>
              Ver producto →
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <p className={cn("text-[10px] uppercase tracking-[0.28em]", dark ? "text-cream-muted" : "text-muted-foreground")}>
            {product.region}
          </p>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className={cn("font-serif text-2xl font-light leading-tight", dark && "text-cream")}>
              {product.name} <span className="text-muted-foreground italic">— {product.variety}</span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {product.notes.flavor.slice(0, 3).map((n) => (
              <span key={n} className={cn("text-xs", dark ? "text-cream-muted" : "text-muted-foreground")}>
                {n}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className={cn("text-sm tabular-nums", dark ? "text-cream" : "text-foreground")}>
              {formatARS(product.price)}{" "}
              <span className={cn("text-xs", dark ? "text-cream-muted" : "text-muted-foreground")}>/ 250g</span>
            </span>
            <span className={cn("text-[10px] uppercase tracking-[0.22em]", dark ? "text-cream-muted" : "text-muted-foreground")}>
              {product.roast}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
