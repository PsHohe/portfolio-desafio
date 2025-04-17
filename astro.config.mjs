// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
// Import YAML plugin
// Note: You need to install @rollup/plugin-yaml first:
// pnpm add @rollup/plugin-yaml --save-dev
import yaml from "@rollup/plugin-yaml";

// https://astro.build/config
export default defineConfig({
    integrations: [react()],
    vite: {
        plugins: [tailwindcss(), yaml()],
    },
});
