import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { getProductBySlug } from "@/data/products";
import { formatARS, useCart, type CartItem } from "@/contexts/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

const SIZES: CartItem["size"][] = ["250g", "500g", "1kg"];
const GRINDS: CartItem["grind"][] = ["Grano", "Espresso", "Filtrado", "Moka", "Prensa"];
const SIZE_MULT: Record<CartItem["size"], number> = { "250g": 1, "500g": 1.85, "1kg": 3.4 };

const Producto = () => {
  const { slug = "" } = useParams();
  const product = getProductBySlug(slug);
  const cart = useCart();
  const [size, setSize] = useState<CartItem["size"]>("250g");
  const [grind, setGrind] = useState<CartItem["grind"]>("Grano");

  if (!product) {
    return (
      <SiteLayout>
        <section className="container-editorial pt-40 pb-32 text-center">
          <p className="eyebrow">404</p>
          <h1 className="display-md mt-4">Café no encontrado</h1>
          <Link to="/tienda" className="btn-luxury bg-foreground text-background mt-8 inline-flex">Volver a la tienda</Link>
        </section>
      </SiteLayout>
    );
  }

  const price = product.price * SIZE_MULT[size];
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <SiteLayout>
      <div className="bg-background pt-32 pb-24">
        <div className="container-editorial">
          <Link to="/tienda" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition mb-10">
            <ArrowLeft className="h-3 w-3" /> Volver a tienda
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Gallery */}
            <Reveal className="lg:col-span-7">
              <div className="aspect-[4/5] bg-secondary overflow-hidden">
                <img src={product.image} alt={`${product.name} ${product.variety}`} width={1024} height={1280} className="w-full h-full object-cover" />
              </div>
            </Reveal>

            {/* Info */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start space-y-8">
              <div>
                {product.badge && <p className="eyebrow text-accent mb-4">{product.badge}</p>}
                <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{product.region}</p>
                <h1 className="font-serif text-5xl md:text-6xl font-light leading-[1.05] tracking-[-0.01em] mt-3">
                  {product.name} <span className="italic text-muted-foreground">— {product.variety}</span>
                </h1>
                <p className="lead mt-6">{product.description}</p>
              </div>

              {/* Tasting notes */}
              <div className="space-y-4 py-6 border-y border-border/60">
                <p className="eyebrow">Perfil sensorial</p>
                {[
                  { l: "Acidez", v: product.notes.acidity },
                  { l: "Cuerpo", v: product.notes.body },
                  { l: "Dulzor", v: product.notes.sweetness },
                ].map((row) => (
                  <div key={row.l} className="flex items-center gap-4">
                    <span className="text-xs w-16 text-muted-foreground">{row.l}</span>
                    <div className="flex-1 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`flex-1 h-1 ${i < row.v ? "bg-accent" : "bg-border"}`} />
                      ))}
                    </div>
                  </div>
                ))}
                <div className="pt-3 flex flex-wrap gap-2">
                  {product.notes.flavor.map((f) => (
                    <span key={f} className="text-xs px-3 py-1 bg-secondary text-secondary-foreground">{f}</span>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <dl className="grid grid-cols-2 gap-y-3 text-sm">
                <dt className="text-muted-foreground">Productor</dt><dd>{product.producer}</dd>
                <dt className="text-muted-foreground">Altitud</dt><dd>{product.altitude}</dd>
                <dt className="text-muted-foreground">Proceso</dt><dd>{product.process}</dd>
                <dt className="text-muted-foreground">Tueste</dt><dd>{product.roast}</dd>
              </dl>

              {/* Selectors */}
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Tamaño</p>
                  <div className="flex gap-2">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`flex-1 py-3 text-sm border transition ${size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Molienda</p>
                  <div className="grid grid-cols-3 gap-2">
                    {GRINDS.map((g) => (
                      <button
                        key={g}
                        onClick={() => setGrind(g)}
                        className={`py-2.5 text-xs border transition ${grind === g ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-3xl tabular-nums">{formatARS(price)}</span>
                  <span className="text-xs text-muted-foreground">{size} · {grind}</span>
                </div>
                <button
                  onClick={() => cart.add({ product, size, grind, quantity: 1 })}
                  className="w-full btn-luxury bg-foreground text-background hover:bg-accent"
                >
                  Agregar al carrito
                </button>
                <p className="text-xs text-muted-foreground text-center">Envío gratis en CABA por compras superiores a {formatARS(25000)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-editorial max-w-3xl">
          <Reveal>
            <p className="eyebrow text-accent">La historia</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif text-3xl md:text-4xl font-light leading-[1.3] mt-6 text-balance">{product.story}</p>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="bg-background py-24 md:py-32">
        <div className="container-editorial">
          <Reveal>
            <h2 className="display-md mb-12">También te puede interesar</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-x-6 gap-y-12">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Producto;
