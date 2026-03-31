import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../../../apps/sauceDemo/pages/loginPage';
import { InventoryPage } from '../../../../apps/sauceDemo/pages/inventoryPage';
import { LoginFlow } from '../../../../apps/sauceDemo/flows/loginFlow';
import { appConfig } from '../../../../config/appConfig';
import { step } from '../../../../utils/allureUtils';

// ====================
// LOGIN STEPS
// ====================

// Background step: User is on the login page
Given('the user is on the SauceDemo login page', async function() {
  const loginPage = new LoginPage(this.page);
  await step('Navigate to SauceDemo login page', async () => {
    await loginPage.goto();
  });
});

// Step: Enter username
When('the user enters username {string}', async function(username: string) {
  await step(`Enter username: ${username}`, async () => {
    await this.page.locator('#user-name').fill(username);
  });
});

// Step: Enter password
When('the user enters password {string}', async function(password: string) {
  await step(`Enter password: ${password}`, async () => {
    await this.page.locator('#password').fill(password);
  });
});

// Step: Click login button
When('the user clicks the login button', async function() {
  await step('Click login button', async () => {
    await this.page.locator('#login-button').click();
  });
});

// Step: Verify inventory page is displayed
Then('the inventory page should be displayed', async function() {
  const inventoryPage = new InventoryPage(this.page);
  await step('Verify inventory page is displayed', async () => {
    const isLoaded = await inventoryPage.isLoaded();
    expect(isLoaded).toBeTruthy();
  });
});

// Step: Verify page title contains text
Then('the page title should contain {string}', async function(text: string) {
  await step(`Verify page title contains: ${text}`, async () => {
    if (text === 'Products') {
      const pageHeader = await this.page.locator('.title').textContent();
      expect(pageHeader || '').toContain(text);
      return;
    }

    const title = await this.page.title();
    expect(title).toContain(text);
  });
});

// Step: Leave username empty
When('the user leaves username empty', async function() {
  await step('Leave username empty', async () => {
    // Do nothing - field stays empty by default
  });
});

// Step: Verify error message appears
Then('an error message should appear with text {string}', async function(expectedText: string) {
  await step(`Verify error message contains: ${expectedText}`, async () => {
    const errorMessage = await this.page.locator('[data-test="error"]').textContent();
    expect(errorMessage).toContain(expectedText);
  });
});

// ====================
// LOGGED IN USER SETUP
// ====================

// Background step: User is already logged in
Given('the user is logged in as {string}', async function(username: string) {
  const loginFlow = new LoginFlow(this.page);
  await step(`User logs in as: ${username}`, async () => {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.login(username, 'secret_sauce');
  });
});
