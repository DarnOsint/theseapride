import HeroSection from "@/components/HeroSection";
import FeaturedDishes from "@/components/FeaturedDishes";
import AboutPreview from "@/components/AboutPreview";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { getSiteConfig } from "@/lib/site-config";
import { getMenuData } from "@/lib/menu-config";

export default async function Home() {
  const [config, menuData] = await Promise.all([
    getSiteConfig(),
    getMenuData(),
  ]);

  return (
    <>
      <HeroSection config={config} />
      <FeaturedDishes config={config} menuData={menuData} />
      <AboutPreview config={config} />
      <Testimonials config={config} />
      <Newsletter config={config} />
    </>
  );
}
