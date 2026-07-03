import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["FUERZA", "DISCIPLINA", "CONSTANCIA", "ENFOQUE", "KAISEN"];

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const counterRef = useRef({ val: 0 });
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 900);
        }, 250);
      },
    });

    tl.to(counterRef.current, {
      val: 100,
      duration: 2.6,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.floor(counterRef.current.val)),
    });

    if (barRef.current) {
      gsap.to(barRef.current, {
        width: "100%",
        duration: 2.6,
        ease: "power2.inOut",
      });
    }

    const wordInterval = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 480);

    return () => {
      tl.kill();
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/10 blur-[100px]"
          />

          <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
            <span className="text-sm tracking-[0.4em] text-brand-white/40 uppercase">
              {BRAND_NAME}
            </span>

            <div className="flex items-baseline gap-2 font-display text-[clamp(4rem,18vw,9rem)] leading-none text-brand-white">
              <span>{count}</span>
              <span className="text-brand-red text-[clamp(2rem,6vw,3.5rem)]">%</span>
            </div>

            <div className="h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block text-xs font-semibold tracking-[0.3em] text-brand-red uppercase"
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="h-[2px] w-[220px] overflow-hidden bg-white/10 sm:w-[280px]">
              <div ref={barRef} className="h-full w-0 bg-brand-red" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const BRAND_NAME = "CCKaisen";
