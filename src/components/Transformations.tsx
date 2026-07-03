import { motion } from "framer-motion";
import { Flame } from "lucide-react";

const ITEMS = [
  { name: "Roberto M.", weeks: "16 semanas", tag: "-14 kg", span: "md:col-span-2 md:row-span-2" },
  { name: "Ana L.", weeks: "12 semanas", tag: "Recomp.", span: "" },
  { name: "Diego P.", weeks: "20 semanas", tag: "+8 kg músculo", span: "" },
  { name: "Fernanda R.", weeks: "10 semanas", tag: "-9 kg", span: "md:col-span-2" },
  { name: "Kevin S.", weeks: "24 semanas", tag: "Transformación total", span: "md:row-span-2" },
  { name: "Marisol V.", weeks: "14 semanas", tag: "-11 kg", span: "" },
];

const GRADIENTS = [
  "from-brand-red/40 via-black to-black",
  "from-white/10 via-black to-black",
  "from-brand-red/25 via-black to-black",
  "from-white/10 via-black to-black",
  "from-brand-red/30 via-black to-black",
  "from-white/10 via-black to-black",
];

export default function Transformations() {
  return (
    <section id="transformaciones" className="relative bg-black px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            Resultados reales
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4rem)] uppercase leading-none text-white">
            Transformaciones
          </h2>
        </motion.div>

        <div className="grid auto-rows-[180px] gap-4 md:grid-cols-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} ${item.span}`}
            >
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_12px)]" />

              <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-brand-red backdrop-blur-sm">
                <Flame size={12} />
                {item.tag}
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5">
                <p className="font-display text-lg uppercase text-white">{item.name}</p>
                <p className="text-xs text-white/50">{item.weeks} con CCKaisen</p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center text-white/5 transition-colors duration-500 group-hover:text-brand-red/10">
                <Flame size={96} strokeWidth={1} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
