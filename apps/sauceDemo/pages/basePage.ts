import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string = '/') {
    await this.page.goto(path);
  }

  async click(selector: string) {
    await this.page.locator(selector).click();
  }

  async type(selector: string, text: string) {
    await this.page.locator(selector).fill(text);
  }

  async isVisible(selector: string) {
    return await this.page.locator(selector).isVisible();
  }
}