import { getActiveProducts } from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const products = getActiveProducts();

  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex flex-col gap-2 text-center">
        <h2 className="font-display text-3xl uppercase tracking-tight sm:text-4xl">
          Catálogo
        </h2>
        <p className="text-white/60">
          Elige tu talla y color. Stock limitado.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-white/50">
          Estamos actualizando el catálogo. Vuelve pronto.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
