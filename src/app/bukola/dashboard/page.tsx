import { isAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Waves, Utensils, Settings, Calendar } from "lucide-react";

export default async function DashboardPage() {
  if (!(await isAuthenticated())) redirect("/bukola/login");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";
  const sb = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  const [{ count: categories }, { count: menuItems }, { count: reservations }, { count: settings }] =
    await Promise.all([
      sb.from("menu_categories").select("*", { count: "exact", head: true }),
      sb.from("menu_items").select("*", { count: "exact", head: true }),
      sb.from("reservations").select("*", { count: "exact", head: true }),
      sb.from("site_settings").select("*", { count: "exact", head: true }),
    ]);

  const stats = [
    { label: "Menu Categories", value: categories || 0, icon: "📂", color: "bg-blue-500" },
    { label: "Menu Items", value: menuItems || 0, icon: "🍽️", color: "bg-sea-500" },
    { label: "Reservations", value: reservations || 0, icon: "📅", color: "bg-green-500" },
    { label: "Site Settings", value: settings || 0, icon: "⚙️", color: "bg-purple-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Overview of your website</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Waves className="w-5 h-5 text-sea-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="/bukola/menu" className="block p-4 bg-sea-50 rounded-xl border border-sea-100 hover:bg-sea-100 transition-colors">
            <p className="font-semibold text-sea-700">Manage Menu</p>
            <p className="text-sm text-sea-500 mt-1">Add or edit categories &amp; items</p>
          </a>
          <a href="/bukola/settings" className="block p-4 bg-purple-50 rounded-xl border border-purple-100 hover:bg-purple-100 transition-colors">
            <p className="font-semibold text-purple-700">Site Settings</p>
            <p className="text-sm text-purple-500 mt-1">Social links, contact info</p>
          </a>
          <a href="/" target="_blank" className="block p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 transition-colors">
            <p className="font-semibold text-green-700">View Site</p>
            <p className="text-sm text-green-500 mt-1">Open the public website</p>
          </a>
        </div>
      </div>
    </div>
  );
}
