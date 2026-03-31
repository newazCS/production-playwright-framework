import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import '../../../config/env';

let browser: Browser;
let context: BrowserContext;
let page: Page;

setDefaultTimeout(30 * 1000);

// This hook runs once before any tests
BeforeAll(async function() {
  console.log('Starting browser...');
  browser = await chromium.launch();
});

// This hook runs before each scenario
Before(async function(scenario) {
  console.log(`Starting scenario: ${scenario.pickle.name}`);
  context = await browser.newContext();
  page = await context.newPage();
  
  // Attach page and context to the scenario so steps can access it
  this.page = page;
  this.context = context;
});

// This hook runs after each scenario
After(async function(scenario) {
  console.log(`Ending scenario: ${scenario.pickle.name}`);
  await context.close();
});

// This hook runs once after all tests
AfterAll(async function() {
  console.log('Closing browser...');
  await browser.close();
});
