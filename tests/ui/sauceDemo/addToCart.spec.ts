import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginFlow } from '../../../apps/sauceDemo/flows/loginFlow';
import { InventoryPage } from '../../../apps/sauceDemo/pages/inventoryPage';
import { sauceDemoProducts } from '../../../apps/sauceDemo/data/products';
import { step } from '../../../utils/allureUtils';

test.describe('UI - SauceDemo Add To Cart', { tag: '@ui' }, () => {
  test('User can add backpack to cart', async ({ page }) => {
    allure.feature('UI');
    allure.story('SauceDemo - Add To Cart');

    const loginFlow = new LoginFlow(page);
    const inventoryPage = new InventoryPage(page);

    await loginFlow.loginAsStandardUser();

    await step('Verify inventory page is loaded', async () => {
      expect(await inventoryPage.isLoaded()).toBeTruthy();
    });

    await step('Add Sauce Labs Backpack to cart', async () => {
      await inventoryPage.addProductToCart(sauceDemoProducts.backpack);
    });

    await step('Verify cart badge count is 1', async () => {
      expect(await inventoryPage.getCartBadgeCount()).toBe('1');
    });
  });
});