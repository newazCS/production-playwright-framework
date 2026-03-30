# UI Test Patterns

## File Location
`tests/ui/<portal>/<feature>.spec.ts`

## Full Template

```typescript
import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { LoginFlow } from '../../../apps/<portal>/flows/loginFlow';
import { InventoryPage } from '../../../apps/<portal>/pages/inventoryPage';
import { sauceDemoProducts } from '../../../apps/<portal>/data/products';
import { step } from '../../../utils/allureUtils';

test.describe('UI - <Portal> <Feature>', { tag: '@ui' }, () => {
  test('TC01: <Business scenario description>', async ({ page }) => {
    allure.feature('UI');
    allure.story('<Portal> - <Feature>');

    const loginFlow = new LoginFlow(page);
    const inventoryPage = new InventoryPage(page);

    await step('Open <Portal> and login as standard user', async () => {
      await loginFlow.loginAsStandardUser();
    });

    await step('Add product to cart', async () => {
      await inventoryPage.addProductToCart(sauceDemoProducts.backpack);
    });

    await step('Verify cart badge shows 1 item', async () => {
      const badge = await inventoryPage.getCartBadgeCount();
      expect(badge).toBe('1');
    });
  });
});
```

## Rules

| Rule | Correct | Incorrect |
|---|---|---|
| Selectors | In page class only | `page.locator('#btn')` in test |
| URLs | Via `appConfig` in page/flow | `page.goto('https://...')` in test |
| Credentials | Via credential resolver | `'standard_user'` in test |
| Steps | Wrapped in `step()` | Raw `await page.click()` in test |
| Assertions | In `step()` blocks | Outside step wrappers |
| Tags | `{ tag: '@ui' }` on describe | Missing or wrong tag |

## Allure Step Naming

Good:
- `Open SauceDemo login page`
- `Login as standard user`
- `Add Sauce Labs Backpack to cart`
- `Verify cart badge shows 1 item`

Bad:
- `click button`
- `fill input`
- `expect true`
- `step 1`

## Using Fixtures

For auth-dependent tests, use the fixture in `fixtures/ui/sauceDemoAuth.fixture.ts`:

```typescript
import { test, expect } from '../../../fixtures/ui/sauceDemoAuth.fixture';

test('TC01: Add item to cart when already logged in', async ({ loggedInPage }) => {
  // loggedInPage is already authenticated
});
```

## Multi-test Describe Block

```typescript
test.describe('UI - SauceDemo Checkout', { tag: '@ui' }, () => {
  test.beforeEach(async ({ page }) => {
    const loginFlow = new LoginFlow(page);
    await loginFlow.loginAsStandardUser();
  });

  test('TC01: Complete checkout with valid details', async ({ page }) => { ... });
  test('TC02: Verify order confirmation page', async ({ page }) => { ... });
});
```
