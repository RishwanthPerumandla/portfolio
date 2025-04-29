import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap"; // ✅ NEW: Import sitemap

export default defineConfig({
  site: "https://rishwanth.com", // ✅ Required for sitemap generation
  integrations: [
    tailwind(),
    sitemap(), // ✅ Enable sitemap
  ],
});
