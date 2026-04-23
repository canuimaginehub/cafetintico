import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const BestSellersSection = () => (
  <section className="bg-background py-28 md:py-40 border-t border-border/40">
    <div className="container-editorial">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
        <div className="space-y-4 max-w-2xl">
          <Reveal>
            <p className="eyebrow">Best sellers</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-lg text-balance">
              Microlotes <span className="italic">curados</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Link to="/tienda" className="text-[12px] uppercase tracking-[0.22em] link-underline">
            Ver toda la tienda
          </Link>
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);
