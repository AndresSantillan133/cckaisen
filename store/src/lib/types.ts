export type Size = "S" | "M" | "L" | "XL" | "XXL";

export const ALL_SIZES: Size[] = ["S", "M", "L", "XL", "XXL"];

export interface SizeStock {
  size: Size;
  stock: number;
}

export interface Product {
  /** Identificador único y estable del producto. No cambiar una vez publicado. */
  id: string;
  name: string;
  description: string;
  /** Precio en la unidad de STORE_CONFIG.currency (ej. MXN, sin centavos). */
  price: number;
  color: string;
  /** Ruta de la imagen dentro de /public, ej. "/products/oversized-negra.jpg". */
  image: string;
  imageAlt: string;
  sizes: SizeStock[];
  /** Si es false, el producto no se muestra en el catálogo (ej. próximamente). */
  active: boolean;
}

export interface CartLine {
  productId: string;
  size: Size;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  references: string;
}
