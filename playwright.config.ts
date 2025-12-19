import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

const env = process.env.ENV || 'local';

dotenv.config({
  path: path.resolve(__dirname, `env/.${env}`)
});

export default defineConfig({
  testDir: './tests',

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL,

    screenshot: 'only-on-failure',
    headless: false,
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },
});
