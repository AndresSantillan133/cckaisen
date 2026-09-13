import { STORE_CONFIG } from "../config/store";

/**
 * El folio, productos, total y datos de entrega ya van completos en la
 * imagen del ticket que el cliente adjunta justo después de abrir este
 * chat, así que el mensaje de texto no repite nada de eso — solo da
 * contexto rápido para quien lo recibe.
 */
export function buildOrderMessage(orderNumber: string): string {
  return `¡Hola! 👋 Quiero hacer este pedido (folio ${orderNumber}). Les mando el ticket con todos los detalles.`;
}

/**
 * Construye el link wa.me con el mensaje codificado correctamente
 * (espacios, acentos y saltos de línea vía encodeURIComponent).
 * El número de WhatsApp viene de la config centralizada, nunca hardcodeado aquí.
 */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${STORE_CONFIG.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
