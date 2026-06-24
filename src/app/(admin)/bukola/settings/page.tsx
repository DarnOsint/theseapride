"use client";

import { useEffect, useState, useCallback } from "react";
import { Save, Waves } from "lucide-react";

interface Setting {
  key: string;
  value: string;
}

const settingLabels: Record<string, { label: string; type: string; placeholder: string; section: string }> = {
  site_name: { label: "Site Name", type: "text", placeholder: "TheSeaPride", section: "business" },
  whatsapp_number: { label: "WhatsApp Number", type: "text", placeholder: "2347062270224", section: "business" },
  phone: { label: "Phone Number", type: "text", placeholder: "0706 227 0224", section: "business" },
  email: { label: "Email Address", type: "email", placeholder: "hello@theseapride.com", section: "business" },
  address: { label: "Address", type: "text", placeholder: "Full restaurant address", section: "business" },
  hours_mon_thu: { label: "Hours (Mon–Thu)", type: "text", placeholder: "11am – 10pm", section: "business" },
  hours_fri_sat: { label: "Hours (Fri–Sat)", type: "text", placeholder: "11am – 11pm", section: "business" },
  hours_sun: { label: "Hours (Sun)", type: "text", placeholder: "10am – 9pm", section: "business" },
  instagram_url: { label: "Instagram URL", type: "url", placeholder: "https://www.instagram.com/the_sea_pride", section: "social" },
  facebook_url: { label: "Facebook URL", type: "url", placeholder: "https://facebook.com/...", section: "social" },
  twitter_url: { label: "Twitter / X URL", type: "url", placeholder: "https://twitter.com/...", section: "social" },
  tiktok_url: { label: "TikTok URL", type: "url", placeholder: "https://tiktok.com/@...", section: "social" },
  youtube_url: { label: "YouTube URL", type: "url", placeholder: "https://youtube.com/@...", section: "social" },
  hero_badge: { label: "Hero Badge", type: "text", placeholder: "Ibadan's Finest Seafood", section: "hero" },
  hero_title: { label: "Hero Title", type: "text", placeholder: "Taste the Ocean's Finest", section: "hero" },
  hero_title_highlight: { label: "Hero Highlight Word", type: "text", placeholder: "Ocean's Finest", section: "hero" },
  hero_subtitle: { label: "Hero Subtitle", type: "text", placeholder: "Premium seafood dining in Ibadan...", section: "hero" },
  about_title: { label: "About Section Title", type: "text", placeholder: "The SeaPride Story", section: "about" },
  about_content: { label: "About Content", type: "textarea", placeholder: "Story about the restaurant...", section: "about" },
  about_stats_years: { label: "Years in Business", type: "text", placeholder: "5+", section: "about" },
  about_stats_dishes: { label: "Dish Count", type: "text", placeholder: "70+", section: "about" },
  about_stats_customers: { label: "Customer Count", type: "text", placeholder: "10K+", section: "about" },
  featured_badge: { label: "Featured Badge", type: "text", placeholder: "Customer Favourites", section: "featured" },
  featured_title: { label: "Featured Section Title", type: "text", placeholder: "Most Ordered", section: "featured" },
  featured_subtitle: { label: "Featured Subtitle", type: "text", placeholder: "Our guests can't get enough...", section: "featured" },
  newsletter_title: { label: "Newsletter Title", type: "text", placeholder: "Stay in the Loop", section: "newsletter" },
  newsletter_subtitle: { label: "Newsletter Subtitle", type: "text", placeholder: "Be the first to know...", section: "newsletter" },
  footer_description: { label: "Footer Description", type: "textarea", placeholder: "Premium seafood dining...", section: "footer" },
  footer_copyright: { label: "Footer Copyright", type: "text", placeholder: "TheSeaPride. All rights reserved.", section: "footer" },
  meta_title: { label: "Meta Title (SEO)", type: "text", placeholder: "TheSeaPride | Premium Seafood", section: "meta" },
  meta_description: { label: "Meta Description (SEO)", type: "textarea", placeholder: "Experience the finest seafood...", section: "meta" },
};

const sectionOrder = ["social", "hero", "about", "featured", "newsletter", "footer", "meta"];
const sectionLabels: Record<string, string> = {
  social: "Social Media Links",
  hero: "Hero Section",
  about: "About Section",
  featured: "Featured Section",
  newsletter: "Newsletter Section",
  footer: "Footer",
  meta: "SEO / Meta Tags",
};
const sectionEmojis: Record<string, string> = {
  social: "🔗",
  hero: "🏠",
  about: "📖",
  featured: "⭐",
  newsletter: "📬",
  footer: "🦶",
  meta: "🔍",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchSettings = useCallback(async () => {
    const res = await fetch("/api/admin?action=get_settings");
    const data = await res.json();
    if (Array.isArray(data)) setSettings(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  function getValue(key: string): string {
    return settings.find((s) => s.key === key)?.value || "";
  }

  function setValue(key: string, value: string) {
    setSettings((prev) => {
      const existing = prev.find((s) => s.key === key);
      if (existing) {
        return prev.map((s) => (s.key === key ? { ...s, value } : s));
      }
      return [...prev, { key, value }];
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_settings", settings }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Settings saved successfully!");
      } else {
        setMessage("Error saving settings");
      }
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("Error: " + err.message);
    }
    setSaving(false);
  }

  const businessKeys = Object.entries(settingLabels).filter(([, v]) => v.section === "business").map(([k]) => k);
  const socialKeys = Object.entries(settingLabels).filter(([, v]) => v.section === "social").map(([k]) => k);
  const activeSocialCount = socialKeys.filter((k) => getValue(k)).length;

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="text-sea-400 text-sm">Loading settings...</div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Site Settings</h1>
          <p className="text-sm text-sea-400 mt-1">Manage your website configuration</p>
        </div>
      </div>

      {message && (
        <div className={`mb-6 px-5 py-3 rounded-xl text-sm ${
          message.includes("Error") ? "bg-red-900/50 border border-red-700/50 text-red-300" : "bg-emerald-900/50 border border-emerald-700/50 text-emerald-300"
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-sea-900/80 border border-sea-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-200 mb-1 flex items-center gap-2">
            <Waves className="w-5 h-5 text-sea-400" />
            Contact &amp; Business Info
          </h2>
          <p className="text-sm text-sea-500 mb-5">Basic business contact details and hours</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {businessKeys.map((key) => {
              const c = settingLabels[key];
              return (
                <div key={key}>
                  <label className="block text-xs font-medium text-sea-400 mb-1.5">{c.label}</label>
                  <input
                    type={c.type}
                    value={getValue(key)}
                    onChange={(e) => setValue(key, e.target.value)}
                    placeholder={c.placeholder}
                    className="w-full px-3 py-2.5 rounded-xl bg-sea-800/50 border border-sea-700 text-gray-200 placeholder-sea-500 focus:border-sea-500 focus:ring-2 focus:ring-sea-500/20 outline-none text-sm"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {sectionOrder.map((sectionKey) => {
          const keys = Object.entries(settingLabels)
            .filter(([, v]) => v.section === sectionKey)
            .map(([k]) => k);
          return (
            <div key={sectionKey} className="bg-sea-900/80 border border-sea-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-200 mb-1 flex items-center gap-2">
                <span>{sectionEmojis[sectionKey]}</span>
                {sectionLabels[sectionKey]}
              </h2>
              {sectionKey === "social" && (
                <p className="text-sm text-sea-500 mb-5">
                  When a URL is provided, the icon appears on the website. Leave blank to hide ({activeSocialCount}/{socialKeys.length} active).
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {keys.map((key) => {
                  const c = settingLabels[key];
                  const val = getValue(key);
                  if (sectionKey === "social") {
                    const socialEmojis: Record<string, string> = {
                      instagram_url: "📸", facebook_url: "👍", twitter_url: "🐦",
                      tiktok_url: "🎵", youtube_url: "▶️",
                    };
                    return (
                      <div key={key} className={`p-4 rounded-xl border-2 transition-colors ${val ? "border-sea-600 bg-sea-800/40" : "border-sea-800 bg-sea-900/30"}`}>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                          <span>{socialEmojis[key] || "🔗"}</span>
                          {c.label}
                          {val && <span className="text-xs bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded-full">Active</span>}
                        </label>
                        <input
                          type={c.type}
                          value={val}
                          onChange={(e) => setValue(key, e.target.value)}
                          placeholder={c.placeholder}
                          className="w-full px-3 py-2.5 rounded-xl bg-sea-800/50 border border-sea-700 text-gray-200 placeholder-sea-500 focus:border-sea-500 focus:ring-2 focus:ring-sea-500/20 outline-none text-sm"
                        />
                      </div>
                    );
                  }
                  if (c.type === "textarea") {
                    return (
                      <div key={key} className="md:col-span-2">
                        <label className="block text-xs font-medium text-sea-400 mb-1.5">{c.label}</label>
                        <textarea
                          value={val}
                          onChange={(e) => setValue(key, e.target.value)}
                          placeholder={c.placeholder}
                          rows={4}
                          className="w-full px-3 py-2.5 rounded-xl bg-sea-800/50 border border-sea-700 text-gray-200 placeholder-sea-500 focus:border-sea-500 focus:ring-2 focus:ring-sea-500/20 outline-none text-sm resize-none"
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={key}>
                      <label className="block text-xs font-medium text-sea-400 mb-1.5">{c.label}</label>
                      <input
                        type={c.type}
                        value={val}
                        onChange={(e) => setValue(key, e.target.value)}
                        placeholder={c.placeholder}
                        className="w-full px-3 py-2.5 rounded-xl bg-sea-800/50 border border-sea-700 text-gray-200 placeholder-sea-500 focus:border-sea-500 focus:ring-2 focus:ring-sea-500/20 outline-none text-sm"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="bg-sea-900/80 border border-sea-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-200 mb-5">Testimonials</h2>
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-6 pb-6 border-b border-sea-800 last:border-0 last:mb-0 last:pb-0">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Testimonial #{i}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-sea-400 mb-1">Name</label>
                  <input
                    type="text"
                    value={getValue(`testimonial_${i}_name`)}
                    onChange={(e) => setValue(`testimonial_${i}_name`, e.target.value)}
                    placeholder="Customer name"
                    className="w-full px-3 py-2.5 rounded-xl bg-sea-800/50 border border-sea-700 text-gray-200 placeholder-sea-500 focus:border-sea-500 focus:ring-2 focus:ring-sea-500/20 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-sea-400 mb-1">Rating (1–5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={getValue(`testimonial_${i}_rating`)}
                    onChange={(e) => setValue(`testimonial_${i}_rating`, e.target.value)}
                    placeholder="5"
                    className="w-full px-3 py-2.5 rounded-xl bg-sea-800/50 border border-sea-700 text-gray-200 placeholder-sea-500 focus:border-sea-500 focus:ring-2 focus:ring-sea-500/20 outline-none text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-sea-400 mb-1">Review Text</label>
                  <textarea
                    value={getValue(`testimonial_${i}_text`)}
                    onChange={(e) => setValue(`testimonial_${i}_text`, e.target.value)}
                    placeholder="What the customer said..."
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-xl bg-sea-800/50 border border-sea-700 text-gray-200 placeholder-sea-500 focus:border-sea-500 focus:ring-2 focus:ring-sea-500/20 outline-none text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-sea-500 hover:bg-sea-400 disabled:bg-sea-600/50 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save All Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
