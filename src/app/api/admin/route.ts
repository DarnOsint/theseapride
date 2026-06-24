import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";

function getSb() {
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}

export async function GET(req: NextRequest) {
  const sb = getSb();
  const action = req.nextUrl.searchParams.get("action");

  if (action === "get_settings") {
    const { data } = await sb.from("site_settings").select("*").order("id");
    return NextResponse.json(data || []);
  }

  const { data } = await sb.from("menu_categories")
    .select("*, menu_items(*)")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });

  const mapped = (data || []).map((cat: any) => ({
    ...cat,
    items: cat.menu_items || [],
  }));

  return NextResponse.json(mapped);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sb = getSb();
  const { action, ...data } = body;

  try {
    if (action === "upsert_category") {
      if (data.id) {
        const { id, ...rest } = data;
        await sb.from("menu_categories").update(rest).eq("id", id);
      } else {
        const { count } = await sb.from("menu_categories").select("*", { count: "exact", head: true });
        await sb.from("menu_categories").insert({ ...data, sort_order: count || 0 });
      }
      return NextResponse.json({ success: true });
    }

    if (action === "delete_category") {
      await sb.from("menu_categories").delete().eq("id", data.id);
      return NextResponse.json({ success: true });
    }

    if (action === "upsert_item") {
      if (data.id) {
        const { id, ...rest } = data;
        await sb.from("menu_items").update(rest).eq("id", id);
      } else {
        const { count } = await sb.from("menu_items")
          .select("*", { count: "exact", head: true })
          .eq("category_id", data.category_id);
        await sb.from("menu_items").insert({ ...data, sort_order: count || 0 });
      }
      return NextResponse.json({ success: true });
    }

    if (action === "delete_item") {
      await sb.from("menu_items").delete().eq("id", data.id);
      return NextResponse.json({ success: true });
    }

    if (action === "save_settings") {
      for (const setting of data.settings) {
        await sb.from("site_settings").upsert(
          { key: setting.key, value: setting.value },
          { onConflict: "key" }
        );
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
