---
title: Why I Built My Website with Astro & Tailwind
description: A deep dive into the architecture decisions behind rishwanth.com
slug: why-astro-tailwind
cover: https://astro.build/assets/press/astro-logo-dark.png
dateFormatted: May 4, 2025
category: Engineering
---

> “Fast, flexible, future-ready.” That’s how I envisioned rishwanth.dev — not just as a portfolio, but as an evolving personal platform. After experimenting with React, Next.js, WordPress, and headless CMS options, I decided to rebuild my entire website with **Astro**, **Tailwind CSS**, and **markdown-based content**.

### Why Astro Over Next.js or React?

I’ve spent years building with full-stack frameworks like Next.js. But for a personal site where performance and simplicity are key, Astro offered what others didn’t:

* **Zero-JS by default**: Astro renders static HTML and ships minimal JavaScript. This dramatically reduces page load time and improves Lighthouse scores out of the box.
* **Partial hydration**: I could use React components *only* where needed, like interactive forms or dynamic carousels.
* **Built for content-first workflows**: Astro supports Markdown and MDX natively. That made it easier to treat writing as code — ideal for developer blogs.

### Why Tailwind?

Tailwind CSS gave me full design control without writing a single custom CSS file. I could:

* Build responsive layouts fast using utility classes
* Keep my design consistent across components
* Apply dark mode support with just a few conditionals

Combined with Astro’s component model, I was able to prototype and iterate the design in real-time.

---

## Developer-Focused Content Architecture

Instead of using a headless CMS like Sanity, Contentful, or Strapi, I chose to manage my writing using `.md` and `.mdx` files.

**Why?**

* 🔒 **No external service dependencies** — everything lives in the repo.
* 🧠 **Better version control** — I can track writing changes in Git.
* ⚡️ **Faster builds & minimal overhead** — Astro compiles Markdown directly.
* ✍️ **Easier authoring** — I write in Markdown using VS Code, with syntax highlighting and local previews.

From a **Solutions Architect** lens, this approach reduces attack surfaces, improves reliability, and lowers ongoing maintenance effort. My site doesn’t rely on third-party APIs or databases — it builds entirely at deploy time.

---

## Projects and Writings as Code

Every project and writing is stored as frontmatter-rich Markdown. That means:

* Projects can be filtered or sorted based on tags, tech stack, or dates
* Blog posts can have custom metadata like cover images, reading time, or series grouping
* I can generate RSS feeds, SEO meta tags, and sitemap entries dynamically

This is far more flexible than CMS systems where you’re tied to their UI and query system. With Astro, I *own* my content pipeline.

---

## Technical Tradeoffs

| Decision                      | Benefit                                        | Tradeoff                                     |
| ----------------------------- | ---------------------------------------------- | -------------------------------------------- |
| Astro (Static Site Generator) | Fast performance, low infra cost, works on CDN | Not suitable for server-side personalization |
| Markdown over CMS             | Developer-friendly, Git-powered editing        | No WYSIWYG UI for non-technical authors      |
| Tailwind CSS                  | Design consistency, responsive utility         | Steep learning curve initially               |
| No DB or dynamic API          | Ultra-reliable, low maintenance                | Requires redeploy for content updates        |

---

## Closing Thoughts

Building this website wasn’t just about showcasing my skills — it was an **exercise in architectural minimalism**. As a Cloud Solutions Architect, I wanted the site to reflect my principles:

* Minimal moving parts
* Performance-first mindset
* Developer-experience without compromise

Astro and Tailwind helped me get there. And every piece of content — from projects to blogs — flows through a pipeline I fully control.

🛠️ Want to build something similar? Check out [Astro](https://astro.build), [Tailwind](https://tailwindcss.com), or my [GitHub](https://github.com/RishwanthPerumandla) for the source code.

---

📬 **Like my work?**  
Let’s collaborate or connect. Whether you're building cloud-native platforms or story-driven experiences — I’m all ears.

**👉 Email me at** [rishwanth.perumandla@hotmail.com](mailto:rishwanth.perumandla@hotmail.com)

---
