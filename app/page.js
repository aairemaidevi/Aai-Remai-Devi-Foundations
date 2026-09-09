import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Impact from "@/components/Impact/impact";
import BranchDivider from "@/components/BranchDivider";
import Work from "@/components/Work/Work";
import Dream from "@/components/Dream/Dream";
import Stories from "@/components/Stories/Stories";
import About from "@/components/About/About";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Impact />
      <BranchDivider label="Our Work" />
      <Work />
      <Dream />
      <Stories />
      <BranchDivider label="Get Involved" />
      <About />
      <Footer />
    </>
  );
}
