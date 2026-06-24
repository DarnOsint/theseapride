import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";

export interface SiteConfig {
  site_name: string;
  whatsapp_number: string;
  instagram_url: string;
  facebook_url: string;
  twitter_url: string;
  tiktok_url: string;
  youtube_url: string;
  phone: string;
  email: string;
  address: string;
  hours_mon_thu: string;
  hours_fri_sat: string;
  hours_sun: string;
  hero_badge: string;
  hero_title: string;
  hero_title_highlight: string;
  hero_subtitle: string;
  hero_image: string;
  about_title: string;
  about_content: string;
  about_image: string;
  about_stats_years: string;
  about_stats_dishes: string;
  about_stats_customers: string;
  featured_badge: string;
  featured_title: string;
  featured_subtitle: string;
  newsletter_title: string;
  newsletter_subtitle: string;
  footer_description: string;
  footer_copyright: string;
  meta_title: string;
  meta_description: string;
  testimonial_1_name: string;
  testimonial_1_text: string;
  testimonial_1_rating: string;
  testimonial_1_image: string;
  testimonial_2_name: string;
  testimonial_2_text: string;
  testimonial_2_rating: string;
  testimonial_2_image: string;
  testimonial_3_name: string;
  testimonial_3_text: string;
  testimonial_3_rating: string;
  testimonial_3_image: string;
  featured_items_order: string;
}

const defaults: SiteConfig = {
  site_name: "TheSeaPride",
  whatsapp_number: "2347062270224",
  instagram_url: "https://www.instagram.com/the_sea_pride",
  facebook_url: "",
  twitter_url: "",
  tiktok_url: "",
  youtube_url: "",
  phone: "0706 227 0224",
  email: "hello@theseapride.com",
  address: "Iyana Anfani Round About, 26 MKO Abiola Way, Anfani Rd, Ringroad, Ibadan, Nigeria",
  hours_mon_thu: "11am – 10pm",
  hours_fri_sat: "11am – 11pm",
  hours_sun: "10am – 9pm",
  hero_badge: "Ibadan's Finest Seafood",
  hero_title: "Taste the Ocean's Finest",
  hero_title_highlight: "Ocean's Finest",
  hero_subtitle: "Premium seafood dining in Ibadan. Fresh catches, bold coastal flavors, and an unforgettable experience — delivered to your door.",
  hero_image: "",
  about_title: "The SeaPride Story",
  about_content: "At TheSeaPride, we are passionate about bringing the freshest seafood to your table. Our journey began with a simple vision: to create a dining experience that captures the essence of coastal living right here in Ibadan. Every dish is crafted with care, using the finest ingredients sourced from trusted suppliers. From our signature seafood platters to our delicate starters, each bite tells a story of quality, tradition, and innovation. We believe that great food brings people together, and we are honored to be part of your special moments — whether it's a family celebration, a romantic dinner, or a casual gathering with friends.",
  about_image: "",
  about_stats_years: "5+",
  about_stats_dishes: "70+",
  about_stats_customers: "10K+",
  featured_badge: "Customer Favourites",
  featured_title: "Most Ordered",
  featured_subtitle: "Our guests can't get enough of these — tap to order yours now",
  newsletter_title: "Stay in the Loop",
  newsletter_subtitle: "Be the first to know about new menu items, special offers, and exclusive events.",
  footer_description: "Premium seafood dining in the heart of Ibadan. Fresh catches, bold coastal flavors, and an unforgettable experience.",
  footer_copyright: "TheSeaPride. All rights reserved.",
  meta_title: "TheSeaPride | Premium Seafood Restaurant",
  meta_description: "Experience the finest seafood dining at TheSeaPride. Fresh catches, bold flavors, and unforgettable coastal cuisine in Ibadan.",
  testimonial_1_name: "Adebayo Ogunlesi",
  testimonial_1_text: "The seafood platter was absolutely incredible! The freshness of the lobster and prawns was unmatched. I've dined at seafood restaurants across Nigeria, and TheSeaPride stands out. The Cajun sauce is to die for!",
  testimonial_1_rating: "5",
  testimonial_1_image: "",
  testimonial_2_name: "Chioma Nwachukwu",
  testimonial_2_text: "I hosted my birthday dinner here and it was perfection! The Seapride Luxury Platter was the star of the evening. Everyone is still talking about the grilled prawns. The service was impeccable.",
  testimonial_2_rating: "5",
  testimonial_2_image: "",
  testimonial_3_name: "Usman Mohammed",
  testimonial_3_text: "As someone who loves seafood, I'm very picky. TheSeaPride exceeded my expectations. The fisherman soup was authentic and reminded me of my grandmother's cooking. The Jambalaya rice is a must-try!",
  testimonial_3_rating: "5",
  testimonial_3_image: "",
  featured_items_order: "The Seapride Luxury Platter,Seafarer's Feast,Cajun Seafood Boil,Butterfly Prawns",
};

let cachedConfig: SiteConfig | null = null;
const CACHE_DURATION = 30000;
let lastFetch = 0;

export async function getSiteConfig(): Promise<SiteConfig> {
  const now = Date.now();
  if (cachedConfig && now - lastFetch < CACHE_DURATION) return cachedConfig;

  const isValidUrl = supabaseUrl.startsWith("https://");
  if (!isValidUrl || !supabaseAnonKey) return defaults;

  try {
    const sb = createClient(supabaseUrl, supabaseAnonKey);
    const { data } = await sb.from("site_settings").select("key, value");

    if (!data) return defaults;

    const overrides: Record<string, string> = {};
    for (const row of data) {
      overrides[row.key] = row.value;
    }

    const config = { ...defaults, ...overrides } as SiteConfig;
    cachedConfig = config;
    lastFetch = now;
    return config;
  } catch {
    return defaults;
  }
}

export function getSocialLinks(config: SiteConfig) {
  return [
    { key: "instagram_url", url: config.instagram_url, label: "Instagram", color: "hover:text-pink-500", icon: "instagram" },
    { key: "facebook_url", url: config.facebook_url, label: "Facebook", color: "hover:text-blue-500", icon: "facebook" },
    { key: "twitter_url", url: config.twitter_url, label: "Twitter", color: "hover:text-sky-500", icon: "twitter" },
    { key: "tiktok_url", url: config.tiktok_url, label: "TikTok", color: "hover:text-pink-400", icon: "tiktok" },
    { key: "youtube_url", url: config.youtube_url, label: "YouTube", color: "hover:text-red-500", icon: "youtube" },
  ].filter(s => s.url);
}

export function getWhatsAppUrlWithText(itemName?: string): string {
  const num = cachedConfig?.whatsapp_number || defaults.whatsapp_number;
  const text = itemName
    ? `Hello! I'd like to order the *${itemName}* from TheSeaPride.`
    : "Hello! I'd like to place an order at TheSeaPride.";
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

export function getReservationWhatsAppUrl(): string {
  const num = cachedConfig?.whatsapp_number || defaults.whatsapp_number;
  return `https://wa.me/${num}?text=${encodeURIComponent("Hello! I'd like to make a reservation at TheSeaPride.")}`;
}

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString("en-US")}`;
}
