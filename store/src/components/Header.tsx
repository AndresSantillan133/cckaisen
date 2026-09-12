import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { STORE_CONFIG } from "../config/store";
import { useCart } from "../lib/cart";

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const { itemCount } = useCart();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="font-display text-lg tracking-wide sm:text-xl"
        >
          {STORE_CONFIG.brand.name}
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
          <a href="#catalogo" className="transition hover:text-white">
            Catálogo
          </a>
          <a href="#nosotros" className="transition hover:text-white">
            Nosotros
          </a>
          <a href="#contacto" className="transition hover:text-white">
            Contacto
          </a>
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`Abrir carrito, ${itemCount} artículos`}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-brand-green hover:bg-white/10 active:scale-95"
        >
          <ShoppingBag size={20} />
          {itemCount > 0 && (
            <motion.span
              key={itemCount}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-green px-1 text-[11px] font-bold text-black"
            >
              {itemCount}
            </motion.span>
          )}
        </button>
      </div>
    </motion.header>
  );
}
