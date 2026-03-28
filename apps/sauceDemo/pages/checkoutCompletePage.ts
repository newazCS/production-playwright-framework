import { BasePage } from './basePage';

export class CheckoutCompletePage extends BasePage {
  async getCompleteHeader() {
    return await this.page.locator('.complete-header').textContent();
  }
}