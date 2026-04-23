import { StubPage } from "@/components/StubPage";
import { Reveal } from "@/components/Reveal";

const segments = [
  { t: "Cafeterías", d: "Microlotes consistentes y asesoría barista para tu carta." },
  { t: "Restaurantes", d: "Café de origen como cierre de experiencia gastronómica." },
  { t: "Hoteles", d: "Programa premium para huéspedes con desayuno destacado." },
  { t: "Oficinas", d: "Equipamiento, café y mantenimiento para tu equipo." },
];

const Mayoristas = () => (
  <StubPage
    eyebrow="Mayoristas"
    title={<>Café de especialidad <span className="italic">para tu negocio.</span></>}
    description="Asesoría barista, microlotes consistentes, equipamiento y logística cuidada. Trabajamos con quienes hacen del café un oficio."
  >
    <div className="grid md:grid-cols-2 gap-4 mb-16">
      {segments.map((s, i) => (
        <Reveal key={s.t} delay={i * 0.05}>
          <div className="border border-border/60 bg-card p-8">
            <h3 className="font-serif text-2xl font-light">{s.t}</h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.d}</p>
          </div>
        </Reveal>
      ))}
    </div>

    <Reveal>
      <form className="bg-secondary p-8 lg:p-12 space-y-6">
        <div>
          <p className="eyebrow text-accent">Contanos sobre tu proyecto</p>
          <h3 className="display-md mt-3">Hablemos.</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="bg-background border border-border px-4 py-3 text-sm focus:border-foreground outline-none transition" placeholder="Nombre" />
          <input className="bg-background border border-border px-4 py-3 text-sm focus:border-foreground outline-none transition" placeholder="Empresa" />
          <input className="bg-background border border-border px-4 py-3 text-sm focus:border-foreground outline-none transition" placeholder="Email" type="email" />
          <input className="bg-background border border-border px-4 py-3 text-sm focus:border-foreground outline-none transition" placeholder="Teléfono" />
        </div>
        <textarea rows={4} className="w-full bg-background border border-border px-4 py-3 text-sm focus:border-foreground outline-none transition resize-none" placeholder="Tipo de negocio y necesidades" />
        <button type="submit" className="btn-luxury bg-foreground text-background hover:bg-accent">Enviar consulta</button>
      </form>
    </Reveal>
  </StubPage>
);
export default Mayoristas;
