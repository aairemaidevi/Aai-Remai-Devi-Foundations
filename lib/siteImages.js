const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function getSiteImageUrl(filePath) {
  if (!supabaseUrl) {
    return `/${filePath.split("/").pop()}`;
  }

  const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
  return `${supabaseUrl}/storage/v1/object/public/site-images/${encodedPath}`;
}
