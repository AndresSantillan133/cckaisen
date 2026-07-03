import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { MapPin, MessageCircle, ArrowDown } from "lucide-react";
import { BRAND, WHATSAPP_DEFAULT_MESSAGE, whatsappLink } from "../lib/constants";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.3,
        },
      );
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, delay: 1.1, ease: "power3.out" },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-4 pt-28 pb-16"
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-red/20 blur-[140px] animate-blob" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-brand-red/10 blur-[120px] animate-blob" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="hero-fade relative z-10 mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70 opacity-0">
        <MapPin size={14} className="text-brand-red" />
        {BRAND.location}
      </div>

      <h1 className="relative z-10 text-center font-display leading-[0.9] uppercase text-white">
        <div className="overflow-hidden">
          <span className="hero-word inline-block text-[clamp(3rem,12vw,8.5rem)]">
            Transforma
          </span>
        </div>
        <div className="overflow-hidden">
          <span className="hero-word inline-block text-[clamp(3rem,12vw,8.5rem)] text-gradient-red">
            tu cuerpo
          </span>
        </div>
        <div className="overflow-hidden">
          <span className="hero-word inline-block text-[clamp(3rem,12vw,8.5rem)] text-outline">
            tu mente
          </span>
        </div>
      </h1>

      <p className="hero-fade relative z-10 mt-8 max-w-xl text-center text-base text-white/60 opacity-0 sm:text-lg">
        Entrenamiento personalizado con el coach <span className="font-semibold text-white">{BRAND.coach}</span>.
        Planes, nutrición y mentoría 1 a 1 para llevar tu físico al siguiente nivel.
      </p>

      <div className="hero-fade relative z-10 mt-10 flex flex-col items-center gap-4 opacity-0 sm:flex-row">
        <a
          href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-full bg-brand-red px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_40px_rgba(224,16,44,0.4)] transition-all hover:scale-105 hover:bg-brand-red-light"
        >
          <MessageCircle size={20} className="transition-transform group-hover:rotate-12" />
          Empieza tu transformación
        </a>
        <button
          onClick={() =>
            document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" })
          }
          className="rounded-full border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white/80 transition-colors hover:border-brand-red hover:text-white"
        >
          Ver servicios
        </button>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 z-10 text-white/30"
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  );
}
