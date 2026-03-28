/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'jsdom',
    include: ['src/scripts/**/*.test.ts'],
    passWithNoTests: true,
  },
});
