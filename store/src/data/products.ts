import type { Product } from "../lib/types";

/**
 * Catálogo de productos.
 *
 * Para agregar/editar una playera solo modifica este archivo:
 * - image: ruta dentro de /public/products/. Sube la foto real ahí y actualiza la ruta.
 * - sizes: stock disponible por talla. Pon stock en 0 para marcar talla agotada.
 * - active: false oculta el producto del catálogo (ej. mientras llega la foto real).
 *
 * NOTA DE SEGURIDAD: estos precios son solo para mostrar en pantalla. Como este
 * proyecto no tiene backend todavía, el total del pedido se recalcula aquí mismo
 * en el navegador a partir de este archivo (nunca se confía en un precio que
 * venga ya calculado desde otro lugar). Ver README.md, sección "Seguridad y
 * precios", para el detalle de esta limitación y cómo cerrarla con un backend real.
 */
export const PRODUCTS: Product[] = [
  {
    id: "oversized-rosa",
    name: "Oversized Tee — Rosa",
    description: "Playera oversized 100% algodón, corte amplio y caída premium.",
    price: 380,
    color: "Rosa",
    image: "/products/placeholder-rosa.svg",
    imageAlt: "Playera oversized color rosa, vista frontal",
    active: true,
    sizes: [
      { size: "S", stock: 5 },
      { size: "M", stock: 8 },
    ],
  },
  {
    id: "oversized-gris",
    name: "Oversized Tee — Gris Jaspe",
    description: "Playera oversized 100% algodón, corte amplio y caída premium.",
    price: 380,
    color: "Gris Jaspe",
    image: "/products/placeholder-gris.svg",
    imageAlt: "Playera oversized color gris jaspe, vista frontal",
    active: true,
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 10 },
    ],
  },
  {
    id: "oversized-navy",
    name: "Oversized Tee — Navy",
    description: "Playera oversized 100% algodón, corte amplio y caída premium.",
    price: 380,
    color: "Navy",
    image: "/products/placeholder-navy.svg",
    imageAlt: "Playera oversized color azul navy, vista trasera",
    active: true,
    sizes: [
      { size: "S", stock: 4 },
      { size: "M", stock: 7 },
    ],
  },
  {
    id: "oversized-crema",
    name: "Oversized Tee — Crema",
    description: "Playera oversized 100% algodón, corte amplio y caída premium.",
    price: 380,
    color: "Crema",
    image: "/products/placeholder-crema.svg",
    imageAlt: "Playera oversized color crema, vista trasera",
    active: true,
    sizes: [
      { size: "S", stock: 3 },
      { size: "M", stock: 6 },
    ],
  },
  {
    id: "oversized-negra",
    name: "Oversized Tee — Negra",
    description: "Playera oversized 100% algodón, corte amplio y caída premium.",
    price: 380,
    color: "Negra",
    image: "/products/placeholder-negra.svg",
    imageAlt: "Playera oversized color negra, vista frontal",
    active: true,
    sizes: [
      { size: "S", stock: 7 },
      { size: "M", stock: 12 },
    ],
  },
  {
    id: "oversized-pendiente",
    name: "Oversized Tee — Próximamente",
    description: "Nuevo color en camino. Vuelve pronto.",
    price: 380,
    color: "Por confirmar",
    image: "/products/placeholder-pendiente.svg",
    imageAlt: "Playera oversized, color por confirmar",
    // Se mantiene oculta del catálogo hasta tener la foto real y el color confirmado.
    active: false,
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
    ],
  },
];

export function getActiveProducts(): Product[] {
  return PRODUCTS.filter((p) => p.active);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
