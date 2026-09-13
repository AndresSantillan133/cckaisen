import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { STORE_CONFIG } from "../config/store";
import { buildWhatsAppLink } from "../lib/whatsapp";

export default function Contact() {
  const contactLink = buildWhatsAppLink(
    `Hola, tengo una pregunta sobre ${STORE_CONFIG.brand.name} 👋`,
  );

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:px-6 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="brand-wordmark text-3xl sm:text-4xl">
          {STORE_CONFIG.brand.name}
        </p>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          ¿Dudas sobre tallas, envíos o tu pedido? Escríbenos directo por
          WhatsApp, te respondemos lo antes posible.
        </p>

        <motion.a
          href={contactLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-green/50 px-6 py-3 text-sm font-semibold text-brand-green transition hover:bg-brand-green hover:text-black"
        >
          <MessageCircle size={18} />
          Escríbenos por WhatsApp
        </motion.a>
      </motion.div>
    </section>
  );
}
