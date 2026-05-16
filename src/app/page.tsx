import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TurkeyMap } from "@/components/sections/TurkeyMap";
import { MertHukukLanding } from "@/components/sections/MertHukukLanding";
import { Services } from "@/components/sections/Services";
import { RealEstateSection } from "@/components/sections/RealEstateSection";
import { Process } from "@/components/sections/Process";
import { TercumanLanding } from "@/components/sections/TercumanLanding";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TurkeyMap />
        <MertHukukLanding />
        <Services />
        <RealEstateSection />
        <Process />
        <TercumanLanding />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}