import { motion } from "framer-motion";
import { Dumbbell, Apple, Users, Check } from "lucide-react";
import { WHATSAPP_DEFAULT_MESSAGE, whatsappLink } from "../lib/constants";

const SERVICES = [
  {
    icon: Dumbbell,
    title: "Planes de Entrenamiento",
    description:
      "Rutinas personalizadas según tu nivel y objetivo: fuerza, hipertrofia o recomposición.",
    features: ["Rutinas 100% personalizadas", "Seguimiento semanal", "Ajustes progresivos"],
  },
  {
    icon: Apple,
    title: "Nutrición",
    description:
      "Planes de alimentación adaptados a tu rutina y metabolismo, sin dietas imposibles de seguir.",
    features: ["Plan de macros a medida", "Recetas prácticas", "Flexibilidad real"],
  },
  {
    icon: Users,
    title: "Mentoría 1 a 1",
    description:
      "Acompañamiento directo con Charly: disciplina, mentalidad y hábitos para sostener resultados.",
    features: ["Contacto directo por WhatsApp", "Revisión de progreso", "Enfoque a largo plazo"],
  },
];

export default function Services() {
  return (
    <section id="servicios" className="relative bg-black px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            Servicios
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4rem)] uppercase leading-none text-white">
            Todo lo que necesitas
            <br />
            <span className="text-gradient-red">para lograrlo</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 transition-colors hover:border-brand-red/50"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-red/0 blur-3xl transition-all duration-500 group-hover:bg-brand-red/20" />

              <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                <service.icon size={26} />
              </div>

              <h3 className="relative z-10 mb-3 font-display text-2xl uppercase text-white">
                {service.title}
              </h3>
              <p className="relative z-10 mb-6 text-sm leading-relaxed text-white/60">
                {service.description}
              </p>

              <ul className="relative z-10 mb-8 flex flex-col gap-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                    <Check size={16} className="shrink-0 text-brand-red" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={whatsappLink(`${WHATSAPP_DEFAULT_MESSAGE} Me interesa: ${service.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex text-sm font-semibold text-white underline decoration-brand-red decoration-2 underline-offset-4 transition-colors hover:text-brand-red"
              >
                Solicitar información →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
