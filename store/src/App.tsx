import { useState } from "react";
import { CartProvider, useCart } from "./lib/cart";
import { ToastProvider } from "./hooks/useToast";
import { generateOrderNumber } from "./lib/orders";
import { buildOrderMessage, buildWhatsAppLink } from "./lib/whatsapp";
import { sanitizeCustomer } from "./lib/validation";
import type { CartLineDetail } from "./lib/cart";
import type { CustomerInfo } from "./lib/types";

import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import About from "./components/About";
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

    // Se abre en el mismo gesto de clic del usuario para que el navegador
    // no bloquee la ventana emergente.
    window.open(whatsappLink, "_blank", "noopener,noreferrer");

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
      <Header onOpenCart={() => setCartOpen(true)} />

      <main>
        <Hero />
        <ProductGrid />
        <About />
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
    <CartProvider>
      <ToastProvider>
        <StoreApp />
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
