import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  size: "250g" | "500g" | "1kg";
  grind: "Grano" | "Espresso" | "Filtrado" | "Moka" | "Prensa";
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (item: CartItem) => void;
  remove: (id: string, size: string, grind: string) => void;
  updateQty: (id: string, size: string, grind: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const SIZE_MULTIPLIER: Record<CartItem["size"], number> = {
  "250g": 1,
  "500g": 1.85,
  "1kg": 3.4,
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("tintico-cart");
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("tintico-cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const keyOf = (i: CartItem) => `${i.product.id}|${i.size}|${i.grind}`;
    const subtotal = items.reduce(
      (acc, i) => acc + i.product.price * SIZE_MULTIPLIER[i.size] * i.quantity,
      0,
    );
    const count = items.reduce((acc, i) => acc + i.quantity, 0);

    return {
      items,
      isOpen,
      count,
      subtotal,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((s) => !s),
      add: (item) => {
        setItems((prev) => {
          const k = keyOf(item);
          const existing = prev.find((p) => keyOf(p) === k);
          if (existing) {
            return prev.map((p) => (keyOf(p) === k ? { ...p, quantity: p.quantity + item.quantity } : p));
          }
          return [...prev, item];
        });
        setIsOpen(true);
      },
      remove: (id, size, grind) =>
        setItems((prev) => prev.filter((p) => !(p.product.id === id && p.size === size && p.grind === grind))),
      updateQty: (id, size, grind, qty) =>
        setItems((prev) =>
          prev
            .map((p) =>
              p.product.id === id && p.size === size && p.grind === grind
                ? { ...p, quantity: Math.max(1, qty) }
                : p,
            )
            .filter((p) => p.quantity > 0),
        ),
      clear: () => setItems([]),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
};

export const formatARS = (n: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
