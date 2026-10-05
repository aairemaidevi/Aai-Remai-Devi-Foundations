import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envFile = await readFile(path.join(projectRoot, ".env.local"), "utf8");
const env = Object.fromEntries(
  envFile
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const separator = line.indexOf("=");
      return separator < 0
        ? [line, ""]
        : [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    }),
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local before uploading.",
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const publicDirectory = path.join(projectRoot, "public");
const contentTypes = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const files = (await readdir(publicDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && contentTypes[path.extname(entry.name).toLowerCase()])
  .map((entry) => entry.name);

if (files.length === 0) {
  throw new Error("No supported image files were found in the public folder.");
}

for (const fileName of files) {
  const filePath = path.join(publicDirectory, fileName);
  const { error } = await supabase.storage
    .from("site-images")
    .upload(fileName, await readFile(filePath), {
      contentType: contentTypes[path.extname(fileName).toLowerCase()],
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new Error(`Could not upload ${fileName}: ${error.message}`);
  }

  console.log(`Uploaded ${fileName}`);
}

console.log(`Uploaded ${files.length} image(s) to the site-images bucket.`);
