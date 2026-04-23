import { StubPage } from "@/components/StubPage";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/products";

const Tienda = () => (
  <StubPage
    eyebrow="Tienda"
    title={
      <>
        Microlotes <span className="italic">de origen único.</span>
      </>
    }
    description="Cada café que ofrecemos viene de una finca trazada, con ficha de productor, proceso y altitud. Tostado fresco cada semana en Buenos Aires."
  >
    <Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </Reveal>
  </StubPage>
);

export default Tienda;
