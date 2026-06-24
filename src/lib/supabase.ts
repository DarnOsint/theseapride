import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";

const isValidUrl = supabaseUrl.startsWith("https://") || supabaseUrl.startsWith("http://");

export const supabase = supabaseUrl && supabaseAnonKey && isValidUrl
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
