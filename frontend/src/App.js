import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Fleet from "./components/Fleet";
import Sand from "./components/Sand";
import WhyUs from "./components/WhyUs";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StickyCall from "./components/StickyCall";

function Home() {
  return (
    <div className="App" data-testid="home-page">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Fleet />
        <Sand />
        <WhyUs />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <StickyCall />
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#0C2317",
            border: "1px solid #193E2A",
            color: "#F4F7F5",
            borderRadius: 0,
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
