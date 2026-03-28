import { test, expect } from '@playwright/test';
import { BaseClient } from '../../../api/clients/baseClient';
import { postsRoutes } from '../../../apps/jsonplaceholder/routes/posts';
import { appConfig } from '../../../config/appConfig';
import { allure } from 'allure-playwright';
import { step, attachJson } from '../../../utils/allureUtils';

test.describe('API - JSONPlaceholder Posts', { tag: '@api' }, () => {
  test('GET posts list', async ({ request }) => {
    allure.feature('API');
    allure.story('JSONPlaceholder - Posts');

    const client = new BaseClient(request);

    const response = await step(
      'Send GET request to JSONPlaceholder posts endpoint',
      async () => {
        return await client.get(
          `${appConfig.jsonplaceholder.api.baseUrl}${postsRoutes.posts}`
        );
      }
    );

    await step('Verify response status is 200', async () => {
      expect(response.status()).toBe(200);
    });

    const body = await step('Read response body', async () => {
      return await response.json();
    });

    await attachJson('Posts Response', body);

    await step('Verify posts list is returned', async () => {
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);
    });
  });
});