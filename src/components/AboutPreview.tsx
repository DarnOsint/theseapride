import Link from "next/link";
import { Anchor, Fish, Waves, MapPin } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-sea-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-sea-200 to-ocean-200 flex items-center justify-center">
              <div className="text-center p-8">
                <Waves className="w-16 h-16 text-sea-500 mx-auto mb-4" />
                <p className="text-sea-700 text-lg font-serif italic">
                  &ldquo;Where every wave brings a new flavor&rdquo;
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-sea-500 text-white rounded-2xl p-4 shadow-lg">
              <p className="text-2xl font-bold">15+</p>
              <p className="text-xs text-sea-100">Years of Excellence</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-sea-100 text-sea-700 px-4 py-1.5 rounded-full text-sm font-medium">
              <Anchor className="w-4 h-4" />
              Our Story
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-sea-900">
              A Passion for the Ocean&apos;s Bounty
            </h2>
            <p className="text-sea-600 leading-relaxed">
              TheSeaPride brings the freshest seafood from sustainable fisheries
              straight to your table. Based in Lagos, we&apos;re redefining coastal
              dining with bold flavours and premium quality.
            </p>
            <p className="text-sea-500 leading-relaxed">
              Every dish is a celebration of the sea — from our hand-selected
              catches to our farm-fresh accompaniments. Order through WhatsApp
              and enjoy restaurant-quality seafood at home.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sea-500" />
                <span className="text-sm font-medium text-sea-700">Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Fish className="w-5 h-5 text-sea-500" />
                <span className="text-sm font-medium text-sea-700">Sustainable Catch</span>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-sea-500" />
                <span className="text-sm font-medium text-sea-700">Daily Fresh</span>
              </div>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sea-600 hover:text-sea-500 font-medium transition-colors"
            >
              Learn More About Us →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
