import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="nosotros"
      className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display text-3xl uppercase tracking-tight sm:text-4xl"
      >
        Hecho para la calle
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-white/60"
      >
        Playeras oversized de algodón real, cortadas para durar y caer bien.
        Piezas simples, colores sólidos y detalles que se notan de cerca. Sin
        relleno, sin genérico — streetwear premium hecho con intención.
      </motion.p>
    </section>
  );
}
