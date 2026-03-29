import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginFlow } from '../../../apps/sauceDemo/flows/loginFlow';
import { getPagePerformanceMetrics } from '../../../utils/performanceUtils';
import { appConfig } from '../../../config/appConfig';
import { step, attachJson } from '../../../utils/allureUtils';

test.describe('Performance - SauceDemo Inventory', { tag: '@perf' }, () => {
  test('TC2: Inventory page performance after login', async ({ page }) => {
    allure.feature('Performance');
    allure.story('SauceDemo - Inventory Page');

    const loginFlow = new LoginFlow(page);

    await step('Login as standard user', async () => {
      await loginFlow.loginAsStandardUser();
    });

    const metrics = await step('Collect inventory page performance metrics', async () => {
      return await getPagePerformanceMetrics(page);
    });

    await attachJson('Inventory Page Performance Metrics', metrics);

    await step(
      `Verify inventory page load time is below ${appConfig.sauceDemo.performance.inventoryThreshold} ms`,
      async () => {
        expect(metrics.loadTime).toBeLessThan(
          appConfig.sauceDemo.performance.inventoryThreshold
        );
      }
    );
  });
});