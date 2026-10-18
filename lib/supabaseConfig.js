export const DEFAULT_SUPABASE_URL =
  "https://kbwlosppbppefkobfbip.supabase.co";

export const DEFAULT_SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_sgdwF6Z1LYUy_22H3jEwaw_LBV2JHnJ";

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  DEFAULT_SUPABASE_PUBLISHABLE_KEY;
