import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { getPagePerformanceMetrics } from '../../../utils/performanceUtils';
import { appConfig } from '../../../config/appConfig';
import { step, attachJson } from '../../../utils/allureUtils';

test.describe('Performance - SauceDemo Login', { tag: '@perf' }, () => {
  test('TC1: Login page performance', async ({ page }) => {
    allure.feature('Performance');
    allure.story('SauceDemo - Login Page');

    await step('Open SauceDemo login page', async () => {
      await page.goto(appConfig.sauceDemo.ui.baseUrl);
    });

    const metrics = await step('Collect login page performance metrics', async () => {
      return await getPagePerformanceMetrics(page);
    });

    await attachJson('Login Page Performance Metrics', metrics);

    await step(
      `Verify login page load time is below ${appConfig.sauceDemo.performance.loginThreshold} ms`,
      async () => {
        expect(metrics.loadTime).toBeLessThan(
          appConfig.sauceDemo.performance.loginThreshold
        );
      }
    );
  });
});