import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BentoAbout from "@/components/BentoAbout";
import WorkShowcase from "@/components/WorkShowcase";
import Services from "@/components/Services";
import ClientMarquee from "@/components/ClientMarquee";
import Work from "@/components/Work";
import CtaContact from "@/components/CtaContact";
import Founders from "@/components/Founders";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Header />
      <Hero />
      <BentoAbout />
      <WorkShowcase />
      <Services />
      <ClientMarquee />
      <Work />
      <Founders />
      <CtaContact />
      <Footer />
    </main>
  );
}