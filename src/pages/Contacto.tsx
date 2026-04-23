import { StubPage } from "@/components/StubPage";
import { Reveal } from "@/components/Reveal";
import { MapPin, Mail, MessageCircle } from "lucide-react";

const Contacto = () => (
  <StubPage
    eyebrow="Contacto"
    title={<>Estamos para <span className="italic">ayudarte.</span></>}
    description="Escribinos, pasá por nuestro tostadero o conversemos por WhatsApp. Atendemos consultas sobre productos, suscripciones y cuentas mayoristas."
  >
    <div className="grid md:grid-cols-3 gap-6">
      <Reveal>
        <div className="border border-border/60 p-8 space-y-3">
          <MapPin className="h-5 w-5 text-accent" />
          <p className="font-serif text-xl">Tostadero</p>
          <p className="text-sm text-muted-foreground">Palermo, Buenos Aires<br />Lun a sáb · 10 a 19hs</p>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="border border-border/60 p-8 space-y-3">
          <Mail className="h-5 w-5 text-accent" />
          <p className="font-serif text-xl">Email</p>
          <a href="mailto:hola@tintico.com.ar" className="text-sm link-underline">hola@tintico.com.ar</a>
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="border border-border/60 p-8 space-y-3">
          <MessageCircle className="h-5 w-5 text-accent" />
          <p className="font-serif text-xl">WhatsApp</p>
          <a href="https://wa.me/5491100000000" className="text-sm link-underline">+54 9 11 0000 0000</a>
        </div>
      </Reveal>
    </div>
  </StubPage>
);
export default Contacto;
