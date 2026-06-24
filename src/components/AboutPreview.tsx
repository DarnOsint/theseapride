"use client";

import Link from "next/link";
import { Anchor, Fish, Waves, MapPin } from "lucide-react";

export default function AboutPreview({ config }: { config: any }) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-sea-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-sea-200 to-ocean-200 dark:from-sea-800 dark:to-ocean-900 flex items-center justify-center">
              <div className="text-center p-8">
                <Waves className="w-16 h-16 text-sea-500 mx-auto mb-4" />
                <p className="text-sea-700 dark:text-sea-200 text-lg font-serif italic">
                  &ldquo;Where every wave brings a new flavor&rdquo;
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-sea-500 text-white rounded-2xl p-4 shadow-lg">
              <p className="text-2xl font-bold">{config.about_stats_years}+</p>
              <p className="text-xs text-sea-100">Years of Excellence</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-sea-100 dark:bg-sea-900/50 text-sea-700 dark:text-sea-300 px-4 py-1.5 rounded-full text-sm font-medium">
              <Anchor className="w-4 h-4" />
              Our Story
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-sea-900 dark:text-white">
              {config.about_title}
            </h2>
            <p className="text-sea-600 dark:text-sea-300 leading-relaxed">
              {config.about_content}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sea-500" />
                <span className="text-sm font-medium text-sea-700 dark:text-sea-300">Ibadan, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Fish className="w-5 h-5 text-sea-500" />
                <span className="text-sm font-medium text-sea-700 dark:text-sea-300">Sustainable Catch</span>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-sea-500" />
                <span className="text-sm font-medium text-sea-700 dark:text-sea-300">Daily Fresh</span>
              </div>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sea-600 hover:text-sea-500 dark:text-sea-400 font-medium transition-colors"
            >
              Learn More About Us →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
