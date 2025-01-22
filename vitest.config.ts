import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Indien je globale testfuncties wilt gebruiken zoals 'describe', 'it', etc.
    environment: 'node', // Als je de tests in een Node.js omgeving draait
    include: ['src/**/*.test.ts'], // Zorg ervoor dat je testbestanden de juiste extensie hebben
  },
});
