import { BasePage } from './basePage';

export class CartPage extends BasePage {
  async clickCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async isProductVisible(productName: string) {
    return await this.page.locator('.inventory_item_name', { hasText: productName }).isVisible();
  }
}