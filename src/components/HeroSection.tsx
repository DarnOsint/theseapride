import Link from "next/link";
import { Waves, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sea-50 via-white to-ocean-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIj48cGF0aCBkPSJNMzAgMGwzMCAzME0wIDMwbDMwIDMwTTYwIDMwbDMwIDUwTTMwIDYwbDMwIDMwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwZWE1ZTkiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA3Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-sea-100 text-sea-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Waves className="w-4 h-4" />
            Fresh Catch, Daily Served
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-sea-900 leading-tight">
            Taste the{" "}
            <span className="text-sea-500">Ocean&apos;s Finest</span>
          </h1>

          <p className="mt-6 text-lg lg:text-xl text-sea-600 max-w-xl leading-relaxed">
            Indulge in premium seafood crafted with passion. From ocean to
            plate, every bite is a journey along the coast.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-sea-500 hover:bg-sea-600 text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-sea-200"
            >
              Explore Our Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-sea-300 text-sea-700 hover:border-sea-500 px-6 py-3 rounded-full font-semibold transition-all"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent" />
    </section>
  );
}
