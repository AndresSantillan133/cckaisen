import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartLineDetail } from "../../lib/cart";
import { useCart } from "../../lib/cart";
import { formatPrice } from "../../config/store";

export default function CartItem({ line }: { line: CartLineDetail }) {
  const { setQuantity, removeItem } = useCart();

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.25 }}
      className="flex gap-3 border-b border-white/10 py-4"
    >
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-white">
        <img
          src={line.image}
          alt=""
          className="h-full w-full object-contain p-1.5"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold leading-tight">{line.name}</p>
            <p className="text-xs text-white/50">
              Talla {line.size} · {line.color}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.productId, line.size)}
            aria-label={`Eliminar ${line.name} talla ${line.size}`}
            className="rounded-md p-1 text-white/40 transition hover:text-red-400"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center rounded-lg border border-white/15">
            <button
              type="button"
              aria-label="Disminuir cantidad"
              onClick={() =>
                setQuantity(line.productId, line.size, line.quantity - 1)
              }
              className="flex h-8 w-8 items-center justify-center text-white/70 hover:text-white"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center text-sm font-semibold">
              {line.quantity}
            </span>
            <button
              type="button"
              aria-label="Aumentar cantidad"
              disabled={line.quantity >= line.availableStock}
              onClick={() =>
                setQuantity(line.productId, line.size, line.quantity + 1)
              }
              className="flex h-8 w-8 items-center justify-center text-white/70 hover:text-white disabled:text-white/20"
            >
              <Plus size={14} />
            </button>
          </div>

          <span className="font-display text-brand-green">
            {formatPrice(line.lineTotal)}
          </span>
        </div>
      </div>
    </motion.li>
  );
}
