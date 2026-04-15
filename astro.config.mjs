// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// Hybrid mode: static pages stay static, API routes are server-rendered.
// Free hosting: Cloudflare Workers free tier (100k req/day).
// Database: Cloudflare D1 (free SQLite at the edge).
//
// One-time setup (after first deploy):
//   npx wrangler d1 create colheita-pilot
//   # copy the database_id into wrangler.json
//   npx wrangler d1 execute colheita-pilot --remote --file=schema.sql
export default defineConfig({
	site: "https://example.com",
	output: "server",
	adapter: cloudflare({ platformProxy: { enabled: true } }),
	integrations: [mdx(), sitemap()],
});
