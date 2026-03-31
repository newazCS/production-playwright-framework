import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InventoryPage } from '../../../../apps/sauceDemo/pages/inventoryPage';
import { CartPage } from '../../../../apps/sauceDemo/pages/cartPage';
import { step } from '../../../../utils/allureUtils';

// ====================
// ADD TO CART STEPS
// ====================

// Step: Click add to cart button for a product
When('the user clicks add to cart for {string}', async function(productName: string) {
  const inventoryPage = new InventoryPage(this.page);
  await step(`Click add to cart for: ${productName}`, async () => {
    await inventoryPage.addProductToCart(productName);
  });
});

// Step: Verify cart badge count
Then('the cart badge should show {string}', async function(expectedCount: string) {
  const inventoryPage = new InventoryPage(this.page);
  await step(`Verify cart badge shows: ${expectedCount}`, async () => {
    if (expectedCount === '0') {
      await expect(this.page.locator('.shopping_cart_badge')).toHaveCount(0);
      return;
    }

    const count = await inventoryPage.getCartBadgeCount();
    expect(count).toBe(expectedCount);
  });
});

// Step: Remove product from cart
When('the user removes {string} from cart', async function(productName: string) {
  const inventoryPage = new InventoryPage(this.page);
  await step(`Remove ${productName} from cart`, async () => {
    const removeButton = this.page.locator(
      '.inventory_item',
      {
        has: this.page.locator('.inventory_item_name', { hasText: productName })
      }
    ).locator('button');
    
    await removeButton.click();
  });
});

// Step: Click on shopping cart icon
When('the user clicks on the shopping cart icon', async function() {
  const inventoryPage = new InventoryPage(this.page);
  await step('Click on shopping cart icon', async () => {
    await inventoryPage.openCart();
  });
});

// Step: Verify cart page is displayed
Then('the cart page should be displayed', async function() {
  await step('Verify cart page is displayed', async () => {
    const url = this.page.url();
    expect(url).toContain('cart');
  });
});

// Step: Verify product is visible in cart
Then('{string} should be visible in the cart', async function(productName: string) {
  const cartPage = new CartPage(this.page);
  await step(`Verify ${productName} is visible in cart`, async () => {
    const isVisible = await cartPage.isProductVisible(productName);
    expect(isVisible).toBeTruthy();
  });
});
