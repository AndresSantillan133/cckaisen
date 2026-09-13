import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "../../lib/cart";
import { formatPrice } from "../../config/store";
import CartItem from "./CartItem";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  open,
  onClose,
  onCheckout,
}: CartDrawerProps) {
  const { lines, subtotal, total } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            aria-hidden
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compra"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full flex-col bg-brand-charcoal sm:max-w-md sm:border-l sm:border-white/10"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="font-display text-lg uppercase tracking-wide">
                Tu carrito
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar carrito"
                className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={40} className="text-white/20" />
                <p className="font-semibold text-white/70">
                  Tu carrito está vacío
                </p>
                <p className="text-sm text-white/40">
                  Agrega una playera del catálogo para empezar tu pedido.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 rounded-full border border-white/15 px-5 py-2 text-sm font-medium transition hover:border-brand-green hover:text-brand-green"
                >
                  Ver catálogo
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-5">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <CartItem
                        key={`${line.productId}-${line.size}`}
                        line={line}
                      />
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="border-t border-white/10 px-5 py-5">
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between font-display text-xl">
                    <span>Total</span>
                    <span className="text-brand-green">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onCheckout}
                    className="mt-4 w-full rounded-xl bg-brand-green py-3.5 text-sm font-bold text-black transition active:scale-95 sm:hover:brightness-110"
                  >
                    Continuar con mi pedido
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
