import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { getPagePerformanceMetrics } from '../../../utils/performanceUtils';
import { appConfig } from '../../../config/appConfig';

test.describe('Performance - SauceDemo', { tag: '@perf' }, () => {
  test('Login page performance is under threshold', async ({ page }) => {
    allure.feature('Performance');
    allure.story('SauceDemo Login Page');

    await page.goto(appConfig.sauceDemo.ui.baseUrl);

    const metrics = await getPagePerformanceMetrics(page);

    expect(metrics.loadTime).toBeLessThan(
      appConfig.sauceDemo.performance.threshold
    );

    await allure.attachment(
      'SauceDemo Performance Metrics',
      JSON.stringify(metrics, null, 2),
      'application/json'
    );
  });
});