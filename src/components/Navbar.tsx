import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { BRAND, WHATSAPP_DEFAULT_MESSAGE, whatsappLink } from "../lib/constants";

const LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Transformaciones", href: "#transformaciones" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-black/70 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "border-white/5 bg-black/30"
        }`}
      >
        <a href="#hero" className="flex items-center gap-2">
          <span className="font-display text-lg tracking-wide text-white">
            CC<span className="text-brand-red">KAISEN</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-white/70 transition-colors hover:text-brand-red"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-brand-red px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 hover:bg-brand-red-light md:flex"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-[72px] w-[calc(100%-2rem)] max-w-5xl rounded-3xl border border-white/10 bg-black/95 p-6 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-base font-medium text-white/80 hover:text-brand-red"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex w-fit items-center gap-2 rounded-full bg-brand-red px-5 py-2 text-sm font-semibold text-white"
              >
                <MessageCircle size={16} />
                Escríbele a {BRAND.coach}
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
