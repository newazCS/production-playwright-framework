import { test, expect } from '@playwright/test';
import { LoginFlow } from '../../../apps/sauceDemo/flows/loginFlow';
import { LoginPage } from '../../../apps/sauceDemo/pages/loginPage';
import { step } from '../../../utils/allureUtils';
import * as allure from 'allure-js-commons';

test.describe('UI - SauceDemo Login', { tag: '@ui' }, () => {
  test('User can login', async ({ page }) => {
    allure.feature('UI');
    allure.story('SauceDemo Login');

    const flow = new LoginFlow(page);
    const loginPage = new LoginPage(page);

    await flow.loginAsStandardUser();

    await step('Verify user lands on inventory page', async () => {
      expect(await loginPage.isLoggedIn()).toBeTruthy();
    });
  });
});