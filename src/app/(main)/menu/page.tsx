import { Waves } from "lucide-react";
import { getMenuData, getWhatsAppUrl, formatPrice } from "@/lib/menu-config";
import { getSiteConfig } from "@/lib/site-config";

export default async function MenuPage() {
  const [menuData, config] = await Promise.all([
    getMenuData(),
    getSiteConfig(),
  ]);

  return (
    <>
      <section className="bg-sea-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-sea-800/60 text-sea-200 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-sea-700/50">
            <Waves className="w-4 h-4" />
            {config.menu_hero_badge}
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white">
            {config.menu_hero_title}
          </h1>
          <p className="mt-4 text-sea-300 max-w-xl mx-auto">
            {config.menu_hero_subtitle}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-green-900/40 border border-green-700/30 text-green-300 px-4 py-2 rounded-full text-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {config.menu_whatsapp_badge}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-site">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {menuData.map((category) => (
            <div key={category.id}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-site">
                  {category.name}
                </h2>
                {category.note && (
                  <span className="text-xs bg-sea-800/40 text-sea-300 px-2.5 py-1 rounded-full font-medium">
                    {category.note}
                  </span>
                )}
                <div className="flex-1 h-px bg-gradient-to-r from-sea-600 to-transparent ml-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col sm:flex-row rounded-xl border border-card-border bg-card-bg overflow-hidden hover:border-sea-700 hover:shadow-md transition-all"
                  >
                    {item.image && (
                      <div className="sm:w-36 h-36 shrink-0 overflow-hidden bg-sea-900">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col p-4 justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-semibold text-site text-sm leading-snug">
                            {item.name}
                          </h3>
                          <span className="text-base font-bold text-sea-400 whitespace-nowrap shrink-0">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        {Array.isArray(item.includes) && item.includes.length > 0 && (
                          <details className="mt-1.5">
                            <summary className="text-xs text-site-secondary hover:text-sea-400 cursor-pointer">
                              What&apos;s included
                            </summary>
                            <ul className="mt-1.5 flex flex-wrap gap-1">
                              {item.includes.map((inc) => (
                                <li
                                  key={inc}
                                  className="text-xs bg-sea-800/40 text-sea-300 px-2 py-0.5 rounded-full"
                                >
                                  {inc}
                                </li>
                              ))}
                            </ul>
                          </details>
                        )}
                        {item.serves && (
                          <p className="text-xs text-site-secondary mt-1">
                            Serves: {item.serves}
                          </p>
                        )}
                      </div>
                      <div className="mt-2 pt-2 border-t border-card-border flex justify-end">
                        <a
                          href={getWhatsAppUrl(item.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-all hover:shadow-lg"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Order
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-site-secondary border-t border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-site-secondary text-sm">
            {config.menu_footer_text}
          </p>
          <a
            href={`https://wa.me/${config.whatsapp_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {config.menu_footer_cta}
          </a>
        </div>
      </section>
    </>
  );
}
