# BDD Guide: Add a New Portal + Build End-to-End Test Cases

This guide explains how to add BDD support for a brand-new portal.

It is written for both:
- Non-technical users (who write `.feature` files)
- Developers (who script step definitions)

---

## 1. Quick Mental Model

BDD in this framework follows this flow:

```text
Feature File (.feature)
  -> Step Definitions (.ts)
    -> Flows / Pages (existing architecture)
      -> Playwright browser execution
```

Rule:
- Non-technical users write the story in `.feature`
- Developers map each step to code in step definitions
- Step definitions must call existing flows/pages (no duplicated UI logic)

---

## 2. Folder Structure for a New Portal

Create these folders:

```text
tests/bdd/features/<portal-name>/
apps/<portal-name>/pages/
apps/<portal-name>/flows/
apps/<portal-name>/data/
tests/ui/<portal-name>/                (optional but recommended for hybrid)
```

Example portal name: `shopPortal`

Then your BDD feature location becomes:

```text
tests/bdd/features/shopPortal/
```

---

## 3. Environment and Config Setup

Add portal base URL in env files (for local + CI):

```env
SHOPPORTAL_UI_BASE_URL=https://your-portal-url.com
```

Add portal config in `config/appConfig.ts`:

```ts
shopPortal: {
  ui: {
    baseUrl: process.env.SHOPPORTAL_UI_BASE_URL || ''
  }
}
```

Important:
- No hardcoded URLs inside steps or tests
- Keep env values in `.env.*` and CI secrets only

---

## 4. Non-Technical Track: Write Feature Files

Create file:

```text
tests/bdd/features/shopPortal/login.feature
```

Example:

```gherkin
Feature: ShopPortal Login
  As a customer
  I want to log in
  So that I can access my account

  Background:
    Given the user is on the ShopPortal login page

  Scenario: User can login with valid credentials
    When the user enters username "valid_user"
    And the user enters password "valid_password"
    And the user clicks the login button
    Then the account dashboard should be displayed

  Scenario: User gets error with invalid password
    When the user enters username "valid_user"
    And the user enters password "wrong_password"
    And the user clicks the login button
    Then an error message should appear with text "Invalid username or password"
```

Feature writing rules:
- 1 scenario = 1 business behavior
- Use plain English, not technical wording
- Keep steps short and clear
- Prefer reusable step patterns

---

## 5. Developer Track: Build Scripting Layer (Step Definitions)

Create file:

```text
tests/bdd/step-definitions/shopPortalLoginSteps.ts
```

Use this pattern:

```ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { step } from '../../../utils/allureUtils';
import { ShopPortalLoginFlow } from '../../../apps/shopPortal/flows/shopPortalLoginFlow';
import { ShopPortalLoginPage } from '../../../apps/shopPortal/pages/shopPortalLoginPage';

Given('the user is on the ShopPortal login page', async function() {
  const page = new ShopPortalLoginPage(this.page);

  await step('Open ShopPortal login page', async () => {
    await page.goto();
  });
});

When('the user enters username {string}', async function(username: string) {
  await step(`Enter username: ${username}`, async () => {
    await this.page.locator('[data-test="username"]').fill(username);
  });
});

When('the user enters password {string}', async function(password: string) {
  await step('Enter password', async () => {
    await this.page.locator('[data-test="password"]').fill(password);
  });
});

When('the user clicks the login button', async function() {
  await step('Click login button', async () => {
    await this.page.locator('[data-test="login-button"]').click();
  });
});

Then('the account dashboard should be displayed', async function() {
  await step('Verify dashboard is displayed', async () => {
    await expect(this.page.locator('[data-test="dashboard"]')).toBeVisible();
  });
});

Then('an error message should appear with text {string}', async function(expectedText: string) {
  await step(`Verify error message: ${expectedText}`, async () => {
    await expect(this.page.locator('[data-test="error"]')).toContainText(expectedText);
  });
});
```

Developer scripting rules:
- Reuse flows/pages from `apps/<portal>/`
- Keep selectors in page classes when possible
- Wrap actions with `step()` for Allure readability
- Use `{string}` and `{int}` parameters for reusable steps

---

## 6. Build Reusable Portal Flows/Pages

Create page object example:

```text
apps/shopPortal/pages/shopPortalLoginPage.ts
```

Create flow example:

```text
apps/shopPortal/flows/shopPortalLoginFlow.ts
```

Recommended split:
- Page = selectors + small UI actions
- Flow = business sequence (login, checkout, search)
- Step definitions = map Gherkin text to flows/pages

---

## 7. Add End-to-End BDD Scenarios (Suggested Order)

For every new portal, implement E2E in this order:

1. Login flow
2. Core business flow (search/add-to-cart/create-order/etc.)
3. Happy path checkout/submit
4. One key validation error path
5. Logout/session end path

This gives fast confidence with minimal initial effort.

---

## 8. Run Commands

Run all BDD tests:

```bash
npm run bdd
```

Run only one portal feature folder:

```bash
npm run bdd -- tests/bdd/features/shopPortal/
```

Run one feature file only:

```bash
npm run bdd -- tests/bdd/features/shopPortal/login.feature
```

---

## 9. CI/CD Notes for Developers

In CI pipeline:
- Ensure env vars for portal URLs are provided
- Keep test data deterministic
- Avoid unstable waits and time-based logic

Suggested CI command:

```bash
npm run bdd
```

If you want portal-specific CI jobs:

```bash
npm run bdd -- tests/bdd/features/shopPortal/
```

---

## 10. Definition of Done Checklist

New portal BDD setup is complete when:

- [ ] Portal URL configured in env + app config
- [ ] Feature folder created under `tests/bdd/features/<portal>/`
- [ ] At least 1 E2E feature file added
- [ ] Matching step definition file added
- [ ] Steps mapped to flows/pages (no duplicated business logic)
- [ ] Test runs locally with `npm run bdd -- tests/bdd/features/<portal>/`
- [ ] Scenarios are readable to non-technical stakeholders

---

## 11. Common Mistakes to Avoid

1. Writing technical language in `.feature` files
2. Putting selectors directly into business-level Gherkin text
3. Duplicating login/business logic in multiple step files
4. Hardcoding portal URLs or secrets
5. Mixing API/performance logic into UI BDD scenarios

---

## 12. Starter Template Workflow

Use these existing templates:

- `templates/bdd-feature.template.feature`
- `templates/bdd-steps.template.ts`

Simple workflow:

1. Copy feature template into `tests/bdd/features/<portal>/`
2. Copy steps template into `tests/bdd/step-definitions/`
3. Rename files for your scenario
4. Replace placeholders
5. Run and iterate

---

## Final Note

Yes, this BDD approach is portal-agnostic.

SauceDemo is only an example implementation.

---

## 13. Full Working Example Added: GreenKart Portal

This repository now includes a complete end-to-end BDD example for:

`https://rahulshettyacademy.com/seleniumPractise/#/`

Created files:

- `apps/greenKart/data/store.ts`
- `apps/greenKart/pages/homePage.ts`
- `apps/greenKart/pages/checkoutPage.ts`
- `apps/greenKart/pages/orderPage.ts`
- `apps/greenKart/flows/purchaseFlow.ts`
- `tests/bdd/features/greenKart/e2ePurchase.feature`
- `tests/bdd/step-definitions/greenKartSteps.ts`

GreenKart scenarios included:

1. Full purchase flow with two products (Cucumber + Carrot)
2. Full purchase flow with one product (Beetroot)

Run only GreenKart BDD tests:

```bash
npm run bdd:greenKart
```

If your local env does not include `GREENKART_UI_BASE_URL`, run with inline env:

```bash
GREENKART_UI_BASE_URL="https://rahulshettyacademy.com/seleniumPractise/#/" npm run bdd:greenKart
```

For any new UI portal, repeat the same pattern:

- Feature files for business-readable behavior
- Step definitions for scripting
- Reuse your portal-specific pages and flows
