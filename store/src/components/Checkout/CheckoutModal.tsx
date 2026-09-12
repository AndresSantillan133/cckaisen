import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useCart } from "../../lib/cart";
import type { CustomerInfo } from "../../lib/types";
import { validateCustomer, isValid, sanitizeCustomer } from "../../lib/validation";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

const EMPTY_CUSTOMER: CustomerInfo = {
  name: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  references: "",
};

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (customer: CustomerInfo) => void;
}

export default function CheckoutModal({
  open,
  onClose,
  onConfirm,
}: CheckoutModalProps) {
  const { lines, subtotal, total } = useCart();
  const [step, setStep] = useState<"form" | "summary">("form");
  const [customer, setCustomer] = useState<CustomerInfo>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<ReturnType<typeof validateCustomer>>(
    {},
  );

  function handleChange(field: keyof CustomerInfo, value: string) {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }

  function handleContinue() {
    const clean = sanitizeCustomer(customer);
    const validationErrors = validateCustomer(clean);
    setErrors(validationErrors);
    if (isValid(validationErrors)) {
      setCustomer(clean);
      setStep("summary");
    }
  }

  function handleConfirm() {
    onConfirm(customer);
  }

  function handleClose() {
    setStep("form");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm"
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Finalizar pedido"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 z-[90] mx-auto flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-brand-charcoal sm:inset-0 sm:my-auto sm:h-fit sm:rounded-3xl sm:border sm:border-white/10"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                {step === "summary" && (
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    aria-label="Volver a mis datos"
                    className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <h2 className="font-display text-lg uppercase tracking-wide">
                  {step === "form" ? "Tus datos" : "Revisa tu pedido"}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Cerrar"
                className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {step === "form" ? (
                <CheckoutForm
                  values={customer}
                  errors={errors}
                  onChange={handleChange}
                />
              ) : (
                <OrderSummary
                  lines={lines}
                  subtotal={subtotal}
                  total={total}
                  customer={customer}
                />
              )}
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              {step === "form" ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full rounded-xl bg-brand-green py-3.5 text-sm font-bold text-black transition active:scale-95 sm:hover:brightness-110"
                >
                  Revisar pedido
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full rounded-xl bg-brand-green py-3.5 text-sm font-bold text-black transition active:scale-95 sm:hover:brightness-110"
                >
                  Enviar pedido por WhatsApp
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
