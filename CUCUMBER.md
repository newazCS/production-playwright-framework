# CUCUMBER.md

> This file governs all BDD Cucumber test creation and maintenance in this repository.
> Follow every rule in this document at all times.

---

## Purpose

BDD Cucumber tests provide **business-readable** test scenarios while maintaining strict architecture alignment with the existing **Playwright framework**.

**Goals:**
- Non-technical stakeholders can **read and understand** tests
- Tests remain **maintainable** and **reusable**
- Cucumber **complements** (not replaces) existing TypeScript tests
- Consistent BDD patterns across all portals

---

## Core Principle

**Cucumber is the PRESENTATION layer. Flows/Pages are the EXECUTION layer.**

Gherkin steps in .feature files map to code that **calls existing flows and pages**.

```
Feature File (Gherkin)
        ↓
Step Definitions (TypeScript)
        ↓
Flows / Pages / Data (Existing Code)
```

---

## When to Use BDD Cucumber

### ✅ Use Cucumber For:
- **UI Regression Tests** (login, add to cart, checkout)
- **UI Smoke Tests** (happy path scenarios)
- **API Happy-Path Flows** (create user, get data, update)
- **Tests requiring business stakeholder review**
- **Non-technical team documentation**

### ❌ Do NOT Use Cucumber For:
- **Performance Tests** (Gherkin doesn't fit metrics/thresholds)
- **Complex Negative Scenarios** (too many edge cases)
- **Technical Deep Dives** (API error handling, retry logic)
- **Setup/Teardown Logic** (use TypeScript tests instead)

---

## Directory Structure

```
tests/bdd/
  features/
    sauceDemo/
      login.feature
      addToCart.feature
      checkout.feature
    jsonplaceholder/
      posts.feature
    [portal]/
      scenario.feature
  step-definitions/
    loginSteps.ts
    addToCartSteps.ts
    checkoutSteps.ts
    hooks.ts
```

**Rule:** Each portal gets its own feature folder and step definitions.

---

## Feature File Rules

### File Naming
- Names describe **business behavior**, not technical actions
- Format: `[scenario].feature` (e.g., `login.feature`, `addToCart.feature`)
- All lowercase with no spaces

**Good Names:**
- `login.feature`
- `addToCart.feature`
- `checkout.feature`
- `userCreation.feature`

**Bad Names:**
- `test.feature` (too generic)
- `API_validation.feature` (too technical)
- `negative_testing.feature` (too vague)

### Feature Header
```gherkin
Feature: User Login on SauceDemo
  As a customer
  I want to log in to the website
  So that I can access my account
```

**Rules:**
- Clear feature title (what are we testing?)
- "As a" = user role
- "I want to" = user action
- "So that" = user benefit

### Scenario Rules

#### ✅ Good Scenario
```gherkin
Scenario: User can login with valid credentials
  Given the user is on the SauceDemo login page
  When the user enters username "standard_user"
  And the user enters password "secret_sauce"
  And the user clicks the login button
  Then the inventory page should be displayed
  And the page title should contain "Products"
```

**Characteristics:**
- Tests **one thing clearly**
- 5-8 steps (not too long)
- Uses **plain English**
- No technical jargon
- Step names are **business-readable**

#### ❌ Bad Scenario
```gherkin
Scenario: Login flow with error validation and state management
  When user executes POST /api/auth with credentials
  And system validates JWT response
  And session cache is populated
  Then response.status should equal 200
```

**Problems:**
- Too technical
- Tests too many things
- Uses API language in UI test
- Contains implementation details

### Step Rules

#### ✅ Good Steps

| Pattern | Good Example |
|---------|--------------|
| **Given (Setup)** | `Given the user is on the SauceDemo login page` |
| **When (Action)** | `When the user enters username "standard_user"` |
| **And (Add action)** | `And the user clicks the login button` |
| **Then (Verify)** | `Then the inventory page should be displayed` |

#### ❌ Bad Steps

| Pattern | Bad Example |
|---------|-------------|
| **Too technical** | `Given #user-name selector contains value "user"` |
| **Too vague** | `When something happens` |
| **Multiple actions** | `When the user logs in and adds items and checks out` |
| **Implementation** | `When the API returns 201 status` |

### Step Parameter Rules

Use `{string}` and `{int}` for dynamic values:

```gherkin
When the user enters username {string}
When the user enters password {string}
When the cart badge should show {string}

Step Definition:
When('the user enters username {string}', async function(username) {
  // Use the username variable
});
```

---

## Step Definition Rules

### File Organization

```
tests/bdd/step-definitions/
  hooks.ts                  ← Browser setup/teardown
  loginSteps.ts             ← Login scenario steps
  addToCartSteps.ts         ← Add to cart steps
  checkoutSteps.ts          ← Checkout steps
```

**Rule:** One step file per feature file (or group of related features).

### Must Reuse Existing Code

Step definitions **MUST** call existing flows/pages. Never duplicate logic.

```typescript
// ✅ GOOD: Calls LoginFlow (existing code)
import { LoginFlow } from '../../../apps/sauceDemo/flows/loginFlow';

When('the user is logged in as {string}', async function(username: string) {
  const loginFlow = new LoginFlow(this.page);
  await loginFlow.loginAsStandardUser();
});
```

```typescript
// ❌ BAD: Duplicates login logic
When('the user is logged in', async function() {
  await this.page.locator('#user-name').fill('standard_user');
  await this.page.locator('#password').fill('secret_sauce');
  await this.page.locator('#login-button').click();
  // ^ This is duplicated from LoginFlow
});
```

### Step Definition Pattern

```typescript
import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { step } from '../../../utils/allureUtils'; // For Allure reporting

// Given steps (setup)
Given('the user is on the login page', async function() {
  const loginPage = new LoginPage(this.page);
  await step('Navigate to login page', async () => {
    await loginPage.goto();
  });
});

// When steps (actions)
When('the user enters username {string}', async function(username: string) {
  await step(`Enter username: ${username}`, async () => {
    await this.page.locator('#user-name').fill(username);
  });
});

// Then steps (assertions)
Then('the inventory page should be displayed', async function() {
  await step('Verify inventory page is displayed', async () => {
    const isLoaded = await this.page.locator('.inventory_list').isVisible();
    expect(isLoaded).toBeTruthy();
  });
});
```

### Use Allure Reporting

Wrap step logic with `step()` helper for Allure reporting:

```typescript
import { step } from '../../../utils/allureUtils';

When('the user clicks login button', async function() {
  await step('Click login button', async () => {
    await this.page.locator('#login-button').click();
  });
});
```

---

## Hooks Rules

File: `tests/bdd/step-definitions/hooks.ts`

**Rules:**
- Initialize browser **before all tests** (BeforeAll)
- Create new page/context **before each scenario** (Before)
- Close page **after each scenario** (After)
- Close browser **after all tests** (AfterAll)

```typescript
import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

let browser: Browser;

BeforeAll(async function() {
  browser = await chromium.launch();
});

Before(async function(scenario) {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  this.page = page;
  this.context = context;
});

After(async function() {
  await this.context.close();
});

AfterAll(async function() {
  await browser.close();
});
```

---

## Running BDD Tests

```bash
# Run all BDD tests
npm run bdd

# Run tests for specific portal
npm run bdd:sauceDemo

# Run specific feature file
npm run bdd -- tests/bdd/features/sauceDemo/login.feature
```

---

## Naming Conventions

| Artifact | Convention | Example |
|----------|-----------|---------|
| Feature File | `[feature].feature` | `login.feature` |
| Feature Name | Pascal Case | `User Login on SauceDemo` |
| Scenario | Present Tense | `User can login with valid credentials` |
| Step | Present Tense (lowercase) | `the user clicks the login button` |
| Step Definition File | `[feature]Steps.ts` | `loginSteps.ts` |

---

## Reuse Rules

Before creating a **new step definition**, check if it exists:

1. Search **existing step files** in `tests/bdd/step-definitions/`
2. If similar step exists, reuse or extend it
3. If step doesn't exist, check if **flow** needs updating instead

**Pattern:**
```gherkin
Scenario: User can add multiple items
  Given the user is logged in
  When the user clicks add to cart for "Item 1"
  And the user clicks add to cart for "Item 2"    ← Reuse same step
  Then the cart should show 2                       ← Reuse same step
```

---

## Forbidden Actions

**Never:**

- Put selectors directly in `.feature` files (selectors go in pages, not Gherkin)
- Mix technical and business language (choose one)
- Create duplicate step definitions for same action
- Hardcode values in step definitions (use parameters)
- Test multiple scenarios in one Scenario block
- Use tab characters (use spaces, 2 per indent)
- Write steps longer than one line (break with And/But)

---

## Allure Reporting

BDD tests integrate with Allure reporting automatically:

- Each scenario = one Allure test
- Each step = one Allure step
- Use `step()` wrapper for sub-steps
- Attach screenshots/data in step definitions

```typescript
import { step, attachJson } from '../../../utils/allureUtils';

Then('API response contains valid data', async function() {
  const response = await step('Get API response', async () => {
    return await this.apiClient.getUsers();
  });

  await attachJson('API Response', response);

  await step('Verify response status', async () => {
    expect(response.status).toBe(200);
  });
});
```

---

## Mental Model

```
Feature File (.feature)
├── Human Readable
├── Written by business/QA
├── What to test

Step Definition (.ts)
├── Code that maps Gherkin to actions
├── Written by developer
├── How to test (but calls flows)

Flow (.ts)
├── Reusable business logic
├── Called by step definitions
├── Where the actual actions happen
```

---

## Hybrid Approach Rules

### When BDD and TypeScript Tests Coexist

1. **BDD = Regression/Smoke** (happy paths, business scenarios)
2. **TypeScript = Technical** (negative, edge cases, performance)
3. **Both can use same flows/pages** (maximum reuse)
4. **Never duplicate** logic across test types

```
✅ Both call LoginFlow:
tests/ui/sauceDemo/login.spec.ts (TypeScript)
tests/bdd/step-definitions/loginSteps.ts (BDD)
  ↓
apps/sauceDemo/flows/loginFlow.ts (shared)
```

### Gradual Migration Pattern

Optional: Gradually migrate TypeScript tests to BDD

1. **Phase 1:** Add BDD alongside TypeScript (both run)
2. **Phase 2:** Use BDD for new regression tests
3. **Phase 3:** If team prefers, migrate old tests incrementally
4. **Keep TypeScript for:** Performance, complex scenarios

---

## Final Rule

Treat BDD as the **interface layer** for non-technical users.

Keep flows/pages clean and reusable.

All generated or modified BDD code must:
- Be human-readable
- Call existing flows/pages (no duplication)
- Follow Cucumber conventions
- Include Allure reporting
- Align with the hybrid test strategy

---

## Success Checklist

Before committing `.feature` files:

- [ ] Feature file has clear title
- [ ] Scenarios test one behavior each
- [ ] Steps use plain English (no code)
- [ ] Steps follow Gherkin pattern (Given/When/Then)
- [ ] No hardcoded values in scenarios
- [ ] Step definitions exist (or developer will create)
- [ ] Step definitions call existing flows
- [ ] Allure steps are wrapped properly
- [ ] No duplicate code in step definitions
- [ ] Tests run successfully: `npm run bdd:sauceDemo`
