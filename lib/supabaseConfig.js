export const DEFAULT_SUPABASE_URL =
  "https://yurxhxxizunhzqipschx.supabase.co";

export const DEFAULT_SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_eLx1X1gaYOs-kNJPPFOmpw_DUMewn_x";

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  DEFAULT_SUPABASE_PUBLISHABLE_KEY;
