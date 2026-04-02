import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { getPagePerformanceMetrics } from '../../../utils/performanceUtils';
import { appConfig } from '../../../config/appConfig';

test.describe('Performance - Automation Exercise', { tag: '@perf' }, () => {
  test('Home page performance is under threshold', async ({ page }) => {
    allure.feature('Performance');
    allure.story('Automation Exercise Home Page');

    await page.goto(appConfig.automationExercise.ui.baseUrl);

    const metrics = await getPagePerformanceMetrics(page);

    expect(metrics.loadTime).toBeLessThan(
      appConfig.automationExercise.performance.threshold
    );

    await allure.attachment(
      'Automation Exercise Performance Metrics',
      JSON.stringify(metrics, null, 2),
      'application/json'
    );
  });
});