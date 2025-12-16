// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import db from '@astrojs/db';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(new URL('./src', import.meta.url).pathname),
      },
    },
  },
  adapter: cloudflare({platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    db()
  ],
});