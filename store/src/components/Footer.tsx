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
      <p className="font-display text-2xl uppercase tracking-wide">
        {STORE_CONFIG.brand.name}
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
        ¿Dudas sobre tallas, envíos o tu pedido? Escríbenos directo por
        WhatsApp.
      </p>

      <a
        href={contactLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-green/50 px-6 py-3 text-sm font-semibold text-brand-green transition hover:bg-brand-green hover:text-black"
      >
        <MessageCircle size={18} />
        Escríbenos por WhatsApp
      </a>

      <p className="mt-10 text-xs text-white/30">
        © {new Date().getFullYear()} {STORE_CONFIG.brand.name}. Todos los
        derechos reservados.
      </p>
    </footer>
  );
}
