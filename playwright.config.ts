import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'https://parabank.parasoft.com',
    trace: 'on-first-retry',
  },
});
