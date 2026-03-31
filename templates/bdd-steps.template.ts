/**
 * BDD Step Definition Template
 * 
 * HOW TO USE THIS TEMPLATE:
 * 1. Copy this file and rename to: [feature]Steps.ts (e.g., loginSteps.ts)
 * 2. Replace [FEATURE_NAME] with your feature (e.g., "login")
 * 3. Replace example step patterns with actual step text from your .feature files
 * 4. Import your actual flows/pages from apps/
 * 5. Keep step logic minimal - call existing flows/pages instead
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { step } from '../utils/allureUtils';

// TODO: Uncomment and update these imports for your feature
// import { ExampleFlow } from '../../../apps/sauceDemo/flows/exampleFlow';
// import { ExamplePage } from '../../../apps/sauceDemo/pages/examplePage';

// ====================
// GIVEN STEPS (Setup)
// ====================

/**
 * Example: Given the user is on the login page
 * 
 * Pattern: Given [condition is true - what's the starting point?]
 */
Given('the user is on the {string} page', async function(pageName: string) {
  await step(`Navigate to ${pageName} page`, async () => {
    // const page = new ExamplePage(this.page);
    // await page.goto();
  });
});

// ====================
// WHEN STEPS (Actions)
// ====================

/**
 * Example: When the user clicks the login button
 * 
 * Pattern: When [user performs an action]
 */
When('the user clicks the {string} button', async function(buttonName: string) {
  await step(`Click ${buttonName} button`, async () => {
    // const page = new ExamplePage(this.page);
    // await page.clickButton(buttonName);
  });
});

/**
 * Example: When the user enters username "john_doe"
 * 
 * Pattern: When [user enters data with parameters]
 */
When('the user enters {string} {string}', async function(fieldName: string, value: string) {
  await step(`Enter ${fieldName}: ${value}`, async () => {
    // const page = new ExamplePage(this.page);
    // await page.fillField(fieldName, value);
  });
});

// ====================
// THEN STEPS (Assertions)
// ====================

/**
 * Example: Then the login page should be displayed
 * 
 * Pattern: Then [expected result is visible/true]
 */
Then('the {string} page should be displayed', async function(pageName: string) {
  await step(`Verify ${pageName} page is displayed`, async () => {
    // const page = new ExamplePage(this.page);
    // const isVisible = await page.isLoaded();
    // expect(isVisible).toBeTruthy();
  });
});

/**
 * Example: Then an error message should appear with text "Login failed"
 * 
 * Pattern: Then [assertion with expected value]
 */
Then('an error message should appear with text {string}', async function(expectedText: string) {
  await step(`Verify error message contains: ${expectedText}`, async () => {
    // const errorMsg = await this.page.locator('.error').textContent();
    // expect(errorMsg).toContain(expectedText);
  });
});

// ====================
// KEY RULES FOR THIS TEMPLATE
// ====================

/**
 * 1. ALWAYS REUSE FLOWS/PAGES
 *    ✅ GOOD:    const flow = new LoginFlow(this.page); await flow.login();
 *    ❌ BAD:     await this.page.locator('#user').fill('test');
 *
 * 2. USE BUSINESS LANGUAGE IN STEPS
 *    ✅ GOOD:    "the user clicks the login button"
 *    ❌ BAD:     "click #login-button selector"
 *
 * 3. WRAP WITH step() FOR ALLURE REPORTING
 *    ✅ GOOD:    await step('description', async () => { ... })
 *    ❌ BAD:     // no step wrapper
 *
 * 4. ONE STEP FILE PER FEATURE (OR RELATED GROUP)
 *    ✅ GOOD:    loginSteps.ts, addToCartSteps.ts
 *    ❌ BAD:     allSteps.ts, everything.ts
 *
 * 5. USE PARAMETERS WITH {string} AND {int}
 *    ✅ GOOD:    When('user enters {string} {string}', (field, value) => ...)
 *    ❌ BAD:     When('user enters something', () => ...)
 *
 * 6. KEEP IT SIMPLE
 *    Each step = one action. If more than 5 lines, probably needs refactoring.
 */
