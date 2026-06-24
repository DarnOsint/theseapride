"use client";

import { Star, Waves, Quote } from "lucide-react";

const fallbackTestimonials = [
  { name: "Adebisi Ogunlade", text: "The Seapride Luxury Platter was absolutely incredible. Best seafood in Ibadan without a doubt! Ordering via WhatsApp was so convenient.", rating: 5, role: "Food Critic" },
  { name: "Chukwudi Okonkwo", text: "Extraordinary flavours. The Cajun Seafood Boil is a must-try — perfectly spiced and generous portions. Delivery was prompt and professional.", rating: 5, role: "Regular Customer" },
  { name: "Aminu Suleiman", text: "We ordered the Seafarer's Feast for a family gathering and it was perfect. Everyone was impressed. TheSeaPride never disappoints!", rating: 5, role: "Happy Customer" },
];

export default function Testimonials({ config }: { config: any }) {
  const testimonials = [
    { name: config.testimonial_1_name, text: config.testimonial_1_text, rating: parseInt(config.testimonial_1_rating) || 5, image: config.testimonial_1_image },
    { name: config.testimonial_2_name, text: config.testimonial_2_text, rating: parseInt(config.testimonial_2_rating) || 5, image: config.testimonial_2_image },
    { name: config.testimonial_3_name, text: config.testimonial_3_text, rating: parseInt(config.testimonial_3_rating) || 5, image: config.testimonial_3_image },
  ].filter(t => t.name && t.text);

  return (
    <section className="py-16 lg:py-24 bg-sea-900 dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sea-800/50 to-sea-950/50 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-sea-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-ocean-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <Quote className="w-8 h-8 text-sea-400 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">
            {config.testimonials_title || "What Our Guests Say"}
          </h2>
          <p className="mt-4 text-sea-300">{config.testimonials_subtitle || "Real reviews from people who love TheSeaPride"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {(testimonials.length >= 3 ? testimonials : fallbackTestimonials).map((t, i) => (
            <div
              key={t.name + i}
              className="group bg-sea-800/40 border border-sea-700/50 rounded-2xl p-6 lg:p-8 backdrop-blur-sm hover:bg-sea-800/60 hover:border-sea-600/50 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sea-200 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="border-t border-sea-700/50 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sea-400 to-ocean-400 flex items-center justify-center text-white font-bold text-sm">
                  {t.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  {(t as any).role && <p className="text-xs text-sea-400">{(t as any).role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
