import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index.tsx";
import Tienda from "./pages/Tienda.tsx";
import Producto from "./pages/Producto.tsx";
import NuestroCafe from "./pages/NuestroCafe.tsx";
import Origen from "./pages/Origen.tsx";
import Experiencia from "./pages/Experiencia.tsx";
import Diario from "./pages/Diario.tsx";
import Suscripcion from "./pages/Suscripcion.tsx";
import Mayoristas from "./pages/Mayoristas.tsx";
import Quiz from "./pages/Quiz.tsx";
import Contacto from "./pages/Contacto.tsx";
import Cuenta from "./pages/Cuenta.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/tienda/:categoria" element={<Tienda />} />
            <Route path="/producto/:slug" element={<Producto />} />
            <Route path="/nuestro-cafe" element={<NuestroCafe />} />
            <Route path="/origen" element={<Origen />} />
            <Route path="/experiencia" element={<Experiencia />} />
            <Route path="/diario" element={<Diario />} />
            <Route path="/diario/:slug" element={<Diario />} />
            <Route path="/suscripcion" element={<Suscripcion />} />
            <Route path="/mayoristas" element={<Mayoristas />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/resultado" element={<Quiz />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/cuenta" element={<Cuenta />} />
            <Route path="/cuenta/:section" element={<Cuenta />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
