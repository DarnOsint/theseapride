import { createClient } from "@supabase/supabase-js";
import { menuData as hardcodedMenu, getWhatsAppUrl, formatPrice } from "@/lib/menu-data";
export { getWhatsAppUrl, formatPrice };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";

export interface MenuItem {
  id: number;
  category_id: number;
  name: string;
  price: number;
  description: string;
  includes: string[];
  serves: string;
  image: string;
  sort_order: number;
}

interface RawCategory {
  id: number;
  name: string;
  icon: string;
  note: string;
  image: string;
  sort_order: number;
  menu_items: RawItem[];
}

interface RawItem {
  id: number;
  category_id: number;
  name: string;
  price: number;
  description: string;
  includes: string[];
  serves: string;
  image: string;
  sort_order: number;
}

export interface MenuCategory {
  id: number;
  name: string;
  icon: string;
  note: string;
  image: string;
  sort_order: number;
  items: MenuItem[];
}

let cachedMenu: MenuCategory[] | null = null;
const CACHE_DURATION = 30000;
let lastFetch = 0;

export async function getMenuData(): Promise<MenuCategory[]> {
  const now = Date.now();
  if (cachedMenu && now - lastFetch < CACHE_DURATION) return cachedMenu;

  const isValidUrl = supabaseUrl.startsWith("https://");
  if (!isValidUrl || !supabaseAnonKey) return toCategories(hardcodedMenu);

  try {
    const sb = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await sb
      .from("menu_categories")
      .select("*, menu_items(*)")
      .order("sort_order", { ascending: true })
      .order("id", { ascending: true });

    if (error || !data || data.length === 0) {
      return toCategories(hardcodedMenu);
    }

    const raw = data as unknown as RawCategory[];
    const mapped: MenuCategory[] = raw.map((cat) => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      note: cat.note || "",
      image: cat.image || "",
      sort_order: cat.sort_order,
      items: (cat.menu_items || []).map((item) => ({
        id: item.id,
        category_id: item.category_id,
        name: item.name,
        price: item.price,
        description: item.description || "",
        includes: toArray(item.includes),
        serves: item.serves || "",
        image: item.image || "",
        sort_order: item.sort_order,
      })),
    }));

    cachedMenu = mapped;
    lastFetch = now;
    return cachedMenu;
  } catch {
    return toCategories(hardcodedMenu);
  }
}

function toArray(val: unknown): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return val.split(",").map(s => s.trim()).filter(Boolean); }
  }
  return [];
}

function toCategories(hardcoded: typeof hardcodedMenu): MenuCategory[] {
  let catId = 1;
  return hardcoded.map((cat) => {
    const c: MenuCategory = {
      id: catId,
      name: cat.name,
      icon: cat.icon,
      note: cat.note || "",
      image: cat.image || "",
      sort_order: catId,
      items: cat.items.map((item, idx) => ({
        id: catId * 1000 + idx + 1,
        category_id: catId,
        name: item.name,
        price: item.price,
        description: item.description || "",
        includes: toArray(item.includes),
        serves: item.serves || "",
        image: item.image || "",
        sort_order: idx,
      })),
    };
    catId++;
    return c;
  });
}
