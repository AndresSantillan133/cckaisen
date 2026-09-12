import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { STORE_CONFIG } from "../config/store";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, reduceMotion ? 0 : 120]);
  const fadeOut = useTransform(scrollY, [0, 400], [1, 0]);

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
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(34,197,94,0.15), transparent 60%)",
        }}
      />

      {/* Blobs decorativos con movimiento continuo y sutil */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-green/20 blur-3xl motion-reduce:animate-none"
        animate={reduceMotion ? {} : "blob"}
        variants={{
          blob: {
            x: [0, 40, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.15, 0.9, 1],
            transition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-brand-green/10 blur-3xl motion-reduce:animate-none"
        animate={reduceMotion ? {} : "blob"}
        variants={{
          blob: {
            x: [0, -35, 25, 0],
            y: [0, 25, -25, 0],
            scale: [1, 0.9, 1.2, 1],
            transition: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: parallaxY, opacity: fadeOut }}
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
          className="brand-wordmark text-6xl leading-[0.85] sm:text-8xl md:text-9xl"
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
          <motion.a
            href="#catalogo"
            animate={
              reduceMotion
                ? {}
                : {
                    boxShadow: [
                      "0 0 20px rgba(34,197,94,0.35)",
                      "0 0 44px rgba(34,197,94,0.6)",
                      "0 0 20px rgba(34,197,94,0.35)",
                    ],
                  }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-base font-bold text-black"
          >
            Comprar ahora
          </motion.a>
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
