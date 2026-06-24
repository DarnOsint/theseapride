import { Star, Clock, ChefHat } from "lucide-react";

const dishes = [
  {
    name: "Grilled Lobster Thermidor",
    description: "Atlantic lobster with creamy thermidor sauce, gratinated to perfection",
    price: "$48",
    badge: "Chef's Special",
    image: "🦞",
  },
  {
    name: "Seared Ahi Tuna",
    description: "Sesame-crusted yellowfin with wasabi aioli and pickled ginger",
    price: "$36",
    badge: "Most Popular",
    image: "🐟",
  },
  {
    name: "Garlic Butter Shrimp",
    description: "Jumbo shrimp sautéed in garlic, white wine, and herb butter",
    price: "$28",
    badge: "Signature Dish",
    image: "🦐",
  },
  {
    name: "Pan-Seared Salmon",
    description: "Norwegian salmon with dill cream sauce and roasted asparagus",
    price: "$32",
    badge: "New",
    image: "🐠",
  },
];

export default function FeaturedDishes() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-sea-50 text-sea-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            From Our Kitchen
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-sea-900">
            Signature Dishes
          </h2>
          <p className="mt-4 text-sea-600">
            Carefully curated flavors that celebrate the bounty of the sea
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {dishes.map((dish) => (
            <div
              key={dish.name}
              className="group bg-white rounded-2xl border border-sea-100 p-6 hover:shadow-xl hover:shadow-sea-100/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{dish.image}</div>
              <div className="inline-block bg-sea-50 text-sea-600 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                {dish.badge}
              </div>
              <h3 className="text-lg font-serif font-bold text-sea-800 mb-2">
                {dish.name}
              </h3>
              <p className="text-sm text-sea-500 leading-relaxed mb-4">
                {dish.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-sea-700">
                  {dish.price}
                </span>
                <button className="text-sm font-medium text-sea-500 hover:text-sea-600 transition-colors">
                  Order Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
