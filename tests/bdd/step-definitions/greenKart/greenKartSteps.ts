import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PurchaseFlow } from '../../../../apps/greenKart/flows/purchaseFlow';
import { step } from '../../../../utils/allureUtils';

function getProductsFromTable(table: DataTable): string[] {
  const rows = table.hashes();
  return rows.map((row) => row.product);
}

Given('the user opens the GreenKart portal', async function() {
  const purchaseFlow = new PurchaseFlow(this.page);

  await purchaseFlow.openPortal();

  await step('Verify GreenKart home page is loaded', async () => {
    expect(await purchaseFlow.isHomePageLoaded()).toBeTruthy();
  });
});

When('the user searches products with keyword {string}', async function(keyword: string) {
  const purchaseFlow = new PurchaseFlow(this.page);
  await purchaseFlow.searchProduct(keyword);
});

When('the user adds the following products to cart:', async function(table: DataTable) {
  const purchaseFlow = new PurchaseFlow(this.page);
  const products = getProductsFromTable(table);
  await purchaseFlow.addProductsToCart(products);
});

When('the user opens cart and proceeds to checkout', async function() {
  const purchaseFlow = new PurchaseFlow(this.page);
  await purchaseFlow.proceedToCheckout();
});

Then('the checkout page should be displayed for GreenKart', async function() {
  const purchaseFlow = new PurchaseFlow(this.page);

  await step('Verify GreenKart checkout page is visible', async () => {
    expect(await purchaseFlow.isCheckoutPageLoaded()).toBeTruthy();
  });
});

Then('the checkout should contain the following products:', async function(table: DataTable) {
  const purchaseFlow = new PurchaseFlow(this.page);
  const expectedProducts = getProductsFromTable(table);

  await step('Verify selected products exist in checkout', async () => {
    const checkoutProducts = await purchaseFlow.getCheckoutProductNames();

    for (const expectedProduct of expectedProducts) {
      const isPresent = checkoutProducts.some((name) => name.includes(expectedProduct));
      expect(isPresent).toBeTruthy();
    }
  });
});

When('the user places order with country {string}', async function(country: string) {
  const purchaseFlow = new PurchaseFlow(this.page);
  await purchaseFlow.placeOrder(country);
});

Then('the GreenKart order success message should contain {string}', async function(expectedText: string) {
  const purchaseFlow = new PurchaseFlow(this.page);

  await step(`Verify order confirmation message contains: ${expectedText}`, async () => {
    const message = await purchaseFlow.getOrderSuccessMessage();
    expect(message).toContain(expectedText);
  });
});
