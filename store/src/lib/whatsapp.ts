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
  total,
  customer,
}: BuildOrderMessageParams): string {
  // El desglose de productos (nombre, talla, cantidad, precio) ya viene en
  // la imagen del ticket que el cliente adjunta a continuación, así que no
  // se repite aquí como texto. Se deja solo lo que conviene tener como
  // texto buscable/copiable en WhatsApp: folio, total y datos de contacto
  // y entrega.
  return [
    `PEDIDO #${orderNumber}`,
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
    "📎 Adjunto el ticket con el detalle completo del pedido.",
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
