import { test, expect } from '../../../fixtures/ui/sauceDemoAuth.fixture';
import * as allure from 'allure-js-commons';

test.describe('UI - SauceDemo Login With Fixture', { tag: '@ui' }, () => {
  test('User is already logged in via fixture', async ({ loggedInSauceDemoPage }) => {
    allure.feature('UI');
    allure.story('SauceDemo Login Fixture');

    expect(await loggedInSauceDemoPage.isLoggedIn()).toBeTruthy();
  });
});