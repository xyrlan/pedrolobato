import About from "@/components/About";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main>
      <section className="w-full grid grid-cols-12 grid-gap relative z-10 max-w-[1800px]">
        <section className="my-6 grid-layout">
          <About />
          <Projects />
        </section>
        <Gallery />
      </section>
    </main>
  );
}
