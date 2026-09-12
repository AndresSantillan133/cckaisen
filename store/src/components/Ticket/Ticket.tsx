import { forwardRef } from "react";
import type { CartLineDetail } from "../../lib/cart";
import type { CustomerInfo } from "../../lib/types";
import { STORE_CONFIG, formatPrice } from "../../config/store";

interface TicketProps {
  orderNumber: string;
  date: Date;
  lines: CartLineDetail[];
  subtotal: number;
  total: number;
  customer: CustomerInfo;
}

function BarcodeStripe() {
  // Patrón decorativo tipo código de barras. Puramente visual: no codifica
  // datos reales, así que no debe usarse para escanear el pedido.
  const bars = [2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1];
  return (
    <div
      className="mx-auto flex h-10 items-stretch gap-[2px]"
      role="img"
      aria-label={`Código de referencia visual del pedido`}
    >
      {bars.map((w, i) => (
        <span
          key={i}
          style={{ width: `${w * 2}px` }}
          className="bg-black"
        />
      ))}
    </div>
  );
}

const Ticket = forwardRef<HTMLDivElement, TicketProps>(function Ticket(
  { orderNumber, date, lines, subtotal, total, customer },
  ref,
) {
  const formattedDate = date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-sm bg-white px-6 py-7 font-mono text-[13px] leading-snug text-black"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(0,0,0,0.015) 0, rgba(0,0,0,0.015) 2px, transparent 2px, transparent 4px)",
      }}
    >
      <header className="text-center">
        <p className="font-display text-2xl uppercase tracking-wide">
          {STORE_CONFIG.brand.name}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
          Orden de compra
        </p>
      </header>

      <div className="my-4 border-t border-dashed border-black/40" />

      <div className="flex justify-between text-[12px]">
        <span>Folio:</span>
        <span className="font-bold">{orderNumber}</span>
      </div>
      <div className="flex justify-between text-[12px]">
        <span>Fecha:</span>
        <span>
          {formattedDate} {formattedTime}
        </span>
      </div>

      <div className="my-4 border-t border-dashed border-black/40" />

      <table className="w-full text-[12px]">
        <tbody>
          {lines.map((line) => (
            <tr key={`${line.productId}-${line.size}`} className="align-top">
              <td className="py-1 pr-2">
                <div className="font-semibold">{line.name}</div>
                <div className="text-neutral-500">
                  Talla {line.size} · {line.quantity} ×{" "}
                  {formatPrice(line.unitPrice)}
                </div>
              </td>
              <td className="py-1 text-right font-semibold">
                {formatPrice(line.lineTotal)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-4 border-t border-dashed border-black/40" />

      <div className="flex justify-between text-[12px]">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="mt-1 flex justify-between text-base font-bold">
        <span>TOTAL</span>
        <span className="text-green-600">{formatPrice(total)}</span>
      </div>

      <div className="my-4 border-t border-dashed border-black/40" />

      <div className="text-[12px]">
        <p className="font-semibold uppercase tracking-wide text-neutral-500">
          Cliente
        </p>
        <p className="mt-1">{customer.name}</p>
        <p>{customer.phone}</p>
        <p className="mt-2 font-semibold uppercase tracking-wide text-neutral-500">
          Entrega
        </p>
        <p className="mt-1">{customer.address}</p>
        <p>
          {customer.city}, C.P. {customer.postalCode}
        </p>
        {customer.references && (
          <p className="text-neutral-500">Ref: {customer.references}</p>
        )}
      </div>

      <div className="my-4 border-t border-dashed border-black/40" />

      <p className="text-center text-[12px] font-semibold">
        ¡Gracias por tu compra!
      </p>
      <p className="text-center text-[10px] text-neutral-400">
        Presenta este ticket como comprobante de tu pedido
      </p>

      <div className="mt-4">
        <BarcodeStripe />
        <p className="mt-1 text-center text-[10px] tracking-[0.3em] text-neutral-500">
          {orderNumber}
        </p>
      </div>
    </div>
  );
});

export default Ticket;
