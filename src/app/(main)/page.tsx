import HeroSection from "@/components/HeroSection";
import FeaturedDishes from "@/components/FeaturedDishes";
import AboutPreview from "@/components/AboutPreview";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Newsletter from "@/components/Newsletter";
import WaveDivider from "@/components/WaveDivider";
import FadeIn from "@/components/FadeIn";
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

      <FadeIn>
        <FeaturedDishes config={config} menuData={menuData} />
      </FadeIn>

      <WaveDivider color="fill-sea-900" />

      <FadeIn delay={100}>
        <AboutPreview config={config} />
      </FadeIn>

      <WaveDivider color="fill-site-secondary" flip />

      <FadeIn delay={100}>
        <Testimonials config={config} />
      </FadeIn>

      <WaveDivider color="fill-sea-900" />

      <FadeIn delay={100}>
        <Gallery config={config} />
      </FadeIn>

      <FadeIn delay={100}>
        <Newsletter config={config} />
      </FadeIn>
    </>
  );
}
