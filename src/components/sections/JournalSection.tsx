import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { journalPosts } from "@/data/journal";

export const JournalSection = () => (
  <section className="bg-background py-28 md:py-40">
    <div className="container-editorial">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
        <div className="max-w-2xl space-y-4">
          <Reveal>
            <p className="eyebrow">Coffee journal</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display-lg text-balance">
              Lecturas del <span className="italic">oficio.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Link to="/diario" className="text-[12px] uppercase tracking-[0.22em] link-underline">
            Ver todo el diario
          </Link>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-3 gap-x-6 gap-y-12">
        {journalPosts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.1}>
            <Link to={`/diario/${post.slug}`} className="group block">
              <div className="aspect-[4/5] overflow-hidden mb-6 bg-secondary">
                <img src={post.image} alt={post.title} loading="lazy" width={1024} height={1280} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-3">
                <span className="text-accent">{post.category}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="font-serif text-2xl font-light leading-snug text-balance group-hover:text-accent transition-colors duration-500">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
