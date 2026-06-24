import { Waves } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-sea-500 to-ocean-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Waves className="w-10 h-10 text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white">
            Stay in the Loop
          </h2>
          <p className="mt-4 text-sea-100">
            Subscribe for exclusive offers, new menu announcements, and
            coastal inspirations.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full border-0 outline-none text-sm focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-sea-900 hover:bg-sea-800 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
