import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const missingSupabaseVariables = [
  !supabaseUrl && "NEXT_PUBLIC_SUPABASE_URL",
  !supabaseAnonKey && "NEXT_PUBLIC_SUPABASE_ANON_KEY",
].filter(Boolean);

export const supabaseConfigError = missingSupabaseVariables.length
  ? `Supabase is not configured for this deployment. Add ${missingSupabaseVariables.join(" and ")} to the Vercel project’s Environment Variables, then redeploy.`
  : null;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
