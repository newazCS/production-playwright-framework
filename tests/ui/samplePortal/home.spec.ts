import { test, expect } from '@playwright/test';
import { feature, story } from 'allure-js-commons';
import { HomeFlow } from '../../../apps/samplePortal/flows/homeFlow';
import { HomePage } from '../../../apps/samplePortal/pages/homePage';
import { samplePortalSite } from '../../../apps/samplePortal/data/site';
import { step } from '../../../utils/allureUtils';

test.describe('UI - SamplePortal Home', { tag: '@ui' }, () => {
  test('User can open sample portal home page', async ({ page }) => {
    await feature('UI');
    await story('SamplePortal - Home Page');

    const homeFlow = new HomeFlow(page);
    const homePage = new HomePage(page);

    await homeFlow.openHomePage();

    await step('Verify SamplePortal home is visible', async () => {
      expect(await homePage.isLoaded()).toBeTruthy();
    });

    await step('Verify page title matches expected business value', async () => {
      await expect(page).toHaveTitle(new RegExp(samplePortalSite.expectedTitleContains));
    });
  });
});
