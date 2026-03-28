import { BasePage } from './basePage';

export class CheckoutOverviewPage extends BasePage {
  async clickFinish() {
    await this.click('[data-test="finish"]');
  }
}