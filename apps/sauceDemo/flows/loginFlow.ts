import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { getStandardSauceDemoUser } from '../data/credentialResolver';

export class LoginFlow {
  private loginPage: LoginPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async loginAsStandardUser() {
    const user = getStandardSauceDemoUser();

    await this.loginPage.goto();
    await this.loginPage.login(user.username, user.password);
  }
}