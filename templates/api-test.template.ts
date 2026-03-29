import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { step, attachJson } from '../utils/allureUtils';

test.describe('API - <Service Name>', { tag: '@api' }, () => {
  test('TC#: <Scenario name>', async ({ request }) => {
    allure.feature('API');
    allure.story('<Service> - <Scenario>');

    await step('<API action>', async () => {
      // call flow/client
    });

    await step('<Validation>', async () => {
      // expect(...)
    });
  });
});