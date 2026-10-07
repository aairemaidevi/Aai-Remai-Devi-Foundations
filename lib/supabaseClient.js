import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const missingSupabaseVariables = [
  !supabaseUrl && "NEXT_PUBLIC_SUPABASE_URL",
  !supabaseAnonKey && "NEXT_PUBLIC_SUPABASE_ANON_KEY",
].filter(Boolean);

export const supabaseConfigError = missingSupabaseVariables.length
  ? `Supabase is not configured for this deployment. In Vercel, open Project → Settings → Environment Variables and add ${missingSupabaseVariables.join(" and ")} for Production (and Preview if needed), then redeploy. For local development, put these values in .env.local. Use the Supabase publishable/anon key, never the service-role key.`
  : null;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
