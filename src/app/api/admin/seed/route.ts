import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { menuData } from "@/lib/menu-data";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";

function getSb() {
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}

export async function POST() {
  const sb = getSb();

  const { count: existing } = await sb.from("menu_categories").select("*", { count: "exact", head: true });
  if (existing && existing > 0) {
    return NextResponse.json({ message: "Menu data already exists. Delete all categories first to reseed." });
  }

  let catIndex = 0;
  for (const cat of menuData) {
    const { data: catData, error: catError } = await sb.from("menu_categories").insert({
      name: cat.name,
      icon: cat.icon,
      note: cat.note || "",
      image: cat.image || "",
      sort_order: catIndex,
    }).select("id").single();

    if (catError || !catData) {
      console.error("Failed to insert category:", cat.name, catError);
      continue;
    }

    let itemIndex = 0;
    for (const item of cat.items) {
      const { error: itemError } = await sb.from("menu_items").insert({
        category_id: catData.id,
        name: item.name,
        price: item.price,
        description: item.description || "",
        includes: item.includes || [],
        serves: item.serves || "",
        image: item.image || "",
        sort_order: itemIndex,
      });

      if (itemError) {
        console.error("Failed to insert item:", item.name, itemError);
      }
      itemIndex++;
    }
    catIndex++;
  }

  return NextResponse.json({ success: true, message: `Seeded ${menuData.length} categories with all items.` });
}
