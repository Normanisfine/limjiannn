import ImmersiveScene from "@/components/3d/ImmersiveScene";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Research from "@/components/sections/Research";
import Internship from "@/components/sections/Internship";
import Projects from "@/components/sections/Projects";
import Broadway from "@/components/sections/Broadway";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <ImmersiveScene>
      <main className="flex flex-col gap-0 relative z-10 w-full pb-0">
        <Hero />
        <About />
        <Education />
        <Research />
        <Internship />
        <Projects />
        <Broadway />
        <Contact />
      </main>
    </ImmersiveScene>
  );
}
