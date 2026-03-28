import { test, expect } from '@playwright/test';
import { BaseClient } from '../../../api/clients/baseClient';
import { postsRoutes } from '../../../apps/jsonplaceholder/routes/posts';
import { appConfig } from '../../../config/appConfig';
import { allure } from 'allure-playwright';

test.describe('API - JSONPlaceholder Posts', { tag: '@api' }, () => {
  test('GET posts list', async ({ request }) => {
    allure.feature('API');
    allure.story('JSONPlaceholder - Posts');

    const client = new BaseClient(request);

    const response = await client.get(
      `${appConfig.jsonplaceholder.api.baseUrl}${postsRoutes.posts}`
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
  });
});