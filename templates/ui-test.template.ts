import { test, expect } from '@playwright/test';
import { feature, story } from 'allure-js-commons';
import { step } from '../utils/allureUtils';

test.describe('UI - <Portal Name>', { tag: '@ui' }, () => {
  test('TC#: <Scenario name>', async ({ page }) => {
    await feature('UI');
    await story('<Portal> - <Scenario>');

    await step('<Business step 1>', async () => {
      // action
    });

    await step('<Business validation>', async () => {
      // expect(...)
    });
  });
});