import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CartPage } from '../../../../apps/sauceDemo/pages/cartPage';
import { CheckoutInformationPage } from '../../../../apps/sauceDemo/pages/checkoutInformationPage';
import { CheckoutOverviewPage } from '../../../../apps/sauceDemo/pages/checkoutOverviewPage';
import { CheckoutCompletePage } from '../../../../apps/sauceDemo/pages/checkoutCompletePage';
import { step } from '../../../../utils/allureUtils';

// ====================
// CHECKOUT STEPS
// ====================

// Step: Click checkout button
When('the user clicks the checkout button', async function() {
  const cartPage = new CartPage(this.page);
  await step('Click checkout button', async () => {
    await cartPage.clickCheckout();
  });
});

// Step: Enter firstname
When('the user enters firstname {string}', async function(firstName: string) {
  await step(`Enter firstname: ${firstName}`, async () => {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
  });
});

// Step: Enter lastname
When('the user enters lastname {string}', async function(lastName: string) {
  await step(`Enter lastname: ${lastName}`, async () => {
    await this.page.locator('[data-test="lastName"]').fill(lastName);
  });
});

// Step: Enter zipcode
When('the user enters zipcode {string}', async function(zipcode: string) {
  await step(`Enter zipcode: ${zipcode}`, async () => {
    await this.page.locator('[data-test="postalCode"]').fill(zipcode);
  });
});

// Step: Click continue button
When('the user clicks the continue button', async function() {
  const checkoutPage = new CheckoutInformationPage(this.page);
  await step('Click continue button', async () => {
    await checkoutPage.clickContinue();
  });
});

// Step: Verify checkout overview page is displayed
Then('the checkout overview page should be displayed', async function() {
  await step('Verify checkout overview page is displayed', async () => {
    const url = this.page.url();
    expect(url).toContain('checkout-step-two');
  });
});

// Step: Verify total price is visible
Then('the total price should be visible', async function() {
  await step('Verify total price is visible', async () => {
    const totalElement = this.page.locator('.summary_total_label');
    expect(totalElement).toBeTruthy();
  });
});

// Step: Click finish button
When('the user clicks the finish button', async function() {
  const checkoutOverviewPage = new CheckoutOverviewPage(this.page);
  await step('Click finish button', async () => {
    await checkoutOverviewPage.clickFinish();
  });
});

// Step: Verify success message displays
Then('the success message should display {string}', async function(expectedMessage: string) {
  const checkoutCompletePage = new CheckoutCompletePage(this.page);
  await step(`Verify success message displays: ${expectedMessage}`, async () => {
    const header = await checkoutCompletePage.getCompleteHeader();
    expect(header).toContain(expectedMessage);
  });
});

// Step: Leave firstname empty
When('the user leaves firstname empty', async function() {
  await step('Leave firstname empty', async () => {
    // Do nothing - field stays empty by default
  });
});
