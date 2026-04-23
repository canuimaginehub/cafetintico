import { MessageCircle } from "lucide-react";

export const WhatsAppFloat = () => (
  <a
    href="https://wa.me/5491100000000?text=Hola%20TINTICO%2C%20quiero%20una%20recomendaci%C3%B3n%20de%20caf%C3%A9"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Consultar por WhatsApp"
    className="fixed bottom-6 right-6 z-30 group flex items-center gap-3 bg-espresso text-cream pl-4 pr-5 py-3.5 shadow-luxury hover:bg-foreground transition-all duration-500 rounded-full"
  >
    <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
    <span className="text-[11px] uppercase tracking-[0.22em] hidden sm:inline">Consultar</span>
  </a>
);
