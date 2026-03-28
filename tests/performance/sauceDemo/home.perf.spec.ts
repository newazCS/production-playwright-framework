import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { getPagePerformanceMetrics } from '../../../utils/performanceUtils';
import { appConfig } from '../../../config/appConfig';
import { step, attachJson } from '../../../utils/allureUtils';

test.describe('Performance - SauceDemo', { tag: '@perf' }, () => {
  test('Login page performance is under threshold', async ({ page }) => {
    allure.feature('Performance');
    allure.story('SauceDemo Login Page');

    await step('Open SauceDemo login page', async () => {
      await page.goto(appConfig.sauceDemo.ui.baseUrl);
    });

    const metrics = await step('Collect page performance metrics', async () => {
      return await getPagePerformanceMetrics(page);
    });

    await attachJson('Performance Metrics', metrics);

    await step(
      `Verify load time is below ${appConfig.sauceDemo.performance.threshold} ms`,
      async () => {
        expect(metrics.loadTime).toBeLessThan(
          appConfig.sauceDemo.performance.threshold
        );
      }
    );
  });
});