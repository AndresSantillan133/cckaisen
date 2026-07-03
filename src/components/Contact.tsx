import { motion } from "framer-motion";
import { MessageCircle, MapPin } from "lucide-react";
import Marquee from "./Marquee";
import { BRAND, WHATSAPP_DEFAULT_MESSAGE, whatsappLink } from "../lib/constants";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Contact() {
  return (
    <footer id="contacto" className="relative bg-black">
      <section className="relative overflow-hidden px-4 py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/15 blur-[150px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            Empieza hoy
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,7vw,5rem)] uppercase leading-[0.95] text-white">
            Tu Kaisen
            <br />
            <span className="text-gradient-red">empieza ahora</span>
          </h2>
          <p className="mt-6 max-w-md text-sm text-white/60 sm:text-base">
            Escríbele directo a {BRAND.coach} por WhatsApp y arma tu plan a la medida.
          </p>
          <a
            href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center gap-3 rounded-full bg-brand-red px-9 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_40px_rgba(224,16,44,0.4)] transition-all hover:scale-105 hover:bg-brand-red-light"
          >
            <MessageCircle size={20} />
            Escribir a {BRAND.coach}
          </a>
        </motion.div>
      </section>

      <Marquee />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-display text-xl tracking-wide text-white">
            CC<span className="text-brand-red">KAISEN</span>
          </span>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-white/40">
            <MapPin size={13} className="text-brand-red" />
            {BRAND.location}
          </p>
        </div>

        <div className="flex items-center gap-5 text-white/50">
          <a
            href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-brand-red"
            aria-label="WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
          <a href="#" className="transition-colors hover:text-brand-red" aria-label="Instagram">
            <InstagramIcon size={20} />
          </a>
        </div>

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
