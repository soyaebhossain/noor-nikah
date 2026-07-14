// Supabase client scaffold.
// Install with: npm install @supabase/supabase-js
// Configure environment variables in .env: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export function ensureSupabase() {
  if (!supabase) throw new Error("Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env and install @supabase/supabase-js");
  return supabase;
}
