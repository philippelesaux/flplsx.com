import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-body',
      provider: fontProviders.fontsource(),
    },
    {
      name: 'Fraunces',
      cssVariable: '--font-display',
      provider: fontProviders.fontsource(),
    },
  ],
});
