# API Beginner Guide: Add a Portal and Add Test Cases

This guide is for beginners.

Use this when you are new and want to add:
- a new portal for API
- a new API test case

We will keep it simple.

## 1. What is API testing in this framework?

API test checks backend endpoints.

In this framework:
- test file = scenario + assertion
- route file = endpoint paths
- flow file = business steps
- data file = payloads and reusable values
- BaseClient = sends all API requests

## 2. Add a new portal for API (do this first)

Step 1: Create portal folders inside apps

Create this structure:

```text
apps/<portal-name>/
  routes/
  flows/
  data/
```

Step 2: Create API test folder

Create this structure:

```text
tests/api/<portal-name>/
```

Step 3: Add environment value

Add base URL in env files.

At minimum, add it in `.env.example` and your local env file (like `.env.dev`):

```env
MYPORTAL_API_BASE_URL=https://api.your-portal.com
```

Step 4: Add portal config

Open `config/appConfig.ts` and add your portal api config.

Example:

```ts
myPortal: {
  api: {
    baseUrl: process.env.MYPORTAL_API_BASE_URL || ''
  }
}
```

Now your API portal is ready.

## 3. Add one simple API test case

Step 1: Create route file

Create file:

```text
apps/<portal-name>/routes/users.ts
```

Put endpoint paths here.

Example:
- /users
- /users/{id}

Step 2: Create data file

Create file:

```text
apps/<portal-name>/data/users.ts
```

Put reusable payload here.

Example:
- create user payload
- update user payload

Step 3: Create flow file

Create file:

```text
apps/<portal-name>/flows/userFlow.ts
```

Put reusable business sequence here.

Example:
- create user
- get user
- update user
- delete user

Step 4: Create test file

Create file:

```text
tests/api/<portal-name>/users.spec.ts
```

In test file:
- add `@api` tag
- call flow methods
- add assertions

## 4. Very important API rules

Rule 1: Always use BaseClient
- use `api/clients/baseClient.ts` for all requests
- do not call raw fetch/axios directly in tests

Rule 2: Keep endpoint paths in route files
- do not hardcode endpoint paths in tests

Rule 3: Keep test file clean
- test file = scenario + assertions only

Rule 4: Reuse first
- check existing routes, flows, data before creating new files

Rule 5: No hardcoded secrets
- use env variables

## 5. Quick checklist before push

- API portal folders created
- API base URL added in env
- API config added in `config/appConfig.ts`
- Route file created in `apps/<portal-name>/routes/`
- Data file created in `apps/<portal-name>/data/`
- Flow file created in `apps/<portal-name>/flows/`
- Test file created in `tests/api/<portal-name>/`
- Test has `@api` tag
- Test passes locally

## 6. Run your API tests

Run one test file:

```bash
npx playwright test tests/api/<portal-name>/users.spec.ts
```

Run all API tests:

```bash
npm run test:api
```

That is it.
Start with one endpoint, make it pass, then add more.
