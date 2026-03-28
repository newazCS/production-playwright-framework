import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../../apps/sauceDemo/pages/loginPage';
import { sauceDemoNegativeUsers } from '../../../apps/sauceDemo/data/usersNegative';
import { step } from '../../../utils/allureUtils';

test.describe('UI - SauceDemo Locked Out User', { tag: '@ui' }, () => {
  test('Locked out user cannot login', async ({ page }) => {
    allure.feature('UI');
    allure.story('SauceDemo - Locked Out User');

    const loginPage = new LoginPage(page);

    await step('Open SauceDemo login page', async () => {
      await loginPage.goto();
    });

    await step('Login as locked out user', async () => {
      await loginPage.login(
        sauceDemoNegativeUsers.lockedOut.username,
        sauceDemoNegativeUsers.lockedOut.password
      );
    });

    await step('Verify locked out error message is displayed', async () => {
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain('Sorry, this user has been locked out');
    });
  });
});