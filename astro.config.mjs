// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import react from "@astrojs/react"; // This line must be here
export default defineConfig({
  site: "https://rishwanth.com",
  integrations: [tailwind(), react()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
          // only affect real external links; leaves internal/relative/mailto intact
          protocols: ["http", "https"],
        },
      ],
    ],
  },
});
