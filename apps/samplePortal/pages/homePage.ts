import { BasePage } from '../../sauceDemo/pages/basePage';
import { appConfig } from '../../../config/appConfig';

export class HomePage extends BasePage {
  async goto() {
    await this.navigate(appConfig.samplePortal.ui.baseUrl);
  }

  async isLoaded() {
    return await this.isVisible('body');
  }

  async getPageTitle() {
    return await this.page.title();
  }
}
