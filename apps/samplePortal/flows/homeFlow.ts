import { Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { step } from '../../../utils/allureUtils';

export class HomeFlow {
  private homePage: HomePage;

  constructor(page: Page) {
    this.homePage = new HomePage(page);
  }

  async openHomePage() {
    await step('Open SamplePortal home page', async () => {
      await this.homePage.goto();
    });
  }
}
