import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { STORE_CONFIG } from "../config/store";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(34,197,94,0.15), transparent 60%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6"
      >
        <motion.span
          variants={item}
          className="rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-green"
        >
          Nueva colección
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-5xl uppercase leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
        >
          {STORE_CONFIG.brand.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-xl text-balance text-lg text-white/70 sm:text-xl"
        >
          {STORE_CONFIG.brand.tagline} Playeras oversized de corte amplio,
          algodón real y caída premium.
        </motion.p>

        <motion.div variants={item} className="mt-2">
          <a
            href="#catalogo"
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-base font-bold text-black shadow-[0_0_40px_rgba(34,197,94,0.35)] transition active:scale-95 sm:hover:scale-105"
          >
            Comprar ahora
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#catalogo"
        aria-label="Ir al catálogo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 flex flex-col items-center gap-1 text-white/40"
      >
        <span className="text-xs uppercase tracking-widest">Ver catálogo</span>
        <motion.span
          animate={reduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
