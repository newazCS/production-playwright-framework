import { Page } from '@playwright/test';

export type PagePerformanceMetrics = {
  loadTime: number;
  domContentLoaded: number;
  responseTime: number;
};

export async function getPagePerformanceMetrics(page: Page): Promise<PagePerformanceMetrics> {
  return await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    return {
      loadTime: nav.loadEventEnd - nav.startTime,
      domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
      responseTime: nav.responseEnd - nav.startTime
    };
  });
}