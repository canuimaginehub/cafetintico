import { Link } from "react-router-dom";
import { StubPage } from "@/components/StubPage";
import { Reveal } from "@/components/Reveal";
import { journalPosts } from "@/data/journal";

const Diario = () => (
  <StubPage
    eyebrow="Coffee Journal"
    title={<>Lecturas <span className="italic">del oficio.</span></>}
    description="Origen, brewing, cultura y ritual. Una ventana al mundo del café de especialidad."
  >
    <div className="grid md:grid-cols-2 gap-x-6 gap-y-16">
      {journalPosts.map((post, i) => (
        <Reveal key={post.slug} delay={i * 0.1}>
          <Link to={`/diario/${post.slug}`} className="group block">
            <div className="aspect-[16/10] overflow-hidden bg-secondary mb-6">
              <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </div>
            <div className="flex gap-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
              <span className="text-accent">{post.category}</span><span>·</span><span>{post.date}</span>
            </div>
            <h2 className="font-serif text-3xl font-light leading-snug group-hover:text-accent transition">{post.title}</h2>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{post.excerpt}</p>
          </Link>
        </Reveal>
      ))}
    </div>
  </StubPage>
);
export default Diario;
