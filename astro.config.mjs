import { defineConfig } from 'astro/config';
import { createProxyMiddleware } from 'http-proxy-middleware'

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
});