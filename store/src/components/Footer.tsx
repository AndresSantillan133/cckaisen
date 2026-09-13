import { STORE_CONFIG } from "../config/store";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-black-soft px-4 py-8 text-center sm:px-6">
      <p className="text-xs text-white/30">
        © {new Date().getFullYear()} {STORE_CONFIG.brand.name}. Todos los
        derechos reservados.
      </p>
    </footer>
  );
}
