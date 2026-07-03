import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Roberto Mendoza",
    role: "Plan de Fuerza · 16 semanas",
    rating: 5,
    text: "Charly cambió por completo mi forma de entrenar. El seguimiento es constante y los ajustes al plan siempre llegan justo a tiempo. Bajé 14 kg sin sacrificar energía en el día a día.",
  },
  {
    name: "Ana Lucía Torres",
    role: "Nutrición + Mentoría",
    rating: 5,
    text: "Lo que más valoro es la mentoría: no solo es el plan de comidas, es el acompañamiento real. Nunca me sentí sola en el proceso.",
  },
  {
    name: "Diego Pérez",
    role: "Plan de Hipertrofia",
    rating: 5,
    text: "En 20 semanas gané masa muscular como nunca antes. La atención personalizada de CCKaisen se nota en cada detalle de la rutina.",
  },
  {
    name: "Fernanda Ramírez",
    role: "Recomposición corporal",
    rating: 5,
    text: "Uruapan necesitaba un coach así. Profesional, exigente cuando debe serlo y siempre disponible por WhatsApp para resolver dudas.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="relative overflow-hidden bg-black px-4 py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            Testimonios
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4rem)] uppercase leading-none text-white">
            Lo que dicen
            <br />
            <span className="text-gradient-red">mis atletas</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8"
            >
              <Quote className="absolute right-6 top-6 text-brand-red/20" size={40} />

              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={16} className="fill-brand-red text-brand-red" />
                ))}
              </div>

              <p className="relative z-10 mb-6 text-sm leading-relaxed text-white/70">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-red/15 font-display text-sm text-brand-red">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
