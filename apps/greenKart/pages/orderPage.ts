import { Page } from '@playwright/test';

export class OrderPage {
  constructor(private page: Page) {}

  async selectCountry(country: string) {
    await this.page.locator('select').selectOption({ label: country });
  }

  async agreeToTerms() {
    await this.page.locator('.chkAgree').check();
  }

  async clickProceed() {
    await this.page.locator('button', { hasText: 'Proceed' }).click();
  }

  async getSuccessMessage() {
    const text = await this.page.locator('.wrapperTwo').textContent();
    return (text || '').trim();
  }
}
