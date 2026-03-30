# Performance Test Patterns

## File Location
`tests/performance/<portal>/<page>.perf.spec.ts`

## Full Template

```typescript
import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { getPagePerformanceMetrics } from '../../../utils/performanceUtils';
import { appConfig } from '../../../config/appConfig';
import { step, attachJson } from '../../../utils/allureUtils';

test.describe('Performance - SauceDemo Home', { tag: '@perf' }, () => {
  test('TC01: Home page loads within threshold', async ({ page }) => {
    allure.feature('Performance');
    allure.story('SauceDemo - Home');

    await step('Open SauceDemo home page', async () => {
      await page.goto(appConfig.sauceDemo.ui.baseUrl);
    });

    const metrics = await step('Collect home page performance metrics', async () => {
      return await getPagePerformanceMetrics(page);
    });

    await attachJson('Home Page Performance Metrics', metrics);

    await step(
      `Verify page load time is below ${appConfig.sauceDemo.performance.homeThreshold} ms`,
      async () => {
        expect(metrics.loadTime).toBeLessThan(
          appConfig.sauceDemo.performance.homeThreshold
        );
      }
    );
  });
});
```

## With Flow Setup (Authenticated Page)

```typescript
import { LoginFlow } from '../../../apps/sauceDemo/flows/loginFlow';

test('TC01: Inventory page loads within threshold after login', async ({ page }) => {
  allure.feature('Performance');
  allure.story('SauceDemo - Inventory');

  const loginFlow = new LoginFlow(page);

  await step('Login as standard user', async () => {
    await loginFlow.loginAsStandardUser();
  });

  const metrics = await step('Collect inventory page performance metrics', async () => {
    return await getPagePerformanceMetrics(page);
  });

  await attachJson('Inventory Performance Metrics', metrics);

  await step(
    `Verify inventory load time is below ${appConfig.sauceDemo.performance.inventoryThreshold} ms`,
    async () => {
      expect(metrics.loadTime).toBeLessThan(
        appConfig.sauceDemo.performance.inventoryThreshold
      );
    }
  );
});
```

## Metrics Object Reference

`getPagePerformanceMetrics(page)` returns:

```typescript
{
  loadTime: number,          // Total page load time (ms)
  domContentLoaded: number,  // DOM content loaded time (ms)
  firstPaint: number,        // First paint time (ms)
  firstContentfulPaint: number  // First contentful paint (ms)
}
```

## Adding a New Threshold

1. Add to `.env`:
   ```
   <PORTAL>_<PAGE>_PERF_THRESHOLD=3000
   ```

2. Add to `config/appConfig.ts` under the portal's `performance` block:
   ```typescript
   performance: {
     <page>Threshold: Number(process.env.<PORTAL>_<PAGE>_PERF_THRESHOLD || 3000)
   }
   ```

3. Reference in test:
   ```typescript
   appConfig.<portal>.performance.<page>Threshold
   ```

## Rules

| Rule | Correct | Incorrect |
|---|---|---|
| Thresholds | From `appConfig` | `expect(ms).toBeLessThan(3000)` |
| Step name | Include threshold value | Vague step name |
| Metrics | Attached with `attachJson()` | Not attached |
| Tags | `{ tag: '@perf' }` | Missing |
| Filename | `<page>.perf.spec.ts` | `<page>.spec.ts` |
