import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Download, MessageCircle, X } from "lucide-react";
import html2canvas from "html2canvas";
import type { CartLineDetail } from "../../lib/cart";
import type { CustomerInfo } from "../../lib/types";
import Ticket from "./Ticket";

interface TicketAnimationProps {
  open: boolean;
  orderNumber: string;
  date: Date;
  lines: CartLineDetail[];
  subtotal: number;
  total: number;
  customer: CustomerInfo;
  whatsappLink: string;
  onClose: () => void;
}

export default function TicketAnimation({
  open,
  orderNumber,
  date,
  lines,
  subtotal,
  total,
  customer,
  whatsappLink,
  onClose,
}: TicketAnimationProps) {
  const reduceMotion = useReducedMotion();
  const measureRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [printed, setPrinted] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useLayoutEffect(() => {
    if (open && measureRef.current) {
      setHeight(measureRef.current.offsetHeight);
    }
    if (!open) {
      setHeight(null);
      setPrinted(false);
    }
  }, [open]);

  async function handleDownload() {
    if (!ticketRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `pedido-${orderNumber}.png`;
      link.click();
    } finally {
      setDownloading(false);
    }
  }

  if (!open) return null;

  const ticketProps = { orderNumber, date, lines, subtotal, total, customer };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ticket de compra"
      className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-black/90 px-4 py-8 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar ticket"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white"
      >
        <X size={20} />
      </button>

      <div className="relative mx-auto w-full max-w-sm flex-1">
        {/* Clon invisible solo para medir la altura real del ticket */}
        <div
          ref={measureRef}
          aria-hidden
          className="pointer-events-none invisible absolute -z-10 w-full"
        >
          <Ticket {...ticketProps} />
        </div>

        <div className="mt-10 flex flex-col items-center">
          <p className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-white/40">
            Imprimiendo tu ticket
          </p>

          {/* Ranura de la máquina */}
          <div className="h-3 w-[calc(100%-1.5rem)] rounded-t-sm bg-neutral-700 shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />
          <div className="h-1 w-[calc(100%-2.5rem)] bg-black" />

          <motion.div
            className="w-full overflow-hidden rounded-b-sm shadow-2xl"
            initial={{ height: 0, y: -8 }}
            animate={height === null ? {} : { height, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    height: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                    y: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                  }
            }
            onAnimationComplete={() => setPrinted(true)}
          >
            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : { x: [0, -2, 2, -1, 1, 0] }
              }
              transition={{ duration: 1.1, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
            >
              <Ticket ref={ticketRef} {...ticketProps} />
            </motion.div>
          </motion.div>
        </div>

        {printed && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-6 flex flex-col items-center gap-4 pb-6"
          >
            <div className="flex items-center gap-2 text-brand-green">
              <CheckCircle2 size={20} />
              <span className="font-semibold">
                Pedido {orderNumber} confirmado
              </span>
            </div>

            <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-green px-4 py-3 text-sm font-bold text-black transition active:scale-95 sm:hover:brightness-110"
              >
                <MessageCircle size={18} />
                Abrir WhatsApp
              </a>
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/40 disabled:opacity-50"
              >
                <Download size={18} />
                {downloading ? "Generando..." : "Descargar imagen"}
              </button>
            </div>

            <p className="max-w-sm text-center text-xs text-white/40">
              Descarga la imagen del ticket y adjúntala manualmente en el chat
              de WhatsApp que se abrió: por seguridad, ningún link de WhatsApp
              puede adjuntar una imagen de forma automática.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
