import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginFlow } from '../../../apps/sauceDemo/flows/loginFlow';
import { InventoryPage } from '../../../apps/sauceDemo/pages/inventoryPage';
import { sauceDemoProducts } from '../../../apps/sauceDemo/data/products';
import { getPagePerformanceMetrics } from '../../../utils/performanceUtils';
import { appConfig } from '../../../config/appConfig';
import { step, attachJson } from '../../../utils/allureUtils';

test.describe('Performance - SauceDemo Cart', { tag: '@perf' }, () => {
  test('TC3: Cart page performance after adding product', async ({ page }) => {
    allure.feature('Performance');
    allure.story('SauceDemo - Cart Page');

    const loginFlow = new LoginFlow(page);
    const inventoryPage = new InventoryPage(page);

    await step('Login as standard user', async () => {
      await loginFlow.loginAsStandardUser();
    });

    await step('Add Sauce Labs Backpack to cart', async () => {
      await inventoryPage.addProductToCart(sauceDemoProducts.backpack);
    });

    await step('Open cart page', async () => {
      await inventoryPage.openCart();
    });

    const metrics = await step('Collect cart page performance metrics', async () => {
      return await getPagePerformanceMetrics(page);
    });

    await attachJson('Cart Page Performance Metrics', metrics);

    await step(
      `Verify cart page load time is below ${appConfig.sauceDemo.performance.cartThreshold} ms`,
      async () => {
        expect(metrics.loadTime).toBeLessThan(
          appConfig.sauceDemo.performance.cartThreshold
        );
      }
    );
  });
});