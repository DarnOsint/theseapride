import { Waves, Fish, Shell, Shrimp } from "lucide-react";

const categories = [
  {
    name: "Starters",
    icon: "🦪",
    items: [
      { name: "Oysters Rockefeller", description: "Half dozen baked oysters with spinach, herbs & parmesan", price: "$22" },
      { name: "Calamari Fritti", description: "Crispy calamari with lemon aioli & marinara", price: "$16" },
      { name: "Crab Cakes", description: "Lump crab cakes with remoulade sauce", price: "$18" },
      { name: "Shrimp Cocktail", description: "Chilled jumbo shrimp with house cocktail sauce", price: "$19" },
    ],
  },
  {
    name: "Main Course",
    icon: "🐟",
    items: [
      { name: "Grilled Lobster Thermidor", description: "Atlantic lobster, creamy thermidor sauce, gratinated", price: "$48" },
      { name: "Seared Ahi Tuna", description: "Sesame-crusted yellowfin, wasabi aioli, pickled ginger", price: "$36" },
      { name: "Pan-Seared Salmon", description: "Norwegian salmon, dill cream sauce, roasted asparagus", price: "$32" },
      { name: "Garlic Butter Shrimp", description: "Jumbo shrimp, garlic, white wine, herb butter", price: "$28" },
      { name: "Grilled Swordfish", description: "Mediterranean-style with olive tapenade & roasted vegetables", price: "$34" },
    ],
  },
  {
    name: "From the Grill",
    icon: "🔥",
    items: [
      { name: "Whole Grilled Fish", description: "Market fresh catch, lemon-herb butter, seasonal vegetables", price: "$42" },
      { name: "Grilled Octopus", description: "Tender octopus, smoked paprika, chorizo crumble", price: "$26" },
      { name: "Seafood Platter", description: "Lobster, shrimp, scallops, mussels, clams for two", price: "$89" },
    ],
  },
  {
    name: "Pasta & Risotto",
    icon: "🍝",
    items: [
      { name: "Lobster Linguine", description: "Fresh linguine, lobster tail, cherry tomatoes, basil", price: "$38" },
      { name: "Shrimp Scampi", description: "Angel hair pasta, garlic butter shrimp, white wine", price: "$26" },
      { name: "Seafood Risotto", description: "Arborio rice, mixed seafood, saffron, parmesan", price: "$32" },
    ],
  },
  {
    name: "Sides",
    icon: "🥗",
    items: [
      { name: "Truffle Fries", description: "Hand-cut fries, truffle oil, parmesan", price: "$10" },
      { name: "Roasted Asparagus", description: "With lemon zest and parmesan", price: "$9" },
      { name: "Garlic Sautéed Spinach", description: "With toasted pine nuts", price: "$8" },
    ],
  },
  {
    name: "Desserts",
    icon: "🍰",
    items: [
      { name: "Key Lime Pie", description: "Florida-style with graham cracker crust", price: "$12" },
      { name: "Sea Salt Caramel Cheesecake", description: "Creamy cheesecake with caramel drizzle", price: "$14" },
      { name: "Chocolate Lava Cake", description: "Warm chocolate cake with vanilla ice cream", price: "$14" },
    ],
  },
];

export default function MenuPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sea-50 via-white to-ocean-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-sea-100 text-sea-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Waves className="w-4 h-4" />
            Our Menu
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-sea-900">
            Flavors from the Deep
          </h1>
          <p className="mt-4 text-sea-600 max-w-xl mx-auto">
            Every dish crafted with the freshest catches, sourced sustainably
            and prepared with passion
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-sea-800">
                  {category.name}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-sea-200 to-transparent ml-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-start gap-4 p-5 rounded-xl border border-sea-100 hover:border-sea-200 hover:shadow-md transition-all"
                  >
                    <div>
                      <h3 className="font-semibold text-sea-800">{item.name}</h3>
                      <p className="text-sm text-sea-500 mt-1">{item.description}</p>
                    </div>
                    <span className="text-lg font-bold text-sea-600 whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
