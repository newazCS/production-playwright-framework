import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async isLoaded() {
    return await this.page.locator('.products').isVisible();
  }

  async getCheckoutProductNames() {
    const names = await this.page.locator('.product-name').allTextContents();
    return names.map((name) => name.trim());
  }

  async clickPlaceOrder() {
    await this.page.locator('button', { hasText: 'Place Order' }).click();
  }
}
