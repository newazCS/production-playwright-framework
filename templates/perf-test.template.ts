import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { step, attachJson } from '../utils/allureUtils';

test.describe('Performance - <Portal Name>', { tag: '@perf' }, () => {
  test('TC#: <Scenario name>', async ({ page }) => {
    allure.feature('Performance');
    allure.story('<Portal> - <Page>');

    await step('<Open page>', async () => {
      // page.goto(...)
    });

    const metrics = await step('<Collect metrics>', async () => {
      // return metrics
    });

    await attachJson('<Metrics name>', metrics);

    await step('<Threshold validation>', async () => {
      // expect(metrics.loadTime).toBeLessThan(...)
    });
  });
});