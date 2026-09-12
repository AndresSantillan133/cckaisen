import { STORE_CONFIG, formatPrice } from "../config/store";
import type { CartLineDetail } from "./cart";
import type { CustomerInfo } from "./types";

interface BuildOrderMessageParams {
  orderNumber: string;
  lines: CartLineDetail[];
  subtotal: number;
  total: number;
  customer: CustomerInfo;
}

export function buildOrderMessage({
  orderNumber,
  lines,
  subtotal,
  total,
  customer,
}: BuildOrderMessageParams): string {
  const productLines = lines
    .map(
      (l) =>
        `- Playera: ${l.name}\n  Talla: ${l.size}\n  Cantidad: ${l.quantity}\n  Precio: ${formatPrice(l.unitPrice)} c/u (${formatPrice(l.lineTotal)})`,
    )
    .join("\n");

  return [
    `PEDIDO #${orderNumber}`,
    "",
    "PRODUCTOS:",
    productLines,
    "",
    `SUBTOTAL: ${formatPrice(subtotal)}`,
    `TOTAL: ${formatPrice(total)}`,
    "",
    "DATOS DEL CLIENTE:",
    `Nombre: ${customer.name}`,
    `Teléfono: ${customer.phone}`,
    "",
    "DIRECCIÓN DE ENTREGA:",
    customer.address,
    `Ciudad: ${customer.city}`,
    `Código postal: ${customer.postalCode}`,
    `Referencias: ${customer.references || "N/A"}`,
    "",
    `— Pedido generado desde la tienda ${STORE_CONFIG.brand.name}`,
  ].join("\n");
}

/**
 * Construye el link wa.me con el mensaje codificado correctamente
 * (espacios, acentos y saltos de línea vía encodeURIComponent).
 * El número de WhatsApp viene de la config centralizada, nunca hardcodeado aquí.
 */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${STORE_CONFIG.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
