"use client";

import { useState } from "react";
import { Waves, X, ChevronLeft, ChevronRight } from "lucide-react";

const fallbackImages = [
  { src: "https://images.unsplash.com/photo-1559742811-822f4580b12e?w=600&q=80", alt: "Grilled seafood platter" },
  { src: "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?w=600&q=80", alt: "Fresh lobster dish" },
  { src: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=600&q=80", alt: "Elegant dining setting" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80", alt: "Premium seafood" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", alt: "Plated dish" },
  { src: "https://images.unsplash.com/photo-1533622597524-a1215e26c0e2?w=600&q=80", alt: "Restaurant ambiance" },
];

interface GalleryImage {
  src: string;
  alt?: string;
}

export default function Gallery({ config }: { config: any }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const raw = config.gallery_images || "";
  let images: GalleryImage[];
  try {
    const parsed = JSON.parse(raw);
    images = Array.isArray(parsed) ? parsed.filter((i: any) => i?.src) : [];
  } catch {
    images = raw ? raw.split("\n").filter(Boolean).map((s: string) => ({ src: s.trim() })) : [];
  }

  if (images.length === 0) {
    images = fallbackImages;
  }

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((l) => (l !== null ? (l - 1 + images.length) % images.length : null));
  const next = () => setLightbox((l) => (l !== null ? (l + 1) % images.length : null));

  return (
    <section className="py-16 lg:py-24 bg-site-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <Waves className="w-8 h-8 text-sea-400 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-site">
            {config.gallery_title || "Our Space"}
          </h2>
          <p className="mt-4 text-site-secondary">
            {config.gallery_subtitle || "A glimpse into TheSeaPride experience"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {images.map((img, i) => (
            <button
              key={img.src + i}
              onClick={() => openLightbox(i)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-sea-800"
            >
              <img
                src={img.src}
                alt={img.alt || `Gallery image ${i + 1}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-sea-900/0 group-hover:bg-sea-900/30 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  View
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 text-white/80 hover:text-white p-2 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 text-white/80 hover:text-white p-2 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div className="max-w-4xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightbox].src}
              alt={images[lightbox].alt || "Gallery image"}
              className="w-full h-full object-contain rounded-lg"
            />
            <p className="text-center text-white/60 text-sm mt-4">
              {lightbox + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
