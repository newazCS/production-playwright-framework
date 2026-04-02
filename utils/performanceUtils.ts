import { Page } from '@playwright/test';

export type PagePerformanceMetrics = {
  loadTime: number;
  domContentLoaded: number;
  responseTime: number;
};

export async function getPagePerformanceMetrics(page: Page): Promise<PagePerformanceMetrics> {
  return await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation' as any)[0] as PerformanceEntry;

    return {
      loadTime: (nav as any).loadEventEnd - nav.startTime,
      domContentLoaded: (nav as any).domContentLoadedEventEnd - nav.startTime,
      responseTime: (nav as any).responseEnd - nav.startTime
    };
  });
}