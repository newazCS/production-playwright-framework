import { BasePage } from './basePage';
import { appConfig } from '../../../config/appConfig';

export class LoginPage extends BasePage {
  private locators = {
    username: '#user-name',
    password: '#password',
    loginBtn: '#login-button',
    inventory: '.inventory_list'
  };

  async goto() {
    await this.navigate(appConfig.sauceDemo.ui.baseUrl);
  }

  async login(username: string, password: string) {
    await this.type(this.locators.username, username);
    await this.type(this.locators.password, password);
    await this.click(this.locators.loginBtn);
  }

  async isLoggedIn() {
    return await this.isVisible(this.locators.inventory);
  }

  async getErrorMessage() {
  return await this.page.locator('[data-test="error"]').textContent();
}
}