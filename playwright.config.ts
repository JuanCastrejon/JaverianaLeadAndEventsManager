import { defineConfig } from '@playwright/test';

const isCI = Boolean(process.env.CI);
const baseURL = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:4173';
const hasExternalBaseUrl = Boolean(process.env.E2E_BASE_URL);

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  expect: {
    timeout: 7000,
  },
  use: {
    baseURL,
    actionTimeout: 10000,
    navigationTimeout: 15000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: hasExternalBaseUrl
    ? undefined
    : {
      command: isCI
        ? 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173'
        : 'npm run dev -- --host 127.0.0.1 --port 4173',
      url: 'http://127.0.0.1:4173',
      reuseExistingServer: !isCI,
      timeout: 120000,
    },
  projects: [
    {
      name: 'chromium',
      use: { viewport: { width: 1440, height: 1200 } },
    },
  ],
});