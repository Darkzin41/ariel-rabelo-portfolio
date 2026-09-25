import Hero from "../components/Hero";
import FeaturedProjects from "../components/FeaturedProjects";
import MoreProjectsCta from "../components/MoreProjectsCta";
import StackCarousel from "../components/StackCarousel";
import Experience from "../components/Experience";
import Recognition from "../components/Recognition";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      {/* 01 — Hero */}
      <Hero />

      {/* 02 — Selected Work (2 featured projects) */}
      <FeaturedProjects />

      {/* 03 — More Projects CTA */}
      <MoreProjectsCta />

      {/* 04 — Stack & Tools Carousel */}
      <StackCarousel />

      {/* 05 — Experience + Education */}
      <Experience />

      {/* 06 — Recognition + Manifesto */}
      <Recognition />

      {/* 07 — Contact + Footer */}
      <Footer />
    </main>
  );
}
