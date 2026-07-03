import { motion } from "framer-motion";
import { useCountUp } from "../hooks/useCountUp";

const STATS = [
  { end: 120, suffix: "+", label: "Atletas transformados" },
  { end: 5, suffix: " años", label: "De experiencia" },
  { end: 98, suffix: "%", label: "Tasa de satisfacción" },
  { end: 24, suffix: "/7", label: "Soporte por WhatsApp" },
];

function StatItem({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { ref, value } = useCountUp({ end, duration: 2 });
  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-white">
        {value}
        <span className="text-brand-red">{suffix}</span>
      </span>
      <span className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
        {label}
      </span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-white/10 bg-brand-black-soft px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4"
      >
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </motion.div>
    </section>
  );
}
