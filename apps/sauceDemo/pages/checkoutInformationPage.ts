import { BasePage } from './basePage';

export class CheckoutInformationPage extends BasePage {
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.type('[data-test="firstName"]', firstName);
    await this.type('[data-test="lastName"]', lastName);
    await this.type('[data-test="postalCode"]', postalCode);
  }

  async clickContinue() {
    await this.click('[data-test="continue"]');
  }
}