import { test, expect } from '@playwright/test';
import { BaseClient } from '../../../api/clients/baseClient';
import { reqresRoutes } from '../../../apps/reqres/routes/users';
import { appConfig } from '../../../config/appConfig';
import { reqresUserData } from '../../../apps/reqres/data/users';
import { allure } from 'allure-playwright';

test.describe('API - ReqRes Users', { tag: '@api' }, () => {
  test('GET users list', async ({ request }) => {
    allure.feature('API');
    allure.story('ReqRes - Users');

    const client = new BaseClient(request);

    const response = await client.get(
      `${appConfig.reqres.api.baseUrl}${reqresRoutes.users}?page=${reqresUserData.validPage}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );

    expect([200, 403]).toContain(response.status());

    if (response.status() === 403) {
      test.skip(true, 'ReqRes public endpoint returned 403.');
    }

    const body = await response.json();
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  });
});