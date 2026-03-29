import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { step } from '../utils/allureUtils';

test.describe('UI - <Portal Name>', { tag: '@ui' }, () => {
  test('TC#: <Scenario name>', async ({ page }) => {
    allure.feature('UI');
    allure.story('<Portal> - <Scenario>');

    await step('<Business step 1>', async () => {
      // action
    });

    await step('<Business validation>', async () => {
      // expect(...)
    });
  });
});