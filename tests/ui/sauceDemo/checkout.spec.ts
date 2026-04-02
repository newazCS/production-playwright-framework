import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { LoginFlow } from '../../../apps/sauceDemo/flows/loginFlow';
import { InventoryPage } from '../../../apps/sauceDemo/pages/inventoryPage';
import { CartPage } from '../../../apps/sauceDemo/pages/cartPage';
import { CheckoutInformationPage } from '../../../apps/sauceDemo/pages/checkoutInformationPage';
import { CheckoutOverviewPage } from '../../../apps/sauceDemo/pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '../../../apps/sauceDemo/pages/checkoutCompletePage';
import { sauceDemoProducts } from '../../../apps/sauceDemo/data/products';
import { sauceDemoCheckoutData } from '../../../apps/sauceDemo/data/checkout';
import { step } from '../../../utils/allureUtils';

test.describe('UI - SauceDemo Checkout', { tag: '@ui' }, () => {
  test('User can complete checkout with one product', async ({ page }) => {
    allure.feature('UI');
    allure.story('SauceDemo - Checkout');

    const loginFlow = new LoginFlow(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginFlow.loginAsStandardUser();

    await step('Add Sauce Labs Backpack to cart', async () => {
      await inventoryPage.addProductToCart(sauceDemoProducts.backpack);
    });

    await step('Open shopping cart', async () => {
      await inventoryPage.openCart();
    });

    await step('Verify selected product is visible in cart', async () => {
      expect(await cartPage.isProductVisible(sauceDemoProducts.backpack)).toBeTruthy();
    });

    await step('Proceed to checkout', async () => {
      await cartPage.clickCheckout();
    });

    await step('Fill checkout information', async () => {
      await checkoutInformationPage.fillCheckoutInformation(
        sauceDemoCheckoutData.firstName,
        sauceDemoCheckoutData.lastName,
        sauceDemoCheckoutData.postalCode
      );
    });

    await step('Continue to checkout overview', async () => {
      await checkoutInformationPage.clickContinue();
    });

    await step('Finish checkout', async () => {
      await checkoutOverviewPage.clickFinish();
    });

    await step('Verify order completion message is displayed', async () => {
      const completeHeader = await checkoutCompletePage.getCompleteHeader();
      expect(completeHeader).toContain('Thank you for your order');
    });
  });
});