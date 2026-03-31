import { Page } from '@playwright/test';
import { appConfig } from '../../../config/appConfig';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    const baseUrl = appConfig.greenKart.ui.baseUrl;

    if (!baseUrl) {
      throw new Error('GREENKART_UI_BASE_URL is not configured');
    }

    await this.page.goto(baseUrl);
  }

  async isLoaded() {
    return await this.page.locator('.brand').isVisible();
  }

  async searchProduct(keyword: string) {
    await this.page.locator('.search-keyword').fill(keyword);
  }

  async addProductToCart(productName: string) {
    const productCard = this.page.locator('.product', {
      has: this.page.locator('.product-name', { hasText: productName })
    });

    await productCard.locator('button').click();
  }

  async openCart() {
    await this.page.locator('.cart-icon').click();
  }

  async clickProceedToCheckout() {
    await this.page.locator('button', { hasText: 'PROCEED TO CHECKOUT' }).click();
  }
}
