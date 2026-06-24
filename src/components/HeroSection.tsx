"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Waves, ChevronDown } from "lucide-react";

function parseSlides(raw: string): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter(Boolean);
  } catch {}
  return raw.split("\n").map(s => s.trim()).filter(Boolean);
}

export default function HeroSection({ config }: { config: any }) {
  const slides = parseSlides(config.hero_slides);
  const interval = parseInt(config.hero_slides_interval) || 5000;
  const [current, setCurrent] = useState(0);
  const hasSlides = slides.length > 0;

  useEffect(() => {
    if (!hasSlides) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [hasSlides, interval, slides.length]);

  return (
    <section className="relative overflow-hidden bg-sea-900 min-h-screen flex items-center">
      {hasSlides && (
        <div className="absolute inset-0">
          {slides.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-sea-900/95 via-sea-900/80 to-sea-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-sea-950/90 via-transparent to-sea-900/40" />
        </div>
      )}

      {!hasSlides && (
        <div className="absolute inset-0 bg-gradient-to-br from-sea-900 via-sea-800 to-sea-950" />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="max-w-3xl">
          {config.hero_badge && (
            <div className="inline-flex items-center gap-2 bg-sea-800/60 text-sea-200 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-sea-700/50">
              <Waves className="w-4 h-4" />
              {config.hero_badge}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight text-balance">
            {config.hero_title.includes(config.hero_title_highlight) ? (
              <>
                {config.hero_title.split(config.hero_title_highlight)[0]}
                <span className="text-sea-400">{config.hero_title_highlight}</span>
                {config.hero_title.split(config.hero_title_highlight)[1]}
              </>
            ) : (
              config.hero_title
            )}
          </h1>

          {config.hero_subtitle && (
            <p className="mt-6 text-lg lg:text-xl text-sea-200 max-w-xl leading-relaxed">
              {config.hero_subtitle}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${config.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-sea-900 px-7 py-3.5 rounded-full font-bold transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order Now
            </a>
            <a
              href={`https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent("Hello! I'd like to make a reservation at TheSeaPride.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 px-7 py-3.5 rounded-full font-semibold transition-all backdrop-blur-sm"
            >
              Reserve a Table
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4 text-sm text-sea-300">
            {config.instagram_url && (
              <a
                href={config.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-pink-400 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Follow on Instagram
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="flex gap-2 mb-2">
          {hasSlides
            ? slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))
            : null}
        </div>
        <ChevronDown className="w-5 h-5 text-white/60 animate-scroll" />
      </div>
    </section>
  );
}
