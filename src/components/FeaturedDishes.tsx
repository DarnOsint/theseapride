"use client";

import { Star, Waves, TrendingUp } from "lucide-react";
import { formatPrice } from "@/lib/site-config";

const fallbackFeatured = [
  { name: "The Seapride Luxury Platter", description: "King crabs, jumbo prawns, lobsters, octopus, grilled fish, exotic red wine — serves up to 20", price: 450000, badge: "Flagship", emoji: "👑" },
  { name: "Seafarer's Feast", description: "Crabs, prawns, snails, lobster, shrimp, sweet corn — serves 5–10 people", price: 200000, badge: "Popular", emoji: "🎉" },
  { name: "Cajun Seafood Boil", description: "Assorted seafood drenched in spicy cajun sauce — serves 3–4 people", price: 70000, badge: "Best Seller", emoji: "🌶️" },
  { name: "Butterfly Prawns", description: "Served with mash potatoes or rice — a customer favorite", price: 25000, badge: "Signature", emoji: "🦐" },
];

export default function FeaturedDishes({ config }: { config: any }) {
  const whatsapp = (name: string) =>
    `https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent(`Hello! I'd like to order the *${name}* from TheSeaPride.`)}`;

  return (
    <section className="py-16 lg:py-24 bg-site">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          {config.featured_badge && (
            <div className="inline-flex items-center gap-2 bg-sea-50 dark:bg-sea-900/30 text-sea-600 dark:text-sea-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              {config.featured_badge}
            </div>
          )}
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-sea-900 dark:text-white">
            {config.featured_title}
          </h2>
          {config.featured_subtitle && (
            <p className="mt-4 text-sea-600 dark:text-sea-400">{config.featured_subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {fallbackFeatured.map((dish) => (
            <div
              key={dish.name}
              className="group bg-site rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl hover:shadow-sea-100/50 dark:hover:shadow-gray-900/50 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="text-4xl mb-4">{dish.emoji}</div>
              <div className="inline-flex items-center gap-1 bg-sea-50 dark:bg-sea-900/50 text-sea-600 dark:text-sea-300 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 w-fit">
                <TrendingUp className="w-3 h-3" />
                {dish.badge}
              </div>
              <h3 className="text-lg font-serif font-bold text-sea-800 dark:text-sea-200 mb-2">
                {dish.name}
              </h3>
              <p className="text-sm text-sea-500 dark:text-sea-400 leading-relaxed mb-4 flex-1">
                {dish.description}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                <span className="text-xl font-bold text-sea-700 dark:text-sea-300">
                  {formatPrice(dish.price)}
                </span>
                <a
                  href={whatsapp(dish.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all hover:shadow-lg"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/menu"
            className="inline-flex items-center gap-2 text-sea-600 hover:text-sea-500 dark:text-sea-400 font-medium transition-colors"
          >
            <Waves className="w-4 h-4" />
            Browse Full Menu →
          </a>
        </div>
      </div>
    </section>
  );
}
