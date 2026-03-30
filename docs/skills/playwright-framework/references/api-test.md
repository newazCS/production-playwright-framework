# API Test Patterns

## File Location
`tests/api/<portal>/<feature>.spec.ts`

## Simple Request Template (No Flow)

```typescript
import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BaseClient } from '../../../api/clients/baseClient';
import { postsRoutes } from '../../../apps/jsonplaceholder/routes/posts';
import { appConfig } from '../../../config/appConfig';
import { step, attachJson } from '../../../utils/allureUtils';

test.describe('API - JSONPlaceholder Posts', { tag: '@api' }, () => {
  test('TC01: Fetch all posts returns 200 with data', async ({ request }) => {
    allure.feature('API');
    allure.story('JSONPlaceholder - Posts');

    const client = new BaseClient(request);

    const response = await step('Send GET request to /posts', async () => {
      return await client.get(
        `${appConfig.jsonplaceholder.api.baseUrl}${postsRoutes.posts}`
      );
    });

    await step('Verify response status is 200', async () => {
      expect(response.status()).toBe(200);
    });

    const body = await step('Read response body', async () => {
      return await response.json();
    });

    await attachJson('Posts Response', body);

    await step('Verify response contains posts array', async () => {
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
    });
  });
});
```

## Multi-Step Flow Template

```typescript
import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { UserFlow } from '../../../apps/reqres/flows/userFlow';
import { step, attachJson } from '../../../utils/allureUtils';

test.describe('API - Reqres User Lifecycle', { tag: '@api' }, () => {
  test('TC01: Create, update, and delete a user', async ({ request }) => {
    allure.feature('API');
    allure.story('Reqres - User Lifecycle');

    const userFlow = new UserFlow(request);

    await step('Authenticate and obtain token', async () => {
      await userFlow.login();
    });

    const createResponse = await step('Create new user', async () => {
      return await userFlow.createUser('Jane Doe');
    });

    await step('Verify user was created with status 201', async () => {
      expect(createResponse.status()).toBe(201);
    });

    const createBody = await createResponse.json();
    await attachJson('Created User', createBody);

    const updateResponse = await step('Update the user', async () => {
      return await userFlow.updateUser('Jane Doe');
    });

    await step('Verify update returns 200', async () => {
      expect(updateResponse.status()).toBe(200);
    });

    await step('Delete the user', async () => {
      const deleteResponse = await userFlow.deleteUser();
      expect(deleteResponse.status()).toBe(204);
    });
  });
});
```

## Rules

| Rule | Correct | Incorrect |
|---|---|---|
| HTTP calls | `new BaseClient(request)` | `request.get(...)` directly |
| Endpoints | `appConfig.portal.api.baseUrl + routes.endpoint` | Hardcoded URL string |
| Credentials | `process.env.KEY` via config/flow | Hardcoded in test |
| Responses | Attached with `attachJson()` | Not attached |
| Multi-step API | Use flow class | Inline in test |
| Tags | `{ tag: '@api' }` | Missing |

## Attaching Data

```typescript
// Attach a JSON object to Allure report
await attachJson('Label', objectToAttach);

// BaseClient auto-attaches request + response bodies
// No manual attachment needed for request/response pairs
```

## Headers Pattern

```typescript
// Pass custom headers in the options object
const response = await client.post(
  url,
  { key: 'value' },                            // body
  { headers: { Authorization: `Bearer ${token}` } }  // options
);
```
