import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { formatARS, useCart } from "@/contexts/CartContext";

const SIZE_MULT: Record<string, number> = { "250g": 1, "500g": 1.85, "1kg": 3.4 };

export const CartDrawer = () => {
  const cart = useCart();
  const SHIPPING_THRESHOLD = 25000;
  const remaining = Math.max(0, SHIPPING_THRESHOLD - cart.subtotal);
  const progress = Math.min(100, (cart.subtotal / SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-espresso/60 backdrop-blur-sm"
            onClick={cart.close}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] bg-background flex flex-col shadow-luxury"
          >
            <header className="flex items-center justify-between px-8 py-6 border-b border-border/60">
              <div>
                <p className="eyebrow">Tu carrito</p>
                <p className="font-serif text-2xl mt-1 font-light">{cart.count} {cart.count === 1 ? "producto" : "productos"}</p>
              </div>
              <button onClick={cart.close} aria-label="Cerrar carrito" className="p-2 hover:opacity-60 transition">
                <X className="h-5 w-5" />
              </button>
            </header>

            {cart.subtotal > 0 && (
              <div className="px-8 py-4 border-b border-border/60">
                {remaining > 0 ? (
                  <p className="text-xs text-muted-foreground">
                    Te faltan <span className="text-foreground font-medium">{formatARS(remaining)}</span> para envío gratis en CABA
                  </p>
                ) : (
                  <p className="text-xs text-accent font-medium">✓ Tenés envío gratis en CABA</p>
                )}
                <div className="mt-2 h-px bg-border relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-accent transition-all duration-700" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-8 py-6">
              {cart.items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-20">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground/40" strokeWidth={1} />
                  <div className="space-y-2">
                    <p className="font-serif text-2xl font-light">Tu carrito está vacío</p>
                    <p className="text-sm text-muted-foreground">Empezá a explorar nuestros microlotes</p>
                  </div>
                  <Link
                    to="/tienda"
                    onClick={cart.close}
                    className="btn-luxury bg-foreground text-background hover:bg-foreground/90"
                  >
                    Ver tienda
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cart.items.map((item) => {
                    const linePrice = item.product.price * (SIZE_MULT[item.size] ?? 1) * item.quantity;
                    return (
                      <li key={`${item.product.id}-${item.size}-${item.grind}`} className="flex gap-4">
                        <div className="w-20 h-24 bg-muted overflow-hidden shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between gap-3">
                            <div>
                              <p className="font-serif text-lg leading-tight">{item.product.name}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{item.product.variety}</p>
                            </div>
                            <button
                              onClick={() => cart.remove(item.product.id, item.size, item.grind)}
                              className="text-xs text-muted-foreground hover:text-foreground transition"
                              aria-label="Eliminar"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-2">
                            {item.size} · {item.grind}
                          </p>
                          <div className="mt-auto flex justify-between items-center pt-3">
                            <div className="flex items-center border border-border">
                              <button
                                onClick={() =>
                                  cart.updateQty(item.product.id, item.size, item.grind, item.quantity - 1)
                                }
                                className="p-1.5 hover:bg-muted"
                                aria-label="Restar"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-3 text-sm tabular-nums">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  cart.updateQty(item.product.id, item.size, item.grind, item.quantity + 1)
                                }
                                className="p-1.5 hover:bg-muted"
                                aria-label="Sumar"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="text-sm font-medium tabular-nums">{formatARS(linePrice)}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {cart.items.length > 0 && (
              <footer className="border-t border-border/60 px-8 py-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium tabular-nums">{formatARS(cart.subtotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground">El envío y los impuestos se calculan en el checkout.</p>
                <button className="w-full btn-luxury bg-foreground text-background hover:bg-foreground/90">
                  Finalizar compra
                </button>
                <button
                  onClick={cart.close}
                  className="w-full text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition py-2"
                >
                  Seguir comprando
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
