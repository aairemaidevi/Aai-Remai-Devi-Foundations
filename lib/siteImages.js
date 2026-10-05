const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const DEFAULT_SUPABASE_URL = "https://yurxhxxizunhzqipschx.supabase.co";

export function getSiteImageUrl(filePath) {
  const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
  return `${supabaseUrl || DEFAULT_SUPABASE_URL}/storage/v1/object/public/site-images/${encodedPath}`;
}
