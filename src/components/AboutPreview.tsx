"use client";

import Link from "next/link";
import { Anchor, Fish, Waves, MapPin, Sparkles } from "lucide-react";

export default function AboutPreview({ config }: { config: any }) {
  return (
    <section className="py-16 lg:py-24 bg-site-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sea-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-sea-700 to-sea-900 flex items-center justify-center shadow-2xl shadow-sea-900/30">
              <div className="text-center p-8">
                <Waves className="w-20 h-20 text-sea-400 mx-auto mb-4" />
                <p className="text-sea-200 text-lg font-serif italic">
                  &ldquo;Where every wave brings a new flavor&rdquo;
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-amber-400 text-sea-900 rounded-2xl p-5 shadow-xl flex items-center gap-3">
              <div>
                <p className="text-2xl font-bold">{config.about_stats_years}+</p>
                <p className="text-xs font-medium">Years of Excellence</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-sea-800/40 text-sea-300 px-4 py-1.5 rounded-full text-sm font-medium border border-sea-700/30">
              <Sparkles className="w-4 h-4" />
              Our Story
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-site leading-tight">
              {config.about_title}
            </h2>
            <p className="text-site-secondary leading-relaxed">
              {config.about_content}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-site px-3 py-2 rounded-lg border border-border-color">
                <MapPin className="w-4 h-4 text-sea-500" />
                <span className="text-sm font-medium text-site-secondary">Ibadan, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 bg-site px-3 py-2 rounded-lg border border-border-color">
                <Fish className="w-4 h-4 text-sea-500" />
                <span className="text-sm font-medium text-site-secondary">Sustainable Catch</span>
              </div>
              <div className="flex items-center gap-2 bg-site px-3 py-2 rounded-lg border border-border-color">
                <Waves className="w-4 h-4 text-sea-500" />
                <span className="text-sm font-medium text-site-secondary">Daily Fresh</span>
              </div>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sea-400 hover:text-sea-300 font-medium transition-colors group"
            >
              Learn More About Us
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
