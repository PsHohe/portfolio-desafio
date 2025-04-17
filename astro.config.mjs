// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import yaml from "@rollup/plugin-yaml";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  vite: {
    // @ts-ignore
    plugins: [tailwindcss(), yaml()],
  },
  site: "https://portfolio.pssandrinoescobar.cl",
  prefetch: true,
  adapter: netlify(),
  output: "static",
  experimental: {
    session: true,
  },
});
