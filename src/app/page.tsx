import HeroSection from "@/components/HeroSection";
import FeaturedDishes from "@/components/FeaturedDishes";
import AboutPreview from "@/components/AboutPreview";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDishes />
      <AboutPreview />
      <Testimonials />
      <Newsletter />
    </>
  );
}
