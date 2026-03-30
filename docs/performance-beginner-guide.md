# Performance Beginner Guide: Add a Portal and Add Test Cases

This guide is for beginners.

Use this when you are new and want to add:
- a new portal for performance tests
- a new performance test case

We will keep it simple.

## 1. What is performance testing here?

Performance test checks page load time and important metrics.

In this framework:
- test file = scenario + assertions
- page and flow = setup steps (login, open page)
- utils/performanceUtils.ts = shared metric helpers
- config/env = threshold values

## 2. Add a new portal for performance (do this first)

Step 1: Create portal performance folder in apps

Create this structure:

```text
apps/<portal-name>/performance/
```

Step 2: Create performance test folder

Create this structure:

```text
tests/performance/<portal-name>/
```

Step 3: Add threshold values in env

At minimum, add in `.env.example` and your local env file (like `.env.dev`):

```env
MYPORTAL_HOME_PERF_THRESHOLD=4000
MYPORTAL_DASHBOARD_PERF_THRESHOLD=5000
```

Step 4: Add thresholds in config

Open `config/appConfig.ts` and register threshold values.

Example:

```ts
myPortal: {
  performance: {
    homeThreshold: Number(process.env.MYPORTAL_HOME_PERF_THRESHOLD || 4000),
    dashboardThreshold: Number(process.env.MYPORTAL_DASHBOARD_PERF_THRESHOLD || 5000)
  }
}
```

Now your performance portal is ready.

## 3. Add one simple performance test case

Step 1: Create performance spec file

Create file:

```text
tests/performance/<portal-name>/home.perf.spec.ts
```

Step 2: Reuse setup from flow/page

If login or setup is needed:
- reuse page files in `apps/<portal-name>/pages/`
- reuse flow files in `apps/<portal-name>/flows/`

Step 3: Use performance utility

Use shared helper from `utils/performanceUtils.ts` to collect metrics.

Step 4: Write test

In test file:
- add `@perf` tag
- open target page
- collect metrics
- compare metric values with threshold from config
- attach metrics to Allure report

## 4. Very important performance rules

Rule 1: Do not hardcode thresholds
- read from env/config

Rule 2: Measure meaningful pages only
- login page, inventory page, cart page, checkout page

Rule 3: Reuse flows for setup
- do not repeat long setup in every test

Rule 4: Keep test stable
- avoid random and time-dependent logic

Rule 5: Keep test readable
- write clear business steps

## 5. Quick checklist before push

- Performance folder created in `tests/performance/<portal-name>/`
- Thresholds added in env
- Threshold config added in `config/appConfig.ts`
- Reused existing page/flow setup
- Used `utils/performanceUtils.ts`
- Test has `@perf` tag
- Metrics attached to report
- Test passes locally

## 6. Run your performance tests

Run one test file:

```bash
npx playwright test tests/performance/<portal-name>/home.perf.spec.ts
```

Run all performance tests:

```bash
npm run test:perf
```

That is it.
Start with one page performance test, make it pass, then add more pages.
