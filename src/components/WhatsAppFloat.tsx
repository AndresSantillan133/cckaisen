import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_DEFAULT_MESSAGE, whatsappLink } from "../lib/constants";

export default function WhatsAppFloat() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3.4, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      href={whatsappLink(WHATSAPP_DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_0_30px_rgba(224,16,44,0.6)]"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-40" />
      <MessageCircle size={26} className="relative z-10" />
    </motion.a>
  );
}
