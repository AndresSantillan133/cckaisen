const WORDS = [
  "OVERSIZED",
  "STREETWEAR",
  "STOCK LIMITADO",
  "STUDIO VORTALIA",
  "ENVÍOS A TODO MÉXICO",
  "ALGODÓN PREMIUM",
];

export default function Marquee() {
  const content = [...WORDS, ...WORDS];
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-white/10 bg-brand-black-soft py-5"
    >
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {content.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-2xl uppercase tracking-tight text-white/15 sm:text-4xl"
          >
            {word}
            <span className="text-brand-green">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
