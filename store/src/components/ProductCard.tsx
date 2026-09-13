import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import type { Product, Size } from "../lib/types";
import { formatPrice } from "../config/store";
import { useCart } from "../lib/cart";
import { useToast } from "../hooks/useToast";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const firstAvailable = product.sizes.find((s) => s.stock > 0)?.size ?? null;
  const [selectedSize, setSelectedSize] = useState<Size | null>(
    firstAvailable,
  );
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const { show } = useToast();

  const isSoldOut = product.sizes.every((s) => s.stock === 0);
  const selectedStock =
    product.sizes.find((s) => s.size === selectedSize)?.stock ?? 0;

  function handleAddToCart() {
    if (!selectedSize || selectedStock <= 0) return;
    addItem(product.id, selectedSize, 1);
    show(`${product.name} (${selectedSize}) agregada al carrito`);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-charcoal transition-colors hover:border-brand-green/40"
    >
      <div className="relative aspect-square overflow-hidden bg-brand-white">
        <motion.img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-6"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 1.03 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
        {isSoldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Agotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg uppercase tracking-wide">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-white/60">{product.description}</p>
        </div>

        <p className="font-display text-2xl text-brand-green">
          {formatPrice(product.price)}
        </p>

        <fieldset className="flex flex-wrap gap-2" disabled={isSoldOut}>
          <legend className="sr-only">Talla para {product.name}</legend>
          {product.sizes.map((s) => {
            const disabled = s.stock === 0;
            const active = selectedSize === s.size;
            return (
              <button
                key={s.size}
                type="button"
                disabled={disabled}
                aria-pressed={active}
                onClick={() => setSelectedSize(s.size)}
                className={`h-9 min-w-9 rounded-lg border px-2 text-sm font-semibold transition ${
                  disabled
                    ? "cursor-not-allowed border-white/5 text-white/20 line-through"
                    : active
                      ? "border-brand-green bg-brand-green text-black"
                      : "border-white/15 text-white/80 hover:border-white/40"
                }`}
              >
                {s.size}
              </button>
            );
          })}
        </fieldset>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isSoldOut || !selectedSize || selectedStock <= 0}
          className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-brand-green py-3 text-sm font-bold text-black transition active:scale-95 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30 sm:hover:brightness-110"
        >
          {justAdded ? (
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Check size={18} /> Agregada
            </motion.span>
          ) : (
            <>
              <ShoppingBag size={18} />
              {isSoldOut ? "Agotado" : "Agregar al carrito"}
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
