import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { UserFlow } from '../../../apps/reqres/flows/userFlow';
import { step, attachJson } from '../../../utils/allureUtils';

test.describe('API - ReqRes User Flow', { tag: '@api' }, () => {
  test('TC1: Create User', async ({ request }) => {
    allure.feature('API');
    allure.story('ReqRes - Create User');

    const flow = new UserFlow(request);

    await step('Login and get token', async () => {
      await flow.login();
    });

    const response = await step('Create a new user', async () => {
      return await flow.createUser('Newaz');
    });

    await step('Verify create user response status is 201', async () => {
      expect(response.status()).toBe(201);
    });

    const body = await step('Read create user response body', async () => {
      return await response.json();
    });

    await attachJson('Create User Response', body);

    await step('Verify created user response contains id and name', async () => {
      expect(body.id).toBeDefined();
      expect(body.name).toBe('Newaz');
    });
  });

  test('TC2: Get Users', async ({ request }) => {
    allure.feature('API');
    allure.story('ReqRes - Get Users');

    const flow = new UserFlow(request);

    const response = await step('Get users list', async () => {
      return await flow.getUsers();
    });

    await step('Verify get users response status is 200', async () => {
      expect(response.status()).toBe(200);
    });

    const body = await step('Read get users response body', async () => {
      return await response.json();
    });

    await attachJson('Get Users Response', body);

    await step('Verify users list is returned', async () => {
      expect(body.data).toBeDefined();
      expect(Array.isArray(body.data)).toBeTruthy();
      expect(body.data.length).toBeGreaterThan(0);
    });
  });

  test('TC3: Update User', async ({ request }) => {
    allure.feature('API');
    allure.story('ReqRes - Update User');

    const flow = new UserFlow(request);

    await step('Login and get token', async () => {
      await flow.login();
    });

    await step('Create user as setup for update', async () => {
      const createResponse = await flow.createUser('Newaz');
      expect(createResponse.status()).toBe(201);
    });

    const response = await step('Update created user', async () => {
      return await flow.updateUser('Newaz');
    });

    await step('Verify update user response status is 200', async () => {
      expect(response.status()).toBe(200);
    });

    const body = await step('Read update user response body', async () => {
      return await response.json();
    });

    await attachJson('Update User Response', body);

    await step('Verify updated user response contains updated job', async () => {
      expect(body.job).toBe('Senior QA');
      expect(body.name).toContain('Updated');
    });
  });

  test('TC4: Delete User', async ({ request }) => {
    allure.feature('API');
    allure.story('ReqRes - Delete User');

    const flow = new UserFlow(request);

    await step('Login and get token', async () => {
      await flow.login();
    });

    await step('Create user as setup for delete', async () => {
      const createResponse = await flow.createUser('Newaz');
      expect(createResponse.status()).toBe(201);
    });

    const response = await step('Delete created user', async () => {
      return await flow.deleteUser();
    });

    await step('Verify delete user response status is 204', async () => {
      expect(response.status()).toBe(204);
    });
  });
});