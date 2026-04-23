import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { WhatsAppFloat } from "./WhatsAppFloat";

type Props = { children: ReactNode; transparentHeader?: boolean };

export const SiteLayout = ({ children, transparentHeader = false }: Props) => (
  <div className="min-h-screen flex flex-col">
    <Header transparent={transparentHeader} />
    <main className="flex-1">{children}</main>
    <Footer />
    <CartDrawer />
    <WhatsAppFloat />
  </div>
);
