// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Static output — deploy for free on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.
// No server needed: all pages are pre-rendered, cart runs in localStorage.
export default defineConfig({
	site: "https://example.com",
	output: "static",
	integrations: [mdx(), sitemap()],
});
