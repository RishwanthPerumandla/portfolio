// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  site: "https://rishwanth.com",
  integrations: [tailwind(), sitemap()],
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
