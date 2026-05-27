import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Projet } from "@/components/sections/Projet";
import { Competences } from "@/components/sections/Competences";
import { Parcours } from "@/components/sections/Parcours";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Infrastructure />
        <Projet />
        <Competences />
        <Parcours />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
