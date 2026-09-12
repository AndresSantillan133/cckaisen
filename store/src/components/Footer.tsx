import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { STORE_CONFIG } from "../config/store";
import { buildWhatsAppLink } from "../lib/whatsapp";

export default function Footer() {
  const contactLink = buildWhatsAppLink(
    `Hola, tengo una pregunta sobre ${STORE_CONFIG.brand.name} 👋`,
  );

  return (
    <footer
      id="contacto"
      className="border-t border-white/10 bg-brand-black-soft px-4 py-14 text-center sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="brand-wordmark text-3xl">{STORE_CONFIG.brand.name}</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/50">
          ¿Dudas sobre tallas, envíos o tu pedido? Escríbenos directo por
          WhatsApp.
        </p>

        <motion.a
          href={contactLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-green/50 px-6 py-3 text-sm font-semibold text-brand-green transition hover:bg-brand-green hover:text-black"
        >
          <MessageCircle size={18} />
          Escríbenos por WhatsApp
        </motion.a>
      </motion.div>

      <p className="mt-10 text-xs text-white/30">
        © {new Date().getFullYear()} {STORE_CONFIG.brand.name}. Todos los
        derechos reservados.
      </p>
    </footer>
  );
}
