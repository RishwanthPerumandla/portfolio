// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://rishwanth.com",
  integrations: [tailwind(), 
    // sitemap(),
     react()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
          protocols: ["http", "https"],
        },
      ],
    ],
  },
});