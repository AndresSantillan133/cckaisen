import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { STORE_CONFIG } from "../config/store";
import { useCart } from "../lib/cart";

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const { itemCount } = useCart();
  const { scrollY } = useScroll();
  const paddingY = useTransform(scrollY, [0, 120], [16, 8]);
  const bgOpacity = useTransform(scrollY, [0, 120], [0.35, 0.85]);
  const background = useTransform(
    bgOpacity,
    (v) => `rgba(0, 0, 0, ${v})`,
  );

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ background }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-md"
    >
      <motion.div
        style={{ paddingTop: paddingY, paddingBottom: paddingY }}
        className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <motion.a
          href="#top"
          whileHover={{ rotate: -3, scale: 1.04 }}
          whileTap={{ rotate: 0, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
          className="brand-wordmark inline-block text-xl sm:text-2xl"
        >
          {STORE_CONFIG.brand.name}
        </motion.a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
          {[
            { href: "#catalogo", label: "Catálogo" },
            { href: "#nosotros", label: "Nosotros" },
            { href: "#contacto", label: "Contacto" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 transition hover:text-white"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-[1.5px] scale-x-0 bg-brand-green transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
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
      </motion.div>
    </motion.header>
  );
}
