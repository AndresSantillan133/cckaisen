const WORDS = ["FUERZA", "DISCIPLINA", "CCKAISEN", "RESULTADOS", "COMPROMISO", "URUAPAN"];

export default function Marquee() {
  const content = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black py-6">
      <div className="flex w-max animate-marquee gap-10">
        {content.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-3xl uppercase text-white/10 sm:text-5xl"
          >
            {word}
            <span className="text-brand-red">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
