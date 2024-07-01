import { BestBook } from "@/components/home/best-books";
import Contact from "@/components/home/Contact";
import { Hero } from "@/components/home/hero";
import Services from "@/components/home/services";
import WhoWeAre from "@/components/home/who-we-are";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <WhoWeAre />
      <BestBook />
      <Contact />
    </>
  );
};
