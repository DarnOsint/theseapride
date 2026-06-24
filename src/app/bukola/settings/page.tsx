"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { Save, Waves } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Setting {
  key: string;
  value: string;
}

const settingLabels: Record<string, { label: string; type: string; placeholder: string }> = {
  site_name: { label: "Site Name", type: "text", placeholder: "TheSeaPride" },
  whatsapp_number: { label: "WhatsApp Number", type: "text", placeholder: "2347062270224" },
  instagram_url: { label: "Instagram URL", type: "url", placeholder: "https://www.instagram.com/the_sea_pride" },
  facebook_url: { label: "Facebook URL", type: "url", placeholder: "https://facebook.com/..." },
  twitter_url: { label: "Twitter / X URL", type: "url", placeholder: "https://twitter.com/..." },
  phone: { label: "Phone Number", type: "text", placeholder: "0706 227 0224" },
  email: { label: "Email Address", type: "email", placeholder: "hello@theseapride.com" },
  address: { label: "Address", type: "text", placeholder: "Full restaurant address" },
  hours_mon_thu: { label: "Hours (Mon–Thu)", type: "text", placeholder: "11am – 10pm" },
  hours_fri_sat: { label: "Hours (Fri–Sat)", type: "text", placeholder: "11am – 11pm" },
  hours_sun: { label: "Hours (Sun)", type: "text", placeholder: "10am – 9pm" },
};

const socialKeys = ["instagram_url", "facebook_url", "twitter_url"];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const sb = createClient(supabaseUrl, supabaseAnonKey);

  const fetchSettings = useCallback(async () => {
    const { data } = await sb.from("site_settings").select("*").order("id");
    if (data) setSettings(data);
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
      for (const setting of settings) {
        await sb.from("site_settings").upsert(
          { key: setting.key, value: setting.value },
          { onConflict: "key" }
        );
      }
      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("Error: " + err.message);
    }
    setSaving(false);
  }

  const activeSocialCount = socialKeys.filter((k) => getValue(k)).length;
  const totalSocialCount = socialKeys.length;

  if (loading) return <div className="text-center py-20 text-gray-500">Loading settings...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-800">Site Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your website configuration</p>
        </div>
      </div>

      {message && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-xl text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Social Media */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <Waves className="w-5 h-5 text-sea-500" />
            Social Media Links
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Add or remove social media URLs. When a URL is provided, the corresponding icon
            will appear on the website. Leave blank to hide ({activeSocialCount}/{totalSocialCount} active).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {socialKeys.map((key) => {
              const config = settingLabels[key];
              const val = getValue(key);
              const socialIcons: Record<string, string> = {
                instagram_url: "📸",
                facebook_url: "👍",
                twitter_url: "🐦",
              };
              return (
                <div key={key} className={`p-4 rounded-xl border-2 transition-colors ${val ? "border-sea-200 bg-sea-50" : "border-gray-100 bg-gray-50/50"}`}>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <span>{socialIcons[key]}</span>
                    {config.label}
                    {val && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>}
                  </label>
                  <input
                    type={config.type}
                    value={val}
                    onChange={(e) => setValue(key, e.target.value)}
                    placeholder={config.placeholder}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact & Business Info */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">Contact &amp; Business Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.entries(settingLabels)
              .filter(([key]) => !socialKeys.includes(key))
              .map(([key, config]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">{config.label}</label>
                  <input
                    type={config.type}
                    value={getValue(key)}
                    onChange={(e) => setValue(key, e.target.value)}
                    placeholder={config.placeholder}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-sea-500 focus:ring-2 focus:ring-sea-100 outline-none text-sm"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-sea-500 hover:bg-sea-600 disabled:bg-sea-300 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save All Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
