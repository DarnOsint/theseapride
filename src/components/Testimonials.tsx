"use client";

import { Star, Waves } from "lucide-react";

const fallbackTestimonials = [
  { name: "Adebisi Ogunlade", text: "The Seapride Luxury Platter was absolutely incredible. Best seafood in Ibadan without a doubt! Ordering via WhatsApp was so convenient.", rating: 5, role: "Food Critic" },
  { name: "Chukwudi Okonkwo", text: "Extraordinary flavours. The Cajun Seafood Boil is a must-try — perfectly spiced and generous portions. Delivery was prompt and professional.", rating: 5, role: "Regular Customer" },
  { name: "Aminu Suleiman", text: "We ordered the Seafarer's Feast for a family gathering and it was perfect. Everyone was impressed. TheSeaPride never disappoints!", rating: 5, role: "Happy Customer" },
];

export default function Testimonials({ config }: { config: any }) {
  const testimonials = [
    { name: config.testimonial_1_name, text: config.testimonial_1_text, rating: parseInt(config.testimonial_1_rating) || 5 },
    { name: config.testimonial_2_name, text: config.testimonial_2_text, rating: parseInt(config.testimonial_2_rating) || 5 },
    { name: config.testimonial_3_name, text: config.testimonial_3_text, rating: parseInt(config.testimonial_3_rating) || 5 },
  ].filter(t => t.name && t.text);

  return (
    <section className="py-16 lg:py-24 bg-sea-900 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <Waves className="w-8 h-8 text-sea-400 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">
            What Our Guests Say
          </h2>
          <p className="mt-4 text-sea-300">Real reviews from people who love TheSeaPride</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {(testimonials.length >= 3 ? testimonials : fallbackTestimonials).map((t, i) => (
            <div
              key={t.name + i}
              className="bg-sea-800/50 border border-sea-700 rounded-2xl p-6 lg:p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sea-200 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="border-t border-sea-700 pt-4">
                <p className="font-semibold text-white">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
