import { test, expect } from '@playwright/test';
import { HomePage } from '../../../apps/automationExercise/pages/homePage';
import * as allure from 'allure-js-commons';

test.describe('UI - Automation Exercise', { tag: '@ui' }, () => {

  test('Home page loads', async ({ page }) => {
    allure.feature('UI');
    allure.story('Automation Exercise Home');

    const home = new HomePage(page);

    await home.goto();

    expect(await home.isLoaded()).toBeTruthy();
  });

});