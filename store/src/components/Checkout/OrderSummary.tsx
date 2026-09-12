import type { CartLineDetail } from "../../lib/cart";
import type { CustomerInfo } from "../../lib/types";
import { formatPrice } from "../../config/store";

interface OrderSummaryProps {
  lines: CartLineDetail[];
  subtotal: number;
  total: number;
  customer: CustomerInfo;
}

export default function OrderSummary({
  lines,
  subtotal,
  total,
  customer,
}: OrderSummaryProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
          Productos
        </h3>
        <ul className="flex flex-col gap-2">
          {lines.map((line) => (
            <li
              key={`${line.productId}-${line.size}`}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-white/80">
                {line.name} · Talla {line.size} × {line.quantity}
              </span>
              <span className="font-medium text-white">
                {formatPrice(line.lineTotal)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/10 pt-3">
        <div className="flex items-center justify-between text-sm text-white/60">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between font-display text-xl">
          <span>Total</span>
          <span className="text-brand-green">{formatPrice(total)}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
          Datos de entrega
        </h3>
        <dl className="space-y-1 text-sm text-white/80">
          <div className="flex gap-2">
            <dt className="text-white/40">Nombre:</dt>
            <dd>{customer.name}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-white/40">Teléfono:</dt>
            <dd>{customer.phone}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-white/40">Dirección:</dt>
            <dd>{customer.address}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-white/40">Ciudad:</dt>
            <dd>{customer.city}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-white/40">C.P.:</dt>
            <dd>{customer.postalCode}</dd>
          </div>
          {customer.references && (
            <div className="flex gap-2">
              <dt className="text-white/40">Referencias:</dt>
              <dd>{customer.references}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
