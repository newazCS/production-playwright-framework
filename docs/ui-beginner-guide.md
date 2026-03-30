# UI Beginner Guide: Add a Portal and Add Test Cases

This guide is for beginners.

Use this when you are new and want to add:
- a new portal
- a new UI test case

We will keep it simple.

## 1. What is a portal?

A portal is one website or app area you test.

Example portal names:
- sauceDemo
- automationExercise
- myNewPortal

## 2. Add a new portal (do this first)

Step 1: Create folders inside apps

Create this structure:

```text
apps/<portal-name>/
  pages/
  flows/
  data/
  routes/
  performance/
```

Step 2: Create test folders

Create this structure:

```text
tests/ui/<portal-name>/
tests/api/<portal-name>/
tests/performance/<portal-name>/
```

Step 3: Add environment value

Add your portal base URL in env files.

At minimum, add it in `.env.example` and your local env file (like `.env.dev`):

```env
MYPORTAL_UI_BASE_URL=https://your-portal-url.com
```

Step 4: Add portal config

Open `config/appConfig.ts` and add your portal section.

Example:

```ts
myPortal: {
  ui: {
    baseUrl: process.env.MYPORTAL_UI_BASE_URL || ''
  }
}
```

Now your portal is ready.

## 3. Add one simple UI test case

Step 1: Create a test file

Create file:

```text
tests/ui/<portal-name>/home.spec.ts
```

Step 2: Create page file

Create file:

```text
apps/<portal-name>/pages/homePage.ts
```

Put selectors and button/input actions here.

Step 3: Create flow file

Create file:

```text
apps/<portal-name>/flows/homeFlow.ts
```

Put business steps here.

Example business steps:
- open home page
- login user
- add item to cart

Step 4: Create data file (if needed)

Create file:

```text
apps/<portal-name>/data/site.ts
```

Put reusable values here.

Example values:
- expected title
- product names
- reusable text

Step 5: Write test in simple style

In test file, do this:
- add `@ui` tag
- call your flow
- add assertions
- use clear step names

Good step names:
- Open login page
- Login as standard user
- Verify home page is visible

## 4. Very important rules

Rule 1: Do not put selectors in test files
- selectors go in page files

Rule 2: Do not hardcode credentials
- use env variables

Rule 3: Keep test file clean
- test file = scenario + assertion

Rule 4: Reuse first
- check if page/flow/data already exists before creating new one

## 5. Quick checklist before push

- Portal folders created
- Config added in `config/appConfig.ts`
- Base URL added in env
- Test file in `tests/ui/<portal-name>/`
- Page file in `apps/<portal-name>/pages/`
- Flow file in `apps/<portal-name>/flows/`
- Data file in `apps/<portal-name>/data/` (if needed)
- Test has `@ui` tag
- Test passes locally

## 6. Run your UI test

Run one test file:

```bash
npx playwright test tests/ui/<portal-name>/home.spec.ts
```

Run all UI tests:

```bash
npm run test:ui
```

That is it.
Start with one small test, make it pass, then add more tests.
