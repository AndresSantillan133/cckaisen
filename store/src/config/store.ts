/**
 * Configuración centralizada de la tienda.
 * Este es el ÚNICO lugar donde deben vivir estos valores.
 * Cambiar el WhatsApp, nombre de marca, moneda o redes sociales se hace aquí,
 * nunca directamente en los componentes.
 */

export const STORE_CONFIG = {
  brand: {
    name: "KAISEN WEAR",
    shortCode: "KSN", // usado para el folio del pedido, ej. KSN-20260912-001
    tagline: "Oversized. Sin excusas.",
    description:
      "Playeras oversized streetwear premium. Calidad real, tallas grandes.",
  },

  // Número de WhatsApp del dueño de la tienda, formato: código país + número, sin "+".
  whatsapp: {
    number: "5214521642092",
  },

  currency: {
    code: "MXN",
    symbol: "$",
    locale: "es-MX",
  },

  social: {
    instagram: "",
    tiktok: "",
  },
} as const;

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(STORE_CONFIG.currency.locale, {
    style: "currency",
    currency: STORE_CONFIG.currency.code,
    maximumFractionDigits: 0,
  }).format(amount);
}
