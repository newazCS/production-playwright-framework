import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { getStandardSauceDemoUser } from '../data/credentialResolver';
import { step } from '../../../utils/allureUtils';

export class LoginFlow {
  private loginPage: LoginPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async loginAsStandardUser() {
    const user = getStandardSauceDemoUser();

    await step('Open SauceDemo login page', async () => {
      await this.loginPage.goto();
    });

    await step('Login as standard user', async () => {
      await this.loginPage.login(user.username, user.password);
    });
  }
}