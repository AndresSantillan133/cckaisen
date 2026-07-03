import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Transformations from "./components/Transformations";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import Contact from "./components/Contact";
import WhatsAppFloat from "./components/WhatsAppFloat";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className={loading ? "hidden" : "block"}>
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Transformations />
          <Stats />
          <Testimonials />
        </main>
        <Contact />
        <WhatsAppFloat />
      </div>
    </>
  );
}

export default App;
