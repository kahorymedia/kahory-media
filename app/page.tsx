import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Work from "@/components/Work";
import CtaContact from "@/components/CtaContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Header />
      <Hero />
      <About />
      <Stats />
      <Services />
      <Work />
      <CtaContact />
      <Footer />
    </main>
  );
}