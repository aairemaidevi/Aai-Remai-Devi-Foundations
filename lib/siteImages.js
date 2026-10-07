import { SUPABASE_URL } from "@/lib/supabaseConfig";

export function getSiteImageUrl(filePath) {
  const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
  return `${SUPABASE_URL}/storage/v1/object/public/site-images/${encodedPath}`;
}
