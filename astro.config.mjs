// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://rishwanth.com", // Removed trailing space
  integrations: [
    tailwind(), 
    sitemap({
      // Filter out undefined or invalid pages that cause the reduce() error
      filter: (page) => {
        if (!page || typeof page !== 'string') return false;
        // Also filter out any Netlify internal paths or query strings that might slip in
        return !page.includes('?') && !page.includes('#');
      },
      // Ensure we handle edge cases in page generation
      serialize: (item) => {
        // Ensure all required properties exist
        if (!item.url) return null;
        return {
          url: item.url,
          lastmod: item.lastmod,
          changefreq: item.changefreq,
          priority: item.priority,
        };
      },
    }), 
    react()
  ],
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