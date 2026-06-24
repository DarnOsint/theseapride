import { Waves, Anchor, MapPin } from "lucide-react";
import { getSiteConfig } from "@/lib/site-config";

const iconMap: Record<string, React.ReactNode> = {
  fish: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-sea-500 mx-auto mb-4"><path d="M12 2C8 2 4 6 2 10c0 4 2 8 4 10l2-4c2 2 4 2 6 2s4 0 6-2l2 4c2-2 4-6 4-10C20 6 16 2 12 2z"/><circle cx="12" cy="8" r="2" fill="currentColor"/></svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-sea-500 mx-auto mb-4"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-sea-500 mx-auto mb-4"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-sea-500 mx-auto mb-4"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
  ),
};

function parseJSON(raw: string | undefined, fallback: any[]) {
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
}

const defaultValues = [
  { icon: "fish", title: "Sustainable Sourcing", description: "We partner with responsible fisheries to ensure our oceans thrive for generations to come." },
  { icon: "heart", title: "Crafted with Love", description: "Every dish is prepared with meticulous attention to detail, honouring the natural flavours of the sea." },
  { icon: "award", title: "Premium Quality", description: "We source only the finest seafood, prepared by expert chefs trained in coastal cuisine." },
  { icon: "users", title: "Exceptional Service", description: "From WhatsApp ordering to doorstep delivery, we make premium seafood accessible." },
];

const defaultTeam = [
  { name: "Chef Marco Rossi", role: "Executive Chef", bio: "30 years of culinary mastery across Mediterranean and African coasts" },
  { name: "Sofia Laurent", role: "Head Sommelier", bio: "Expert pairings from coastal vineyards to complement every dish" },
  { name: "Liam O'Connor", role: "Operations Manager", bio: "Ensuring every order is perfect from kitchen to delivery" },
];

export default async function AboutPage() {
  const config = await getSiteConfig();
  const paragraphs = (config.about_page_paragraphs || "").split("\n\n").filter(Boolean);
  const values = parseJSON(config.about_values, defaultValues);
  const team = parseJSON(config.about_team, defaultTeam);

  return (
    <>
      <section className="bg-sea-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-sea-800/60 text-sea-200 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-sea-700/50">
            <Anchor className="w-4 h-4" />
            {config.about_page_hero_badge}
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-white">
            {config.about_page_hero_title}
          </h1>
          <p className="mt-4 text-sea-300 max-w-2xl mx-auto">
            {config.about_page_hero_subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-site">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Waves className="w-12 h-12 text-sea-400 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-site mb-6">
              {config.about_page_section_title}
            </h2>
            <div className="space-y-4 text-site-secondary leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8 inline-flex items-center gap-2 bg-sea-800/40 border border-sea-700 rounded-full px-5 py-2.5 text-sm text-sea-300">
              <MapPin className="w-4 h-4" />
              {config.about_page_location}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-site-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-site">{config.about_values_title}</h2>
            <p className="mt-2 text-site-secondary">{config.about_values_subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v: any) => (
              <div key={v.title} className="bg-card-bg rounded-2xl p-6 border border-card-border text-center hover:shadow-lg transition-shadow">
                {iconMap[v.icon] || iconMap.users}
                <h3 className="font-semibold text-site mb-2">{v.title}</h3>
                <p className="text-sm text-site-secondary">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-site">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-site">{config.about_team_title}</h2>
            <p className="mt-2 text-site-secondary">{config.about_team_subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member: any) => (
              <div key={member.name} className="text-center p-6 rounded-2xl border border-card-border hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-sea-700 to-ocean-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-sea-300"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                </div>
                <h3 className="font-semibold text-site">{member.name}</h3>
                <p className="text-sm text-sea-400 font-medium">{member.role}</p>
                <p className="text-sm text-site-secondary mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-site-secondary border-t border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-serif font-bold text-site mb-4">
            {config.about_cta_title}
          </h3>
          <a
            href={`https://wa.me/${config.whatsapp_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order on WhatsApp — {config.phone}
          </a>
          <div className="mt-4">
            <a
              href={config.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sea-400 hover:text-pink-400 transition-colors text-sm"
            >
              Follow us on Instagram @{config.instagram_url?.split(".com/")[1] || "the_sea_pride"}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
