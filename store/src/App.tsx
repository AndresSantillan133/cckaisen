import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { CartProvider, useCart } from "./lib/cart";
import { ToastProvider } from "./hooks/useToast";
import { generateOrderNumber } from "./lib/orders";
import { buildOrderMessage, buildWhatsAppLink } from "./lib/whatsapp";
import { sanitizeCustomer } from "./lib/validation";
import type { CartLineDetail } from "./lib/cart";
import type { CustomerInfo } from "./lib/types";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ProductGrid from "./components/ProductGrid";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CartDrawer from "./components/Cart/CartDrawer";
import CheckoutModal from "./components/Checkout/CheckoutModal";
import TicketAnimation from "./components/Ticket/TicketAnimation";

interface OrderData {
  orderNumber: string;
  date: Date;
  lines: CartLineDetail[];
  subtotal: number;
  total: number;
  customer: CustomerInfo;
  whatsappLink: string;
}

/** Vuelve arriba de la página en cada cambio de ruta (SPA no lo hace solo). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function StoreApp() {
  const { lines, subtotal, total, clear } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);

  function handleConfirmOrder(rawCustomer: CustomerInfo) {
    if (lines.length === 0) return;

    const customer = sanitizeCustomer(rawCustomer);
    const orderNumber = generateOrderNumber();
    const date = new Date();

    const message = buildOrderMessage({
      orderNumber,
      lines,
      subtotal,
      total,
      customer,
    });
    const whatsappLink = buildWhatsAppLink(message);

    // WhatsApp se abre solo cuando el cliente le da clic a "Abrir WhatsApp"
    // en el ticket (TicketAnimation), no automáticamente aquí: primero debe
    // ver el ticket completo, y solo después se envía el pedido.
    setOrder({
      orderNumber,
      date,
      lines,
      subtotal,
      total,
      customer,
      whatsappLink,
    });
    setCheckoutOpen(false);
    clear();
  }

  return (
    <>
      <ScrollToTop />
      <Header onOpenCart={() => setCartOpen(true)} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Marquee />
              </>
            }
          />
          <Route path="/catalogo" element={<ProductGrid />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onConfirm={handleConfirmOrder}
      />

      {order && (
        <TicketAnimation
          open={Boolean(order)}
          orderNumber={order.orderNumber}
          date={order.date}
          lines={order.lines}
          subtotal={order.subtotal}
          total={order.total}
          customer={order.customer}
          whatsappLink={order.whatsappLink}
          onClose={() => setOrder(null)}
        />
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <StoreApp />
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
