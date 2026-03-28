import { test as base } from '@playwright/test';
import { LoginFlow } from '../../apps/sauceDemo/flows/loginFlow';
import { LoginPage } from '../../apps/sauceDemo/pages/loginPage';

type SauceDemoFixtures = {
  loggedInSauceDemoPage: LoginPage;
};

export const test = base.extend<SauceDemoFixtures>({
  loggedInSauceDemoPage: async ({ page }, use) => {
    const loginFlow = new LoginFlow(page);
    const loginPage = new LoginPage(page);

    await loginFlow.loginAsStandardUser();

    await use(loginPage);
  }
});

export { expect } from '@playwright/test';