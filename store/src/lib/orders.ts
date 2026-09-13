import { STORE_CONFIG } from "../config/store";

/**
 * Genera un folio de pedido único, ej: KSN-20260912-7F3A
 *
 * Formato: <shortCode>-<YYYYMMDD>-<4 caracteres aleatorios>.
 * No usamos un contador secuencial (001, 002...) porque este proyecto no
 * tiene todavía una base de datos/backend que lleve la cuenta real de
 * pedidos entre distintos clientes y dispositivos; un contador guardado
 * solo en el navegador se reiniciaría o se duplicaría entre visitantes.
 * El sufijo aleatorio (criptográficamente seguro) hace que la
 * probabilidad de folios duplicados el mismo día sea prácticamente nula.
 * Cuando exista backend, este archivo es el único lugar que hay que
 * cambiar por un contador real en base de datos.
 */
export function generateOrderNumber(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin O/0/I/1 ambiguos
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join(
    "",
  );

  return `${STORE_CONFIG.brand.shortCode}-${y}${m}${d}-${suffix}`;
}
