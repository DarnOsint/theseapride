import HeroSection from "@/components/HeroSection";
import FeaturedDishes from "@/components/FeaturedDishes";
import AboutPreview from "@/components/AboutPreview";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { getSiteConfig } from "@/lib/site-config";

export default async function Home() {
  const config = await getSiteConfig();

  return (
    <>
      <HeroSection config={config} />
      <FeaturedDishes config={config} />
      <AboutPreview config={config} />
      <Testimonials config={config} />
      <Newsletter config={config} />
    </>
  );
}
